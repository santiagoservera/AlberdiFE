import api from "./api";

const ordenesService = {
  // Obtener todas las órdenes
  getOrdenes: async (params = {}) => {
    try {
      console.log("🔄 Llamando a API /ordenes con params:", params);
      const response = await api.get("/ordenes", { params });

      console.log("📦 Respuesta completa del API:", response);
      console.log("📊 Status:", response.status);
      console.log("📋 Data:", response.data);

      // Retornar la respuesta completa para que el hook pueda procesarla
      return response;
    } catch (error) {
      console.error("❌ Error en ordenesService.getOrdenes:", error);
      throw error;
    }
  },

  // Obtener una orden por ID
  getOrden: async (id) => {
    try {
      console.log("🔄 Obteniendo orden por ID:", id);
      const response = await api.get(`/ordenes/${id}`);
      console.log("📦 Respuesta getOrden:", response);
      return response.data;
    } catch (error) {
      console.error("❌ Error en getOrden:", error);
      throw error;
    }
  },

  // Crear una nueva orden
  createOrden: async (ordenData) => {
    try {
      console.log("🔄 Creando orden con datos:", ordenData);

      // Validar datos requeridos
      if (!ordenData.nombre || !ordenData.telefono) {
        throw new Error("Nombre y teléfono son requeridos");
      }

      const response = await api.post("/ordenes", ordenData);
      console.log("📦 Respuesta de createOrden:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en createOrden:", error);
      throw error;
    }
  },

  updateOrdenStatus: async (ordenId, nuevoEstado) => {
    try {
      console.log("🔄 Actualizando estado de orden:", ordenId, nuevoEstado);
      const response = await api.put(`/ordenes/${ordenId}`, {
        estado: nuevoEstado,
      });
      console.log("📦 Respuesta de updateOrdenStatus:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en updateOrdenStatus:", error);
      throw error;
    }
  },

  updateOrden: async (id, ordenData) => {
    try {
      console.log("🔄 Actualizando orden completa:", id, ordenData);
      const response = await api.put(`/ordenes/${id}`, ordenData);
      console.log("📦 Respuesta de updateOrden:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en updateOrden:", error);
      throw error;
    }
  },

  // Eliminar una orden
  deleteOrden: async (id) => {
    try {
      console.log("🔄 Eliminando orden:", id);
      const response = await api.delete(`/ordenes/${id}`);
      console.log("📦 Respuesta de deleteOrden:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en deleteOrden:", error);
      throw error;
    }
  },

  // Obtener órdenes por estado
  getOrdenesByEstado: async (estado) => {
    try {
      console.log("🔄 Obteniendo órdenes por estado:", estado);
      const response = await api.get(`/ordenes?estado=${estado}`);
      console.log("📦 Respuesta de getOrdenesByEstado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en getOrdenesByEstado:", error);
      throw error;
    }
  },

  // Obtener estadísticas de órdenes
  getOrdenesStats: async () => {
    try {
      console.log("🔄 Obteniendo estadísticas de órdenes");
      const response = await api.get("/ordenes/stats");
      console.log("📦 Respuesta de getOrdenesStats:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en getOrdenesStats:", error);
      throw error;
    }
  },
};

export default ordenesService;
