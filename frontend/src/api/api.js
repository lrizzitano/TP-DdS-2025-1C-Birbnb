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
  try {
    const response = await axios.get(`${API_BASE_URL}/alojamientos`, {
      params: filtros
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching alojamientos:", error);
    throw error;
  }
};