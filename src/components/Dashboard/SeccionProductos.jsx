"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
} from "@nextui-org/react";
import ModalProducto from "./Productos/ModalProducto";
import ConfirmacionModal from "./Productos/confirmacion-modal";
import { useProductos, useCategorias } from "../../hooks";
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const SeccionProductos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  // Estado para modal de confirmación de eliminación
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState(null);

  // Estado para modal de error/éxito
  const {
    isOpen: isNotificationOpen,
    onOpen: openNotification,
    onClose: closeNotification,
  } = useDisclosure();
  const [notification, setNotification] = useState({ type: "", message: "" });

  // Usar el hook de productos para obtener los datos de la API
  const {
    productos: productosData,
    loading,
    error,
    fetchProductos,
    createProducto,
    updateProducto,
    deleteProducto,
  } = useProductos();

  const {
    categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = useCategorias();

  // Estado para almacenar los datos de paginación
  const [paginacion, setPaginacion] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 10,
  });

  // Productos extraídos de la respuesta paginada
  const [productos, setProductos] = useState([]);

  // Función para mostrar notificaciones
  const showNotification = (type, message) => {
    setNotification({ type, message });
    openNotification();
  };

  // Cargar productos al montar el componente o cambiar de página
  useEffect(() => {
    const cargarProductos = async () => {
      const params = { page: currentPage };
      const response = await fetchProductos(params);

      if (response && response.data && response.data.data) {
        // Extraer los productos de la respuesta paginada
        // La estructura es response.data.data.data
        const productosExtraidos = response.data.data.data || [];
        setProductos(productosExtraidos);

        // Guardar información de paginación
        setPaginacion({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
          perPage: response.data.data.per_page,
        });
      }
    };

    cargarProductos();
  }, [currentPage, fetchProductos]);

  // Función para construir URL de imagen con timestamp para evitar caché
  const getImageUrl = (producto) => {
    if (!producto) return "/placeholder.svg";

    // Usar el timestamp para evitar caché
    const timestamp = imageTimestamp;

    // Si hay una URL de imagen proporcionada por la API, usarla directamente
    if (producto.imagenUrl) {
      // Corregir URLs con doble barra
      const url = producto.imagenUrl.includes("/storage//")
        ? producto.imagenUrl.replace("/storage//", "/storage/")
        : producto.imagenUrl;

      return `${url}?t=${timestamp}`;
    }

    // Fallback a la imagen por defecto
    return "/placeholder.svg";
  };

  // Filtrar productos según la búsqueda
  const filteredProductos = Array.isArray(productos)
    ? productos.filter((producto) => {
        // Filtro por texto de búsqueda
        const matchesSearch =
          producto?.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          producto?.descripcion
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());

        // Filtro por categoría - Modificado para usar categoria_id de la subcategoría
        const matchesCategoria =
          !categoriaFiltro ||
          producto.subcategoria?.categoria_id?.toString() === categoriaFiltro;

        // Debe cumplir ambos filtros
        return matchesSearch && matchesCategoria;
      })
    : [];

  // Funciones del modal
  const abrirModalEditar = (producto) => {
    setModoModal("editar");
    setProductoSeleccionado(producto);
    setIsModalOpen(true);
  };

  const abrirModalCrear = () => {
    setModoModal("crear");
    setProductoSeleccionado(null);
    setIsModalOpen(true);
  };

  const handleGuardar = async (formData) => {
    try {
      let nuevoProducto;
      if (modoModal === "crear") {
        // Crear nuevo producto usando el servicio API
        nuevoProducto = await createProducto(formData);
        console.log("Producto creado:", nuevoProducto);

        // Mostrar notificación de éxito
        showNotification("success", "Producto creado exitosamente");

        // Añadir el nuevo producto a la lista local
        if (nuevoProducto) {
          setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
        }
      } else {
        // Actualizar producto existente usando el servicio API
        nuevoProducto = await updateProducto(productoSeleccionado.id, formData);

        // Mostrar notificación de éxito
        showNotification("success", "Producto actualizado exitosamente");

        // Actualizar el producto en la lista local
        if (nuevoProducto) {
          setProductos((prevProductos) =>
            prevProductos.map((p) =>
              p.id === productoSeleccionado.id ? nuevoProducto : p
            )
          );
        }
      }

      // Actualizar timestamp para forzar recarga de imágenes
      setImageTimestamp(Date.now());

      // Recargar productos para asegurar sincronización con el servidor
      const response = await fetchProductos({ page: currentPage });

      if (response && response.data && response.data.data) {
        // Actualizar la lista completa con los datos del servidor
        setProductos(response.data.data.data || []);

        // Actualizar información de paginación
        setPaginacion({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
          perPage: response.data.data.per_page,
        });
      }

      // Cerrar modal y limpiar selección
      setIsModalOpen(false);
      setProductoSeleccionado(null);
    } catch (err) {
      console.error("Error al guardar producto:", err);
      // Mostrar notificación de error
      showNotification(
        "error",
        `Error: ${err.message || "No se pudo guardar el producto"}`
      );
    }
  };

  // Funciones para el modal de confirmación
  const openConfirmDeleteModal = (producto, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setProductoEliminar(producto);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setProductoEliminar(null);
  };

  // Función para manejar la eliminación
  const handleConfirmDelete = async () => {
    try {
      await deleteProducto(productoEliminar.id);
      showNotification("success", "Producto eliminado exitosamente");

      // Recargar productos después de eliminar
      await fetchProductos({ page: currentPage });
      closeConfirmModal();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      showNotification(
        "error",
        `Error: ${error.message || "No se pudo eliminar el producto"}`
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para forzar la recarga de productos
  const handleRefreshProductos = () => {
    // Actualizar timestamp para forzar recarga de imágenes
    setImageTimestamp(Date.now());
    fetchProductos({ page: currentPage });
    showNotification("success", "Lista de productos actualizada");
  };

  const getCategorias = () => {
    // Si las categorías están cargando o hay un error, devolver un array vacío
    if (loadingCategorias || errorCategorias || !Array.isArray(categorias))
      return [];

    // Devolver directamente las categorías del hook
    return categorias;
  };

  // Añadir una función para limpiar los filtros
  const limpiarFiltros = () => {
    setSearchQuery("");
    setCategoriaFiltro("");
  };

  // Renderizar botones de paginación
  const renderPaginacion = () => {
    const pages = [];
    for (let i = 1; i <= paginacion.lastPage; i++) {
      pages.push(
        <Button
          key={i}
          className={`mx-1 px-3 py-1 ${
            i === paginacion.currentPage
              ? "bg-[#4F6B5F] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return (
      <div className="flex justify-center mt-6">
        <Button
          className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={paginacion.currentPage === 1}
          onClick={() => handlePageChange(paginacion.currentPage - 1)}
        >
          Anterior
        </Button>
        {pages}
        <Button
          className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={paginacion.currentPage === paginacion.lastPage}
          onClick={() => handlePageChange(paginacion.currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    );
  };

  // Componente de Skeleton para productos
  const ProductoSkeleton = () => (
    <Card className="overflow-hidden shadow-sm">
      <CardBody className="p-0 overflow-hidden">
        <Skeleton className="rounded-none">
          <div className="h-48 w-full bg-default-300"></div>
        </Skeleton>
        <div className="p-4 space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-5 w-1/4 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="flex gap-2 mt-2">
            <Skeleton className="w-20 h-5 rounded-full">
              <div className="h-5 w-20 rounded-full bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-20 h-5 rounded-full">
              <div className="h-5 w-20 rounded-full bg-default-200"></div>
            </Skeleton>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between items-center px-4 py-3 bg-gray-50">
        <Skeleton className="w-20 rounded-lg">
          <div className="h-8 w-20 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-20 rounded-lg">
          <div className="h-8 w-20 rounded-lg bg-default-200"></div>
        </Skeleton>
      </CardFooter>
    </Card>
  );

  // Renderizar skeletons mientras se cargan los productos
  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => <ProductoSkeleton key={index} />);
  };

  return (
    <div>
      <ModalProducto
        isOpen={isModalOpen}
        onOpenChange={(open) => setIsModalOpen(open)}
        modo={modoModal}
        producto={productoSeleccionado}
        onGuardar={handleGuardar}
      />

      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#4F6B5F] mb-1">
              Productos
            </h1>
            <p className="text-gray-500 text-sm">
              Gestiona los productos de tu catálogo
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search size={18} className="text-gray-400" />}
                  classNames={{
                    input: "pl-8",
                  }}
                  className="w-full"
                  size="sm"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  className="w-full h-9 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F6B5F] focus:border-[#4F6B5F]"
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                  disabled={loadingCategorias}
                >
                  <option value="">Todas las categorías</option>
                  {loadingCategorias ? (
                    <option disabled>Cargando categorías...</option>
                  ) : errorCategorias ? (
                    <option disabled>Error al cargar categorías</option>
                  ) : (
                    getCategorias().map((categoria) => (
                      <option
                        key={categoria.id}
                        value={categoria.id.toString()}
                      >
                        {categoria.nombre}
                      </option>
                    ))
                  )}
                </select>
              </div>
              {(searchQuery || categoriaFiltro) && (
                <Button
                  variant="flat"
                  size="sm"
                  onClick={limpiarFiltros}
                  className="min-w-0 px-3"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
            <Button
              color="primary"
              className="bg-[#4F6B5F] text-white"
              startContent={<Plus size={18} />}
              onClick={abrirModalCrear}
            >
              Nuevo producto
            </Button>
            <Button
              variant="flat"
              onClick={handleRefreshProductos}
              className="min-w-0 px-3"
              isIconOnly
              title="Actualizar lista"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
              </svg>
            </Button>
          </div>
        </div>

        {(searchQuery || categoriaFiltro) && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <span>Filtros activos:</span>
            {searchQuery && (
              <Chip
                variant="flat"
                onClose={() => setSearchQuery("")}
                className="bg-gray-100"
              >
                Búsqueda: {searchQuery}
              </Chip>
            )}
            {categoriaFiltro && (
              <Chip
                variant="flat"
                onClose={() => setCategoriaFiltro("")}
                className="bg-gray-100"
              >
                Categoría:{" "}
                {getCategorias().find(
                  (c) => c.id.toString() === categoriaFiltro
                )?.nombre || "Categoría seleccionada"}
              </Chip>
            )}
            <Button
              size="sm"
              variant="light"
              onClick={limpiarFiltros}
              className="ml-auto text-xs"
            >
              Limpiar todos
            </Button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderSkeletons()}
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            <p>Error al cargar productos: {error}</p>
            <Button
              color="primary"
              variant="flat"
              className="mt-4"
              onClick={() => fetchProductos({ page: currentPage })}
            >
              Intentar nuevamente
            </Button>
          </div>
        ) : filteredProductos.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4F6B5F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay productos
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery && categoriaFiltro
                ? `No se encontraron productos que coincidan con "${searchQuery}" en la categoría seleccionada.`
                : searchQuery
                ? `No se encontraron productos que coincidan con "${searchQuery}".`
                : categoriaFiltro
                ? "No hay productos en la categoría seleccionada."
                : "Comienza agregando un nuevo producto a tu catálogo."}
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                color="primary"
                className="bg-[#4F6B5F] text-white"
                startContent={<Plus size={18} />}
                onClick={abrirModalCrear}
              >
                Agregar primer producto
              </Button>
              {(searchQuery || categoriaFiltro) && (
                <Button variant="flat" onClick={limpiarFiltros}>
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProductos.map((producto) => (
                <Card
                  key={`${producto.id}-${imageTimestamp}`}
                  className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardBody className="p-0 overflow-hidden">
                    {/* Imagen del producto */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(producto) || "/placeholder.svg"}
                        alt={producto.nombre}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Botones de acción */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              className="bg-white/90 backdrop-blur-md"
                            >
                              <MoreVertical
                                size={16}
                                className="text-gray-700"
                              />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Acciones de producto">
                            <DropdownItem
                              key="edit"
                              startContent={<Edit2 size={16} />}
                              onClick={() => abrirModalEditar(producto)}
                            >
                              Editar producto
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              startContent={<Trash2 size={16} />}
                              onClick={(e) =>
                                openConfirmDeleteModal(producto, e)
                              }
                            >
                              Eliminar producto
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                        {producto.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {producto.descripcion}
                      </p>
                      <p className="text-sm font-semibold mt-2">
                        {formatCurrency(producto.precioActual)}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {producto.subcategoria && (
                          <>
                            {/* Mostrar la categoría buscando por el categoria_id de la subcategoría */}
                            {getCategorias().find(
                              (c) => c.id === producto.subcategoria.categoria_id
                            ) && (
                              <Chip size="sm" variant="flat" color="primary">
                                {getCategorias().find(
                                  (c) =>
                                    c.id === producto.subcategoria.categoria_id
                                )?.nombre || ""}
                              </Chip>
                            )}
                            {/* Mostrar la subcategoría */}
                            <Chip size="sm" variant="flat" color="secondary">
                              {producto.subcategoria.nombre}
                            </Chip>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Stock: {producto.stock}
                      </p>
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex justify-between items-center px-4 py-3 bg-gray-50">
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      onClick={() => abrirModalEditar(producto)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      onClick={(e) => openConfirmDeleteModal(producto, e)}
                    >
                      Eliminar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Paginación */}
            {paginacion.lastPage > 1 && renderPaginacion()}

            {/* Información de paginación */}
            <div className="text-center text-gray-500 mt-4">
              Mostrando {filteredProductos.length} de {paginacion.total}{" "}
              productos
            </div>
          </>
        )}
      </div>

      {/* Modal de notificación */}
      <Modal isOpen={isNotificationOpen} onClose={closeNotification} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 items-center">
                {notification.type === "success" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4F6B5F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-[#4F6B5F]">Éxito</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} className="text-danger" />
                    <span className="text-danger">Error</span>
                  </>
                )}
              </ModalHeader>
              <ModalBody>
                <p>{notification.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color={notification.type === "success" ? "primary" : "danger"}
                  variant="light"
                  onPress={onClose}
                  className={
                    notification.type === "success"
                      ? "bg-[#4F6B5F]/10 text-[#4F6B5F]"
                      : ""
                  }
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <ConfirmacionModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        titulo="Eliminar producto"
        mensaje={`¿Está seguro que desea eliminar el producto "${
          productoEliminar?.nombre || ""
        }"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
};

export default SeccionProductos;
