import { Alojamiento } from '../../backend/modelo/alojamiento/Alojamiento.js';
import { Direccion } from '../../backend/modelo/alojamiento/Direccion.js';
import { Ciudad } from '../../backend/modelo/alojamiento/Ciudad.js';
import { Pais } from '../../backend/modelo/alojamiento/Pais.js';
import { Foto } from '../../backend/modelo/alojamiento/Foto.js';
import { Moneda } from '../../backend/modelo/enums/Moneda.js';
import { Caracteristica } from '../../backend/modelo/enums/Caracteristica.js';

describe("Alojamiento", () => {
  const mockAtributos = {
    anfitrion: { nombre: "anfitrionTest" },
    nombre: "alojamientoTest",
    descripcion: "descripcionTest",
    precioPorNoche: 100,
    moneda: Moneda.ARS,
    horarioCheckIn: "14:00",
    horarioCheckOut: "10:00",
    direccion: new Direccion(
      "calleTest",
      "123",
      new Ciudad("ciudadTest", new Pais("paisTest")),
      -34.6,
      -58.3
    ),
    cantHuespedesMax: 4,
    caracteristicas: [Caracteristica.WIFI, Caracteristica.PISCINA],
    fotos: [
      new Foto("foto1", "foto1.jpg"),
      new Foto("foto2", "foto2.jpg")
    ],
    reservas: []
  };

  function tieneDatosCorrectos(alojamiento) {
    expect(alojamiento.nombre).toBe("alojamientoTest");
    expect(alojamiento.descripcion).toBe("descripcionTest");
    expect(alojamiento.precioPorNoche).toBe(100);
    expect(alojamiento.moneda).toBe(Moneda.ARS);
    expect(alojamiento.direccion.ciudad.nombre).toBe("ciudadTest");
    expect(alojamiento.direccion.ciudad.pais.nombre).toBe("paisTest");
    expect(alojamiento.caracteristicas).toContain(Caracteristica.WIFI);
    expect(alojamiento.fotos.length).toBe(2);
  }

  // TESTEO DE MÉTODOS -------------------------

  test("se crea correctamente con todos sus datos", () => {
    const alojamiento = new Alojamiento(mockAtributos);
    tieneDatosCorrectos(alojamiento);
  });

  test("puede alojar si la cantidad es menor o igual a la máxima", () => {
    const alojamiento = new Alojamiento(mockAtributos);
    expect(alojamiento.puedenAlojarse(4)).toBe(true);
    expect(alojamiento.puedenAlojarse(5)).toBe(false);
  });

  test("reconoce si tiene una característica", () => {
    const alojamiento = new Alojamiento(mockAtributos);
    expect(alojamiento.tenesCaracteristica(Caracteristica.WIFI)).toBe(true);
    expect(alojamiento.tenesCaracteristica(Caracteristica.ESTACIONAMIENTO)).toBe(false);
  });

  test("verifica si el precio está dentro del rango", () => {
    const alojamiento = new Alojamiento(mockAtributos);
    expect(alojamiento.tuPrecioEstaDentroDe(50, 150)).toBe(true);
    expect(alojamiento.tuPrecioEstaDentroDe(101, 200)).toBe(false);
  });

  test("devuelve disponible si no hay reservas solapadas", () => {
    const alojamiento = new Alojamiento({
      ...mockAtributos,
      reservas: [
        { rangoFechas: { fechaInicio: new Date("2025-06-01"), fechaFin: new Date("2025-06-05") } }
      ]
    });

    const rango = { fechaInicio: new Date("2025-06-10"), fechaFin: new Date("2025-06-15") };
    expect(alojamiento.estaDisponibleEn(rango)).toBe(true);
  });

  test("devuelve no disponible si hay reservas solapadas", () => {
    const alojamiento = new Alojamiento({
      ...mockAtributos,
      reservas: [
        { rangoFechas: { fechaInicio: new Date("2025-06-01"), fechaFin: new Date("2025-06-10") } }
      ]
    });

    const rango = { fechaInicio: new Date("2025-06-08"), fechaFin: new Date("2025-06-12") };
    expect(alojamiento.estaDisponibleEn(rango)).toBe(false);
  });



  
  // TESTEO DE CONSTRUCCIÓN / ESTRUCTURA -------------------------

  test("inicializa arrays vacíos si no se pasan características, fotos o reservas", () => {
    const alojamiento = new Alojamiento({
      anfitrion: {},
      nombre: "sinOpcionales",
      descripcion: "sinOpcionales",
      precioPorNoche: 200,
      moneda: Moneda.USD,
      horarioCheckIn: "15:00",
      horarioCheckOut: "11:00",
      direccion: new Direccion("calle", "456", new Ciudad("ciudad", new Pais("pais")), 0, 0),
      cantHuespedesMax: 2
    });

    expect(alojamiento.caracteristicas).toEqual([]);
    expect(alojamiento.fotos).toEqual([]);
    expect(alojamiento.reservas).toEqual([]);
  });

  test("la dirección está correctamente anidada", () => {
    const direccion = new Direccion("una calle", "789", new Ciudad("una ciudad", new Pais("un país")), 0, 0);
    const alojamiento = new Alojamiento({ ...mockAtributos, direccion });

    expect(alojamiento.direccion).toBeInstanceOf(Direccion);
    expect(alojamiento.direccion.ciudad).toBeInstanceOf(Ciudad);
    expect(alojamiento.direccion.ciudad.pais).toBeInstanceOf(Pais);
  });

  test("el precio por noche es un número positivo", () => {
    const alojamiento = new Alojamiento(mockAtributos);
    expect(typeof alojamiento.precioPorNoche).toBe("number");
    expect(alojamiento.precioPorNoche).toBeGreaterThan(0);
  });

  test("cumple múltiples condiciones de búsqueda", () => {
    const alojamiento = new Alojamiento(mockAtributos);

    const matchPrecio = alojamiento.tuPrecioEstaDentroDe(80, 120);
    const matchCaracteristica = alojamiento.tenesCaracteristica(Caracteristica.WIFI);
    const matchCapacidad = alojamiento.puedenAlojarse(2);

    expect(matchPrecio && matchCaracteristica && matchCapacidad).toBe(true);
  });
});
