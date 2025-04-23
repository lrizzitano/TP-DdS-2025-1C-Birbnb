export class FactoryNotificacionReservaAceptada extends FactoryNotification {
    static obtenerMensaje(reserva) {
        const mensaje = 
            `La reserva para el alojamiento ${reserva.alojamiento.nombre}
            desde ${reserva.rangoDeFechas.fechaInicio}
            hasta ${reserva.rangoDeFechas.fechaFin}
            fue aceptada por ${reserva.alojamiento.anfitrion}.`;
     
        return mensaje
    }

    static obtenerDestinatario(reserva) {
        return reserva.huespedReservador;
    }
}