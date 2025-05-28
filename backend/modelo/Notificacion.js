import { EstadoNotificacion } from "./enums/EstadoNotificacion.js";

export class Notificacion {
  constructor(mensaje, destinatario, fechaAlta = new Date(), estado = EstadoNotificacion.PENDIENTE, fechaLeida = null) {
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta;
    this.estado = estado;
    this.fechaLeida = fechaLeida;
    this.destinatario = destinatario;
  }

  static crearNotificacionReservaCreada(reserva) {
    const mensaje = `Nueva reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoFechas.fechaInicio}  
      hasta ${reserva.rangoFechas.fechaFin}
      hecha por ${reserva.huespedReservador.nombre}.`

      return new Notificacion(mensaje, reserva.alojamiento.anfitrion);
  }

  static crearNotificacionReservaAceptada(reserva) {
    const mensaje =
      `La reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoFechas.fechaInicio}
      hasta ${reserva.rangoFechas.fechaFin}
      fue aceptada por ${reserva.alojamiento.anfitrion.nombre}.`;

    return new Notificacion(mensaje, reserva.huespedReservador);
  }

  static crearNotificacionReservaCancelada(reserva, motivo) {
    const mensaje =
      `La reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoFechas.fechaInicio}
      hasta ${reserva.rangoFechas.fechaFin}
      fue cancelada por ${reserva.huespedReservador.nombre}
      por el siguiente motivo: ${motivo}`;

    return new Notificacion(mensaje, reserva.alojamiento.anfitrion);
  }

  marcarComoLeida() {
    this.estado = EstadoNotificacion.LEIDA;
    this.fechaLeida = new Date();
  }

}