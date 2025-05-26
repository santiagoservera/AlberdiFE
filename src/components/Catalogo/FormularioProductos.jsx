"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
import useCarritoStore from "../../store/useCarritoStore";
import useOrdenes from "../../hooks/useOrdenes";
import trash from "../../assets/trash.png";

const FormularioProductos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    items,
    getTotal,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    getOrderData,
  } = useCarritoStore();

  // Usar el hook de órdenes
  const { createOrden, loading: ordenLoading } = useOrdenes();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const servicioSeleccionado = location.state?.servicio || {};

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "", // Agregar este campo
    direccion: "",
    codigoPostal: "",
    telefono: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Funciones de validación
  const validaciones = {
    nombre: (value) => {
      if (!value.trim()) return "El nombre es requerido";
      if (value.trim().length < 2)
        return "El nombre debe tener al menos 2 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
        return "El nombre solo puede contener letras";
      return "";
    },
    apellido: (value) => {
      if (!value.trim()) return "El apellido es requerido";
      if (value.trim().length < 2)
        return "El apellido debe tener al menos 2 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
        return "El apellido solo puede contener letras";
      return "";
    },
    email: (value) => {
      if (!value.trim()) return "El email es requerido";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Formato de email inválido";
      return "";
    },
    direccion: (value) => {
      if (!value.trim()) return "La dirección es requerida";
      if (value.trim().length < 10)
        return "La dirección debe tener al menos 10 caracteres";
      return "";
    },
    telefono: (value) => {
      if (!value.trim()) return "El teléfono es requerido";
      // Formato argentino: puede empezar con +54, 54, 0 o directamente el número
      const phoneRegex = /^(\+?54|0)?[\s-]?(\d{2,4})[\s-]?(\d{6,8})$/;
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        return "Formato de teléfono inválido (ej: 2645850609)";
      }
      return "";
    },
    codigoPostal: (value) => {
      if (value && !/^\d{4}$/.test(value)) {
        return "El código postal debe tener 4 dígitos";
      }
      return "";
    },
    descripcion: (value) => {
      if (value && value.length > 500) {
        return "La descripción no puede exceder 500 caracteres";
      }
      return "";
    },
  };

  const validateField = (name, value) => {
    const error = validaciones[name] ? validaciones[name](value) : "";
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validaciones[field]
        ? validaciones[field](formData[field])
        : "";
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return isValid;
  };

  const handleSubmit = async () => {
    // Validar formulario completo
    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
      });
      return;
    }

    setIsSubmitting(true);

    // Toast de carga
    const loadingToast = toast.loading("Procesando tu pedido...", {
      position: "top-center",
      style: {
        background: "#f3f4f6",
        color: "#374151",
      },
    });

    try {
      const nombreCompleto = `${formData.nombre} ${formData.apellido}`;

      // Crear objeto de la orden en el formato que espera tu API
      const orderData = {
        nombre: nombreCompleto,
        email: formData.email,
        direccion: formData.direccion,
        telefono: formData.telefono,
        estado: "pendiente",
        service_id: servicioSeleccionado?.id || null,
        productos: items.map((item) => ({
          product_id: item.id,
          cantidad: item.quantity,
          precioOrden: (item.precio * item.quantity).toFixed(2),
        })),
      };

      console.log("Datos de la orden a enviar:", orderData);

      // 1. Crear la orden usando el servicio
      console.log("Creando orden en la base de datos...");
      const response = await createOrden(orderData);

      if (!response) {
        throw new Error("No se pudo crear la orden");
      }

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // 2. Preparar mensaje de WhatsApp
      const mensaje = `📦 *Nuevo Pedido*

👤 *Cliente:* ${nombreCompleto}
📞 *Teléfono:* ${formData.telefono}
📍 *Dirección:* ${formData.direccion}
${formData.codigoPostal ? `📮 *Código Postal:* ${formData.codigoPostal}` : ""}

📝 *Detalles del Pedido:*

${items
  .map(
    (item) => `🛒 *Producto:* ${item.nombre}
📦 *Cantidad:* ${item.quantity}
💰 *Precio unitario:* $${item.precio.toFixed(2)}
💵 *Subtotal:* $${(item.precio * item.quantity).toFixed(2)}`
  )
  .join("\n\n")}

💰 *Total del pedido:* $${getTotal().toFixed(2)}

${
  formData.descripcion
    ? `📌 *Detalles adicionales:* ${formData.descripcion}`
    : "📌 *Sin detalles adicionales.*"
}

${
  servicioSeleccionado?.id
    ? `🔧 *Servicio asociado:* ${servicioSeleccionado.nombre}`
    : "🛍️ *Pedido desde catálogo*"
}

¡Gracias por tu pedido!`;

      // 3. Enviar mensaje por WhatsApp
      const numeroWhatsApp = "5492645850609";
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeCodificado}`;

      // Toast de éxito con confirmación para ir a WhatsApp
      toast(
        (t) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎉</span>
              <div>
                <p className="font-semibold text-gray-800">
                  ¡Pedido creado exitosamente!
                </p>
                <p className="text-sm text-gray-600">
                  Ahora serás redirigido a WhatsApp para confirmar tu pedido con
                  nuestro equipo.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);

                  // Abrir WhatsApp
                  window.open(urlWhatsApp, "_blank");

                  // Toast de despedida
                  toast.success("¡Gracias por tu compra! Redirigiendo...", {
                    duration: 2000,
                    position: "top-center",
                    style: {
                      background: "#dbeafe",
                      color: "#1e40af",
                      border: "1px solid #bfdbfe",
                    },
                    icon: "👋",
                  });

                  // Limpiar carrito y redirigir después de un delay
                  setTimeout(() => {
                    clearCart();
                    navigate("/");
                  }, 1500);
                }}
                className="px-6 py-2 bg-[#4F6B5F] text-white rounded-full hover:bg-[#3d5449] transition-colors font-medium flex items-center gap-2"
              >
                <span>📱</span>
                Ir a WhatsApp
              </button>
            </div>
          </div>
        ),
        {
          duration: Number.POSITIVE_INFINITY, // No se cierra automáticamente
          position: "top-center",
          style: {
            background: "#fff",
            color: "#374151",
            border: "2px solid #4F6B5F",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
          },
        }
      );

      console.log("Orden procesada exitosamente:", orderData);
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      console.error("Error al procesar el pedido:", error);

      toast.error("Hubo un problema al procesar tu pedido", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
      setFormData({
        nombre: "",
        apellido: "",
        email: "", // Agregar este campo
        direccion: "",
        codigoPostal: "",
        telefono: "",
        descripcion: "",
      });
    }
  };

  // El estado de carga debe considerar tanto el estado local como el del hook
  const isLoading = isSubmitting || ordenLoading;

  // Si no hay productos en el carrito, redirigir al catálogo
  if (items.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-firelli text-textoVerde mb-4">
          No hay productos en tu carrito
        </h2>
        <Button
          onClick={() => navigate("/Catalogo")}
          className="bg-[#4F6B5F] text-white py-2 rounded-full font-firelli px-4"
        >
          Ver catálogo
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Toaster component para mostrar las notificaciones */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Configuración global
          duration: 4000,
          style: {
            background: "#fff",
            color: "#363636",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "12px 16px",
          },
          // Configuraciones específicas por tipo
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#6b7280",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="w-full">
        <div className="containerWidth flex-col flex lg:flex-row justify-between gap-5 pt-10 pb-20">
          <div className="flex flex-col md:w-1/2 bg-[#F4EAE2] p-4 gap-2">
            <h1 className="text-center font-firelli text-[#8BA99C] font-bold text-xl">
              Formulario de Compra:
            </h1>
            <div className="flex justify-between gap-2 text-textoVerde font-firelli font-bold">
              <Input
                label="Nombre"
                type="text"
                variant="bordered"
                className="bg-[#DEDEDE] rounded-lg"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nombre && !!errors.nombre}
                errorMessage={touched.nombre && errors.nombre}
                required
                disabled={isLoading}
              />
              <Input
                label="Apellido"
                type="text"
                variant="bordered"
                className="bg-[#DEDEDE] rounded-lg"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.apellido && !!errors.apellido}
                errorMessage={touched.apellido && errors.apellido}
                required
                disabled={isLoading}
              />
            </div>
            <Input
              label="Email"
              type="email"
              variant="bordered"
              className="bg-[#DEDEDE] rounded-lg font-bold font-firelli"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.email && !!errors.email}
              errorMessage={touched.email && errors.email}
              placeholder="ejemplo@correo.com"
              required
              disabled={isLoading}
            />
            <Input
              label="Dirección"
              type="text"
              variant="bordered"
              className="bg-[#DEDEDE] rounded-lg font-bold font-firelli"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.direccion && !!errors.direccion}
              errorMessage={touched.direccion && errors.direccion}
              description="Incluye calle, número, barrio/localidad"
              required
              disabled={isLoading}
            />
            <div className="flex justify-between gap-2 text-textoVerde font-firelli font-bold">
              <Input
                label="Código Postal"
                type="text"
                variant="bordered"
                className="bg-[#DEDEDE] rounded-lg"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.codigoPostal && !!errors.codigoPostal}
                errorMessage={touched.codigoPostal && errors.codigoPostal}
                placeholder="5400"
                maxLength={4}
                disabled={isLoading}
              />
              <Input
                label="Número de Teléfono"
                type="tel"
                variant="bordered"
                className="bg-[#DEDEDE] rounded-lg"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.telefono && !!errors.telefono}
                errorMessage={touched.telefono && errors.telefono}
                placeholder="2645850609"
                description="Sin espacios ni guiones"
                required
                disabled={isLoading}
              />
            </div>
            <Textarea
              label="Breve descripción o comentarios adicionales"
              variant="bordered"
              className="bg-[#DEDEDE] rounded-lg font-bold font-firelli"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.descripcion && !!errors.descripcion}
              errorMessage={touched.descripcion && errors.descripcion}
              description={`${formData.descripcion.length}/500 caracteres`}
              maxLength={500}
              disabled={isLoading}
            />
            <div className="flex justify-center py-2">
              <Button
                className="bg-button text-white py-2 rounded-full font-firelli px-4"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Finalizar Pedido"}
              </Button>
            </div>
          </div>

          {/* Productos seleccionados en el carrito */}
          <div className="md:w-1/2 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-5">
              <p className="font-firelli text-textoVerde text-2xl font-bold">
                Productos que has seleccionado:
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md h-full">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b py-3 w-full"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex justify-between w-full items-center">
                        <img
                          src={item.imagen || "/placeholder.svg"}
                          alt={item.nombre}
                          className="w-[100px] h-[100px] object-cover rounded"
                        />
                        <div className="flex flex-col justify-between h-[100px]">
                          <h3 className="font-firelli text-textoVerde font-bold">
                            {item.nombre}
                          </h3>
                          <p className="font-firelli text-textoVerde text-sm">
                            ${item.precio.toFixed(2)} c/u
                          </p>
                          <p className="font-firelli text-textoVerde font-bold text-sm">
                            Subtotal: $
                            {(item.precio * item.quantity).toFixed(2)}
                          </p>

                          <div className="flex bg-[#4F6B5F] font-firelli rounded-full text-white justify-around text-sm">
                            <button
                              className="cursor-pointer px-3"
                              onClick={() => decrementQuantity(item.id)}
                              disabled={isLoading}
                            >
                              -
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              className="cursor-pointer px-3"
                              onClick={() => incrementQuantity(item.id)}
                              disabled={isLoading}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                            disabled={isLoading}
                          >
                            <img
                              src={trash || "/placeholder.svg"}
                              alt="trash"
                              className="h-[20px] w-[20px]"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total del pedido */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold text-xl font-firelli text-textoVerde">
                    <span>Total del pedido:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex bg-[#4F6B5F] text-[#FBF7F4] font-firelli p-4 rounded-lg font-bold">
              <p>
                Una vez que completes el formulario, serás derivado a uno de
                nuestros encargados, quien se pondrá en contacto contigo para
                brindarte una atención personalizada y garantizar que el proceso
                se realice de manera precisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioProductos;
