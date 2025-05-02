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
} from "@nextui-org/react";

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

  // Cargar datos si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && servicioEditar) {
      setFormData({
        nombre: servicioEditar.nombre || "",
        descripcion: servicioEditar.descripcion || "",
        imagen: null, // No podemos cargar la imagen existente como File
      });
    } else {
      // Resetear el formulario en modo crear
      setFormData({
        nombre: "",
        descripcion: "",
        imagen: null,
      });
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
      setFormData((prev) => ({
        ...prev,
        imagen: e.target.files[0],
      }));
    }
  };

  const handleAddImageClick = () => {
    document.getElementById("servicioPictureInput")?.click();
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

    // Preparar el objeto a guardar
    const servicioData = {
      ...formData,
    };

    // Si estamos en modo editar, mantener el ID existente
    if (modo === "editar" && servicioEditar) {
      servicioData.id = servicioEditar.id;
    } else {
      // Generar ID único para nuevo servicio
      servicioData.id = Date.now();
    }

    // Si hay una imagen, crear una URL para ella
    if (formData.imagen) {
      // En un entorno real, aquí subirías la imagen a un servidor
      // y obtendrías una URL permanente. Para este ejemplo, usamos URL.createObjectURL
      servicioData.imagenURL = URL.createObjectURL(formData.imagen);
    } else if (modo === "editar" && servicioEditar.imagen) {
      // Mantener la imagen existente si no se seleccionó una nueva
      servicioData.imagenURL = servicioEditar.imagen;
    } else {
      // Usar imagen por defecto
      servicioData.imagenURL = "/servicio-default.jpg";
    }

    // Guardar el servicio
    onSave(servicioData);

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modo === "crear" ? "Nuevo Servicio" : "Editar Servicio"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Nombre del servicio"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  isRequired
                  isInvalid={errors.nombre}
                  errorMessage={errors.nombre ? "El nombre es obligatorio" : ""}
                  placeholder="Ej: Limpieza de oficinas"
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
                />

                <div className="bg-white text-black w-full rounded-lg shadow mb-5">
                  <div className="w-[95%] mx-auto py-3">
                    <p className="text-lg font-bold">Imagen del servicio</p>
                    <div className="py-5 flex justify-center">
                      {formData.imagen ? (
                        <div className="relative">
                          <img
                            src={
                              URL.createObjectURL(formData.imagen) ||
                              "/placeholder.svg"
                            }
                            alt="Vista previa"
                            className="w-[200px] h-[150px] object-cover rounded-lg shadow"
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            className="absolute top-2 right-2"
                            onClick={() =>
                              setFormData({ ...formData, imagen: null })
                            }
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="flex flex-col border border-dashed border-gray-400 w-[200px] h-[150px] 
                          justify-center items-center gap-3 rounded-lg shadow cursor-pointer hover:border-gray-600"
                          onClick={handleAddImageClick}
                        >
                          <div className="border border-gray-400 rounded-full text-3xl px-2 py-0 leading-none">
                            +
                          </div>
                          <p className="text-sm text-gray-500">
                            Haga clic para agregar imagen
                          </p>
                          <input
                            id="servicioPictureInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                className="bg-[#4F6B5F] text-white"
                onPress={handleSubmit}
              >
                {modo === "crear" ? "Guardar Servicio" : "Actualizar Servicio"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
