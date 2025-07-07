import mongoose from 'mongoose'
import { Alojamiento } from '../alojamiento/Alojamiento.js';
import { Ciudad } from '../alojamiento/Ciudad.js';
import { Direccion } from '../alojamiento/Direccion.js';
import { Foto } from '../alojamiento/Foto.js';
import { Pais } from '../alojamiento/Pais.js';
import { Moneda } from '../enums/Moneda.js';
import { Caracteristica } from '../enums/Caracteristica.js';

const PaisSchema = new mongoose.Schema({
    nombre: { type: String, required: true }
  });
  PaisSchema.loadClass(Pais);
  
  const CiudadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: PaisSchema, required: true }
  });
  CiudadSchema.loadClass(Ciudad);
  
  const DireccionSchema = new mongoose.Schema({
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    ciudad: { type: CiudadSchema, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  });
  DireccionSchema.loadClass(Direccion);

  const FotoSchema = new mongoose.Schema({
    descripcion: {type : String, required : true},
    path : {type: String, required : true}
  })
  FotoSchema.loadClass(Foto);

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precioPorNoche: { type: Number, required: true },
    moneda: { type: Number, enum: Moneda, required: true },
    horarioCheckIn: { type: String, required: true },
    horarioCheckOut: { type: String, required: true },
    direccion : { type: DireccionSchema, required: true },
    cantHuespedesMax : { type: Number, required: true },
    caracteristicas : {type: [Number], enum: Caracteristica },
    fotos : [{ type: FotoSchema, required : true}]
}, {
    timestamps: true,
    collection: 'alojamientos'
});

alojamientoSchema.loadClass(Alojamiento); 

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);