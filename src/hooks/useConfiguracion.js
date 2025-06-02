"use client";

import { useState, useEffect, useCallback } from "react";
import useAuthStore from "../store/useAuthStore";

const useConfiguracion = () => {
  const [configuracion, setConfiguracion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtenemos el token del store de Zustand
  const { token } = useAuthStore();

  const API_BASE_URL = "https://alberdiservicios.com/api";

  // Cargar configuración
  const fetchConfiguracion = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Agregar token si está disponible
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/configuracion`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setConfiguracion(data);
      return data;
    } catch (err) {
      console.error("Error al cargar configuración:", err);
      setError(err.message || "Error al cargar configuración");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]); // Añadimos token como dependencia

  // Actualizar configuración
  const updateConfiguracion = useCallback(
    async (configData) => {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          throw new Error(
            "Token de autenticación requerido. Por favor inicia sesión nuevamente."
          );
        }

        console.log("Actualizando con token:", token);

        const response = await fetch(
          `${API_BASE_URL}/configuracion/${configData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: configData.email,
              direccion: configData.direccion,
            }),
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Sesión expirada. Por favor inicia sesión nuevamente."
            );
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setConfiguracion(data);
        return data;
      } catch (err) {
        console.error("Error al actualizar configuración:", err);
        setError(err.message || "Error al actualizar configuración");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  ); // Añadimos token como dependencia

  // Cargar configuración al montar el componente o cuando cambie el token
  useEffect(() => {
    fetchConfiguracion();
  }, [fetchConfiguracion]);

  return {
    configuracion,
    loading,
    error,
    fetchConfiguracion,
    updateConfiguracion,
  };
};

export default useConfiguracion;
