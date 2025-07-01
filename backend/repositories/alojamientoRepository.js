import { AlojamientoModel } from '../modelo/schemas/alojamientoSchema.js';
export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  async findAll(filtros = {}, page = 1, limit = 10) {
    const copiaFiltros = {...filtros}; // hacemos copia para poder borrarle campos tranquilos
    const {fechaInicioFiltro, fechaFinFiltro} = copiaFiltros; // agarramos estos pq el filtro es distinto
    delete copiaFiltros.fechaInicioFiltro;  // y los eliminamos para que no molesten en el $match
    delete copiaFiltros.fechaFinFiltro;

    const skip = (page - 1) * limit;

    const alojamientosFiltrados = await this.model.aggregate([
        {$match: copiaFiltros},
        {$lookup: { from: 'reservas', localField: '_id', foreignField: 'alojamiento', as: 'reservas'}},
        {$match: {
            // filtro según reservas para disponibilidad
            reservas: { $not: { $elemMatch: { 
              "rangoFechas.fechaInicio": { $lt: fechaFinFiltro },
              "rangoFechas.fechaFin": { $gt: fechaInicioFiltro }
            } } }
          }
        },
        {$skip: skip},
        {$limit: limit},
      ]);

      return await this.model.populate(alojamientosFiltrados, {path: 'anfitrion'});
  }


  async findById(id) {
    return await this.model.findById(id).populate("anfitrion");
  }

  async findByAnfitrion(anfitrionId) {
    return await this.model.find({anfitrion: anfitrionId});;
  }

  async countAll(filtros = {}) {
    const copiaFiltros = {...filtros}; // hacemos copia para poder borrarle campos tranquilos
    const {fechaInicioFiltro, fechaFinFiltro} = copiaFiltros; // agarramos estos pq el filtro es distinto
    delete copiaFiltros.fechaInicioFiltro;  // y los eliminamos para que no molesten en el $match
    delete copiaFiltros.fechaFinFiltro;

    const filtrados = await this.model.aggregate([
      {$match: copiaFiltros},
      {$lookup: { from: 'reservas', localField: '_id', foreignField: 'alojamiento', as: 'reservas'}},
      {$match: {
          // filtro según reservas para disponibilidad
          reservas: { $not: { $elemMatch: { 
            "rangoFechas.fechaInicio": { $lt: fechaFinFiltro },
            "rangoFechas.fechaFin": { $gt: fechaInicioFiltro }
          } } }
        }
      }
    ])

    return filtrados.length;
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
