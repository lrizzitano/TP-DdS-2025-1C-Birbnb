import { EstadoNotificacion } from "../modelo/enums/EstadoNotificacion.js";


export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async findByDestinatario(destinatario, filter = {}) {
    const notificaciones = await this.notificacionRepository.findByDestinatario(destinatario, filter);

    return notificaciones.map(notificacion => this.toDTO(notificacion));
  }

  async updateEstado(id) {
    const notificacion = await this.notificacionRepository.findById(id);

    if (!notificacion) {
      return null;
    }
    
    notificacion.estado = EstadoNotificacion.LEIDA;
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
      estado: notificacion.estado,
      fechaLeida: notificacion.fechaLeida
    };
  }

}