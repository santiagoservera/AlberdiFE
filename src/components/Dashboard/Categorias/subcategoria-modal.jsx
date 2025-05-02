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
import { generarSubcategoriaId } from "./categoria-data";

export const SubcategoriaModal = ({
  isOpen,
  onClose,
  onSave,
  categoriaPadre,
  modo = "crear",
  subcategoriaEditar = null,
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
    if (modo === "editar" && subcategoriaEditar) {
      setFormData({
        id: subcategoriaEditar.id,
        nombre: subcategoriaEditar.nombre || "",
        descripcion: subcategoriaEditar.descripcion || "",
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
  }, [modo, subcategoriaEditar]);

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
    document.getElementById("subcategoriaPictureInput")?.click();
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
    const subcategoriaData = {
      ...formData,
    };

    // Si estamos en modo editar, mantener el ID existente
    if (modo === "editar" && subcategoriaEditar) {
      subcategoriaData.id = subcategoriaEditar.id;
    } else {
      // Generar ID único para nueva subcategoría basado en la categoría padre
      subcategoriaData.id = generarSubcategoriaId(categoriaPadre.id);
    }

    // Si hay una imagen, crear una URL para ella
    if (formData.imagen) {
      // En un entorno real, aquí subirías la imagen a un servidor
      // y obtendrías una URL permanente. Para este ejemplo, usamos URL.createObjectURL
      subcategoriaData.imagenURL = URL.createObjectURL(formData.imagen);
    } else if (modo === "editar" && subcategoriaEditar.imagen) {
      // Mantener la imagen existente si no se seleccionó una nueva
      subcategoriaData.imagen = subcategoriaEditar.imagen;
    } else {
      // Usar imagen por defecto
      subcategoriaData.imagenURL = "/subcategoria-default.jpg";
    }

    // Guardar la subcategoría
    onSave(subcategoriaData);

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modo === "crear"
                ? `Nueva Subcategoría en ${categoriaPadre?.nombre || ""}`
                : `Editar Subcategoría de ${categoriaPadre?.nombre || ""}`}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Nombre de la subcategoría"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  isRequired
                  isInvalid={errors.nombre}
                  errorMessage={errors.nombre ? "El nombre es obligatorio" : ""}
                  placeholder="Ej: Limpieza de Oficinas"
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
                  placeholder="Describe la subcategoría en detalle..."
                  minRows={3}
                  maxRows={5}
                />

                <div className="bg-white text-black w-full rounded-lg shadow mb-5"></div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="success" onPress={handleSubmit}>
                {modo === "crear"
                  ? "Guardar Subcategoría"
                  : "Actualizar Subcategoría"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
