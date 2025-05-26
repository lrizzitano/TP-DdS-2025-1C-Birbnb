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
}
