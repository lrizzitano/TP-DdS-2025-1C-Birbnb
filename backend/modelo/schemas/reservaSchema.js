import mongoose from 'mongoose'
import { Reserva } from '../reserva/Reserva.js';
import { EstadoReserva } from '../enums/EstadoReserva.js';

const rangoFechasSchema = new mongoose.Schema({
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
  });

const cambioEstadoReservaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    estado: { type: String, enum: EstadoReserva, required: true },
    motivo : {type: String, required : true},
    usuario : {type : mongoose.Schema.Types.ObjectId, ref : 'Usuario', required :true}
});
  
const reservaSchema = new mongoose.Schema({
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    huespedReservador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cantidadHuespedes: {
        type: Number,
        required: true
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamiento',
        required: true
    },
    rangoFechas: {
        type: rangoFechasSchema,
        required: true 
    },
    estado: {
        type: String,
        enum: EstadoReserva,
        required: true
    },
    precioPorNoche: {
        type: Number,
        required: true
    },
    historialDeCambios : {
        type: [cambioEstadoReservaSchema]
    }
}, {
    timestamps: true,
    collection: 'reservas'
});

reservaSchema.loadClass(Reserva); 

export const ReservaModel = mongoose.model('Reserva', reservaSchema);