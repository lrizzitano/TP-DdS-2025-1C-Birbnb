import { AlojamientoModel } from '../modelo/schemas/alojamientoSchema.js';

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

//   async findByFilters(filters = {}) {
//     const query = {};

//     if (filters.ubicacion) {
//       query['direccion.ciudad.nombre'] = { $regex: filters.ubicacion, $options: 'i' };
//     }

//     if (filters.precioMin || filters.precioMax) {
//       query.precioBase = {};
//       if (filters.precioMin) query.precioBase.$gte = Number(filters.precioMin);
//       if (filters.precioMax) query.precioBase.$lte = Number(filters.precioMax);
//     }

//     if (filters.capacidad) {
//       query.capacidad = { $gte: Number(filters.capacidad) };
//     }

//     if (filters.caracteristicas?.length > 0) {
//       query.caracteristicas = { $all: filters.caracteristicas };
//     }

//     return await this.model.find(query);
//   }

async save(alojamiento) {
  if (alojamiento.id) {
    return await this.model.findByIdAndUpdate(
      alojamiento.id,
      { $set: alojamiento },
      { new: true, runValidators: true }
    );
  } else {
    const nuevo = new this.model(alojamiento);
    return await nuevo.save();
  }
}


  async deleteById(id) {
    const resultado = await this.model.findByIdAndDelete(id);
    return resultado !== null;
  }
}
