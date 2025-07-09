import express from "express";
import cors from 'cors';
import { registerAlojamientoRoutes } from "./backend/routes/alojamientoRoutes.js";
import { registerNotificacionRoutes } from "./backend/routes/notificacionRoutes.js";
import { registerReservaRoutes } from "./backend/routes/reservaRoutes.js";
import { registerUsuarioRoutes } from "./backend/routes/usuarioRoutes.js";
import { errorHandler } from "./backend/middleware/errorHandler.js";

export class Server {
  #controllers = {};
  #app;

  constructor(app, port = 5000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
    this.#app.use(cors()); // aca dejamos que le pegue cualquiera, asi le podemos dar con el front, para deployear seria interesante ver de limitar esto
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  configureRoutes() {
    registerAlojamientoRoutes(this.app, this.getController.bind(this));
    registerNotificacionRoutes(this.app, this.getController.bind(this));
    registerReservaRoutes(this.app, this.getController.bind(this));
    registerUsuarioRoutes(this.app, this.getController.bind(this));

    this.#app.use((req, res, next) => {
      res.status(404).json({
        status: 'fail',
        message: "La ruta solicitada no existe"
      });
    });

    this.#app.use(errorHandler);
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}