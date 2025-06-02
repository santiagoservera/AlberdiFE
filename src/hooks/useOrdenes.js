"use client";

import { useState, useEffect } from "react";
import ordenesService from "../services/ordenes.service";

const useOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]); // Inicializar como array vacío
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener todas las órdenes
  const fetchOrdenes = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🚀 Hook: Ejecutando fetchOrdenes...");
      const response = await ordenesService.getOrdenes();
      console.log("📦 Hook: Respuesta del servicio:", response);

      // Manejar estructura paginada de Laravel
      let ordenesData = [];

      // Verificar la estructura exacta que estamos recibiendo
      console.log("🔍 Hook: Analizando estructura...");
      console.log("🔍 response:", typeof response, response);
      console.log("🔍 response.data:", typeof response?.data, response?.data);
      console.log(
        "🔍 response.data.data:",
        typeof response?.data?.data,
        response?.data?.data
      );

      // Verificar si es la estructura de Axios con data.data.data (Laravel paginado)
      if (
        response?.data?.data?.data &&
        Array.isArray(response.data.data.data)
      ) {
        ordenesData = response.data.data.data;
        console.log(
          "✅ Hook: Usando estructura Axios + Laravel paginada (data.data.data)"
        );
      }
      // Verificar si es la estructura directa data.data (Laravel paginado)
      else if (response?.data?.data && Array.isArray(response.data.data)) {
        ordenesData = response.data.data;
        console.log("✅ Hook: Usando estructura Laravel paginada (data.data)");
      }
      // Verificar si es la estructura directa data (array directo)
      else if (response?.data && Array.isArray(response.data)) {
        ordenesData = response.data;
        console.log("✅ Hook: Usando array directo en data");
      }
      // Verificar si es un array directo
      else if (Array.isArray(response)) {
        ordenesData = response;
        console.log("✅ Hook: Usando respuesta directa");
      }
      // Si no coincide con ninguna estructura conocida
      else {
        console.log("❌ Hook: Estructura de respuesta no reconocida:");
        console.log("❌ response:", response);
        console.log("❌ response.data:", response?.data);
        console.log("❌ response.data.data:", response?.data?.data);

        // Intentar extraer manualmente
        if (response?.data?.data?.current_page && response?.data?.data?.data) {
          ordenesData = response.data.data.data;
          console.log("🔧 Hook: Extracción manual exitosa");
        } else {
          ordenesData = [];
        }
      }

      console.log("📊 Hook: Órdenes extraídas:", ordenesData);
      console.log("🔢 Hook: Cantidad de órdenes:", ordenesData.length);
      console.log("🎯 Hook: Estableciendo órdenes en estado:", ordenesData);

      setOrdenes(ordenesData);
    } catch (err) {
      console.error("❌ Hook: Error al obtener órdenes:", err);
      setError(err.message || "Error al cargar las órdenes");
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva orden
  const createOrden = async (ordenData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("🚀 Hook: Creando orden con datos:", ordenData);
      const response = await ordenesService.createOrden(ordenData);
      console.log("📦 Hook: Respuesta de creación de orden:", response);

      if (response) {
        // Agregar la nueva orden al estado de manera segura
        setOrdenes((prev) => {
          // Asegurar que prev sea un array
          const currentOrdenes = Array.isArray(prev) ? prev : [];
          return [response, ...currentOrdenes];
        });
        return response;
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (err) {
      console.error("❌ Hook: Error al crear orden:", err);
      setError(err.message || "Error al crear la orden");
      throw err; // Re-lanzar el error para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el estado de una orden
  const updateOrdenStatus = async (ordenId, nuevoEstado) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ordenesService.updateOrdenStatus(
        ordenId,
        nuevoEstado
      );
      console.log("📦 Hook: Estado de orden actualizado:", response);

      if (response) {
        // Actualizar la orden en el estado de manera segura
        setOrdenes((prev) => {
          // Asegurar que prev sea un array
          const currentOrdenes = Array.isArray(prev) ? prev : [];
          return currentOrdenes.map((orden) =>
            orden.id === ordenId ? { ...orden, estado: nuevoEstado } : orden
          );
        });
        return response;
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (err) {
      console.error("❌ Hook: Error al actualizar estado de orden:", err);
      setError(err.message || "Error al actualizar el estado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener una orden específica
  const getOrden = async (ordenId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ordenesService.getOrden(ordenId);
      console.log("📦 Hook: Orden obtenida:", response);
      return response;
    } catch (err) {
      console.error("❌ Hook: Error al obtener orden:", err);
      setError(err.message || "Error al cargar la orden");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una orden
  const deleteOrden = async (ordenId) => {
    setLoading(true);
    setError(null);
    try {
      await ordenesService.deleteOrden(ordenId);

      // Remover la orden del estado de manera segura
      setOrdenes((prev) => {
        // Asegurar que prev sea un array
        const currentOrdenes = Array.isArray(prev) ? prev : [];
        return currentOrdenes.filter((orden) => orden.id !== ordenId);
      });

      console.log("✅ Hook: Orden eliminada exitosamente");
    } catch (err) {
      console.error("❌ Hook: Error al eliminar orden:", err);
      setError(err.message || "Error al eliminar la orden");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar órdenes al montar el componente (comentado para evitar errores en desarrollo)
  useEffect(() => {
    // Solo cargar si hay una configuración de API
    // fetchOrdenes()
  }, []);

  // Función para limpiar errores
  const clearError = () => {
    setError(null);
  };

  // Función para resetear el estado
  const resetState = () => {
    setOrdenes([]);
    setError(null);
    setLoading(false);
  };

  return {
    ordenes: Array.isArray(ordenes) ? ordenes : [],
    loading,
    error,
    fetchOrdenes,
    createOrden,
    updateOrdenStatus,
    getOrden,
    deleteOrden,
    clearError,
    resetState,
  };
};

export default useOrdenes;
