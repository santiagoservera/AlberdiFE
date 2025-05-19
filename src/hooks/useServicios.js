"use client";

import { useState, useEffect, useCallback } from "react";
import serviciosService from "../services/servicios.service"; // Corregido el nombre del import

const useServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para corregir URLs con doble barra
  const corregirUrlsImagenes = (serviciosData) => {
    if (!Array.isArray(serviciosData)) return serviciosData;

    return serviciosData.map((servicio) => {
      if (
        servicio &&
        servicio.imagenUrl &&
        servicio.imagenUrl.includes("/storage//")
      ) {
        return {
          ...servicio,
          imagenUrl: servicio.imagenUrl.replace("/storage//", "/storage/"),
        };
      }
      return servicio;
    });
  };

  // Cargar todos los servicios
  const fetchServicios = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviciosService.getAll(params);

      // Extraer los datos de la estructura paginada
      let serviciosData = [];

      // Verificar si la respuesta tiene la estructura esperada
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.data
      ) {
        // Estructura: response.data.data.data (estructura paginada)
        serviciosData = response.data.data.data;
      } else if (response && response.data && response.data.data) {
        // Estructura alternativa
        serviciosData = response.data.data;
      } else if (response && response.data) {
        // Estructura simple
        serviciosData = response.data;
      }

      // Corregir URLs con doble barra
      const serviciosCorregidos = corregirUrlsImagenes(serviciosData || []);

      setServicios(serviciosCorregidos);
      return serviciosCorregidos;
    } catch (err) {
      console.error("Error al obtener servicios:", err);
      setError(err.message || "Error al cargar servicios");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener un servicio por ID
  const getServicio = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviciosService.getById(id);

      // Corregir URL con doble barra si es necesario
      if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
        data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
      }

      return data;
    } catch (err) {
      setError(err.message || `Error al obtener servicio con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear un nuevo servicio
  const createServicio = useCallback(
    async (servicioData) => {
      setLoading(true);
      setError(null);
      try {
        // Verificar que servicioData sea FormData
        if (!(servicioData instanceof FormData)) {
          throw new Error(
            "Los datos del servicio deben enviarse como FormData"
          );
        }

        const data = await serviciosService.create(servicioData);

        // Corregir URL con doble barra si es necesario
        if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
          data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
        }

        // Actualizar el estado con el nuevo servicio
        setServicios((prevServicios) => {
          const serviciosArray = Array.isArray(prevServicios)
            ? prevServicios
            : [];
          return [...serviciosArray, data];
        });

        // Recargar todos los servicios para asegurar sincronización
        fetchServicios();

        return data;
      } catch (err) {
        console.error("Error al crear servicio:", err);
        setError(err.message || "Error al crear servicio");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchServicios]
  );

  // Actualizar un servicio
  const updateServicio = useCallback(
    async (id, servicioData) => {
      setLoading(true);
      setError(null);
      try {
        // Verificar que servicioData sea FormData
        if (!(servicioData instanceof FormData)) {
          throw new Error(
            "Los datos del servicio deben enviarse como FormData"
          );
        }

        const data = await serviciosService.update(id, servicioData);

        // Corregir URL con doble barra si es necesario
        if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
          data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
        }

        // Actualizar el estado con el servicio actualizado
        setServicios((prevServicios) => {
          const serviciosArray = Array.isArray(prevServicios)
            ? prevServicios
            : [];
          return serviciosArray.map((servicio) => {
            if (servicio.id === id) {
              // Asegurarse de preservar la estructura correcta y actualizar la imagen si es necesario
              const updatedServicio = {
                ...servicio,
                ...data,
                // Si la API devuelve una nueva ruta de imagen, usarla (ya corregida)
                imagen: data.imagen || servicio.imagen,
                imagenUrl: data.imagenUrl || servicio.imagenUrl,
                // Forzar una actualización de la URL de la imagen con un timestamp
                _imageTimestamp: Date.now(),
              };
              return updatedServicio;
            }
            return servicio;
          });
        });

        // Recargar todos los servicios para asegurar sincronización
        await fetchServicios();

        return data;
      } catch (err) {
        console.error(`Error al actualizar servicio con ID ${id}:`, err);
        setError(err.message || `Error al actualizar servicio con ID ${id}`);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchServicios]
  );

  // Eliminar un servicio
  const deleteServicio = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await serviciosService.delete(id);

      // Actualizar el estado eliminando el servicio
      setServicios((prevServicios) => {
        const serviciosArray = Array.isArray(prevServicios)
          ? prevServicios
          : [];
        return serviciosArray.filter((servicio) => servicio.id !== id);
      });

      return true;
    } catch (err) {
      console.error(`Error al eliminar servicio con ID ${id}:`, err);
      setError(err.message || `Error al eliminar servicio con ID ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar servicios al montar el componente
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  return {
    servicios,
    loading,
    error,
    fetchServicios,
    getServicio,
    createServicio,
    updateServicio,
    deleteServicio,
  };
};

export default useServicios;
