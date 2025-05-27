import { nombreEnum } from "../modelo/enums/nombreEnum.js";
import { Moneda } from "../modelo/enums/Moneda.js";
import { Caracteristica } from "../modelo/enums/Caracteristica.js";


export class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async findAll(filtros = {}) {
    const filtrosDB = {};

    if (filtros.calle) {
      filtrosDB["direccion.calle"] = filtros.calle;
    }

    if (filtros.altura) {
      filtrosDB["direccion.altura"] = filtros.altura;
    }

    if (filtros.ciudad) {
      filtrosDB["direccion.ciudad.nombre"] = filtros.ciudad;
    }

    if (filtros.pais) {
      filtrosDB["direccion.ciudad.pais.nombre"] = filtros.pais;
    }

    if (filtros.lat) {
      filtrosDB["direccion.lat"] = filtros.lat;
    }

    if (filtros.long) {
      filtrosDB["direccion.long"] = filtros.long;
    }

    var alojamientos = await this.alojamientoRepository.findAll(filtrosDB);

    if (filtros.precioMin && filtros.precioMax) {
      alojamientos = alojamientos.filter(a =>
        a.tuPrecioEstaDentroDe(filtros.precioMin, filtros.precioMax));
    }

    if (filtros.cantHuespedes) {
      alojamientos = alojamientos.filter(a =>
        a.puedenAlojarse(filtros.cantHuespedes));
    }

    if (filtros.caracteristicas) {
        alojamientos = alojamientos.filter(a =>
          filtros.caracteristicas.every(caracteristica =>
            a.tenesCaracteristica(caracteristica)));
    }


    return alojamientos.map(a => this.toDTO(a));
  }

  async findById(id) {
    const alojamiento = await this.alojamientoRepository.findById(id);
    return this.toDTO(alojamiento);
  }

  async create(alojamiento) {
    const alojamientoCreado = await this.alojamientoRepository.save(alojamiento);
    return this.toDTO(alojamientoCreado);
  }

  async delete(id) {
    return await this.alojamientoRepository.deleteById(id);
  }

  async update(id, datosActualizados) {
    const actualizado = { ...datosActualizados, id };
    const alojamientoActualizado = await this.alojamientoRepository.save(actualizado);
    return this.toDTO(alojamientoActualizado);
  }

  toDTO(alojamiento) {
    if (!alojamiento) {
      return null;
    }

    return {
      id: alojamiento.id,
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
      caracteristicas: alojamiento.caracteristicas.map(caracteristica =>
        nombreEnum(Caracteristica, caracteristica)),
      fotos: alojamiento.fotos.map(foto => ({
        descripcion: foto.descripcion,
      }))
    }
  }
}
