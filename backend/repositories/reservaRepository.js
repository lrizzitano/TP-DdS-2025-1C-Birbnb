import { ReservaModel } from '../modelo/schemas/reservaSchema.js';

export class ReservaRepository { 
    constructor() {
        this.model = ReservaModel;
    }

    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findByAlojamiento(alojamientoId) {
      return await this.model.find({alojamiento : alojamientoId})
    }

    async findByUsuario(usuarioId) {
      return await this.model.find({huespuedReservador : usuarioId})
    }

    async save(reserva) {
        if (reserva.id) { // si tiene id es pq ya existe => lo actualizo
          return await this.model.findByIdAndUpdate(reserva.id, reserva, { new: true, runValidators: true })
        }
        const nuevaReserva = new this.model(reserva); // si no existe, lo creo
        return await nuevaReserva.save();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
  }