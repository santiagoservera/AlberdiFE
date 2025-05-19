import api from "./api";
import useAuthStore from "../store/useAuthStore";

const serviciosService = {
  // Obtener todos los servicios
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/servicios", { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un servicio por ID
  getById: async (id) => {
    try {
      // Nota: La API no soporta GET para un servicio individual según el error
      // Usamos el endpoint general y filtramos por ID en el cliente
      const response = await api.get(`/servicios`);
      const servicios = response.data?.data?.data || [];
      const servicio = servicios.find((s) => s.id === id);
      return servicio || null;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo servicio
  create: async (servicioData) => {
    try {
      // Verificar que servicioData sea FormData
      if (!(servicioData instanceof FormData)) {
        throw new Error("Los datos del servicio deben enviarse como FormData");
      }

      const response = await api.post("/servicios", servicioData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un servicio existente
  update: async (id, servicioData) => {
    try {
      // Verificar que servicioData sea FormData
      if (!(servicioData instanceof FormData)) {
        throw new Error("Los datos del servicio deben enviarse como FormData");
      }

      // Obtener el token directamente del store de Zustand
      const token = useAuthStore.getState().token;

      // Verificar que tenemos un token
      if (!token) {
        throw new Error(
          "No se encontró token de autenticación para actualizar el servicio"
        );
      }

      // Añadir el método PATCH al FormData (no a la URL)
      servicioData.append("_method", "PATCH");

      // Realizar la solicitud como POST simple
      const response = await api.post(`/servicios/${id}`, servicioData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Procesar la respuesta para corregir URLs con doble barra
      const data = response.data;
      if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
        data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un servicio
  delete: async (id) => {
    try {
      const response = await api.delete(`/servicios/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default serviciosService;
