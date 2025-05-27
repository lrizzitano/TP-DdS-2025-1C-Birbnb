import mongoose from 'mongoose';
import { NotificacionModel } from '../modelo/schemas/notificacionSchema.js';

export class NotificacionRepository { 
    constructor() {
        this.model = NotificacionModel;
    }

    async findByDestinatario(filters = {}) {
        return await this.model.find({ ...filters });
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async update(notificacion) {
        return await this.model.findByIdAndUpdate(
        notificacion.id,
        notificacion,
        { new: true }
        );
    }    
}