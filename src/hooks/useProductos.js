"use client";

import { useState, useEffect, useCallback } from "react";
import { productosService } from "../services";

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para corregir URLs con doble barra
  const corregirUrlsImagenes = (productosData) => {
    if (!Array.isArray(productosData)) return productosData;

    return productosData.map((producto) => {
      if (
        producto &&
        producto.imagenUrl &&
        producto.imagenUrl.includes("/storage//")
      ) {
        return {
          ...producto,
          imagenUrl: producto.imagenUrl.replace("/storage//", "/storage/"),
        };
      }
      return producto;
    });
  };

  // Cargar todos los productos
  const fetchProductos = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosService.getAll(params);

      // Extraer los datos de la estructura paginada
      let productosData = [];

      // Verificar si la respuesta tiene la estructura esperada
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.data
      ) {
        // Estructura: response.data.data.data (estructura paginada)
        productosData = response.data.data.data;
      } else if (response && response.data && response.data.data) {
        // Estructura alternativa
        productosData = response.data.data;
      } else if (response && response.data) {
        // Estructura simple
        productosData = response.data;
      }

      // Corregir URLs con doble barra
      const productosCorregidos = corregirUrlsImagenes(productosData || []);

      setProductos(productosCorregidos);
      return response;
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message || "Error al cargar productos");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener un producto por ID
  const getProducto = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productosService.getById(id);

      // Corregir URL con doble barra si es necesario
      if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
        data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
      }

      return data;
    } catch (err) {
      setError(err.message || `Error al obtener producto con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear un nuevo producto
  const createProducto = useCallback(
    async (productoData) => {
      setLoading(true);
      setError(null);
      try {
        // Verificar que productoData sea FormData
        if (!(productoData instanceof FormData)) {
          throw new Error(
            "Los datos del producto deben enviarse como FormData"
          );
        }

        const data = await productosService.create(productoData);
        console.log("Respuesta de creación de producto:", data);

        // Corregir URL con doble barra si es necesario
        if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
          data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
        }

        // Actualizar el estado con el nuevo producto
        setProductos((prev) => {
          const productosArray = Array.isArray(prev) ? prev : [];
          return [...productosArray, data];
        });

        // Recargar todos los productos para asegurar sincronización
        await fetchProductos();

        return data;
      } catch (err) {
        console.error("Error al crear producto:", err);
        setError(err.message || "Error al crear producto");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchProductos]
  );

  // Actualizar un producto
  const updateProducto = useCallback(async (id, productoData) => {
    setLoading(true);
    setError(null);
    try {
      // Verificar que productoData sea FormData
      if (!(productoData instanceof FormData)) {
        throw new Error("Los datos del producto deben enviarse como FormData");
      }

      const data = await productosService.update(id, productoData);

      // Corregir URL con doble barra si es necesario
      if (data && data.imagenUrl && data.imagenUrl.includes("/storage//")) {
        data.imagenUrl = data.imagenUrl.replace("/storage//", "/storage/");
      }

      // Actualizar el estado con el producto actualizado
      setProductos((prev) => {
        const productosArray = Array.isArray(prev) ? prev : [];
        return productosArray.map((producto) =>
          producto.id === id ? data : producto
        );
      });

      return data;
    } catch (err) {
      console.error(`Error al actualizar producto con ID ${id}:`, err);
      setError(err.message || `Error al actualizar producto con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar un producto
  const deleteProducto = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productosService.delete(id);

      // Actualizar el estado eliminando el producto
      setProductos((prev) => {
        const productosArray = Array.isArray(prev) ? prev : [];
        return productosArray.filter((producto) => producto.id !== id);
      });

      return true;
    } catch (err) {
      console.error(`Error al eliminar producto con ID ${id}:`, err);
      setError(err.message || `Error al eliminar producto con ID ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return {
    productos,
    loading,
    error,
    fetchProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
  };
};

export default useProductos;
