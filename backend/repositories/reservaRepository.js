// import { readFile, writeFile } from 'fs/promises';
// const rutaArchivo = new URL('../data/reservas.json', import.meta.url);

// export const obtenerReservas = async () => {
//   const data = await readFile(rutaArchivo, 'utf-8');
//   return JSON.parse(data);
// };

// export const guardarReserva = async (reserva) => {
//   const reservas = await obtenerReservas();
//   reservas.push(reserva);
//   await writeFile(rutaArchivo, JSON.stringify(reservas, null, 2));
//   return reserva;
// };

// export const hayConflictoDeFechas = async (alojamientoId, inicio, fin) => {
//   const reservas = await obtenerReservas();
//   return reservas.find(r =>
//     r.alojamiento === alojamientoId &&
//     r.estado !== 'cancelada' &&
//     new Date(r.rangoFechas.fechaInicio) < new Date(fin) &&
//     new Date(r.rangoFechas.fechaFin) > new Date(inicio)
//   );
// };

import { readFile, writeFile } from 'fs/promises';
import path from 'node:path';

const rutaArchivo = path.join('backend', 'data', 'reservas.json');

export class ReservaRepository {
  async findAll() {
    const data = await readFile(rutaArchivo, 'utf-8');
    return JSON.parse(data);
  }

  async save(reserva) {
    const reservas = await this.findAll();
    reservas.push(reserva);
    await writeFile(rutaArchivo, JSON.stringify(reservas, null, 2));
    return reserva;
  }

  async hasConflict(alojamientoId, fechaInicio, fechaFin) {
    const reservas = await this.findAll();
    return reservas.find(r =>
      r.alojamiento === alojamientoId &&
      r.estado !== 'cancelada' &&
      new Date(r.rangoFechas.fechaInicio) < new Date(fechaFin) &&
      new Date(r.rangoFechas.fechaFin) > new Date(fechaInicio) 
    );
  }
}
