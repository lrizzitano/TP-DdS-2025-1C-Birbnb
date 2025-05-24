// backend/services/alojamientoService.js
export class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async listarAlojamientos(filtros) {
    return await this.alojamientoRepository.findByFilters(filtros);
  }

  async crearAlojamiento(alojamiento) {
    return await this.alojamientoRepository.save(alojamiento);
  }
}
