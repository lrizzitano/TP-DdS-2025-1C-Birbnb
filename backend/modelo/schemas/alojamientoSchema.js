import mongoose from 'mongoose'
import { Alojamiento } from '../alojamiento/Alojamiento.js';
import { Moneda } from '../enums/Moneda.js';
import { Caracteristica } from '../enums/Caracteristica.js';

const PaisSchema = new Schema({
    nombre: { type: String, required: true }
  });
  PaisSchema.loadClass(Pais);
  
  const CiudadSchema = new Schema({
    nombre: { type: String, required: true },
    pais: { type: PaisSchema, required: true }
  });
  CiudadSchema.loadClass(Ciudad);
  
  const DireccionSchema = new Schema({
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    ciudad: { type: CiudadSchema, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  });

  const FotoSchema = new Schema({
    descripcion: {type : String, required : true},
    path : {type: String, required : true}
  })

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precioPorNoche: { type: Number, required: true },
    moneda: { type: String, enum: Moneda, required: true },
    horarioCheckIn: { type: String, required: true },
    horarioCheckOut: { type: String, required: true },
    direccion : { type: DireccionSchema, required: true },
    cantHuespedesMax : { type: Number, required: true },
    caracteristicas : {type: [String], enum: Caracteristica },
    fotos : { type: FotoSchema, required : true}
}, {
    timestamps: true,
    collection: 'alojamientos'
});

alojamientoSchema.loadClass(Alojamiento); 

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);