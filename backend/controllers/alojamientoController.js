import { ValidationError } from "../errors/AppError.js";
import { Caracteristica } from "../modelo/enums/Caracteristica.js";

export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

  async findAll(req, res, next) {
    try {
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
        caracteristicas,
        page,
        limit
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
        throw new ValidationError('Rango de precios inválido');
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

      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;

      const alojamientos = await this.alojamientoService.findAll(filtros, pageNumber, limitNumber);

      res.json(alojamientos);

    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const alojamiento = await this.alojamientoService.findById(req.params.id);

      if (!alojamiento) {
        throw new NotFoundError('Alojamiento no encontrado');
      }

      res.json(alojamiento);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const nuevoAlojamiento = await this.alojamientoService.create(req.body);
      res.status(201).json(nuevoAlojamiento);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.alojamientoService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const alojamientoActualizado = await this.alojamientoService.update(req.params.id, req.body);
      res.json(alojamientoActualizado);
    } catch (error) {
      next(error);
    }
  }
}
