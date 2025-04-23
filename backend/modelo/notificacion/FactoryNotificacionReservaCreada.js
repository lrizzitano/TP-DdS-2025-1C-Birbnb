export class FactoryNotificacionReservaCreada extends FactoryNotification {
    static obtenerMensaje(reserva) {
        const mensaje =
            `Nueva reserva para el alojamiento ${reserva.alojamiento.nombre}
            desde ${reserva.rangoDeFechas.fechaInicio}
            hasta ${reserva.rangoDeFechas.fechaFin}
            hecha por ${reserva.huespedReservador}.`;

        return mensaje;
    }

    static obtenerDestinatario(reserva) {
        return reserva.alojamiento.anfitrion
    }
}