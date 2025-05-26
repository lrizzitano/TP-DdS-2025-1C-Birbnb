import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacionRoutes(app, getController) {
    app.get("/notificaciones/:idDestinatario", (req, res) =>
        getController(NotificacionController).findByDestinatario(req, res)
    );

    app.put("/notificaciones/:id", (req, res) =>
        getController(NotificacionController).updateEstado(req, res)
    );
}
