import { ReservaController } from "../controllers/reservaController.js";

export function registerReservaRoutes(app, getController) {
  app.post("/reservas", (req, res, next) => 
    getController(ReservaController).crear(req, res, next)
  );

  app.patch("/reservas/:id", (req, res, next) => 
    getController(ReservaController).actualizar(req, res, next)
  );

  app.get("/reservas", (req, res, next) =>
    getController(ReservaController).getReservas(req, res, next)
  );
}
