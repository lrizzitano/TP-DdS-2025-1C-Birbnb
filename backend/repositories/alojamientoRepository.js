import { AlojamientoModel } from '../modelo/schemas/alojamientoSchema.js';

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  async findAll(filtros = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.model.find(filtros).skip(skip).limit(limit).populate("anfitrion");
  }


  async findById(id) {
    return await this.model.findById(id).populate("anfitrion");
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
