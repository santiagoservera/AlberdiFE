import api from "./api";

const ordenesService = {
  // Obtener todas las órdenes
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/ordenes", { params });
      return response.data;
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      throw error;
    }
  },

  // Obtener una orden por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/ordenes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener orden con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva orden
  create: async (ordenData) => {
    try {
      const response = await api.post("/ordenes", ordenData);
      return response.data;
    } catch (error) {
      console.error("Error al crear orden:", error);
      throw error;
    }
  },

  // Actualizar una orden existente
  update: async (id, ordenData) => {
    try {
      const response = await api.put(`/ordenes/${id}`, ordenData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar orden con ID ${id}:`, error);
      throw error;
    }
  },

  // Cambiar el estado de una orden
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/ordenes/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar estado de orden con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una orden
  delete: async (id) => {
    try {
      const response = await api.delete(`/ordenes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar orden con ID ${id}:`, error);
      throw error;
    }
  },
};

export default ordenesService;
