// import {
//   guardarReserva,
//   hayConflictoDeFechas,
//   obtenerReservas
// } from '../repositories/reservaRepository.js';

// export const crearReserva = async (datos) => {
//   const { alojamiento, rangoFechas } = datos;

//   const conflicto = await hayConflictoDeFechas(
//     alojamiento,
//     rangoFechas.fechaInicio,
//     rangoFechas.fechaFin
//   );

//   if (conflicto) {
//     throw new Error('El alojamiento no está disponible en las fechas seleccionadas.');
//   }

//   datos.estado = 'pendiente';
//   datos.id = crypto.randomUUID();
//   return await guardarReserva(datos);
// };

// export const listarReservas = async () => {
//   return await obtenerReservas();
// };

import crypto from 'node:crypto';

export class ReservaService {
  constructor(reservaRepository) {
    this.reservaRepository = reservaRepository;
  }

  async crearReserva(datos) {
    const { alojamiento, rangoFechas } = datos;

    const conflicto = await this.reservaRepository.hasConflict(
      alojamiento,
      rangoFechas.fechaInicio,
      rangoFechas.fechaFin
    );

    if (conflicto) {
      throw new Error('El alojamiento no está disponible en las fechas seleccionadas.');
    }

    datos.estado = 'pendiente';
    datos.id = crypto.randomUUID();
    return await this.reservaRepository.save(datos);
  }

  async listarReservas() {
    return await this.reservaRepository.findAll();
  }
}
