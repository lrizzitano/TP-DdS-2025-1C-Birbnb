import { ReservaModel } from '../modelo/schemas/reservaSchema.js';

export class ReservaRepository { 
    constructor(AlojamientoRepository) {
        this.model = ReservaModel;
        this.AlojamientoRepository = AlojamientoRepository;
    }

    async findAll() {
        return await this.model.find();
    }

    async findByIdConAlojamientoPopulado(id) {
        return await this.model.findById(id).populate('alojamiento');
    }

    async findByIdConAlojamientoYHuespedPopulado(id) {
      return await this.model.findById(id).populate('alojamiento').populate('huespedReservador');   
    }

    async findByIdConAlojamientoYAnfitrionPopulado(id) {
      return await this.model.findById(id).populate({
        path: 'alojamiento',
        populate: {
          path: 'anfitrion'
        }
      });
    }

    async findById(id) {
      return await this.model.findById(id);
    }

    async findByAlojamiento(alojamientoId, filtros = {}) {
      return await this.model.find({alojamiento : alojamientoId, ...filtros});
    }

    async findByUsuario(usuarioId) {
      const alojamientosUsuario = await this.AlojamientoRepository.findByAnfitrion(usuarioId);

      console.log("Alojamientos del usuario:", alojamientosUsuario);

      const alojamientoIds = alojamientosUsuario.map(a => a._id);

      return await this.model.find({
        $or: [
          { huespedReservador: usuarioId },
          { alojamiento: { $in: alojamientoIds } }
        ]
      });
    }


    async create(instanciaDeReservaDominio) {
      const nuevaReserva = new this.model(instanciaDeReservaDominio);
      return await nuevaReserva.save();
    }

    async update(documentoDeReservaConDatosActualizados) { 
      return await documentoDeReservaConDatosActualizados.save();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
  }