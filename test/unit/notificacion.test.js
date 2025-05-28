import { Notificacion } from '../../backend/modelo/Notificacion.js'
import { EstadoNotificacion } from '../../backend/modelo/enums/EstadoNotificacion';

describe("Notificacion", () => {
    const mockReserva = {
        fechaAlta : new Date(),
        huespedReservador : {
            nombre : "huespedTest"
        },
        cantidadHuespedes: 4,
        alojamiento: {
            nombre: "alojamientoTest",
            anfitrion: {
                nombre: "anfitrionTest"
            }
        },
        rangoFechas : {
            fechaInicio: "fechaInicioTest",
            fechaFin: "fechaFinTest"
        },
        precioPorNoche: 100,
        historialDeCambios: []
    }

    function contieneAlojamientoYFechas(notificacion) {
        expect(notificacion.mensaje).toContain("alojamientoTest");
        expect(notificacion.mensaje).toContain("fechaInicioTest");
        expect(notificacion.mensaje).toContain("fechaFinTest");
    }

    function seCreaConEstadoNoLeida(notificacion) {
        expect(notificacion.estado).toBe(EstadoNotificacion.PENDIENTE)
    }
    
    test("Crea notificacion de reserva creada", () => {
        const notificacion = Notificacion.crearNotificacionReservaCreada(mockReserva);
        
        seCreaConEstadoNoLeida(notificacion);
        expect(notificacion.mensaje).toContain("Nueva reserva para");
        contieneAlojamientoYFechas(notificacion);
        expect(notificacion.mensaje).toContain("huespedTest");
    })

    test("Crea notificacion de reserva aceptada", () => {
        const notificacion = Notificacion.crearNotificacionReservaAceptada(mockReserva);
        
        seCreaConEstadoNoLeida(notificacion);
        expect(notificacion.mensaje).toContain("fue aceptada");
        contieneAlojamientoYFechas(notificacion);
        expect(notificacion.mensaje).toContain("anfitrionTest");
    })

    test("Crea notificacion de reserva cancelada", () => {
        const notificacion = Notificacion.crearNotificacionReservaCancelada(mockReserva);
        
        seCreaConEstadoNoLeida(notificacion);
        expect(notificacion.mensaje).toContain("fue cancelada");
        contieneAlojamientoYFechas(notificacion);
        expect(notificacion.mensaje).toContain("huespedTest");
    })
})