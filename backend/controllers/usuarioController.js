import mongoose from "mongoose";
import { NotFoundError } from "../errors/AppError.js";

export class UsuarioController { 
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    async findAll(req, res, next) {
        try {
            const usuarios = await this.usuarioService.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new NotFoundError('ID de usuario inválido');
            }

            const usuario = await this.usuarioService.findById(id);

            if (!usuario) {
                throw new NotFoundError('Usuario no encontrado');
            }
            
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const usuario = await this.usuarioService.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const usuario = await this.usuarioService.delete(id);
            if (!usuario) {
                throw new NotFoundError('Usuario no encontrado');
            }
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const usuario = await this.usuarioService.update(id, req.body);
            if (!usuario) {
                throw new NotFoundError('Usuario no encontrado');
            }
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

}