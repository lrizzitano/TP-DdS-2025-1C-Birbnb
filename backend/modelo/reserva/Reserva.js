import { CambioEstadoReserva } from "./CambioEstadoReserva.js";
import { EstadoReserva } from "../enums/EstadoReserva.js";
import { Notificacion } from "../Notificacion.js";
import { RangoFechas } from "./RangoFechas.js";

export class Reserva {
  constructor(rangoDeFechas,
    cantHuespedes,
    usuario,
    alojamiento) {
    this.fechaAlta = new Date(); 
    this.huespedReservador = usuario; // instancia de Usuario
    this.cantHuespedes = cantHuespedes; 
    this.alojamiento = alojamiento; // instancia de Alojamiento
    this.rangoDeFechas = new RangoFechas(rangoDeFechas.inicio, rangoDeFechas.fin);
    this.estado = EstadoReserva.PENDIENTE;
    this.precioPorNoche = alojamiento.precioPorNoche; 
    this.historialDeCambios = [];

    Notificacion.crearNotificacionReservaCreada(this);
  }

  actualizarEstado(nuevoEstado, motivo, fecha = new Date(), usuario) {
    this.estado = nuevoEstado;
    let cambio = new CambioEstadoReserva(fecha, nuevoEstado, motivo, usuario);
    this.agregarCambioDeEstado(cambio);
  }

  aceptarReserva(usuario) {
    this.actualizarEstado(EstadoReserva.CONFIRMADA, "Reserva aceptada por el anfitrion", new Date(), usuario);
    Notificacion.crearNotificacionReservaAceptada(this);
  }

  cancelarReserva(usuario, motivo) {
    this.actualizarEstado(EstadoReserva.CANCELADA, motivo, new Date(), usuario);
    Notificacion.crearNotificacionReservaCancelada(this, motivo);
  }

  agregarCambioDeEstado(unCambioDeEstado) {
    this.historialDeCambios.push(unCambioDeEstado);
  }
}