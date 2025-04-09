import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  Textarea,
  SelectItem,
} from "@heroui/react";

const ModalProducto = ({
  isOpen,
  onOpenChange,
  modo = "crear",
  producto = {},
  onGuardar,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    detalle: "",
    categoria: "",
    imagen1: null,
  });
  const [productos, setProductos] = useState({});
  const categorias = [
    "Limpieza",
    "Vidrios",
    "Higiene personal",
    "Pisos",
    "Industrial",
  ];

  useEffect(() => {
    if (modo === "editar" && producto) {
      setFormData({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        detalle: producto.detalle || "",
        categoria: producto.categoria || "",
        imagen1: null,
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        detalle: "",
        categoria: "",
        imagen1: null,
      });
    }
  }, [modo, producto]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        imagen1: e.target.files[0],
      }));
    }
  };

  const handleAddImageClick = () => {
    document.getElementById("productPictureInput")?.click();
  };

  const handleSubmit = () => {
    onGuardar(formData);
    onOpenChange(); // Cerrar modal
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent className="font-firelli">
        {(onClose) => (
          <>
            <ModalHeader>
              <p>{modo === "crear" ? "Agregar producto" : "Editar producto"}</p>
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Escriba un nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Input
                placeholder="Escriba una descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
              />
              <Textarea
                placeholder="Describa producto detallado"
                value={formData.detalle}
                onChange={(e) =>
                  setFormData({ ...formData, detalle: e.target.value })
                }
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Categoría
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-white text-black w-full lg:h-[180px] rounded-lg shadow mb-5 lg:mb-0">
                <div className="w-[95%] mx-auto py-3">
                  <p className="lg:text-xl font-bold">Fotos</p>
                  <div className="py-10 lg:py-0 flex justify-center">
                    {formData.imagen1 ? (
                      <img
                        src={URL.createObjectURL(formData.imagen1)}
                        alt="Preview"
                        className="lg:w-[100px] lg:h-[100px] rounded-lg shadow"
                      />
                    ) : (
                      <div
                        className="lg:flex lg:flex-col border border-dashed border-black lg:w-[100px] lg:h-[100px] 
                        lg:justify-center lg:items-center gap-3 rounded-lg shadow"
                      >
                        <label
                          onClick={handleAddImageClick}
                          className="cursor-pointer text-center border border-black rounded-full text-3xl px-2"
                        >
                          +
                        </label>
                        <input
                          id="productPictureInput"
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                {modo === "crear" ? "Guardar" : "Actualizar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalProducto;
