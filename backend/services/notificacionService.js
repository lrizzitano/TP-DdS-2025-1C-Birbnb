import { EstadoNotificacion } from "../modelo/enums/EstadoNotificacion.js";
import { nombreEnum } from "../modelo/enums/nombreEnum.js";


export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async findByDestinatario(filters = {}) {
    const notificaciones = await this.notificacionRepository.findByDestinatario(filters);

    return notificaciones.map(notificacion => this.toDTO(notificacion));
  }

  async updateEstado(id) {
    const notificacion = await this.notificacionRepository.findById(id);

    if (!notificacion) {
      return null;
    }

    notificacion.marcarComoLeida();

    const notificacionModificada = await this.notificacionRepository.update(notificacion);
    return this.toDTO(notificacionModificada);
  }

  toDTO(notificacion) {
    if (!notificacion) {
      return null;
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