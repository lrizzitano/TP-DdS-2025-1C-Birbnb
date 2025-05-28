import { NotFoundError } from "../errors/AppError.js";
import { nombreEnum } from "../modelo/enums/nombreEnum.js";
import { TipoUsuario } from "../modelo/enums/TipoUsuario.js";

export class UsuarioService { 
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async findAll() {
        const usuarios = await this.usuarioRepository.findAll();
        return usuarios.map(usuario => this.toDTO(usuario));
    }

    async findById(id) {
        const usuario = await this.usuarioRepository.findById(id);
        return this.toDTO(usuario);
    }

    async create(usuario) {
        usuario.tipo =  TipoUsuario[usuario.tipo]
        const usuarioCreado = await this.usuarioRepository.create(usuario);
        return this.toDTO(usuarioCreado);
    }

    async delete(id) {
        const usuarioEliminado = await this.usuarioRepository.delete(id);
        return this.toDTO(usuarioEliminado);
    }

    async update(usuarioId, usuario) {
        const usuarioModificado = await this.usuarioRepository.update(usuarioId, usuario);
        return this.toDTO(usuarioModificado);
    }

    toDTO(usuario) {
        if (!usuario) {
            throw new NotFoundError("Usuario no encontrado");
        }
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            tipo: nombreEnum(TipoUsuario, Number(usuario.tipo)),
            notificaciones: usuario.notificaciones
        };
    }
}