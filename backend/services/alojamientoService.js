import { nombreEnum } from "../modelo/enums/nombreEnum.js";
import { Moneda } from "../modelo/enums/Moneda.js";
import { Caracteristica } from "../modelo/enums/Caracteristica.js";
import { NotFoundError } from "../errors/AppError.js";

export class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async findAll(filtros = {}, page = 1, limit = 10) {
    const filtrosDB = {};

    if (filtros.calle) filtrosDB["direccion.calle"] = filtros.calle;

    if (filtros.altura) filtrosDB["direccion.altura"] = filtros.altura;

    if (filtros.ciudad) filtrosDB["direccion.ciudad.nombre"] = filtros.ciudad;

    if (filtros.pais) filtrosDB["direccion.ciudad.pais.nombre"] = filtros.pais;

    if (filtros.lat) filtrosDB["direccion.lat"] = filtros.lat;

    if (filtros.long) filtrosDB["direccion.long"] = filtros.long;

    if (filtros.precioMin && filtros.precioMax) {
      filtrosDB.precioPorNoche = {
        $gte: filtros.precioMin,
        $lte: filtros.precioMax
      };
    }

    if (filtros.fechaInicio && filtros.fechaFin) {
      filtrosDB["fechaInicioFiltro"] = filtros.fechaInicio;
      filtrosDB["fechaFinFiltro"] = filtros.fechaFin;
    }

    if (filtros.cantHuespedes) {
      filtrosDB.cantHuespedesMax = { $gte: filtros.cantHuespedes };
    }

    if (filtros.caracteristicas && filtros.caracteristicas.length > 0) {
      filtrosDB.caracteristicas = { $all: filtros.caracteristicas };
    }

    let alojamientos = await this.alojamientoRepository.findAll(filtrosDB, page, limit);
    const data = alojamientos.map(a => this.toDTO(a));
    const total = await this.alojamientoRepository.countAll(filtrosDB);
    const totalPages = Math.ceil(total / limit);
    return {
      pagina: page,
      por_pagina: limit,
      total: total,
      paginas_totales: totalPages,
      data: data
    };

  }

  async findById(id) {
    const alojamiento = await this.alojamientoRepository.findById(id);
    if (!alojamiento) {
      throw new NotFoundError(`Alojamiento con ID ${id} no encontrado`);
    }
    return this.toDTO(alojamiento);
  }

  async create(alojamiento) {
    const creado = { ...alojamiento, id: null };
    const alojamientoCreado = await this.alojamientoRepository.save(creado);
    return this.toDTO(alojamientoCreado);
  }

  async delete(id) {
    const eliminado = await this.alojamientoRepository.deleteById(id);
    if (!eliminado) {
      throw new NotFoundError(`Alojamiento con ID ${id} no encontrado`);
    }
    return eliminado;
  }

  async update(id, datosActualizados) {
    const actualizado = { ...datosActualizados, id };
    const alojamientoActualizado = await this.alojamientoRepository.save(actualizado);
    return this.toDTO(alojamientoActualizado);
  }

  toDTO(alojamiento) {
    if (!alojamiento) {
      throw new NotFoundError("Alojamiento no encontrado");
    }

    return {
      id: alojamiento._id,
      anfitrion: {
        id: alojamiento.anfitrion.id,
        nombre: alojamiento.anfitrion.nombre,
        email: alojamiento.anfitrion.email,
      },
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      precioPorNoche: alojamiento.precioPorNoche,
      moneda: nombreEnum(Moneda, alojamiento.moneda),
      horarioCheckIn: alojamiento.horarioCheckIn,
      horarioCheckOut: alojamiento.horarioCheckOut,
      direccion: {
        calle: alojamiento.direccion.calle,
        altura: alojamiento.direccion.altura,
        ciudad: {
          nombre: alojamiento.direccion.ciudad.nombre,
          pais: {
            nombre: alojamiento.direccion.ciudad.pais.nombre,
          },
        },
        latitud: alojamiento.direccion.lat,
        longitud: alojamiento.direccion.long,
      },
      cantHuespedesMax: alojamiento.cantHuespedesMax,
      caracteristicas: alojamiento.caracteristicas ? alojamiento.caracteristicas.map(caracteristica =>
        nombreEnum(Caracteristica, caracteristica)) : [],
      fotos: alojamiento.fotos.map(foto => ({
        descripcion: foto.descripcion,
        path: foto.path
      }))
    }
  }
}
