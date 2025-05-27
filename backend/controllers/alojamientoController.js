<<<<<<< HEAD
// backend/controllers/alojamientoController.js
=======
>>>>>>> implementacion-alojamiento
export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

<<<<<<< HEAD
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
=======
  async findAll(req, res) {
    const {
      calle,
      altura,
      ciudad,
      pais,
      lat,
      long,
      precioMin,
      precioMax,
      cantHuespedes,
      caracteristicas
    } = req.query;

    const filtros = {};

    if (calle) {
      filtros.calle = calle;
    }

    if (altura) {
      filtros.altura = altura;
    }

    if (ciudad) {
      filtros.ciudad = ciudad;
    }

    if (pais) {
      filtros.pais = pais;
    }

    if (lat) {
      filtros.latitud = Number(lat);
    }

    if (long) {
      filtros.longitud = Number(long);
    }

    if (precioMin) {
      filtros.precioMin = Number(precioMin);
    }

    if (precioMax) {
      filtros.precioMax = Number(precioMax);
    }

    if (cantHuespedes) {
      filtros.cantHuespedes = Number(cantHuespedes);
    }

    if (caracteristicas) {
      filtros.caracteristicas = caracteristicas;
    }

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
>>>>>>> implementacion-alojamiento
  }
}
