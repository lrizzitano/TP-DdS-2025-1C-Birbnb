// backend/controllers/alojamientoController.js
export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

  async listar(req, res) {
    try {
      const filtros = {
        ubicacion: req.query.ubicacion,
        precioMin: req.query.precioMin ? parseFloat(req.query.precioMin) : undefined,
        precioMax: req.query.precioMax ? parseFloat(req.query.precioMax) : undefined,
        capacidad: req.query.capacidad ? parseInt(req.query.capacidad) : undefined,
        caracteristicas: req.query.caracteristicas?.split(',') || undefined
      };

      const alojamientos = await this.alojamientoService.listarAlojamientos(filtros);
      res.status(200).json(alojamientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async crear(req, res) {
    try {
      const alojamiento = await this.alojamientoService.crearAlojamiento(req.body);
      res.status(201).json(alojamiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
