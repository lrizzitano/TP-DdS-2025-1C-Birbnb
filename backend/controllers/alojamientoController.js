import { Caracteristica } from "../modelo/enums/Caracteristica.js";

export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

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
      filtros.lat = Number(lat);
    }

    if (long) {
      filtros.long = Number(long);
    }

    if ((precioMin == undefined) !== (precioMax == undefined) || precioMin > precioMax) {
      return res.status(400).json({ error: 'Rango de precios inválido' });
    }

    if (precioMin && precioMax) {
      filtros.precioMin = Number(precioMin);
      filtros.precioMax = Number(precioMax);
    }
    if (cantHuespedes) {
      filtros.cantHuespedes = Number(cantHuespedes);
    }

    if (caracteristicas) {
      if (Array.isArray(caracteristicas)) {
        filtros.caracteristicas = caracteristicas.map(c => Caracteristica[c]);
      } else {
        filtros.caracteristicas = [Caracteristica[caracteristicas]];
      }
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
  }
}
