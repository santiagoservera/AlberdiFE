"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCarritoStore from "../store/useCarritoStore";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import useProductos from "../hooks/useProductos";
import { formatCurrency } from "../utils/formatCurrency";
import {
  Package,
  Tag,
  ArrowLeft,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProducto } = useProductos();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, openCarrito, getSessionId } = useCarritoStore();
  const [addedToCart, setAddedToCart] = useState(false);

  // Cargar el producto cuando cambia el ID
  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) {
        setError("ID de producto no válido");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("Cargando producto con ID:", id);
        const response = await getProducto(Number(id));

        console.log("Respuesta completa del API:", response);

        // Manejar diferentes estructuras de respuesta
        let productoData = null;

        if (response && response.data) {
          // Si la respuesta tiene estructura de Laravel con paginación
          if (response.data.data && Array.isArray(response.data.data)) {
            productoData = response.data.data.find((p) => p.id === Number(id));
            console.log("Producto encontrado en array paginado:", productoData);
          }
          // Si la respuesta tiene el producto directamente en data
          else if (response.data.id) {
            productoData = response.data;
            console.log(
              "Producto encontrado directamente en data:",
              productoData
            );
          }
        }
        // Si la respuesta es directamente el producto
        else if (response && response.id) {
          productoData = response;
          console.log("Producto encontrado directamente:", productoData);
        }

        if (productoData) {
          console.log("Producto final a mostrar:", productoData);
          setProducto(productoData);
          setError(null);
        } else {
          console.log("Producto no encontrado para ID:", id);
          console.log("Estructura de respuesta recibida:", response);
          setError("Producto no encontrado");
        }
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError("Error al cargar el producto. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id, getProducto]);

  const handleAddToCart = () => {
    if (!producto) {
      console.error("No hay producto para agregar al carrito");
      return;
    }

    if (producto.stock <= 0) {
      toast.error("Este producto no tiene stock disponible", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
        icon: "❌",
      });
      return;
    }

    try {
      // Preparar datos del producto para el carrito
      const productoParaCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio:
          Number.parseFloat(producto.precioActual) ||
          Number.parseFloat(producto.precio) ||
          0,
        imagen: producto.imagenUrl || producto.imagen || "",
        descripcion: producto.descripcion_corta || producto.descripcion || "",
      };

      console.log("Agregando producto al carrito:", productoParaCarrito);
      console.log("Session ID:", getSessionId());

      addToCart(productoParaCarrito);
      setAddedToCart(true);

      // Toast de éxito
      toast.success(`${producto.nombre} agregado al carrito`, {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
        icon: "🛒",
      });

      // Mostrar mensaje de éxito por 1.5 segundos
      setTimeout(() => {
        setAddedToCart(false);
        openCarrito(); // Abrir el carrito después de agregar el producto
      }, 1500);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      toast.error("Error al agregar el producto al carrito", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
        icon: "❌",
      });
    }
  };

  const handleVolverCatalogo = () => {
    navigate("/Catalogo");
  };

  // Función para obtener el estado del stock
  const getStockStatus = (stock) => {
    if (stock <= 0)
      return {
        status: "sin-stock",
        color: "text-red-600",
        bgColor: "bg-red-100",
        icon: AlertTriangle,
      };
    if (stock <= 5)
      return {
        status: "poco-stock",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        icon: AlertTriangle,
      };
    return {
      status: "disponible",
      color: "text-textoVerde",
      bgColor: "#4F6B5D",
      icon: CheckCircle,
    };
  };

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F6B5F] mx-auto mb-4"></div>
          <p className="text-2xl font-firelli text-textoVerde">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="w-full h-[400px] flex flex-col items-center justify-center">
        <p className="text-2xl font-firelli text-red-500 mb-4">
          {error || "Producto no encontrado"}
        </p>
        <Button
          onClick={handleVolverCatalogo}
          className="bg-[#4F6B5F] text-white py-2 rounded-full font-firelli px-4"
        >
          Volver al catálogo
        </Button>
      </div>
    );
  }

  const precioMostrar =
    Number.parseFloat(producto.precioActual) ||
    Number.parseFloat(producto.precio) ||
    0;
  const stockStatus = getStockStatus(producto.stock);
  const StockIcon = stockStatus.icon;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Breadcrumb */}
      <div className="w-[90%] md:w-[70%] mx-auto py-4">
        <Button
          onClick={handleVolverCatalogo}
          className="bg-[#4F6B5F] text-white py-2 rounded-full font-firelli px-4"
        >
          <ArrowLeft size={16} />
          Volver al catálogo
        </Button>
      </div>

      {/* Version desktop */}
      <div className="w-[90%] md:w-[80%] mx-auto md:flex justify-between items-start py-10 gap-10 hidden">
        {/* Imagen y Stock */}
        <div className="border border-black rounded-md h-[600px] min-h-[500px] w-1/2 flex justify-around items-center p-5 shadow-2xl flex-col">
          <img
            src={producto.imagenUrl || "/placeholder.svg"}
            alt={producto.nombre}
            className="w-[300px] h-[300px] object-contain rounded-lg shadow-lg flex items"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.svg";
            }}
          />

          {/* Stock mejorado */}
          <div
            className={`${stockStatus.bgColor} ${stockStatus.color} px-6 py-3 rounded-lg flex items-center gap-3 font-firelli font-bold text-lg shadow-md`}
          >
            <StockIcon size={24} />
            <div className="text-center">
              {producto.stock <= 0 ? (
                <span>Sin stock disponible</span>
              ) : producto.stock <= 5 ? (
                <span>¡Últimas {producto.stock} unidades!</span>
              ) : (
                <span>{producto.stock} unidades disponibles</span>
              )}
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="border border-black rounded-md flex flex-col w-1/2 h-[600px] min-h-[500px] p-6 gap-6 overflow-y-auto shadow-2xl">
          {/* Título y precio */}
          <div className="text-center border-b pb-4">
            <h1 className="text-4xl font-firelli text-textoVerde font-extrabold mb-3">
              {producto.nombre}
            </h1>
            {precioMostrar > 0 && (
              <p className="text-3xl font-firelli text-textoVerde font-bold">
                {formatCurrency(precioMostrar)}
              </p>
            )}
          </div>

          {/* Información de categoría */}
          {producto.subcategoria && (
            <div className="bg-[#F4EAE2] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="text-[#8BA99C]" size={20} />
                <span className="font-firelli font-bold text-textoVerde">
                  Categoría
                </span>
              </div>
              <p className="font-firelli text-[#8BA99C] text-lg">
                {producto.subcategoria.nombre}
              </p>
              {producto.subcategoria.descripcion && (
                <p className="font-firelli text-[#8BA99C] text-sm mt-1">
                  {producto.subcategoria.descripcion}
                </p>
              )}
            </div>
          )}

          {/* Descripción */}
          <div className="bg-[#F4EAE2] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="text-[#8BA99C]" size={20} />
              <span className="font-firelli font-bold text-textoVerde">
                Descripción
              </span>
            </div>
            <p className="font-firelli text-[#8BA99C] text-lg">
              {producto.descripcion || "Sin descripción disponible"}
            </p>
          </div>

          {/* Botón de agregar al carrito */}
          <div className="mt-auto">
            <Button
              onClick={handleAddToCart}
              disabled={addedToCart || producto.stock <= 0}
              className={`w-full p-4 rounded-full font-firelli text-[#FBF7F4] text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                addedToCart
                  ? "bg-green-600 scale-105"
                  : producto.stock <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4F6B5F] hover:bg-[#3d5449] hover:scale-105"
              }`}
            >
              <ShoppingCart size={20} />
              {addedToCart
                ? "¡Agregado al carrito!"
                : producto.stock <= 0
                ? "Sin stock disponible"
                : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </div>

      {/* Version mobile */}
      <div className="flex flex-col items-center justify-center w-[90%] mx-auto md:hidden py-10 space-y-6">
        {/* Imagen */}
        <div className="border border-black rounded-md p-5 shadow-2xl w-full flex flex-col items-center gap-4">
          <img
            src={producto.imagenUrl || "/placeholder.svg"}
            alt={producto.nombre}
            className="w-[280px] h-[280px] object-contain rounded-lg shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.svg";
            }}
          />

          {/* Stock móvil */}
          <div
            className={`${stockStatus.bgColor} ${stockStatus.color} px-4 py-2 rounded-lg flex items-center gap-2 font-firelli font-bold`}
          >
            <StockIcon size={20} />
            <span>
              {producto.stock <= 0
                ? "Sin stock"
                : producto.stock <= 5
                ? `¡Últimas ${producto.stock}!`
                : `${producto.stock} disponibles`}
            </span>
          </div>
        </div>

        {/* Información móvil */}
        <div className="border border-black rounded-md p-5 shadow-2xl w-full space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-firelli text-textoVerde font-extrabold mb-2">
              {producto.nombre}
            </h1>
            {precioMostrar > 0 && (
              <p className="text-2xl font-firelli text-textoVerde font-bold">
                {formatCurrency(precioMostrar)}
              </p>
            )}
          </div>

          {producto.subcategoria && (
            <div className="bg-[#F4EAE2] p-3 rounded-lg">
              <p className="font-firelli font-bold text-textoVerde text-sm">
                Categoría
              </p>
              <p className="font-firelli text-[#8BA99C]">
                {producto.subcategoria.nombre}
              </p>
            </div>
          )}

          <div className="bg-[#F4EAE2] p-3 rounded-lg">
            <p className="font-firelli font-bold text-textoVerde text-sm">
              Descripción
            </p>
            <p className="font-firelli text-[#8BA99C]">
              {producto.descripcion || "Sin descripción disponible"}
            </p>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={addedToCart || producto.stock <= 0}
            className={`w-full p-3 rounded-full font-firelli text-[#FBF7F4] transition-all duration-300 flex items-center justify-center gap-2 ${
              addedToCart
                ? "bg-green-600 scale-105"
                : producto.stock <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4F6B5F] hover:bg-[#3d5449]"
            }`}
          >
            <ShoppingCart size={18} />
            {addedToCart
              ? "¡Agregado!"
              : producto.stock <= 0
              ? "Sin stock"
              : "Agregar al carrito"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
