import api from "./api";

const subcategoriasService = {
  // Obtener todas las subcategorías
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/subcategorias", { params });
      return response.data;
    } catch (error) {
      console.error("Error al obtener subcategorías:", error);
      throw error;
    }
  },

  // Obtener subcategorías por categoría
  getByCategoria: async (categoriaId) => {
    try {
      const response = await api.get(
        `/categorias/${categoriaId}/subcategorias`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error al obtener subcategorías de categoría ${categoriaId}:`,
        error
      );
      throw error;
    }
  },

  // Obtener una subcategoría por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/subcategorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener subcategoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva subcategoría
  create: async (subcategoriaData) => {
    try {
      const response = await api.post("/subcategorias", subcategoriaData);
      return response.data;
    } catch (error) {
      console.error("Error al crear subcategoría:", error);
      throw error;
    }
  },

  // Actualizar una subcategoría existente
  update: async (id, subcategoriaData) => {
    try {
      const response = await api.put(`/subcategorias/${id}`, subcategoriaData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar subcategoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una subcategoría
  delete: async (id) => {
    try {
      const response = await api.delete(`/subcategorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar subcategoría con ID ${id}:`, error);
      throw error;
    }
  },
};

export default subcategoriasService;
