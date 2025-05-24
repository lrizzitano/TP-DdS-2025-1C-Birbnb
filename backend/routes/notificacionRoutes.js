import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacionRoutes(app, getController) {
    app.get("/usuarios/:idUsuario/notificaciones/", (req, res) =>
        getController(NotificacionController).findByUsuario(req, res)
    );

    app.post("/usuarios/:idUsuario/notificaciones/:idNotificacion", (req, res) =>
        getController(NotificacionController).updateEstado(req, res)
    );
}
