import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from "./server.js";
import { MongoDBClient } from "./src/config/database.js";

import { ReservaRepository } from "./src/repositories/reservaRepository.js";
import { ReservaService } from "./src/services/reservaService.js";
import { ReservaController } from "./src/controllers/reservaController.js";

import { AlojamientoRepository } from "./src/repositories/alojamientoRepository.js";
import { AlojamientoService } from "./src/services/alojamientoService.js";
import { AlojamientoController } from "./src/controllers/alojamientoController.js";

import { NotificacionRepository } from "./src/repositories/notificacionRepository.js";
import { NotificacionService } from "./src/services/notificacionService.js";
import { NotificacionController } from "./src/controllers/notificacionController.js";

import { UsuarioRepository } from "./src/repositories/usuarioRepository.js";
import { UsuarioService } from "./src/services/usuarioService.js";
import { UsuarioController } from "./src/controllers/usuarioController.js";

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
const server = new Server(app, port);

MongoDBClient.connect();

// Config dependencias
const alojamientoRepo = new AlojamientoRepository();
const alojamientoService = new AlojamientoService(alojamientoRepo);
const alojamientoController = new AlojamientoController(alojamientoService);

const usuarioRepo = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepo);
const usuarioController = new UsuarioController(usuarioService);

const notificacionRepo = new NotificacionRepository();
const notificacionService = new NotificacionService(notificacionRepo, usuarioRepo);
const notificacionController = new NotificacionController(notificacionService);

const reservaRepo = new ReservaRepository(alojamientoRepo);
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, usuarioRepo, notificacionRepo, alojamientoService);
const reservaController = new ReservaController(reservaService);

// registro de controllers
server.setController(ReservaController, reservaController);
server.setController(AlojamientoController, alojamientoController);
server.setController(NotificacionController, notificacionController);
server.setController(UsuarioController, usuarioController);

// rutas y lanzamiento
server.configureRoutes();
server.launch();