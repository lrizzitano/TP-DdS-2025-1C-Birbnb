import { Reserva } from "../modelo/reserva/Reserva.js"
import { EstadoReserva } from "../modelo/enums/EstadoReserva.js"
import { RangoFechas } from "../modelo/reserva/RangoFechas.js";
import { Notificacion } from "../modelo/Notificacion.js"
import { mongoose } from 'mongoose';

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
    await this.verificarDisponibilidad(alojamiento, datos.rangoFechas);

    const reserva = new Reserva(
      datos.rangoFechas,
      datos.cantidadHuespedes,
      usuario,
      alojamiento
    );

    const notificacionReservaCreada = Notificacion.crearNotificacionReservaCreada(reserva);
    this.notificacionRepository.create(notificacionReservaCreada);
    const reservaCreada =  await this.reservaRepository.create(reserva);

    return this.toDto(reservaCreada);
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
    this.notificacionRepository.create(notificacionReservaCancelada);

    const reservaGuardada = await reserva.save(reserva);

    return this.toDto(reservaGuardada);
  }

  async aceptarReserva(id) {
    //necesito el alojamiento y anfitrion populados para enviar la notificacion
    const reserva = await this.reservaRepository.findByIdConAlojamientoYAnfitrionPopulado(id);
    this.verificarReservaActualizable(reserva, "aceptar");

    const notificacionReservaAceptada = reserva.aceptar();
    this.notificacionRepository.create(notificacionReservaAceptada);

    const reservaGuardada = await reserva.save();

    return this.toDto(reservaGuardada);
  }

  async actualizarReserva(id, nuevosDatos) {
    // necesito el alojamiento populado para poder verificar sus reglas de negocio
    const reserva = await this.reservaRepository.findByIdConAlojamientoPopulado(id);
    this.verificarReservaActualizable(reserva, "actualizar");
    
    // reglas de negocio -> TODO : pensar / preguntar si tiene sentido verificar aca o esta verificacion se haria en el front end
    if (nuevosDatos.rangoFechas) {
      this.verificarDisponibilidad(reserva.alojamiento, nuevosDatos.rangoFechas);
      reserva.rangoFechas = nuevosDatos.rangoFechas;
    }

    if (nuevosDatos.cantidadHuespedes) {
      this.verificarHuespedesDe(reserva.alojamiento, nuevosDatos.cantidadHuespedes);
      reserva.cantidadHuespedes = nuevosDatos.cantidadHuespedes;
    }

    const reservaActualizada = await reserva.save();
    
    return this.toDto(reservaActualizada);
  }

  // utils

  verificarReservaActualizable(reserva, mensaje) {
    if (!reserva) {
      throw new Error("Reserva inexistente : no se puede " + mensaje);
    }

    if (reserva.estado == EstadoReserva.CANCELADA) {
      throw new Error("Reserva cancelada : no se puede " + mensaje)
    }

    const hoy = new Date();
    const fechaInicioActual = new Date(reserva.rangoFechas.fechaInicio);
    if (hoy >= fechaInicioActual) {
      throw new Error("Alojamiento en curso/terminado : no se puede " + mensaje + " la reserva");
    }
  }

  toDto(reserva) {
    let huespedString, alojamientoString;
    if (reserva.huespedReservador instanceof mongoose.Types.ObjectId) {
      huespedString = reserva.huespedReservador.toString()
    } else {
      huespedString = reserva.huespedReservador.id
    }

    if (reserva.alojamiento instanceof mongoose.Types.ObjectId) {
      alojamientoString = reserva.alojamiento.toString()
    } else {
      alojamientoString = reserva.alojamiento.id
    }

    return {
      id: reserva._id,
      fechaAlta: reserva.fechaAlta.toString(),
      huespedReservadorId: huespedString,
      alojamientoId: alojamientoString,
      cantidadHuespedes: reserva.cantidadHuespedes,
      rangoFechas: reserva.rangoFechas
    }
  }

  verificarHuespedesDe(unAlojamiento, cantidadHuespedes) {
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
