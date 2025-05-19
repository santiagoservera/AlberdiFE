import api from "./api";

const productosService = {
  // Obtener todos los productos
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/productos", { params });
      return response;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  // Obtener un producto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo producto
  create: async (productoData) => {
    try {
      // Verificar que productoData sea FormData
      if (!(productoData instanceof FormData)) {
        throw new Error("Los datos del producto deben enviarse como FormData");
      }

      const response = await api.post("/productos", productoData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Respuesta del servidor al crear producto:", response);

      // Procesar la respuesta para corregir URLs con doble barra
      const data = response.data;
      if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
        data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
      }

      return data;
    } catch (error) {
      console.error("Error al crear producto:", error.response?.data || error);
      throw error;
    }
  },

  // Actualizar un producto existente
  update: async (id, productoData) => {
    try {
      // Verificar que productoData sea FormData
      if (!(productoData instanceof FormData)) {
        throw new Error("Los datos del producto deben enviarse como FormData");
      }

      // Para PUT con FormData, es posible que necesitemos añadir el método _method
      if (!productoData.has("_method")) {
        productoData.append("_method", "PUT");
      }

      // Log para depuración
      console.log("Datos enviados para actualizar producto:");
      for (const [key, value] of productoData.entries()) {
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
      const response = await api.post(`/productos/${id}`, productoData, {
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
        `Error al actualizar producto ${id}:`,
        error.response?.data || error
      );
      throw error;
    }
  },

  // Eliminar un producto
  delete: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar producto con ID ${id}:`, error);
      throw error;
    }
  },
};

export default productosService;
