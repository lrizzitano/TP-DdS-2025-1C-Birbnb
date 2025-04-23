export class FactoryNotificacionReservaCancelada extends FactoryNotification {
    static obtenerMensaje(reserva) {
        const mensaje = 
            `La reserva para el alojamiento ${reserva.alojamiento.nombre}
            desde ${reserva.rangoDeFechas.fechaInicio}
            hasta ${reserva.rangoDeFechas.fechaFin}
            fue cancelada por ${reserva.huespedReservador}
            por el siguiente motivo: ${reserva.historialDeCambios.slice(-1).pop().motivo}`;

        return mensaje
    }
    
    static obtenerDestinatario(reserva){ 
        const destinatario = reserva.alojamiento.anfitrion;
    }
}