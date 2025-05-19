import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// Crear una instancia base de axios
const api = axios.create({
  baseURL: "https://alberdiservicios.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (Unauthorized), cerrar sesión
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
      // Opcional: redirigir a la página de login
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
