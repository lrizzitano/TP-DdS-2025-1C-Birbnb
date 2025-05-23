import { ReservaController } from "../controllers/reservaController.js";

export function registerReservaRoutes(app, getController) {
// TODO: estas son genericas, veamos cuales nos sirven y cuales se van
  app.get("/reservas", (req, res) =>
    getController(ReservaController).listar(req, res)
  );

  app.get("/reservas/:id", (req, res) =>
    getController(ReservaController).findById(req, res)
  );

  app.post("/reservas", (req, res) =>
    getController(ReservaController).crear(req, res)
  );

  app.delete("/reservas/:id", (req, res) =>
    getController(ReservaController).delete(req, res)
  );

  app.put("/reservas/:id", (req, res) =>
    getController(ReservaController).update(req, res)
  );
}
