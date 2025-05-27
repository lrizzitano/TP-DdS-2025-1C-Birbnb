import mongoose from 'mongoose';
import { Alojamiento } from '../alojamiento/Alojamiento.js';

const alojamientoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    calle: { type: String },
    altura: { type: Number },
    ciudad: {
      nombre: { type: String },
      pais: {
        nombre: { type: String }
      }
    },
    pais: { type: String }, // opcional si no querés usar el campo ciudad.pais.nombre directamente
    lat: { type: Number },
    long: { type: Number }
  },
  precioBase: {
    type: Number,
    required: true,
    min: 0
  },
  capacidad: {
    type: Number,
    required: true,
    min: 1
  },
  caracteristicas: [{
    type: String
  }],
  fotos: [{
    descripcion: { type: String },
    path: { type: String }
  }]
}, {
  timestamps: true,
  collection: 'alojamientos'
});

alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);
