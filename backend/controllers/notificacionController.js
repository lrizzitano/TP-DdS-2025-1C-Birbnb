import mongoose from 'mongoose';
import { EstadoNotificacion } from '../modelo/enums/EstadoNotificacion.js';

export class NotificacionController {
    constructor(notificacionService) {
        this.notificacionService = notificacionService;
    }

    async findByDestinatario(req, res) {
        try {
            const destinatario = req.query.destinatario;
            const estado = EstadoNotificacion[req.query.estado];
            const filters = { };

            if (!mongoose.isValidObjectId(destinatario)) {
                return res.status(400).json({ error: 'El id del destinatario es inválido' });
            }
            
            filters.destinatario = destinatario;
            if (estado) {
                filters.estado = estado;
            }
            
            const notificaciones = await this.notificacionService.findByDestinatario(filters);
            res.status(200).json(notificaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEstado(req, res) {
        try {
            const id = req.params.id;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ error: 'El id de la notificación es inválido' });
            }

            const notificacion = await this.notificacionService.updateEstado(id);

            if (!notificacion) {
                return res.status(404).json({ error: 'Notificación no encontrada' });
            }

            res.status(200).json(notificacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}