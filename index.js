import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from "./server.js";
import { MongoDBClient } from "./backend/config/database.js";

import { ReservaRepository } from "./backend/repositories/reservaRepository.js";
import { ReservaService } from "./backend/services/reservaService.js";
import { ReservaController } from "./backend/controllers/reservaController.js";

import { AlojamientoRepository } from "./backend/repositories/alojamientoRepository.js";
import { AlojamientoService } from "./backend/services/alojamientoService.js";
import { AlojamientoController } from "./backend/controllers/alojamientoController.js";


import { NotificacionRepository } from "./backend/repositories/notificacionRepository.js";
import { NotificacionService } from "./backend/services/notificacionService.js";
import { NotificacionController } from "./backend/controllers/notificacionController.js";

import { UsuarioRepository } from "./backend/repositories/usuarioRepository.js";
import { UsuarioService } from "./backend/services/usuarioService.js";
import { UsuarioController } from "./backend/controllers/usuarioController.js";

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
const server = new Server(app, port);

MongoDBClient.connect();

// Config dependencias
const reservaRepo = new ReservaRepository();
const reservaService = new ReservaService(reservaRepo);
const reservaController = new ReservaController(reservaService);


const alojamientoRepo = new AlojamientoRepository();
const alojamientoService = new AlojamientoService(alojamientoRepo);
const alojamientoController = new AlojamientoController(alojamientoService);


const notificacionRepo = new NotificacionRepository();
const notificacionService = new NotificacionService(notificacionRepo);
const notificacionController = new NotificacionController(notificacionService);

const usuarioRepo = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepo);
const usuarioController = new UsuarioController(usuarioService);

// registro de controllers
server.setController(ReservaController, reservaController);
server.setController(AlojamientoController, alojamientoController);
server.setController(NotificacionController, notificacionController);
server.setController(UsuarioController, usuarioController);

// rutas y lanzamiento
server.configureRoutes();
server.launch();