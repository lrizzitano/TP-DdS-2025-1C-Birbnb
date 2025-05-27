export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

  async findAll(req, res) {
    const filtros = req.query;
    const alojamientos = await this.alojamientoService.findAll(filtros);
    res.json(alojamientos);
  }

async findAll(req, res) {
  const filtros = req.query;
  const alojamientos = await this.alojamientoService.findAll(filtros);
  res.json(alojamientos);
}


  async create(req, res) {
    const nuevoAlojamiento = await this.alojamientoService.create(req.body);
    res.status(201).json(nuevoAlojamiento);
  }

  async delete(req, res) {
    await this.alojamientoService.delete(req.params.id);
    res.status(204).send();
  }

  async update(req, res) {
    const alojamientoActualizado = await this.alojamientoService.update(req.params.id, req.body);
    res.json(alojamientoActualizado);
  }
}
