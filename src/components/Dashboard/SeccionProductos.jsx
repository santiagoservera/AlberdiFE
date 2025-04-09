import React, { useState, useEffect } from "react";
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
  Select,
  Textarea,
} from "@heroui/react";
import ModalProducto from "./ModalProducto";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Desinfectante Multiusos",
      descripcion: "Elimina el 99.9% de bacterias en superficies.",
      detalle: "Ideal para baños, cocinas y pisos.",
      categoria: "Limpieza",
      imagen: imgProducto,
    },
    {
      id: 2,
      nombre: "Detergente Líquido",
      descripcion: "Eficaz contra grasa difícil.",
      detalle: "Para vajilla, utensilios y superficies de cocina.",
      categoria: "Limpieza",
      imagen: imgProducto,
    },
    {
      id: 3,
      nombre: "Limpiavidrios",
      descripcion: "Deja los vidrios y espejos relucientes.",
      detalle: "Fórmula sin marcas ni residuos.",
      categoria: "Vidrios",
      imagen: imgProducto,
    },
    {
      id: 4,
      nombre: "Limpiador Perfumado",
      descripcion: "Limpieza profunda con fragancia duradera.",
      detalle: "Disponible en lavanda, cítrico y floral.",
      categoria: "Limpieza",
      imagen: imgProducto,
    },
    {
      id: 5,
      nombre: "Jabón para manos",
      descripcion: "Suave con la piel, elimina gérmenes.",
      detalle: "Apto para uso frecuente.",
      categoria: "Higiene personal",
      imagen: imgProducto,
    },
    {
      id: 6,
      nombre: "Alcohol en gel",
      descripcion: "Desinfección rápida sin agua.",
      detalle: "Ideal para manos y superficies pequeñas.",
      categoria: "Higiene personal",
      imagen: imgProducto,
    },
    {
      id: 7,
      nombre: "Limpiador de pisos",
      descripcion: "Para cerámica, mármol y madera.",
      detalle: "No requiere enjuague.",
      categoria: "Pisos",
      imagen: imgProducto,
    },
    {
      id: 8,
      nombre: "Desengrasante Industrial",
      descripcion: "Poderoso contra grasa incrustada.",
      detalle: "Uso profesional en cocinas y talleres.",
      categoria: "Industrial",
      imagen: imgProducto,
    },
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: 1,

    imagen1: null,
  });

  // Funciones del modal
  const abrirModalEditar = (producto) => {
    console.log("Producto recibido:", producto); // ← esto
    setModoModal("editar");
    setProductoSeleccionado(producto);
    setIsModalOpen(true);
  };
  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto); // <-- le pasás todo el objeto
    setModo("editar");
    setIsModalOpen(true);
  };

  const abrirModalCrear = () => {
    setModoModal("crear");
    setProductoSeleccionado(null);
    setIsModalOpen(true);
  };
  const handleGuardar = (formData) => {
    if (modoModal === "crear") {
      const nuevoProducto = {
        id: productos.length + 1, // o usar un generador de ID
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        detalle: formData.detalle,
        categoria: formData.categoria,
        imagen: imgProducto, // o podés usar la imagen subida (formData.imagen1)
      };

      setProductos((prev) => [...prev, nuevoProducto]);
      console.log("Producto nuevo:", nuevoProducto);
    } else {
      const productoActualizado = {
        ...productoSeleccionado, // mantenés el ID original
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        detalle: formData.detalle,
        categoria: formData.categoria,
        imagen: productoSeleccionado.imagen, // o formData.imagen1 si querés actualizar
      };

      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoActualizado.id ? productoActualizado : p
        )
      );
      console.log("Producto actualizado:", productoActualizado);
    }

    // Cerrar modal y limpiar selección
    setIsModalOpen(false);
    setProductoSeleccionado(null);
  };
  //Fin funciones modal

  return (
    <div>
      <ModalProducto
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        modo={modoModal}
        producto={productoSeleccionado}
        onGuardar={handleGuardar}
      />
      {seccionActual === "Productos" && (
        <div className="flex-1 md:p-6  font-firelli">
          <div className="flex md:flex-row flex-col justify-between items-center mb-6 gap-3">
            <h2 className="text-2xl font-bold text-[#4F6B5F]">Productos</h2>
            <Button
              className="bg-[#4F6B5F] md:text-sm text-xl text-white px-4 py-2 rounded-full hover:bg-[#3e574c] "
              onPress={abrirModalCrear}
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
                      onPress={() => abrirModalEditar(producto)}
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
