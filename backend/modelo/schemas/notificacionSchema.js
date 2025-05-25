import mongoose from 'mongoose'
import { Notificacion } from '../notificacion/Notificacion';
import { EstadoNotificacion } from '../enums/EstadoNotificacion';

const notificacionSchema = new mongoose.Schema({
    mensaje: {
        type: String,
        required: true,
        trim: true
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: EstadoNotificacion,
        default: EstadoNotificacion.PENDIENTE
    },
    fechaLeida: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    collection: 'notificaciones'
});

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);