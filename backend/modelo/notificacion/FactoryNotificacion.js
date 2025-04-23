import { Notificacion } from './Notificacion.js';
import { NotImplementedError } from './NotImplementedException.js'
 
export class FactoryNotification {
    static crearSegunReserva(reserva) {
        return new Notificacion(this.obtenerMensaje(), this.obtenerDestinatario(), new Date(), 0, null);
    }

    obtenerMensaje() {
        throw new NotImplementedError();
    }
    obtenerDestinatario() {
        throw new NotImplementedError();
    }
}