import express from "express";
import { registerAlojamientoRoutes } from "./backend/routes/alojamientoRoutes.js";
//import { registerNotificacionRoutes } from "./backend/routes/notificacionRoutes.js";
import { registerReservaRoutes } from "./backend/routes/reservaRoutes.js";

export class Server {
  #controllers = {};
  #app;

  constructor(app, port = 3000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
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
    //registerNotificacionRoutes(this.app, this.getController.bind(this));
    registerReservaRoutes(this.app, this.getController.bind(this));
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}