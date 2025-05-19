"use client";

import { useState, useEffect, useCallback } from "react";
import { subcategoriasService } from "../services";

const useSubcategorias = (categoriaId = null) => {
  const [subcategorias, setSubcategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar subcategorías, opcionalmente filtradas por categoría
  const fetchSubcategorias = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (categoriaId) {
          // Si se proporciona un ID de categoría, obtener subcategorías de esa categoría
          data = await subcategoriasService.getByCategoria(categoriaId);
        } else {
          // Si no, obtener todas las subcategorías
          data = await subcategoriasService.getAll(params);
        }
        setSubcategorias(data);
        return data;
      } catch (err) {
        setError(err.message || "Error al cargar subcategorías");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [categoriaId]
  );

  // Obtener una subcategoría por ID
  const getSubcategoria = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await subcategoriasService.getById(id);
      return data;
    } catch (err) {
      setError(err.message || `Error al obtener subcategoría con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear una nueva subcategoría
  const createSubcategoria = useCallback(async (subcategoriaData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await subcategoriasService.create(subcategoriaData);
      // Asegurarse de que subcategorias es un array antes de usar spread
      setSubcategorias((prev) => {
        if (!Array.isArray(prev)) {
          return [data];
        }
        return [...prev, data];
      });
      return data;
    } catch (err) {
      setError(err.message || "Error al crear subcategoría");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar una subcategoría
  const updateSubcategoria = useCallback(async (id, subcategoriaData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await subcategoriasService.update(id, subcategoriaData);
      setSubcategorias((prev) =>
        prev.map((subcategoria) =>
          subcategoria.id === id ? data : subcategoria
        )
      );
      return data;
    } catch (err) {
      setError(err.message || `Error al actualizar subcategoría con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar una subcategoría
  const deleteSubcategoria = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await subcategoriasService.delete(id);
      setSubcategorias((prev) =>
        prev.filter((subcategoria) => subcategoria.id !== id)
      );
      return true;
    } catch (err) {
      setError(err.message || `Error al eliminar subcategoría con ID ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar subcategorías al montar el componente o cuando cambia el ID de categoría
  useEffect(() => {
    fetchSubcategorias();
  }, [fetchSubcategorias]);

  return {
    subcategorias,
    loading,
    error,
    fetchSubcategorias,
    getSubcategoria,
    createSubcategoria,
    updateSubcategoria,
    deleteSubcategoria,
  };
};

export default useSubcategorias;
