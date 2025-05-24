import { EstadoNotificacion } from '../modelo/enums/EstadoNotificacion.js';

export class NotificaccionController {
    constructor(notificaccionController) {
        this.notificaccionController = notificaccionController;
    }

    async findByUsuario(req, res) {
        try {
            const idUsuario = Number(req.params.idUsuario);
            const estado = EstadoNotificacion[req.query.estado];

            if (Number.isNaN(idUsuario) || !(req.query.estado in EstadoNotificacion)) {
                return res.status(400).json({ error: 'Parámetros obligatorios inválidos' });
            }

            const notificaciones = await this.notificacionService.findByUsuario(idUsuario, estado);
            res.status(200).json(notificaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEstado(req, res) {
        try {
            const idUsuario = Number(req.params.idUsuario);
            const idNotificacion = Number(req.params.idNotificacion);

            if (Number.isNaN(idUsuario) || Number.isNaN(idNotificacion)) {
                return res.status(400).json({ error: 'Parámetros obligatorios inválidos' });
            }

            const notificacion = await this.notificacionService.updateEstado(idUsuario, idNotificacion);

            if (!notificacion) {
                return res.status(404).json({ error: 'Notificación no encontrada' });
            }

            res.status(200).json(notificacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}