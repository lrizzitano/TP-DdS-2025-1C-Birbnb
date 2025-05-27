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

async findByFilters(filtrosMongo) {
  return await this.model.find(filtrosMongo);
}


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
