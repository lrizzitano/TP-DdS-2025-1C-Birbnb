import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacionRoutes(app, getController) {
    app.get("/notificaciones", (req, res, next) =>
        getController(NotificacionController).findByDestinatario(req, res, next)
    );

    app.patch("/notificaciones/:id", (req, res, next) =>
        getController(NotificacionController).updateEstado(req, res, next)
    );
}
