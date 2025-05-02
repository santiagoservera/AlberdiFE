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
import { generarId } from "./categoria-data";

export const CategoriaModal = ({
  isOpen,
  onClose,
  onSave,
  modo = "crear",
  categoriaEditar = null,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
    subcategorias: [],
  });

  const [errors, setErrors] = useState({
    nombre: false,
    descripcion: false,
  });

  // Cargar datos si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && categoriaEditar) {
      setFormData({
        id: categoriaEditar.id,
        nombre: categoriaEditar.nombre || "",
        descripcion: categoriaEditar.descripcion || "",
        imagen: null, // No podemos cargar la imagen existente como File
        subcategorias: categoriaEditar.subcategorias || [],
      });
    } else {
      // Resetear el formulario en modo crear
      setFormData({
        nombre: "",
        descripcion: "",
        imagen: null,
        subcategorias: [],
      });
    }
  }, [modo, categoriaEditar]);

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
    document.getElementById("categoriaPictureInput")?.click();
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
    const categoriaData = {
      ...formData,
    };

    // Si estamos en modo editar, mantener el ID existente
    if (modo === "editar" && categoriaEditar) {
      categoriaData.id = categoriaEditar.id;
      // Mantener las subcategorías existentes
      categoriaData.subcategorias = categoriaEditar.subcategorias || [];
    } else {
      // Generar ID único para nueva categoría
      categoriaData.id = generarId();
      categoriaData.subcategorias = [];
    }

    // Si hay una imagen, crear una URL para ella
    if (formData.imagen) {
      // En un entorno real, aquí subirías la imagen a un servidor
      // y obtendrías una URL permanente. Para este ejemplo, usamos URL.createObjectURL
      categoriaData.imagenURL = URL.createObjectURL(formData.imagen);
    } else if (modo === "editar" && categoriaEditar.imagen) {
      // Mantener la imagen existente si no se seleccionó una nueva
      categoriaData.imagen = categoriaEditar.imagen;
    } else {
      // Usar imagen por defecto
      categoriaData.imagenURL = "/categoria-default.jpg";
    }

    // Guardar la categoría
    onSave(categoriaData);

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modo === "crear" ? "Nueva Categoría" : "Editar Categoría"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Nombre de la categoría"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  isRequired
                  isInvalid={errors.nombre}
                  errorMessage={errors.nombre ? "El nombre es obligatorio" : ""}
                  placeholder="Ej: Limpieza"
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
                  placeholder="Describe la categoría en detalle..."
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
                  ? "Guardar Categoría"
                  : "Actualizar Categoría"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
