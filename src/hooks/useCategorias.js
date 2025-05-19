"use client";

import { useState, useEffect, useCallback } from "react";
import { categoriasService } from "../services";

const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginacion, setPaginacion] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 10,
  });

  // Cargar todas las categorías
  const fetchCategorias = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriasService.getAll(params);

      // Extraer las categorías del objeto paginado
      const categoriasData = response.data?.data || [];
      setCategorias(categoriasData);

      // Guardar información de paginación
      if (response.data) {
        setPaginacion({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          total: response.data.total,
          perPage: response.data.per_page,
        });
      }

      return categoriasData;
    } catch (err) {
      setError(err.message || "Error al cargar categorías");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener una categoría por ID
  const getCategoria = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriasService.getById(id);
      return data;
    } catch (err) {
      setError(err.message || `Error al obtener categoría con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear una nueva categoría
  const createCategoria = useCallback(async (categoriaData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriasService.create(categoriaData);
      setCategorias((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message || "Error al crear categoría");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar una categoría
  const updateCategoria = useCallback(async (id, categoriaData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriasService.update(id, categoriaData);
      setCategorias((prev) =>
        prev.map((categoria) => (categoria.id === id ? data : categoria))
      );
      return data;
    } catch (err) {
      setError(err.message || `Error al actualizar categoría con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar una categoría
  const deleteCategoria = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await categoriasService.delete(id);
      setCategorias((prev) => prev.filter((categoria) => categoria.id !== id));
      return true;
    } catch (err) {
      setError(err.message || `Error al eliminar categoría con ID ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return {
    categorias,
    loading,
    error,
    paginacion,
    fetchCategorias,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
  };
};

export default useCategorias;
