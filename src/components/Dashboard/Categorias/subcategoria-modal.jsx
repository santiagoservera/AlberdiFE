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
  Chip,
} from "@nextui-org/react";

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
  });

  const [errors, setErrors] = useState({
    nombre: false,
    descripcion: false,
  });

  // Cargar datos si estamos en modo editar o limpiar si estamos en modo crear
  useEffect(() => {
    if (modo === "editar" && subcategoriaEditar) {
      setFormData({
        id: subcategoriaEditar.id,
        nombre: subcategoriaEditar.nombre || "",
        descripcion: subcategoriaEditar.descripcion || "",
      });
    } else {
      // Resetear el formulario en modo crear
      setFormData({
        nombre: "",
        descripcion: "",
      });
    }
  }, [modo, subcategoriaEditar, isOpen]); // Añadido isOpen como dependencia para que se ejecute cuando el modal se abre

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
    const subcategoriaData = {
      ...formData,
      categoria_id: categoriaPadre?.id,
    };

    // Si estamos en modo editar, mantener el ID existente
    if (modo === "editar" && subcategoriaEditar) {
      subcategoriaData.id = subcategoriaEditar.id;
    }

    // Guardar la subcategoría
    onSave(subcategoriaData);

    // Limpiar el formulario antes de cerrar
    setFormData({
      nombre: "",
      descripcion: "",
    });

    // Cerrar el modal
    onClose();
  };

  // Función para manejar el cierre del modal y limpiar el formulario
  const handleClose = () => {
    setFormData({
      nombre: "",
      descripcion: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose} // Cambiado a handleClose para limpiar al cerrar
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
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {modo === "crear"
                    ? "Nueva Subcategoría"
                    : "Editar Subcategoría"}
                </h3>
                {categoriaPadre && (
                  <Chip color="primary" variant="flat" size="sm">
                    {categoriaPadre.nombre}
                  </Chip>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {modo === "crear"
                  ? "Crea una nueva subcategoría para organizar tus productos"
                  : "Modifica los detalles de esta subcategoría"}
              </p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Nombre de la subcategoría"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isRequired
                    isInvalid={errors.nombre}
                    errorMessage={
                      errors.nombre ? "El nombre es obligatorio" : ""
                    }
                    placeholder="Ej: Limpieza de Oficinas"
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
                    placeholder="Describe la subcategoría en detalle..."
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
              <Button
                variant="flat"
                onPress={handleClose}
                className="font-medium"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                className="bg-[#4F6B5F] text-white font-medium"
                onPress={handleSubmit}
              >
                {modo === "crear" ? "Crear subcategoría" : "Guardar cambios"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
