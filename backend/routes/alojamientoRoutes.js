import { AlojamientoController } from "../controllers/alojamientoController.js";

export function registerAlojamientoRoutes(app, getController) {
  app.get("/alojamientos", (req, res) =>
    getController(AlojamientoController).findAll(req, res)
  );

  app.get("/alojamientos/:id", (req, res) =>
    getController(AlojamientoController).findById(req, res)
  );

  app.post("/alojamientos", (req, res) =>
    getController(AlojamientoController).create(req, res)
  );

  app.delete("/alojamientos/:id", (req, res) =>
    getController(AlojamientoController).delete(req, res)
  );

  app.put("/alojamientos/:id", (req, res) =>
    getController(AlojamientoController).update(req, res)
  );
}
