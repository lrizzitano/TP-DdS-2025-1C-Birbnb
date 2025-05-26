import mongoose from 'mongoose'
import { Notificacion } from '../Notificacion.js';
import { EstadoNotificacion } from '../enums/EstadoNotificacion.js';

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
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, {
    timestamps: true,
    collection: 'notificaciones'
});

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);