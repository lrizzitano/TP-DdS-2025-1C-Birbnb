import { EstadoNotificacion } from "../modelo/enums/EstadoNotificacion.js";
import { nombreEnum } from "../modelo/enums/nombreEnum.js";
import { NotFoundError } from "../errors/AppError.js";

export class NotificacionService {
  constructor(notificacionRepository, usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
    this.notificacionRepository = notificacionRepository;
  }

  async findByDestinatario(filters = {}) {
    const usuario = await this.usuarioRepository.findById(filters.destinatario);
    if (!usuario) {
      throw new NotFoundError(`Usuario con ID ${filters.destinatario} no encontrado`);
    }

    const notificaciones = await this.notificacionRepository.findByDestinatario(filters);

    return notificaciones.map(notificacion => this.toDTO(notificacion));
  }

  async updateEstado(id) {
    const notificacion = await this.notificacionRepository.findById(id);

    if (!notificacion) {
      throw new NotFoundError(`Notificación con ID ${id} no encontrada`);
    }

    notificacion.marcarComoLeida();

    const notificacionModificada = await this.notificacionRepository.update(notificacion);
    return this.toDTO(notificacionModificada);
  }

  toDTO(notificacion) {
    if (!notificacion) {
      throw new NotFoundError(`Notificación con ID ${id} no encontrada`);
    }

    return {
      id: notificacion.id,
      mensaje: notificacion.mensaje,
      fechaAlta: notificacion.fechaAlta,
      estado: nombreEnum(EstadoNotificacion, notificacion.estado),
      fechaLeida: notificacion.fechaLeida
    };
  }

}