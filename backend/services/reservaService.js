import { Reserva } from "../modelo/reserva/Reserva.js"
import { EstadoReserva } from "../modelo/enums/EstadoReserva.js"
import { Notificacion } from "../modelo/Notificacion.js"

export class ReservaService {
  constructor(reservaRepository, alojamientoRepository, usuarioRepository) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.usuarioRepository = usuarioRepository;
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
    
    if (!alojamiento.puedenAlojarse(datos.cantidadHuespedes)) {
      throw new Error("El alojamiento no permite esa cantidad de huespedes");
    }

    const reserva = new Reserva(
      datos.rangoFechas,
      datos.cantidadHuespedes,
      usuario,
      alojamiento
    );

    const filtro = {estado : EstadoReserva.CONFIRMADA};
    alojamiento.reservas = await this.reservaRepository.findByAlojamiento(datos.alojamientoId,
                                                                           filtro);
                                                            
    if (!alojamiento.estaDisponibleEn(datos.rangoFechas)) {
      throw new Error('El alojamiento no esta disponible en las fechas seleccionadas');
    }


    // TODO: TESTEAR. aca estamos suponiendo que al tener reserva inyectado usuario y alojamiento que provienen de un findById
    // son documentos. Entonces agarra la notificacion y en su campo usuario pone reserva.alojamiento.anfitrion
    // como alojamiento es un documento, su atributo anfitrion es un objectId de mongo
    const notificacionReservaCreada = Notificacion.crearNotificacionReservaCreada(reserva);
    this.notificacionRepository.save(notificacionReservaCreada);

    const reservaGuardada =  await this.reservaRepository.save(reserva);

    return this.toDto(reservaGuardada);
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


  async listarReservas() {
    return await this.reservaRepository.findAll();
  }



  async cancelarReserva(id, motivo = null) {
    const reservas = await this.reservaRepository.findAll();
    const reserva = reservas.find(r => r.id === id);

    if (!reserva) {
      throw new Error("Reserva no encontrada");
    }

    const hoy = new Date();
    const fechaInicio = new Date(reserva.rangoFechas.fechaInicio);

    if (hoy >= fechaInicio) {
      throw new Error("No se puede cancelar una reserva ya iniciada o pasada.");
    }

    reserva.estado = "cancelada";
    if (motivo) {
      reserva.motivoCancelacion = motivo;
    }

    return await this.reservaRepository.update(reserva);
  }



    async update(id, nuevosDatos) {
    const reservas = await this.reservaRepository.findAll();
    const reserva = reservas.find(r => r.id === id);

    if (!reserva) {
      throw new Error("Reserva no encontrada");
    }

    const hoy = new Date();
    const fechaInicioActual = new Date(reserva.rangoFechas.fechaInicio);
    if (hoy >= fechaInicioActual) {
      throw new Error("No se puede modificar una reserva que ya comenzó o terminó.");
    }

    // Si se modifican las fechas, validar que no haya conflicto(achequear esto si esta bien la logica)
    const seModificaronFechas =
      nuevosDatos.rangoFechas &&
      (nuevosDatos.rangoFechas.fechaInicio !== reserva.rangoFechas.fechaInicio ||
      nuevosDatos.rangoFechas.fechaFin !== reserva.rangoFechas.fechaFin);

    if (seModificaronFechas) {
      const conflicto = await this.reservaRepository.hasConflict(
        reserva.alojamiento,
        nuevosDatos.rangoFechas.fechaInicio,
        nuevosDatos.rangoFechas.fechaFin
      );

      // Validamos que no haya superposición con otras reservas (excepto consigo misma)
      if (conflicto && conflicto.id !== id) {
        throw new Error("El alojamiento no está disponible en las nuevas fechas.");
      }

      reserva.rangoFechas = nuevosDatos.rangoFechas;
    }

    // Si quisieras permitir otros cambios, agregalos aquí (usuario, etc.)

    return await this.reservaRepository.update(reserva);
  }

    async obtenerReservasPorUsuario(email) {
    const reservas = await this.reservaRepository.findAll();

    return reservas.filter(r =>
      r.usuario === email || r.huesped === email
    );
  }

}
