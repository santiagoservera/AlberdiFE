"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Divider,
} from "@nextui-org/react";
import { X, ImageIcon } from "lucide-react";

export const CreateServicioModal = ({
  isOpen,
  onClose,
  onSave,
  modo = "crear",
  servicioEditar = null,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
  });

  const [errors, setErrors] = useState({
    nombre: false,
    descripcion: false,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [mantenerImagen, setMantenerImagen] = useState(true);

  // Cargar datos si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && servicioEditar) {
      setFormData({
        id: servicioEditar.id,
        nombre: servicioEditar.nombre || "",
        descripcion: servicioEditar.descripcion || "",
        imagen: null, // No podemos cargar la imagen existente como File
      });

      // Si hay una imagen existente, mostrarla en la vista previa
      if (servicioEditar.imagenUrl || servicioEditar.imagen) {
        // Usar directamente la URL proporcionada por la API
        let imagenUrl = servicioEditar.imagenUrl || "";

        // Corregir solo si hay doble barra
        if (imagenUrl.includes("/storage//")) {
          imagenUrl = imagenUrl.replace("/storage//", "/storage/");
        }

        // Añadir un timestamp para evitar problemas de caché
        const timestamp = new Date().getTime();
        setPreviewUrl(`${imagenUrl}?t=${timestamp}`);
        setMantenerImagen(true);
      } else {
        setPreviewUrl(null);
        setMantenerImagen(false);
      }
    } else {
      // Resetear el formulario en modo crear
      setFormData({
        nombre: "",
        descripcion: "",
        imagen: null,
      });
      setPreviewUrl(null);
      setMantenerImagen(false);
    }
  }, [modo, servicioEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        imagen: file,
      }));

      // Crear URL para vista previa
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setMantenerImagen(false); // Ya no mantener la imagen anterior
    }
  };

  const handleAddImageClick = () => {
    document.getElementById("servicioPictureInput")?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imagen: null,
    }));

    setPreviewUrl(null);
    setMantenerImagen(false); // No mantener la imagen anterior
  };

  const handleSubmit = () => {
    // Validación básica
    const newErrors = {
      nombre: !formData.nombre.trim(),
      descripcion: !formData.descripcion.trim(),
    };

    setErrors(newErrors);

    // Si hay errores, no continuar
    if (newErrors.nombre || newErrors.descripcion) {
      return;
    }

    // Siempre crear un FormData para enviar
    const formDataToSend = new FormData();

    // Agregar los campos de texto
    formDataToSend.append("nombre", formData.nombre.trim());
    formDataToSend.append("descripcion", formData.descripcion.trim());

    // Si estamos en modo editar, incluir el ID
    if (modo === "editar" && servicioEditar) {
      formDataToSend.append("id", servicioEditar.id);

      // Indicar si debemos mantener la imagen existente o eliminarla
      formDataToSend.append("mantener_imagen", mantenerImagen ? "1" : "0");
    }

    // Agregar la imagen solo si existe una nueva
    if (formData.imagen instanceof File) {
      formDataToSend.append("imagen", formData.imagen);
    }

    // Guardar el servicio
    onSave(formDataToSend);

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#000000]/50 backdrop-blur-sm",
        base: "bg-white rounded-lg shadow-lg",
        header: "border-b border-gray-200",
        footer: "border-t border-gray-200",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {modo === "crear" ? "Nuevo Servicio" : "Editar Servicio"}
              </h3>
              <p className="text-sm text-gray-500">
                {modo === "crear"
                  ? "Crea un nuevo servicio para mostrar a tus clientes"
                  : "Modifica los detalles de este servicio"}
              </p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Nombre del servicio"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isRequired
                    isInvalid={errors.nombre}
                    errorMessage={
                      errors.nombre ? "El nombre es obligatorio" : ""
                    }
                    placeholder="Ej: Limpieza de oficinas"
                    variant="bordered"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-sm font-medium text-gray-700",
                    }}
                  />

                  <Textarea
                    label="Descripción"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    isRequired
                    isInvalid={errors.descripcion}
                    errorMessage={
                      errors.descripcion ? "La descripción es obligatoria" : ""
                    }
                    placeholder="Describe el servicio en detalle..."
                    minRows={3}
                    maxRows={5}
                    variant="bordered"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-sm font-medium text-gray-700",
                    }}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Imagen del servicio
                  </p>
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                    {previewUrl ? (
                      <div className="relative w-full">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Vista previa"
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            console.error(
                              "Error al cargar la imagen:",
                              previewUrl
                            );
                            e.target.onerror = null;
                            e.target.src = "/customer-service-interaction.png";
                          }}
                        />
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="solid"
                          className="absolute -top-2 -right-2"
                          onClick={handleRemoveImage}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="w-full flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg"
                        onClick={handleAddImageClick}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                          <ImageIcon size={20} className="text-gray-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          Haz clic para subir una imagen
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG o WEBP (máx. 2MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="servicioPictureInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button variant="flat" onPress={onClose} className="font-medium">
                Cancelar
              </Button>
              <Button
                color="primary"
                className="bg-[#4F6B5F] text-white font-medium"
                onPress={handleSubmit}
              >
                {modo === "crear" ? "Crear servicio" : "Guardar cambios"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// También exportamos como ServicioModal para mantener consistencia con el resto del código
export const ServicioModal = CreateServicioModal;
