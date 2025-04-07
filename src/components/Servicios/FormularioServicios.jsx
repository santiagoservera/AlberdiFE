import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const FormularioServicios = () => {
  const location = useLocation();
  const servicioSeleccionado = location.state?.servicio || {}; // Evitar errores si no hay datos
  const navigate = useNavigate();
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
    const camposRequeridos = ["nombre", "apellido", "telefono"];
    const camposFaltantes = camposRequeridos.filter(
      (campo) => !formData[campo]
    );

    if (camposFaltantes.length > 0) {
      toast.error("Por favor complete todos los campos requeridos.");
      return;
    }

    const datosFinales = {
      ...formData,
      servicio: {
        nombre: servicioSeleccionado?.nombre || "N/A",
        descripcion: servicioSeleccionado?.descripcion || "No disponible",
      },
    };

    const nombreCompleto = `${formData.nombre} ${formData.apellido}`;
    const telefono = formData.telefono;
    const descripcionAdicional =
      formData.descripcion || "Sin detalles adicionales.";

    const mensaje = `🛠️ *Solicitud de Servicio*
  
👤 *Cliente:* ${nombreCompleto}
📞 *Teléfono:* ${telefono}

📝 *Detalles del Servicio:*
🔧 *Servicio:* ${datosFinales.servicio.nombre}
📌 *Descripción:* ${datosFinales.servicio.descripcion}

📋 *Detalles adicionales:* ${descripcionAdicional}

✅ *¿Podrían confirmarme la disponibilidad y el costo?*

Aguardo su respuesta. ¡Muchas gracias!`;

    try {
      const numeroWhatsApp = "5492645850609";
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeCodificado}`;

      // Abrir WhatsApp en nueva ventana
      window.open(urlWhatsApp, "_blank");

      console.log("Formulario enviado:", JSON.stringify(datosFinales, null, 2));

      // Mostrar mensaje de éxito con Toastify
      toast.success("✅ Servicio solicitado con éxito!");

      // Limpiar formulario
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        descripcion: "",
      });

      // Redirigir a "/"
      setTimeout(() => {
        navigate("/");
      }, 2000); // Pequeño delay para que se vea el mensaje de éxito
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error("❌ Hubo un problema al enviar tu solicitud.");
    }
  };

  return (
    <div className="w-full ">
      <ToastContainer />
      <div className="containerWidth flex-col flex lg:flex-row justify-between gap-5 pt-10 pb-20">
        <div className="flex flex-col md:w-1/2 bg-[#F4EAE2] p-4 gap-2">
          <h1 className="text-center font-firelli text-[#8BA99C] font-bold text-xl">
            Formulario de Servicio:
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
            />
            <Input
              label="Apellido"
              type="text"
              variant="bordered"
              className="bg-[#DEDEDE] rounded-lg  font-bold font-firelli"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Dirección"
            type="text"
            variant="bordered"
            className="bg-[#DEDEDE] rounded-lg font-bold font-firelli text-textoVerde"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
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
            />
          </div>
          <Textarea
            label="Breve descripción de sus necesidades"
            variant="bordered"
            className="bg-[#DEDEDE] rounded-lg font-bold font-firelli text-textoVerde"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          <div className="flex justify-center py-2">
            <Button
              className="bg-button text-white py-2 rounded-full font-firelli px-4"
              onClick={handleSubmit}
            >
              Enviar Formulario
            </Button>
          </div>
        </div>

        {/* Servicio seleccionado */}
        <div className="md:w-1/2 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-5">
            <p className="font-firelli text-textoVerde text-2xl font-bold">
              Seleccionaste el siguiente servicio:
            </p>
            <p className="font-firelli text-textoVerde text-4xl font-bold">
              {servicioSeleccionado.nombre || "N/A"}
            </p>
            <p className="font-firelli text-textoVerde text-lg font-bold">
              {servicioSeleccionado.descripcion || "Descripción no disponible"}
            </p>
          </div>

          <div className="flex bg-[#4F6B5F] text-[#FBF7F4] font-firelli p-1 rounded-lg font-bold">
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

export default FormularioServicios;
