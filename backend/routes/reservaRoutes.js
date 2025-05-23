// import express from 'express';
// import {
//   crearReservaController,
//   obtenerReservasController
// } from '../controllers/reservaController.js';

// const router = express.Router();

// router.post('/', crearReservaController);
// router.get('/', obtenerReservasController);

// export default router;

import express from 'express';
import { ReservaRepository } from '../repositories/reservaRepository.js';
import { ReservaService } from '../services/reservaService.js';
import { ReservaController } from '../controllers/reservaController.js';

const router = express.Router();

const reservaRepo = new ReservaRepository();
const reservaService = new ReservaService(reservaRepo);
const reservaController = new ReservaController(reservaService);

router.post('/', (req, res) => reservaController.crear(req, res));
router.get('/', (req, res) => reservaController.listar(req, res));

export default router;
