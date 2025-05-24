import { EstadoNotificacion } from '../modelo/enums/EstadoNotificacion';


export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async findByUsuario(idUsuario, estado = EstadoNotificacion.PENDIENTE) {
    const notificaciones = await this.reservaRepository.findByUsuario(idUsuario);

    notificaciones = notificaciones.filter(
      (notificacion) => notificacion.estado === estado
    );

    return notificaciones.map(notificacion => this.toDTO(notificacion));
  }

  async updateEstado(idUsuario, idNotificacion) {
    const notificacion = await this.notificacionRepository.findById(idUsuario, idNotificacion);

    notificacion.estado = EstadoNotificacion.LEIDO;
    const notificacionModificada = await this.reservaRepository.update(notificacion);
    return this.toDTO(notificacionModificada);
  }

  toDTO(notificacion) {
    return {
      id: notificacion.id,
      mensaje: notificacion.mensaje,
      fechaAlta: notificacion.fechaAlta,
      estado: notificacion.estado,
      fechaLeida: notificacion.fechaLeida
    };
  }

}