import api from "./api";

const categoriasService = {
  // Obtener todas las categorías
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/categorias", { params });
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener categoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva categoría
  create: async (categoriaData) => {
    try {
      const response = await api.post("/categorias", categoriaData);
      return response.data;
    } catch (error) {
      console.error("Error al crear categoría:", error);
      throw error;
    }
  },

  // Actualizar una categoría existente
  update: async (id, categoriaData) => {
    try {
      const response = await api.put(`/categorias/${id}`, categoriaData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar categoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una categoría
  delete: async (id) => {
    try {
      const response = await api.delete(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error);
      throw error;
    }
  },
};

export default categoriasService;
