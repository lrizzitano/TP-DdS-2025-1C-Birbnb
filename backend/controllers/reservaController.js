import mongoose from 'mongoose';
import { ValidationError } from '../errors/AppError.js';
export class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService;
  }

  async crear(req, res, next) {
    try {
      req.body.rangoFechas.fechaInicio = new Date(req.body.rangoFechas.fechaInicio);
      req.body.rangoFechas.fechaFin = new Date(req.body.rangoFechas.fechaFin);

      if (!mongoose.isValidObjectId(req.body.usuarioId)) {
        throw new ValidationError('El id del usuario es inválido');
      }
      if (!mongoose.isValidObjectId(req.body.alojamientoId)) {
        throw new ValidationError('El id del alojamiento es inválido');
      }

      const reserva = await this.reservaService.crearReserva(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async getReservas(req, res, next) {
    try {
      const idUsuario = req.query.id;
      const reservas = await this.reservaService.getReservasDeUsuario(idUsuario);
      res.status(200).json(reservas);
    } catch (error) {
      next(error);
    }
  }

  async actualizar(req, res, next) {
    try {
      let nuevoEstado = req.body.estado;

      if (nuevoEstado) {
        nuevoEstado = req.body.estado.toLowerCase();
      }

      const id = req.params.id;
      let reserva;
      switch (nuevoEstado) {
        case 'cancelada':
          let motivo = req.body.motivo;
          if (!motivo) {
            motivo = "Sin motivo"
          }
          reserva = await this.reservaService.cancelarReserva(id, motivo);
          break;
        case 'aceptada':
          reserva = await this.reservaService.aceptarReserva(id);
          break;
        default:
          if (req.body.rangoFechas) {
            req.body.rangoFechas.fechaInicio = new Date(req.body.rangoFechas.fechaInicio);
            req.body.rangoFechas.fechaFin = new Date(req.body.rangoFechas.fechaFin);
          }
          reserva = await this.reservaService.actualizarReserva(id, req.body);
      }
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }
}
