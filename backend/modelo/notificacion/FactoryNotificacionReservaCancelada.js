export class FactoryNotificacionReservaCancelada extends FactoryNotification {
    static crearSegunReserva(reserva) {
        const mensaje = 
            `La reserva para el alojamiento ${reserva.alojamiento.nombre}
            desde ${reserva.rangoDeFechas.fechaInicio}
            hasta ${reserva.rangoDeFechas.fechaFin}
            fue cancelada por ${reserva.huespedReservador}
            por el siguiente motivo: ${reserva.historialDeCambios.slice(-1).pop().motivo}`;
            // Realmente no encontre una mejor manera de acceder al ultimo elemento de un array
            // TODO arreglar accesors

        const destinatario = reserva.alojamiento.anfitrion;

        return this.crearNotificacion(mensaje, destinatario);
    }
}