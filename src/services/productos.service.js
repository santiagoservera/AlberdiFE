import api from "./api";
import useAuthStore from "../store/useAuthStore";

const productosService = {
  // Obtener todos los productos
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/productos", { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un producto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
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

  // Actualizar un producto existente
  update: async (id, productoData) => {
    try {
      // Verificar que productoData sea FormData
      if (!(productoData instanceof FormData)) {
        throw new Error("Los datos del producto deben enviarse como FormData");
      }

      // Obtener el token directamente del store de Zustand
      const token = useAuthStore.getState().token;

      // Verificar que tenemos un token
      if (!token) {
        throw new Error(
          "No se encontró token de autenticación para actualizar el producto"
        );
      }

      // Crear un nuevo FormData para asegurarnos de que está limpio
      const formDataToSend = new FormData();

      // Copiar todos los datos del FormData original
      for (const [key, value] of productoData.entries()) {
        formDataToSend.append(key, value);
      }

      // Realizar la solicitud
      const response = await api.post(
        `/productos/${id}?_method=patch`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // Eliminar un producto
  delete: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productosService;
