export class CambioEstadoReserva {
    constructor(fecha, estadoReserva, reserva, motivo, usuario) {
        this.fecha = new Date(fecha); 
        this.estadoReserva = estadoReserva; // instancia de EstadoReserva
        this.reserva = reserva; // instancia de Reserva
        this.motivo = motivo; 
        this.usuario = usuario; // instancia de Usuario que realiza el cambio

        reserva.actualizarEstado(estadoReserva); 
    }
}