import { EstadoNotificacion } from "./enums/EstadoNotificacion.js";

export class Notificacion {
  constructor(mensaje, usuario, fechaAlta = new Date(), estado = EstadoNotificacion.PENDIENTE, fechaLeida = null) {
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta;
    this.estado = estado;
    this.fechaLeida = fechaLeida;
    this.usuario = usuario;
  }

  static crearNotificacionReservaCreada(reserva) {
    const mensaje = `Nueva reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoDeFechas.fechaInicio}  
      hasta ${reserva.rangoDeFechas.fechaFin}
      hecha por ${reserva.huespedReservador.nombre}.`
      
      return new Notificacion(mensaje, reserva.alojamiento.anfitrion);
  }

  static crearNotificacionReservaAceptada(reserva) {
    const mensaje =
      `La reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoDeFechas.fechaInicio}
      hasta ${reserva.rangoDeFechas.fechaFin}
      fue aceptada por ${reserva.alojamiento.anfitrion.nombre}.`;

    return new Notificacion(mensaje, reserva.huespedReservador);
  }

  static crearNotificacionReservaCancelada(reserva, motivo) {
    const mensaje =
      `La reserva para el alojamiento ${reserva.alojamiento.nombre}
      desde ${reserva.rangoDeFechas.fechaInicio}
      hasta ${reserva.rangoDeFechas.fechaFin}
      fue cancelada por ${reserva.huespedReservador.nombre}
      por el siguiente motivo: ${motivo}`;

    return new Notificacion(mensaje, reserva.alojamiento.anfitrion);
  }

  marcarComoLeida() {
    this.estado = EstadoNotificacion.LEIDA;
    this.fechaLeida = new Date();
  }

}