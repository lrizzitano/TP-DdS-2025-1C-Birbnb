
export class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

async findAll(filtrosCrudos = {}) {
  const filtrosMongo = {};

  if (filtrosCrudos.ubicacion) {
    filtrosMongo["direccion.ciudad.nombre"] = {
      $regex: filtrosCrudos.ubicacion,
      $options: "i"
    };
  }

  if (filtrosCrudos.precioMin || filtrosCrudos.precioMax) {
    filtrosMongo.precioBase = {};
    if (filtrosCrudos.precioMin) filtrosMongo.precioBase.$gte = Number(filtrosCrudos.precioMin);
    if (filtrosCrudos.precioMax) filtrosMongo.precioBase.$lte = Number(filtrosCrudos.precioMax);
  }

  if (filtrosCrudos.capacidad) {
    filtrosMongo.capacidad = { $gte: Number(filtrosCrudos.capacidad) };
  }

  if (filtrosCrudos.caracteristicas) {
    const caracteristicas = Array.isArray(filtrosCrudos.caracteristicas)
      ? filtrosCrudos.caracteristicas
      : [filtrosCrudos.caracteristicas];

    filtrosMongo.caracteristicas = { $all: caracteristicas };
  }

  const alojamientos = await this.alojamientoRepository.findByFilters(filtrosMongo);
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
    if (!alojamiento) return null;

    return {
      id: alojamiento.id,
      nombre: alojamiento.nombre,
      direccion: alojamiento.direccion,
      precioBase: alojamiento.precioBase,
      capacidad: alojamiento.capacidad,
      caracteristicas: alojamiento.caracteristicas,
    };
  }
}
