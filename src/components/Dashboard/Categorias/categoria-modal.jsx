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
      });
    } else {
      // Resetear el formulario en modo crear
      setFormData({
        nombre: "",
        descripcion: "",
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
    }

    // Guardar la categoría
    onSave(categoriaData);

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
                {modo === "crear" ? "Nueva Categoría" : "Editar Categoría"}
              </h3>
              <p className="text-sm text-gray-500">
                {modo === "crear"
                  ? "Crea una nueva categoría para organizar tus productos"
                  : "Modifica los detalles de esta categoría"}
              </p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Nombre de la categoría"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isRequired
                    isInvalid={errors.nombre}
                    errorMessage={
                      errors.nombre ? "El nombre es obligatorio" : ""
                    }
                    placeholder="Ej: Limpieza"
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
                    placeholder="Describe la categoría en detalle..."
                    minRows={3}
                    maxRows={5}
                    variant="bordered"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-sm font-medium text-gray-700",
                    }}
                  />
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
                {modo === "crear" ? "Crear categoría" : "Guardar cambios"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
