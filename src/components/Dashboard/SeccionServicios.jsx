"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Spinner,
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
} from "@nextui-org/react";
import { CreateServicioModal } from "./Servicios/servicios-modal";
import { ConfirmacionModal } from "./Servicios/confirmacion-modal";
import { useServicios } from "../../hooks";
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

export default function SeccionServicios() {
  // Usar el hook de servicios para obtener los datos de la API
  const {
    servicios,
    loading,
    error,
    fetchServicios,
    createServicio,
    updateServicio,
    deleteServicio: eliminarServicio,
  } = useServicios();

  // Estado para el modal de servicio
  const [isServicioModalOpen, setIsServicioModalOpen] = useState(false);
  const [modalServicioMode, setModalServicioMode] = useState("crear");
  const [servicioEditar, setServicioEditar] = useState(null);

  // Estado para el modal de confirmación
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [servicioEliminar, setServicioEliminar] = useState(null);

  // Estado para búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para servicio en vista previa
  const [servicioPreview, setServicioPreview] = useState(null);

  // Estado para modal de error/éxito
  const {
    isOpen: isNotificationOpen,
    onOpen: openNotification,
    onClose: closeNotification,
  } = useDisclosure();
  const [notification, setNotification] = useState({ type: "", message: "" });

  // Estado para controlar la recarga de imágenes (timestamp para evitar caché)
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  // Filtrar servicios según la búsqueda
  const filteredServicios = Array.isArray(servicios)
    ? servicios.filter(
        (servicio) =>
          servicio?.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          servicio?.descripcion
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  // Efecto para recargar servicios cuando cambia el componente
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  // Funciones para el modal de servicio
  const openCreateServicioModal = () => {
    setModalServicioMode("crear");
    setServicioEditar(null);
    setIsServicioModalOpen(true);
  };

  const openEditServicioModal = (servicio) => {
    setModalServicioMode("editar");
    setServicioEditar(servicio);
    setIsServicioModalOpen(true);
  };

  const closeServicioModal = () => {
    setIsServicioModalOpen(false);
  };

  // Funciones para el modal de confirmación
  const openConfirmDeleteModal = (servicio, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setServicioEliminar(servicio);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setServicioEliminar(null);
  };

  // Función para mostrar notificaciones
  const showNotification = (type, message) => {
    setNotification({ type, message });
    openNotification();
  };

  // Función para construir URL de imagen con timestamp para evitar caché
  const getImageUrl = (servicio) => {
    if (!servicio) return "/customer-service-interaction.png";

    // Usar el timestamp específico del servicio si existe, o el general
    const timestamp = servicio._imageTimestamp || imageTimestamp;

    // Si hay una URL de imagen proporcionada por la API, usarla directamente
    if (servicio.imagenUrl) {
      return `${servicio.imagenUrl}?t=${timestamp}`;
    }

    // Fallback a la imagen por defecto
    return "/customer-service-interaction.png";
  };

  // Funciones CRUD para servicios
  const saveServicio = async (servicioData) => {
    try {
      if (modalServicioMode === "crear") {
        // Crear nuevo servicio usando el servicio API
        await createServicio(servicioData);
        showNotification("success", "Servicio creado exitosamente");
      } else {
        // Actualizar servicio existente usando el servicio API
        await updateServicio(servicioEditar.id, servicioData);
        showNotification("success", "Servicio actualizado exitosamente");
      }

      // Actualizar timestamp para forzar recarga de imágenes
      setImageTimestamp(Date.now());

      // Recargar servicios después de crear/actualizar
      await fetchServicios();
      closeServicioModal();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
      showNotification(
        "error",
        `Error: ${error.message || "No se pudo guardar el servicio"}`
      );
    }
  };

  // Función para manejar la eliminación
  const handleConfirmDelete = async () => {
    try {
      await eliminarServicio(servicioEliminar.id);
      showNotification("success", "Servicio eliminado exitosamente");

      // Recargar servicios después de eliminar
      await fetchServicios();
      closeConfirmModal();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      showNotification(
        "error",
        `Error: ${error.message || "No se pudo eliminar el servicio"}`
      );
    }
  };

  // Función para abrir la vista previa de un servicio
  const openServicePreview = (servicio) => {
    setServicioPreview(servicio);
  };

  // Función para cerrar la vista previa
  const closeServicePreview = () => {
    setServicioPreview(null);
  };

  // Función para forzar la recarga de servicios
  const handleRefreshServicios = () => {
    // Actualizar timestamp para forzar recarga de imágenes
    setImageTimestamp(Date.now());
    fetchServicios();
    showNotification("success", "Lista de servicios actualizada");
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con búsqueda y botón de agregar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#4F6B5F] mb-1">
              Servicios
            </h1>
            <p className="text-gray-500 text-sm">
              Gestiona los servicios que ofrece tu empresa
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Buscar servicios..."
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
            <Button
              color="primary"
              className="bg-[#4F6B5F] text-white font-firelli"
              startContent={<Plus size={18} />}
              onClick={openCreateServicioModal}
            >
              Nuevo servicio
            </Button>
            <Button
              variant="flat"
              onClick={handleRefreshServicios}
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

        {/* Contenido principal */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" color="#4F6B5F" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            <p>Error al cargar servicios: {error}</p>
            <Button
              color="primary"
              variant="flat"
              className="mt-4"
              onClick={handleRefreshServicios}
            >
              Intentar nuevamente
            </Button>
          </div>
        ) : filteredServicios.length === 0 ? (
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay servicios
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "No se encontraron servicios que coincidan con tu búsqueda."
                : "Comienza agregando un nuevo servicio para mostrar a tus clientes."}
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                color="primary"
                className="bg-[#4F6B5F] text-white font-firelli"
                startContent={<Plus size={18} />}
                onClick={openCreateServicioModal}
              >
                Agregar primer servicio
              </Button>
              {servicios.length === 0 && (
                <Button variant="flat" onClick={handleRefreshServicios}>
                  Actualizar lista
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServicios.map((servicio) => (
              <Card
                key={`${servicio.id}-${imageTimestamp}`}
                isPressable
                onPress={() => openServicePreview(servicio)}
                className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardBody className="p-0 overflow-hidden">
                  {/* Imagen del servicio */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(servicio) || "/placeholder.svg"}
                      alt={servicio.nombre}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/customer-service-interaction.png";
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
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical size={16} className="text-gray-700" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Acciones de servicio">
                          <DropdownItem
                            key="view"
                            startContent={<Eye size={16} />}
                            onClick={(e) => {
                              if (e && e.preventDefault) e.preventDefault();
                              openServicePreview(servicio);
                            }}
                          >
                            Ver detalles
                          </DropdownItem>
                          <DropdownItem
                            key="edit"
                            startContent={<Edit2 size={16} />}
                            onClick={(e) => {
                              if (e && e.preventDefault) e.preventDefault();
                              openEditServicioModal(servicio);
                            }}
                          >
                            Editar servicio
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<Trash2 size={16} />}
                            onClick={(e) => {
                              if (e && e.preventDefault) e.preventDefault();
                              openConfirmDeleteModal(servicio, e);
                            }}
                          >
                            Eliminar servicio
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {servicio.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {servicio.descripcion}
                    </p>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between items-center px-4 py-3 bg-gray-50">
                  <Chip size="sm" variant="flat" color="primary">
                    Servicio
                  </Chip>
                  <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    endContent={<ArrowUpRight size={14} />}
                    className="text-xs font-medium"
                    onClick={(e) => {
                      if (e) e.stopPropagation();
                      openServicePreview(servicio);
                    }}
                  >
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de vista previa de servicio */}
      {servicioPreview && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeServicePreview}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 w-full bg-gray-100">
              <img
                src={getImageUrl(servicioPreview) || "/placeholder.svg"}
                alt={servicioPreview.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/customer-service-interaction.png";
                }}
              />
              <Button
                isIconOnly
                size="sm"
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md"
                onClick={closeServicePreview}
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>
            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 16rem)" }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {servicioPreview.nombre}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {servicioPreview.descripcion}
              </p>
            </div>
            <Divider />
            <div className="p-4 flex justify-end gap-2 bg-gray-50">
              <Button
                variant="flat"
                color="default"
                onClick={closeServicePreview}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                className="bg-[#4F6B5F]"
                startContent={<Edit2 size={16} />}
                onClick={() => {
                  closeServicePreview();
                  openEditServicioModal(servicioPreview);
                }}
              >
                Editar servicio
              </Button>
            </div>
          </div>
        </div>
      )}

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

      {/* Modales */}
      <CreateServicioModal
        isOpen={isServicioModalOpen}
        onClose={closeServicioModal}
        onSave={saveServicio}
        modo={modalServicioMode}
        servicioEditar={servicioEditar}
      />

      <ConfirmacionModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        titulo="Eliminar servicio"
        mensaje={`¿Está seguro que desea eliminar el servicio "${
          servicioEliminar?.nombre || ""
        }"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}
