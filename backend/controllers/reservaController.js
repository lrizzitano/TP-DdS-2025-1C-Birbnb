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

  async delete(req, res) {
    const { id } = req.params;
    const { motivo } = req.body || {};

    try {
      const resultado = await this.reservaService.cancelarReserva(id, motivo);
      res.status(200).json({ mensaje: "Reserva cancelada", reserva: resultado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const nuevosDatos = req.body;

    try {
      const reservaModificada = await this.reservaService.update(id, nuevosDatos);
      res.status(200).json({ mensaje: "Reserva modificada", reserva: reservaModificada });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const reserva = await this.reservaService.actualizar(id);
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
