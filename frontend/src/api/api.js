import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4500";

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

  url.searchParams.append("limit", "8");

  // En caso de emergencia rompa el vidrio y descomente la linea
  //console.log("Request completo a backend:", url.toString());

  try {
    const response = await axios.get(url.toString());

    return response.data;
  } catch (error) {
    console.error("Error fetching alojamientos:", error);
    throw error;
  }
};

export const fetchAlojamiento = async (id) => {
  const url = new URL(`${API_BASE_URL}/alojamientos`);
  try {
    const response = await axios.get(`${url.toString()}/${id}`);
    console.log("Request completo a backend:", url.toString(), response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching alojamientos:", error);
    throw error;
  }
};

export const fetchReservasDeUsuarioBackend = async (id) => {
  const url = new URL(`${API_BASE_URL}/reservas`);
  url.searchParams.append("id", id);

  try {
    const response = await axios.get(url.toString());
    console.log("Request completo a backend:", url.toString(), response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservas:", error);
    throw error;
  }
}

export const fetchNotificacionesDeUsuarioBackend = async (id) => {
  const url = new URL(`${API_BASE_URL}/notificaciones`);
  url.searchParams.append("destinatario", id);

  try {
    const response = await axios.get(url.toString());
    console.log("Request completo a backend:", url.toString(), response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching notificaciones:", error);
    throw error;
  }
};

export const MarcarComoLeidaBackend = async (id) => {
  const url = `${API_BASE_URL}/notificaciones/${id}`;
  try {
    const response = await axios.patch(url);
    console.log("Request completo a backend:", url, response.data);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};


export const crearReservaBackend = async (datosReserva) => {
  const url = `${API_BASE_URL}/reservas`;
  try {
    const response = await axios.post(url, datosReserva);
    console.log("Reserva creada:", response.data);
    return response.data;
  } catch (error) {
  alert("Error al crear la reserva ❌\n" + (error.response?.data?.message || error.message));
  console.error("POST falló:", error.response?.data || error);
  return -1
  }
};

export const aceptarReservaBackend = async (idReserva) => {
  const url = `${API_BASE_URL}/reservas/${idReserva}`;
  try {
    const response = await axios.patch(url, {
    "estado" : "ACEPTADA"
});
    console.log("Reserva aceptada:", response.data);
    return response.data;
  } catch (error) {
    alert("Error al aceptar la reserva ❌\n" + (error.response?.data?.message || error.message));
    console.error("PATCH falló:", error.response?.data || error);
  }
}

export const cancelarReservaBackend = async (idReserva) => {
  const url = `${API_BASE_URL}/reservas/${idReserva}`;
  try {
    const response = await axios.patch(url, {
    "estado" : "CANCELADA"
});
    console.log("Reserva aceptada:", response.data);
    return response.data;
  } catch (error) {
    alert("Error al aceptar la reserva ❌\n" + (error.response?.data?.message || error.message));
    console.error("PATCH falló:", error.response?.data || error);
  }
}
