import { Reserva } from '../../backend/modelo/reserva/Reserva.js';
import { RangoFechas } from '../../backend/modelo/reserva/RangoFechas.js';
import { EstadoReserva } from '../../backend/modelo/enums/EstadoReserva.js';

let reservaTest;

describe("Reserva", () => {
    beforeEach(() => {
        const rangoFechas = new RangoFechas(Date("2026-10-20"), Date("2026-10-25"));
        const mockUsuario = {nombre: "userTest"};
        const mockAlojamiento = {nombre: "AlojamientoTest", 
            anfitrion: {nombre: "AnfitrionTest"}}
         
        reservaTest = new Reserva(rangoFechas, 4, mockUsuario, mockAlojamiento)
    })
    
    test("Se crea pendiente", () => {
        expect(reservaTest.estado).toBe(EstadoReserva.PENDIENTE);
    })
    
    test("Se puede aceptar y se registran el cambio", () => {
        reservaTest.aceptar();
        expect(reservaTest.estado).toBe(EstadoReserva.CONFIRMADA);
        expect(reservaTest.historialDeCambios.length).toBe(1);
        expect(reservaTest.historialDeCambios[0].estado).toBe(EstadoReserva.CONFIRMADA)
    })

    test("Se puede cancelar y se registra el cambio", () => {
        const motivoDeCancelacion = "por que me pinto";
        reservaTest.cancelar(motivoDeCancelacion);
        expect(reservaTest.estado).toBe(EstadoReserva.CANCELADA);
        expect(reservaTest.historialDeCambios.length).toBe(1);
        expect(reservaTest.historialDeCambios[0].estado).toBe(EstadoReserva.CANCELADA)
        expect(reservaTest.historialDeCambios[0].motivo).toBe(motivoDeCancelacion)
    })
})
