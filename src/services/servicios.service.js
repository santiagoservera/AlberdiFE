import api from "./api";

const serviciosService = {
  // Obtener todos los servicios
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/servicios", { params });
      return response;
    } catch (error) {
      console.error("Error al obtener servicios:", error);
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
      console.error(`Error al obtener servicio con ID ${id}:`, error);
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
      console.error("Error al crear servicio:", error.response?.data || error);
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

      // Para PUT con FormData, es posible que necesitemos añadir el método _method
      if (!servicioData.has("_method")) {
        servicioData.append("_method", "PUT");
      }

      // Log para depuración
      console.log("Datos enviados para actualizar servicio:");
      for (const [key, value] of servicioData.entries()) {
        if (key === "imagen") {
          console.log(
            `${key}: [Archivo binario]`,
            value instanceof File ? `(${value.name})` : "No es un archivo"
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Algunos backends Laravel esperan POST con _method=PUT en lugar de PUT directo para FormData
      const response = await api.post(`/servicios/${id}`, servicioData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Procesar la respuesta para corregir URLs con doble barra
      const data = response.data;
      if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
        data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
      }

      return data;
    } catch (error) {
      console.error(
        `Error al actualizar servicio ${id}:`,
        error.response?.data || error
      );
      throw error;
    }
  },

  // Eliminar un servicio
  delete: async (id) => {
    try {
      const response = await api.delete(`/servicios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar servicio con ID ${id}:`, error);
      throw error;
    }
  },
};

export default serviciosService;
