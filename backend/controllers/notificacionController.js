import mongoose from 'mongoose';
import { EstadoNotificacion } from '../modelo/enums/EstadoNotificacion.js';
import { ValidationError } from '../errors/AppError.js';

export class NotificacionController {
    constructor(notificacionService) {
        this.notificacionService = notificacionService;
    }

    async findByDestinatario(req, res, next) {
        try {
            const destinatario = req.query.destinatario;
            const estado = EstadoNotificacion[req.query.estado];
            const filters = { };

            if (!mongoose.isValidObjectId(destinatario)) {
                throw new ValidationError('El id del destinatario es inválido');
            }
            
            filters.destinatario = destinatario;
            if (estado != undefined) {
                filters.estado = estado;
            }
            
            const notificaciones = await this.notificacionService.findByDestinatario(filters);
            res.status(200).json(notificaciones);
        } catch (error) {
            next(error);
        }
    }

    async updateEstado(req, res, next) {
        try {
            const id = req.params.id;

            if (!mongoose.isValidObjectId(id)) {
                throw new ValidationError('El id de la notificación es inválido');
            }

            const notificacion = await this.notificacionService.updateEstado(id);

            if (!notificacion) {
                throw new NotFoundError('Notificación no encontrada');
            }

            res.status(200).json(notificacion);
        } catch (error) {
            next(error);
        }
    }
}