export class NotificacionRepository { 
    constructor(notificacionModel) {
        this.model = notificacionModel;
    }
    
    async findByUsuario(idUsuario) {
        return await this.model.find({ idUsuario });
    }
    
    async findById(idUsuario, idNotificacion) {
        return await this.model.findOne({ idUsuario, idNotificacion });
    }
    
    async update(notificacion) {
        return await this.model.findByIdAndUpdate(
        notificacion.id,
        notificacion,
        { new: true }
        );
    }    
}