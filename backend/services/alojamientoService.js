
export class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async findAll(filters = {}) {
    const alojamientos = await this.alojamientoRepository.findAll(filters);
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
