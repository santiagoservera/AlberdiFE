"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import useCarritoStore from "../../store/useCarritoStore";
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
  } = useCarritoStore();
  const servicioSeleccionado = location.state?.servicio || {}; // Evitar errores si no hay datos

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    codigoPostal: "",
    telefono: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validar que todos los campos estén completos
    const camposRequeridos = ["nombre", "apellido", "direccion", "telefono"];
    const camposFaltantes = camposRequeridos.filter(
      (campo) => !formData[campo]
    );

    if (camposFaltantes.length > 0) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    const datosFinales = {
      ...formData,
      productos: items.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.quantity,
      })),
    };

    console.log("Formulario enviado:", JSON.stringify(datosFinales, null, 2));

    // Aquí podrías enviar los datos a tu backend
    alert("¡Gracias por tu compra! Nos pondremos en contacto contigo pronto.");

    // Limpiar el carrito después de completar la compra
    clearCart();

    // Redirigir al usuario a la página principal o de confirmación
    navigate("/");
  };

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
    <div className="w-full ">
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
              required
            />
            <Input
              label="Apellido"
              type="text"
              variant="bordered"
              className="bg-[#DEDEDE] rounded-lg"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label="Dirección"
            type="text"
            variant="bordered"
            className="bg-[#DEDEDE] rounded-lg font-bold font-firelli"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
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
            />
            <Input
              label="Número de Teléfono"
              type="number"
              variant="bordered"
              className="bg-[#DEDEDE] rounded-lg"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <Textarea
            label="Breve descripción o comentarios adicionales"
            variant="bordered"
            className="bg-[#DEDEDE] rounded-lg font-bold font-firelli"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          <div className="flex justify-center py-2">
            <Button
              className="bg-button text-white py-2 rounded-full font-firelli px-4"
              onClick={handleSubmit}
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>

        {/* Productos seleccionados en el carrito */}
        <div className="md:w-1/2 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-5">
            <p className="font-firelli text-textoVerde text-2xl font-bold">
              Productos que has seleccionado:
            </p>
            <div className="bg-white p-4 rounded-lg shadow-md h-full ">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-3 w-full"
                >
                  <div className="flex items-center gap-3  w-full">
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

                        <div className="flex bg-[#4F6B5F] font-firelli rounded-full text-white justify-around text-sm">
                          <button
                            className="cursor-pointer px-3"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            className="cursor-pointer px-3"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-gray-100 rounded-full"
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
  );
};

export default FormularioProductos;
