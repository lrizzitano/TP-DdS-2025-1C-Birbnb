import { Reserva } from "../modelo/reserva/Reserva.js"
import { EstadoReserva } from "../modelo/enums/EstadoReserva.js"
import { RangoFechas } from "../modelo/reserva/RangoFechas.js";
import { Notificacion } from "../modelo/Notificacion.js"

export class ReservaService {
  constructor(reservaRepository, alojamientoRepository, usuarioRepository, notificacionRepository) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.usuarioRepository = usuarioRepository;
    this.notificacionRepository = notificacionRepository;
  }


  async crearReserva(datos) {
    const [usuario, alojamiento] = await Promise.all([
      this.usuarioRepository.findById(datos.usuarioId),
      this.alojamientoRepository.findById(datos.alojamientoId)
    ]);
    
    if(!usuario) {
      throw new Error("El usuario que quiere crear la reserva no existe");
    }

    if (!alojamiento) {
      throw new Error("El alojamiento sobre el que se quiere crear la reserva no existe");
    }
    
    this.verificarHuespedesDe(alojamiento, datos.cantidadHuespedes);
    this.verificarDisponibilidad(alojamiento, datos.rangoDeFechas);

    const reserva = new Reserva(
      datos.rangoFechas,
      datos.cantidadHuespedes,
      usuario,
      alojamiento
    );

    // TODO: TESTEAR. aca estamos suponiendo que al tener reserva inyectado usuario y alojamiento que provienen de un findById
    // son documentos. Entonces agarra la notificacion y en su campo usuario pone reserva.alojamiento.anfitrion
    // como alojamiento es un documento, su atributo anfitrion es un objectId de mongo
    const notificacionReservaCreada = Notificacion.crearNotificacionReservaCreada(reserva);
    this.notificacionRepository.save(notificacionReservaCreada);

    const reservaGuardada =  await this.reservaRepository.save(reserva);

    return this.toDto(reservaGuardada);
  }

  async getReservasDeUsuario(id) {
    const reservas = await this.reservaRepository.findByUsuario(id);
    reservas.map(reserva => this.toDto(reserva));
    return reservas;
  }

  async cancelarReserva(id, motivo) {
    //necesito el alojamiento y el huespedReservador populados para enviar la notificacion
    const reserva = await this.reservaRepository.findByIdConAlojamientoYHuespedPopulado(id);
    this.verificarReservaActualizable(reserva, "cancelar");

    const notificacionReservaCancelada = reserva.cancelar(motivo);
    this.notificacionRepository.save(notificacionReservaCancelada);

    const reservaGuardada = await this.reservaRepository.save(reserva);

    return this.toDto(reservaGuardada);
  }

  async aceptarReserva(id) {
    //necesito el alojamiento y anfitrion populados para enviar la notificacion
    const reserva = await this.reservaRepository.findByIdConAlojamientoYAnfitrionPopulado(id);
    this.verificarReservaActualizable(reserva, "cancelar");

    const notificacionReservaAceptada = reserva.aceptar();
    this.notificacionRepository.save(notificacionReservaAceptada);

    const reservaGuardada = await this.reservaRepository.save(reserva);

    return this.toDto(reservaGuardada);
  }

  async actualizarReserva(id, nuevosDatos) {
    // necesito el alojamiento populado para poder verificar sus reglas de negocio
    const reserva = await this.reservaRepository.findByIdConAlojamientoPopulado(id);
    this.verificarReservaActualizable(reserva, "actualizar");
    
    const seModificaronFechas =
      nuevosDatos.rangoFechas &&
      (nuevosDatos.rangoFechas.fechaInicio != reserva.rangoFechas.fechaInicio ||
      nuevosDatos.rangoFechas.fechaFin != reserva.rangoFechas.fechaFin);

    // reglas de negocio -> TODO : pensar / preguntar si tiene sentido verificar aca o esta verificacion se haria en el front end
    if (seModificaronFechas) {
      this.verificarDisponibilidad(reserva.alojamiento, nuevosDatos.rangoFechas);
      reserva.rangoFechas = nuevosDatos.rangoFechas;
    }

    if (reserva.cantidadHuespedes != nuevosDatos.cantidadHuespedes && nuevosDatos.cantidadHuespedes) {
      this.verificarHuespedesDe(reserva.alojamiento, nuevosDatos.cantidadHuespedes);
      reserva.cantidadHuespedes = nuevosDatos.cantidadHuespedes;
    }

    return await this.reservaRepository.save(reserva);
  }

  // utils

  async verificarReservaActualizable(reserva, mensaje) {
    if (!reserva) {
      throw new Error("Reserva no encontrada");
    }

    const hoy = new Date();
    const fechaInicioActual = new Date(reserva.rangoFechas.fechaInicio);
    if (hoy >= fechaInicioActual) {
      throw new Error("No se puede " + mensaje + " una reserva que ya comenzo o termino");
    }
  }

  toDto(reserva) {
    // TODO , ver si nos interesa que el DTO pase algo mas
    return {
      id: reserva._id,
      fechaAlta: reserva.fechaAlta.toString(),
      huespuedReservadorId: reserva.huespuedReservador.toString(),
      alojamientoId: reserva.alojamiento.toString()
    }
  }

  async verificarHuespedesDe(unAlojamiento, cantidadHuespedes) {
    if (!unAlojamiento.puedenAlojarse(cantidadHuespedes)) {
      throw new Error("El alojamiento no permite esa cantidad de huespedes");
    }
  }

  async verificarDisponibilidad(unAlojamiento, rangoDeFechas) {
    const filtro = {estado : EstadoReserva.CONFIRMADA};
    unAlojamiento.reservas = await this.reservaRepository.findByAlojamiento(unAlojamiento._id,
                                                                           filtro);
                                                            
    if (!unAlojamiento.estaDisponibleEn(rangoDeFechas)) {
      throw new Error('El alojamiento no esta disponible en las fechas seleccionadas');
    }
  }
}
