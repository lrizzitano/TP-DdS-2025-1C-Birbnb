import { EstadoNotificacion } from "../enums/EstadoNotificacion.js";

export class Notificacion {
  constructor(mensaje, fechaAlta = new Date(), estado = EstadoNotificacion.PENDIENTE, fechaLeida = null) {
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta;
    this.estado = estado;
    this.fechaLeida = fechaLeida;
  }

  static crearNotificacion(mensaje, destinatario) {
    const notificacion = new Notificacion(mensaje);
    destinatario.notificaciones.push(notificacion);
    return notificacion;
  }

  static crearNotificacionReservaCreada(reserva) {
    const mensaje =
      `Nueva reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoDeFechas.fechaInicio}  
      hasta ${reserva.rangoDeFechas.fechaFin}
      hecha por ${reserva.huespedReservador.nombre}.`;

    const destinatario = reserva.alojamiento.anfitrion;

    this.crearNotificacion(mensaje, destinatario);
  }

  static crearNotificacionReservaAceptada(reserva) {
    const mensaje =
      `La reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoDeFechas.fechaInicio}
      hasta ${reserva.rangoDeFechas.fechaFin}
      fue aceptada por ${reserva.alojamiento.anfitrion.nombre}.`;

    const destinatario = reserva.huespedReservador;

    this.crearNotificacion(mensaje, destinatario);
  }

  static crearNotificacionReservaCancelada(reserva, motivo) {
    const mensaje =
      `La reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoDeFechas.fechaInicio}
      hasta ${reserva.rangoDeFechas.fechaFin}
      fue cancelada por ${reserva.huespedReservador.nombre}
      por el siguiente motivo: ${motivo}`;

    const destinatario = reserva.alojamiento.anfitrion;

    this.crearNotificacion(mensaje, destinatario);
  }

  marcarComoLeida() {
    this.estado = EstadoNotificacion.LEIDA;
    this.fechaLeida = new Date();
  }

}