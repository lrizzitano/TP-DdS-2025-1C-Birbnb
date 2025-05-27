import mongoose from 'mongoose'
import { Reserva } from '../Reserva.js';
import { EstadoReserva } from '../enums/EstadoReserva.js';

const rangoFechaSchema = new mongoose.Schema({
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
  }, { _id: false }); // _id: false evita que Mongoose le ponga un id innecesario al subdocumento

  
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
    cantHuespuedes: {
        type: Number,
        required: true
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamiento',
        required: true
    },
    rangoDeFechas: {
        type: rangoFechaSchema,
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
    }
}, {
    timestamps: true,
    collection: 'reservas'
});

reservaSchema.loadClass(Reserva); 

export const ReservaModel = mongoose.model('Reserva', reservaSchema);