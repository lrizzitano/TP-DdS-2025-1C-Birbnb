import { CambioEstadoReserva } from "./CambioEstadoReserva";
import { EstadoReserva } from "../enums/EstadoReserva";
import { FactoryNotificacionReservaAceptada } from "../notificacion/FactoryNotificacionReservaAceptada";
import { FactoryNotificacionReservaCancelada } from "../notificacion/FactoryNotificacionReservaCancelada";
import { FactoryNotificacionReservaCreada } from "../notificacion/FactoryNotificacionReservaCreada";

export class Reserva {
  constructor(rangoDeFechas,
    cantHuespedes,
    usuario,
    alojamiento,
    estado,
    precioPorNoche,
    historialDeCambios = []) {
    this.fechaAlta = new Date(); 
    this.huespedReservador = usuario; // instancia de Usuario
    this.cantHuespedes = cantHuespedes; 
    this.alojamiento = alojamiento; // instancia de Alojamiento
    this.rangoDeFechas = rangoDeFechas;
    this.estado = estado;
    this.precioPorNoche = precioPorNoche; 
    this.historialDeCambios = historialDeCambios

    FactoryNotificacionReservaCreada.crearSegunReserva(this);
  }

  actualizarEstado(nuevoEstado, motivo, fecha = new Date(), usuario) {
    this.estado = nuevoEstado;
    let cambio = new CambioEstadoReserva(fecha, nuevoEstado, motivo, usuario);
    this.agregarCambioDeEstado(cambio);
  }

  aceptarReserva(usuario) {
    this.actualizarEstado(EstadoReserva.CONFIRMADA, "Reserva aceptada por el anfitrion", new Date(), usuario);
    FactoryNotificacionReservaAceptada.crearSegunReserva(this);
  }

  cancelarReserva(usuario, motivo) {
    this.actualizarEstado(EstadoReserva.CANCELADA, motivo, new Date(), usuario);
    FactoryNotificacionReservaCancelada.crearSegunReserva(this);
  }

  agregarCambioDeEstado(unCambioDeEstado) {
    this.historialDeCambios.push(unCambioDeEstado);
  }
}