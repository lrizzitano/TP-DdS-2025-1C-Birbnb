import mongoose from 'mongoose'
import { Alojamiento } from '../alojamiento/Alojamiento.js';
import { Moneda } from '../enums/Moneda.js';
import { Caracteristica } from '../enums/Caracteristica.js';

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioPorNoche: {
        type: Number,
        required: true
    },
    moneda: {
        type: String,
        enum: Moneda,
        required: true
    },
    horarioCheckIn: {
        type: String,
        required: true
    },
    horarioCheckOut: {
        type: String,
        required: true
    },
    direccion : { // TODO, VER QUE ONDA EL TIPO DE DATO DE ESTO
        type: String,
        required: true
    },
    cantHuespedesMax : {
        type: Number,
        required: true
    },
    caracteristicas : {
        type: [String],
        enum: Caracteristica
    },
    fotos : {
        type: String // TODO, VER QUE ONDA EL TIPO DE DATO DE ESTO
    }

}, {
    timestamps: true,
    collection: 'alojamientos'
});

alojamientoSchema.loadClass(Alojamiento); 

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);