import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "localhost:3000";

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
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: filtros
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};