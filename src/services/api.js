import axios from "axios";
import useAuthStore from "../store/useAuthStore"; // Ajusta la ruta según tu estructura

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: "https://alberdiservicios.com/api",
  timeout: 10000,
});

// Interceptor para añadir el token de autenticación a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    // Obtener el token del store de Zustand
    const token = useAuthStore.getState().token;

    // Si hay un token, añadirlo a los headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "Token añadido a la solicitud:",
        `Bearer ${token.substring(0, 10)}...`
      );
    } else {
      console.warn("No se encontró token de autenticación");
    }

    // Añadir header Accept para asegurar que recibimos JSON
    config.headers.Accept = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Mostrar información detallada sobre el error
    if (error.response) {
      console.error("Error de respuesta:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
        config: {
          url: error.config.url,
          method: error.config.method,
          headers: error.config.headers,
        },
      });

      // Si recibimos un 401 (Unauthorized), podríamos cerrar la sesión automáticamente
      if (error.response.status === 401) {
        console.warn("Token expirado o inválido. Cerrando sesión...");
        // useAuthStore.getState().logout() // Descomentar si quieres cerrar sesión automáticamente
      }
    } else if (error.request) {
      console.error(
        "Error de solicitud (no se recibió respuesta):",
        error.request
      );
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
