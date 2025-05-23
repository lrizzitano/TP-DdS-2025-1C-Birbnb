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



  async cancelarReserva(id, motivo = null) {
    const reservas = await this.reservaRepository.findAll();
    const reserva = reservas.find(r => r.id === id);

    if (!reserva) {
      throw new Error("Reserva no encontrada");
    }

    const hoy = new Date();
    const fechaInicio = new Date(reserva.rangoFechas.fechaInicio);

    if (hoy >= fechaInicio) {
      throw new Error("No se puede cancelar una reserva ya iniciada o pasada.");
    }

    reserva.estado = "cancelada";
    if (motivo) {
      reserva.motivoCancelacion = motivo;
    }

    return await this.reservaRepository.update(reserva);
  }



    async update(id, nuevosDatos) {
    const reservas = await this.reservaRepository.findAll();
    const reserva = reservas.find(r => r.id === id);

    if (!reserva) {
      throw new Error("Reserva no encontrada");
    }

    const hoy = new Date();
    const fechaInicioActual = new Date(reserva.rangoFechas.fechaInicio);
    if (hoy >= fechaInicioActual) {
      throw new Error("No se puede modificar una reserva que ya comenzó o terminó.");
    }

    // Si se modifican las fechas, validar que no haya conflicto(achequear esto si esta bien la logica)
    const seModificaronFechas =
      nuevosDatos.rangoFechas &&
      (nuevosDatos.rangoFechas.fechaInicio !== reserva.rangoFechas.fechaInicio ||
      nuevosDatos.rangoFechas.fechaFin !== reserva.rangoFechas.fechaFin);

    if (seModificaronFechas) {
      const conflicto = await this.reservaRepository.hasConflict(
        reserva.alojamiento,
        nuevosDatos.rangoFechas.fechaInicio,
        nuevosDatos.rangoFechas.fechaFin
      );

      // Validamos que no haya superposición con otras reservas (excepto consigo misma)
      if (conflicto && conflicto.id !== id) {
        throw new Error("El alojamiento no está disponible en las nuevas fechas.");
      }

      reserva.rangoFechas = nuevosDatos.rangoFechas;
    }

    // Si quisieras permitir otros cambios, agregalos aquí (usuario, etc.)

    return await this.reservaRepository.update(reserva);
  }

    async obtenerReservasPorUsuario(email) {
    const reservas = await this.reservaRepository.findAll();

    return reservas.filter(r =>
      r.usuario === email || r.huesped === email
    );
  }

}
