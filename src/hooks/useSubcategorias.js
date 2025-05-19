import { useState, useCallback } from "react";
import { subcategoriasService } from "../services";

const useSubcategorias = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Crear una nueva subcategoría
  const createSubcategoria = useCallback(async (subcategoriaData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await subcategoriasService.create(subcategoriaData);
      return data;
    } catch (err) {
      console.error("Error al crear subcategoría:", err);
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
      return data;
    } catch (err) {
      console.error(`Error al actualizar subcategoría con ID ${id}:`, err);
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
      return true;
    } catch (err) {
      console.error(`Error al eliminar subcategoría con ID ${id}:`, err);
      setError(err.message || `Error al eliminar subcategoría con ID ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createSubcategoria,
    updateSubcategoria,
    deleteSubcategoria,
  };
};

export default useSubcategorias;
