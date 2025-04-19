export class CambioEstadoReserva {
    constructor(fecha, estadoReserva, reserva, motivo, usuario) {
        this.fecha = new Date(fecha); // fecha en la que se realiza el cambio de estado
        this.estadoReserva = estadoReserva; // instancia de EstadoReserva
        this.reserva = reserva; // instancia de Reserva
        this.motivo = motivo; // motivo del cambio de estado
        this.usuario = usuario; // instancia de Usuario que realiza el cambio

        reserva.actualizarEstado(estadoReserva); // Actualiza el estado de la reserva
    }
}