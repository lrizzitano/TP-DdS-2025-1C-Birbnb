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
      const { idUsuario } = req.params;
      const reservas = await this.reservaService.getReservasDeUsuario(idUsuario);
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
