import { Reserva } from "../modelo/reserva/Reserva.js"

export class ReservaService {
  constructor(reservaRepository, alojamientoRepository, usuarioRepository) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.usuarioRepository = usuarioRepository;
  }


  async crearReserva(datos) {
    const [usuario, alojamiento] = await Promise.all([
      this.usuarioRepository.findById(datos.usuarioId),
      this.alojamientoRepository.findById(datos.alojamientoId)
    ]);
    
    if(!usuario) {
      throw new Error("El usuario que quiere crear la reserva no existe");
    }

    if (!alojamiento) {
      throw new Error("El alojamiento sobre el que se quiere crear la reserva no existe");
    }
    
    if (!alojamiento.puedenAlojarse(datos.cantidadHuespedes)) {
      throw new Error("El alojamiento no permite esa cantidad de huespedes");
    }

    const reserva = new Reserva(
      datos.rangoFechas,
      datos.cantidadHuespedes,
      usuario,
      alojamiento
    );
    // TODO, se podra usar el metodo alojamiento.estaDisponibleEn ? el tema es 
    // que la lista de reservas no esta persistida, se podra hacer?
    const conflicto = this.reservaRepository.estaReservado() 
                                                            
    if (conflicto) {
      throw new Error('El alojamiento no esta disponible en las fechas seleccionadas');
    }

    const reservaGuardada =  await this.reservaRepository.save(reserva);

    // TODO el .toDto, estaria bueno q la clase reserva tenga un metodo
    // para pasarse a dto y podamos usar eso + sumarle el id q me dio mongo
    // que esta metido en el bojeto de reservaGuardada
    return this.toDto(reservaGuardada);
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
