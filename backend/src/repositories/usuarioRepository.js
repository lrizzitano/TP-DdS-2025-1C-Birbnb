import { UsuarioModel } from '../modelo/schemas/usuarioSchema.js';

export class UsuarioRepository { 
    constructor() {
        this.model = UsuarioModel;
    }

    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async create(usuario) {
        const nuevoUsuario = new this.model(usuario);
        const usuarioGuardado = await nuevoUsuario.save();
        usuarioGuardado.notificaciones = [];
        return usuarioGuardado;
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async update(usuarioId, usuario) {
        return await this.model.findByIdAndUpdate(usuarioId, usuario, { new: true, runValidators: true });
    }
}