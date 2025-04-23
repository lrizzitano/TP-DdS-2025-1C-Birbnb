export class FactoryNotificacionReservaCreada extends FactoryNotification {
    static crearSegunReserva(reserva) {
        const mensaje =
            `Nueva reserva para el alojamiento ${reserva.alojamiento.nombre}
            desde ${reserva.rangoDeFechas.fechaInicio}
            hasta ${reserva.rangoDeFechas.fechaFin}
            hecha por ${reserva.huespedReservador}.`;
            // TODO arreglar accesors

        const destinatario = reserva.alojamiento.anfitrion;

        return this.crearNotificacion(mensaje, destinatario);
    }
}