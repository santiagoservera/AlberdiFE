"use client";

import { useState, useEffect, useCallback } from "react";
import { ordenesService } from "../services";

const useOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas las órdenes
  const fetchOrdenes = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordenesService.getAll(params);
      setOrdenes(data);
      return data;
    } catch (err) {
      setError(err.message || "Error al cargar órdenes");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener una orden por ID
  const getOrden = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordenesService.getById(id);
      return data;
    } catch (err) {
      setError(err.message || `Error al obtener orden con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear una nueva orden
  const createOrden = useCallback(async (ordenData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordenesService.create(ordenData);
      setOrdenes((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message || "Error al crear orden");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar una orden
  const updateOrden = useCallback(async (id, ordenData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordenesService.update(id, ordenData);
      setOrdenes((prev) =>
        prev.map((orden) => (orden.id === id ? data : orden))
      );
      return data;
    } catch (err) {
      setError(err.message || `Error al actualizar orden con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar el estado de una orden
  const updateOrdenStatus = useCallback(async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordenesService.updateStatus(id, status);
      setOrdenes((prev) =>
        prev.map((orden) => (orden.id === id ? { ...orden, status } : orden))
      );
      return data;
    } catch (err) {
      setError(
        err.message || `Error al actualizar estado de orden con ID ${id}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar una orden
  const deleteOrden = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ordenesService.delete(id);
      setOrdenes((prev) => prev.filter((orden) => orden.id !== id));
      return true;
    } catch (err) {
      setError(err.message || `Error al eliminar orden con ID ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar órdenes al montar el componente
  useEffect(() => {
    fetchOrdenes();
  }, [fetchOrdenes]);

  return {
    ordenes,
    loading,
    error,
    fetchOrdenes,
    getOrden,
    createOrden,
    updateOrden,
    updateOrdenStatus,
    deleteOrden,
  };
};

export default useOrdenes;
