import { ReservaController } from "../controllers/reservaController.js";

export function registerReservaRoutes(app, getController) {
  app.post("/reservas", (req, res) => 
    getController(ReservaController).crear(req, res)
  );

  app.patch("/reservas/:id", (req, res) => 
    getController(ReservaController).actualizar(req, res)
  );

  app.get("/reservas/:idUsuario", (req, res) =>
    getController(ReservaController).getReservas(req, res)
  );
}
