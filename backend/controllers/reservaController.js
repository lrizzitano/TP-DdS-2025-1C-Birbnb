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

  async getReservas(req, res) {
    try {
      const { idUsuario } = req.query.id;
      const reservas = await this.reservaService.getReservasDeUsuario(idUsuario);
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const nuevoEstado = req.body.estado;
      const id = req.params.id;
      let reserva;
      switch(nuevoEstado) {
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
          reserva = await this.reservaService.actualizarReserva(id);
      }
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
      throw error
    }
  }
}
