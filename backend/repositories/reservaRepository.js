import { ReservaModel } from '../modelo/schemas/reservaSchema.js';

export class ReservaRepository { 
    constructor() {
        this.model = ReservaModel;
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

    async findByAlojamiento(alojamientoId) {
      return await this.model.find({alojamiento : alojamientoId});
    }

    async findByUsuario(usuarioId) {
      return await this.model.find({huespedReservador : usuarioId});
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