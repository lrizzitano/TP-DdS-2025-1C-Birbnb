import { CambioEstadoReserva } from "./CambioEstadoReserva.js";
import { EstadoReserva } from "../enums/EstadoReserva.js";
import { Notificacion } from "../Notificacion.js";
import { RangoFechas } from "./RangoFechas.js";

export class Reserva {
  constructor(rangoFechas,
    cantidadHuespedes,
    usuario,
    alojamiento) {
    this.fechaAlta = new Date(); 
    this.huespedReservador = usuario; // instancia de Usuario
    this.cantidadHuespedes = cantidadHuespedes; 
    this.alojamiento = alojamiento; // instancia de Alojamiento
    this.rangoFechas = new RangoFechas(rangoFechas.inicio, rangoFechas.fin);
    this.estado = EstadoReserva.PENDIENTE;
    this.precioPorNoche = alojamiento.precioPorNoche; 
    this.historialDeCambios = [];
  }

  actualizarEstado(nuevoEstado, motivo, fecha = new Date(), usuario) {
    this.estado = nuevoEstado;
    let cambio = new CambioEstadoReserva(fecha, nuevoEstado, motivo, usuario);
    this.agregarCambioDeEstado(cambio);
  }

  aceptar() {
    this.actualizarEstado(EstadoReserva.CONFIRMADA, "Reserva aceptada por el anfitrion", new Date(), this.alojamiento.anfitrion);
    return Notificacion.crearNotificacionReservaAceptada(this);
  }

  cancelar(motivo) {
    this.actualizarEstado(EstadoReserva.CANCELADA, motivo, new Date(), this.huespedReservador);
    return Notificacion.crearNotificacionReservaCancelada(this, motivo);
  }

  agregarCambioDeEstado(unCambioDeEstado) {
    this.historialDeCambios.push(unCambioDeEstado);
  }
}