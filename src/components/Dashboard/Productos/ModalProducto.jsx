"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useCategorias } from "../../../hooks";
import { X, ImageIcon } from "lucide-react";

const ModalProducto = ({
  isOpen,
  onOpenChange,
  modo = "crear",
  producto = {},
  onGuardar,
}) => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precioActual: "",
    stock: "",
    subcategoria_id: "",
    imagen: null,
  });

  // Estado para la vista previa de la imagen
  const [imagenPreview, setImagenPreview] = useState(null);

  // Obtener categorías y subcategorías usando el hook
  const {
    categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = useCategorias();

  // Estado para almacenar subcategorías filtradas por categoría seleccionada
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Manejar cambio de precio
  const handlePriceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      precioActual: value,
    }));
  };

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (modo === "editar" && producto) {
        console.log("Producto a editar:", producto);
        setFormData({
          nombre: producto.nombre || "",
          descripcion: producto.descripcion || "",
          precioActual: producto.precioActual || "",
          stock: producto.stock || "",
          subcategoria_id: producto.subcategoria_id || "",
          imagen: null, // No podemos cargar la imagen existente como File
        });

        // Establecer la categoría seleccionada basada en la subcategoría del producto
        if (producto.subcategoria) {
          // Obtener el categoria_id de la subcategoría
          const categoriaId = producto.subcategoria.categoria_id;
          if (categoriaId) {
            setCategoriaSeleccionada(categoriaId.toString());

            // Filtrar subcategorías para esta categoría
            const subcatsDeCategoria =
              categorias.find((cat) => cat.id === categoriaId)?.subcategorias ||
              [];
            setSubcategorias(subcatsDeCategoria);
          }
        }

        // Establecer vista previa de imagen si existe
        if (producto.imagenUrl) {
          // Corregir URL con doble barra si es necesario
          let imagenUrl = producto.imagenUrl;
          if (imagenUrl.includes("/storage//")) {
            imagenUrl = imagenUrl.replace("/storage//", "/storage/");
          }
          setImagenPreview(imagenUrl);
        }
      } else {
        // Resetear el formulario para crear
        setFormData({
          nombre: "",
          descripcion: "",
          precioActual: "",
          stock: "",
          subcategoria_id: "",
          imagen: null,
        });
        setImagenPreview(null);
        setCategoriaSeleccionada("");
        setSubcategorias([]);
      }
    }
  }, [isOpen, modo, producto, categorias]);

  // Manejar cambio de categoría
  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    setCategoriaSeleccionada(categoriaId);

    // Filtrar subcategorías para esta categoría
    const categoriaSeleccionadaObj = categorias.find(
      (cat) => cat.id.toString() === categoriaId
    );
    const subcatsDeCategoria = categoriaSeleccionadaObj?.subcategorias || [];

    setSubcategorias(subcatsDeCategoria);

    // Resetear la subcategoría seleccionada
    setFormData((prev) => ({
      ...prev,
      subcategoria_id: "",
    }));
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        imagen: file,
      }));

      // Crear URL para vista previa
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleAddImageClick = () => {
    document.getElementById("productPictureInput")?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imagen: null,
    }));
    setImagenPreview(null);
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Crear FormData para enviar archivos
    const formDataToSend = new FormData();

    // Agregar todos los campos al FormData
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== ""
      ) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Si estamos editando y no se seleccionó una nueva imagen, indicar que se debe mantener la imagen existente
    if (modo === "editar" && !formData.imagen && producto.imagenUrl) {
      formDataToSend.append("mantener_imagen", "1");
    }

    onGuardar(formDataToSend);

    // Limpiar el formulario después de guardar
    if (modo === "crear") {
      setFormData({
        nombre: "",
        descripcion: "",
        precioActual: "",
        stock: "",
        subcategoria_id: "",
        imagen: null,
      });
      setImagenPreview(null);
      setCategoriaSeleccionada("");
      setSubcategorias([]);
    }
  };

  // Manejar cierre del modal
  const handleClose = () => {
    // Limpiar el formulario al cerrar
    setFormData({
      nombre: "",
      descripcion: "",
      precioActual: "",
      stock: "",
      subcategoria_id: "",
      imagen: null,
    });
    setImagenPreview(null);
    setCategoriaSeleccionada("");
    setSubcategorias([]);

    // Llamar a la función onOpenChange para cerrar el modal
    onOpenChange(false);
  };

  // Función para depuración
  const logFormState = () => {
    console.log("Estado actual del formulario:", {
      formData,
      categoriaSeleccionada,
      subcategorias,
      producto,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
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
                {modo === "crear" ? "Nuevo Producto" : "Editar Producto"}
              </h3>
              <p className="text-sm text-gray-500">
                {modo === "crear"
                  ? "Crea un nuevo producto para tu catálogo"
                  : "Modifica los detalles de este producto"}
              </p>
            </ModalHeader>
            <ModalBody>
              {loadingCategorias ? (
                <div className="flex justify-center py-4">
                  <Spinner size="lg" color="#4F6B5F" />
                </div>
              ) : errorCategorias ? (
                <div className="text-red-500 text-center py-2">
                  Error al cargar categorías: {errorCategorias}
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <Input
                        label="Nombre del producto"
                        placeholder="Escriba un nombre"
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        variant="bordered"
                        labelPlacement="outside"
                        classNames={{
                          label: "text-sm font-medium text-gray-700",
                        }}
                      />
                    </div>

                    <div>
                      <Textarea
                        label="Descripción"
                        placeholder="Escriba una descripción"
                        value={formData.descripcion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descripcion: e.target.value,
                          })
                        }
                        variant="bordered"
                        labelPlacement="outside"
                        classNames={{
                          label: "text-sm font-medium text-gray-700",
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="number"
                          label="Precio"
                          placeholder="Precio"
                          value={formData.precioActual}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              precioActual: e.target.value,
                            })
                          }
                          variant="bordered"
                          labelPlacement="outside"
                          classNames={{
                            label: "text-sm font-medium text-gray-700",
                          }}
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          label="Stock"
                          placeholder="Stock disponible"
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                          }
                          variant="bordered"
                          labelPlacement="outside"
                          classNames={{
                            label: "text-sm font-medium text-gray-700",
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Categoría
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6B5F]"
                          value={categoriaSeleccionada}
                          onChange={handleCategoriaChange}
                        >
                          <option value="" disabled>
                            Selecciona una categoría
                          </option>
                          {Array.isArray(categorias) &&
                            categorias.map((cat) => (
                              <option key={cat.id} value={cat.id.toString()}>
                                {cat.nombre}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subcategoría
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6B5F]"
                          value={formData.subcategoria_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subcategoria_id: e.target.value,
                            })
                          }
                          disabled={
                            !categoriaSeleccionada || subcategorias.length === 0
                          }
                        >
                          <option value="" disabled>
                            {!categoriaSeleccionada
                              ? "Primero selecciona una categoría"
                              : subcategorias.length === 0
                              ? "No hay subcategorías disponibles"
                              : "Selecciona una subcategoría"}
                          </option>
                          {Array.isArray(subcategorias) &&
                            subcategorias.map((subcat) => (
                              <option
                                key={subcat.id}
                                value={subcat.id.toString()}
                              >
                                {subcat.nombre}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Imagen del producto
                      </p>
                      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                        {imagenPreview ? (
                          <div className="relative w-full">
                            <img
                              src={imagenPreview || "/placeholder.svg"}
                              alt="Vista previa"
                              className="w-full h-48 object-cover rounded-lg"
                              onError={(e) => {
                                console.error(
                                  "Error al cargar la imagen:",
                                  imagenPreview
                                );
                                e.target.onerror = null;
                                e.target.src = "/placeholder.svg";
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
                          id="productPictureInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </ModalBody>
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
                {modo === "crear" ? "Crear producto" : "Guardar cambios"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalProducto;
