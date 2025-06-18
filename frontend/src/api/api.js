import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchAlojamientosBackend = async (filtros = {}) => {
  /*
  el objeto filtro debe tener las keys nombradas asi:
      pais
      lat
      long
      precioMin
      precioMax
      cantHuespede
      caracteristicas
      page
      limit
  */

  const url = new URL(`${API_BASE_URL}/alojamientos`);

  Object.keys(filtros).forEach(key => {
    if (key === "caracteristicas" && Array.isArray(filtros[key])) {
      filtros[key].forEach((caract) => {
        url.searchParams.append("caracteristicas", caract);
      });
    } else if (key === "fechaInicio" || key === "fechaFin") {
      url.searchParams.append(key, filtros[key].toISOString().split('T')[0]);
    } else {
      url.searchParams.append(key, filtros[key]);
    }
  });

  // En caso de emergencia rompa el vidrio y descomente la linea
  console.log("Request completo a backend:", url.toString());

  try {
    const response = await axios.get(url.toString());

    return response.data;
  } catch (error) {
    console.error("Error fetching alojamientos:", error);
    throw error;
  }
};