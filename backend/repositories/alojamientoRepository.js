// backend/repositories/alojamientoRepository.js
import { readFile, writeFile } from 'fs/promises';
import path from 'node:path';
import { Alojamiento } from '../modelo/alojamiento/Alojamiento.js';

const rutaArchivo = path.join('backend', 'data', 'alojamientos.json');

export class AlojamientoRepository {
  async findAll() {
    const data = await readFile(rutaArchivo, 'utf-8');
    const dataParseada = JSON.parse(data);
    return dataParseada.map(obj => new Alojamiento(obj));
  }

  async save(alojamiento) {
    const alojamientos = await this.findAll();
    alojamientos.push(alojamiento);
    await writeFile(
      rutaArchivo,
      JSON.stringify(alojamientos, null, 2)
    );
    return alojamiento;
  }

  async findByFilters({ ubicacion, precioMin, precioMax, capacidad, caracteristicas }) {
    const alojamientos = await this.findAll();
    return alojamientos.filter(a => {
      const matchUbicacion = !ubicacion || a.direccion?.toLowerCase().includes(ubicacion.toLowerCase());
      const matchPrecio = (!precioMin || a.tuPrecioEstaDentroDe(precioMin, Infinity)) &&
                          (!precioMax || a.tuPrecioEstaDentroDe(-Infinity, precioMax));
      const matchCapacidad = !capacidad || a.puedenAlojarse(capacidad);
      const matchCaracteristicas = !caracteristicas || caracteristicas.every(c => a.tenesCaracteristica(c));
      return matchUbicacion && matchPrecio && matchCapacidad && matchCaracteristicas;
    });
  }
}
