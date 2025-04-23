export class FactoryNotificacionReservaAceptada extends FactoryNotification {
    static crearSegunReserva(reserva) {
        const mensaje = 
            `La reserva para el alojamiento ${reserva.alojamiento.nombre}
            desde ${reserva.rangoDeFechas.fechaInicio}
            hasta ${reserva.rangoDeFechas.fechaFin}
            fue aceptada por ${reserva.alojamiento.anfitrion}.`;
            // TODO arreglar accesors

        const destinatario = reserva.huespedReservador;

        return this.crearNotificacion(mensaje, destinatario);
    }
}