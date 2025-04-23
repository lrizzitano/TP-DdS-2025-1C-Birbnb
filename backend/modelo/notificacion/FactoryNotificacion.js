import { Notificacion } from './Notificacion.js';

export class FactoryNotification {
    static crearSegunReserva(reserva) {}

    static crearNotificacion(mensaje, destinatario) {
        return new Notificacion(mensaje, destinatario, new Date(), 0, null);
    }
}