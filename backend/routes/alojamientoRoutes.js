import { AlojamientoController } from "../controllers/alojamientoController.js";

export function registerAlojamientoRoutes(app, getController) {
  app.get("/alojamientos", (req, res) =>
    getController(AlojamientoController).listar(req, res)
  );

  app.post("/alojamientos", (req, res) =>
    getController(AlojamientoController).crear(req, res)
  );
}
