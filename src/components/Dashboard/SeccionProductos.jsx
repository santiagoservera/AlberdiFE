import React, { useState } from "react";
import imgProducto from "../../assets/imgProducto.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";

const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 3,
    nombre: "Producto 3",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 4,
    nombre: "Producto 4",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },
  {
    id: 5,
    nombre: "Producto 5",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 6,
    nombre: "Producto 6",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 7,
    nombre: "Producto 7",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 8,
    nombre: "Producto 8",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },
];

const handleAddImageClick = () => {
  const inputElement = document.getElementById("productPictureInput");
  if (inputElement) {
    inputElement.click();
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setFormData((prevState) => ({
    ...prevState,
    imagen1: file,
  }));
};
const SeccionProductos = () => {
  const [seccionActual, setSeccionActual] = useState("Productos");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: 1,

    imagen1: null,
  });
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="font-firelli">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar producto
              </ModalHeader>
              <ModalBody>
                <Input placeholder="Nombre del producto" />
                <Input placeholder="Descripcion del producto" />
                <div className="bg-white text-black w-full lg:h-[380px] rounded-lg shadow-[0px_4px_4px_0px_#00000040]  mb-5 lg:mb-0">
                  <div className="w-[95%] mx-auto">
                    <div className="py-3">
                      <p className="lg:text-xl font-bold">Fotos</p>
                    </div>
                    <div className="py-10 lg:py-0">
                      {formData.imagen1 ? (
                        <img
                          src={URL.createObjectURL(formData.imagen1)}
                          alt="Preview"
                          className="lg:w-[250px] lg:h-[250px] rounded-lg shadow-[0px_4px_4px_0px_#00000040]"
                        />
                      ) : (
                        <div className="lg:flex lg:flex-col border border-dashed border-black lg:w-[250px] lg:h-[250px] lg:justify-center lg:items-center gap-3 rounded-lg shadow-[0px_4px_4px_0px_#00000040]">
                          <div>
                            <label
                              onClick={handleAddImageClick}
                              className="cursor-pointer text-center lg:px-2 border border-black rounded-full text-3xl items-center"
                            >
                              +
                            </label>
                            <input
                              required
                              id="productPictureInput"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {seccionActual === "Productos" && (
        <div className="flex-1 md:p-6  font-firelli">
          <div className="flex md:flex-row flex-col justify-between items-center mb-6 gap-3">
            <h2 className="text-2xl font-bold text-[#4F6B5F]">Productos</h2>
            <Button
              className="bg-[#4F6B5F] md:text-sm text-xl text-white px-4 py-2 rounded-full hover:bg-[#3e574c] "
              onPress={onOpen}
            >
              + Agregar Producto
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-[200px] w-[200px]"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="md:text-lg text-3xl font-semibold text-[#4F6B5F]">
                      {producto.nombre}
                    </h3>
                    <p className="md:text-sm text-xl text-gray-600">
                      {producto.descripcion}
                    </p>
                  </div>
                  <div className="flex justify-between md:flex-row flex-col gap-2 mt-4">
                    <Button
                      className="md:text-sm text-xl bg-[#4F6B5F] text-white"
                      onClick={() =>
                        console.log("Editar producto", producto.id)
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      className="md:text-sm text-xl text-red-600 "
                      onClick={() =>
                        console.log("Eliminar producto", producto.id)
                      }
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeccionProductos;
