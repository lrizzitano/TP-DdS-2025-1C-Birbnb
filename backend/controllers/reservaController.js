// import {
//   crearReserva,
//   listarReservas
// } from '../services/reservaService.js';

// export const crearReservaController = async (req, res) => {
//   try {
//     const reserva = await crearReserva(req.body);
//     res.status(201).json(reserva);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const obtenerReservasController = async (req, res) => {
//   try {
//     const reservas = await listarReservas();
//     res.status(200).json(reservas);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService;
  }

  async crear(req, res) {
    try {
      const reserva = await this.reservaService.crearReserva(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listar(req, res) {
    try {
      const reservas = await this.reservaService.listarReservas();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
