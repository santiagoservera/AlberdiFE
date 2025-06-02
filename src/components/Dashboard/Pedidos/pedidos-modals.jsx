"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
  Tooltip,
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Pagination,
  Tabs,
  Tab,
  Textarea,
} from "@heroui/react";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Minus,
  MessageCircle,
  Package,
  Wrench,
  ChevronDown,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

// Estados de pedido actualizados para la API real
export const estadosPedido = [
  { key: "pendiente", value: "Pendiente" },
  { key: "rechazado", value: "Rechazado" },
  { key: "aceptado", value: "Aceptado" },
];

// Tipos de pedido basados en service_id
export const tiposPedido = [
  { key: "Producto", value: "Productos" },
  { key: "Servicio", value: "Servicios" },
];

// Mapeo de colores para estados
export const statusColorMap = {
  pendiente: "warning", // amarillo
  rechazado: "danger", // rojo
  aceptado: "success", // verde
};

// Componente CustomSelect personalizado
const CustomSelect = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  isRequired = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.key === value);

  const handleSelect = (optionKey) => {
    onChange(optionKey);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-left 
            shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none
            transition-colors duration-200 hover:border-gray-400
            ${isOpen ? "border-green-500 ring-1 ring-green-500" : ""}
          `}
        >
          <span
            className={`block truncate ${
              selectedOption ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {selectedOption ? selectedOption.value : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none border border-gray-200">
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelect(option.key)}
                className={`
                  relative w-full text-left px-3 py-2 hover:bg-green-50 focus:bg-green-50 
                  focus:outline-none transition-colors duration-150
                  ${
                    value === option.key
                      ? "bg-green-50 text-green-900"
                      : "text-gray-900"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="block truncate">{option.value}</span>
                  {value === option.key && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Modal de Confirmación de Stock
const StockConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  productos,
  isLoading = false,
}) => {
  if (!productos || productos.length === 0) return null;

  const hasStockIssues = productos.some(
    (p) => p.stockActual - p.cantidadOrden < 0
  );
  const totalProductos = productos.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ "@initial": "full", "@md": "2xl" }}
      scrollBehavior="inside"
      placement="center"
      backdrop="blur"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        base: "max-h-[90vh] sm:max-h-[85vh]",
        body: "p-3 sm:p-5",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                    hasStockIssues ? "bg-danger-100" : "bg-warning-100"
                  }`}
                >
                  <Package
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      hasStockIssues ? "text-danger-600" : "text-warning-600"
                    }`}
                  />
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Confirmación de Stock
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Revisar disponibilidad antes de aceptar la orden
                  </p>
                </div>
              </div>
            </ModalHeader>

            <ModalBody className="py-2 sm:py-4">
              {/* Resumen */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card
                  className={`mb-4 ${
                    hasStockIssues
                      ? "bg-danger-50 border-danger-200"
                      : "bg-success-50 border-success-200"
                  }`}
                >
                  <CardBody className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {hasStockIssues ? (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-danger-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-danger-600" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-success-100 rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success-600" />
                          </div>
                        )}
                        <div>
                          <p
                            className={`font-semibold text-sm sm:text-base ${
                              hasStockIssues
                                ? "text-danger-800"
                                : "text-success-800"
                            }`}
                          >
                            {hasStockIssues
                              ? "Stock Insuficiente Detectado"
                              : "Stock Suficiente"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {totalProductos} producto
                            {totalProductos > 1 ? "s" : ""} en la orden
                          </p>
                        </div>
                      </div>
                      <Chip
                        color={hasStockIssues ? "danger" : "success"}
                        variant="flat"
                        size="sm"
                      >
                        {hasStockIssues ? "Revisar" : "Listo"}
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Lista de Productos */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Detalle por Producto
                </h4>

                {productos.map((producto, index) => {
                  const stockRestante =
                    producto.stockActual - producto.cantidadOrden;
                  const tieneProblema = stockRestante < 0;

                  return (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <Card
                        className={`transition-all duration-200 ${
                          tieneProblema
                            ? "border-danger-200 bg-danger-50"
                            : "border-success-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <CardBody className="p-3 sm:p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="font-semibold text-gray-900 text-sm sm:text-base">
                                  {producto.nombre}
                                </h5>
                                {tieneProblema && (
                                  <Chip color="danger" size="sm" variant="flat">
                                    Sin Stock
                                  </Chip>
                                )}
                              </div>

                              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                                <div>
                                  <p className="text-gray-500">Stock Actual</p>
                                  <p className="font-semibold text-base sm:text-lg text-gray-900">
                                    {producto.stockActual}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">
                                    Cantidad Orden
                                  </p>
                                  <p className="font-semibold text-base sm:text-lg text-primary-600">
                                    -{producto.cantidadOrden}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">
                                    Stock Resultante
                                  </p>
                                  <p
                                    className={`font-semibold text-base sm:text-lg ${
                                      tieneProblema
                                        ? "text-danger-600"
                                        : "text-success-600"
                                    }`}
                                  >
                                    {stockRestante}
                                  </p>
                                </div>
                              </div>

                              {tieneProblema && (
                                <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-danger-100 rounded-lg">
                                  <p className="text-xs text-danger-700 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Faltarán {Math.abs(stockRestante)} unidades
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="ml-2 sm:ml-4 hidden sm:block">
                              <div
                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                                  tieneProblema
                                    ? "bg-danger-100"
                                    : "bg-success-100"
                                }`}
                              >
                                {tieneProblema ? (
                                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-danger-600" />
                                ) : (
                                  <Check className="w-6 h-6 sm:w-8 sm:h-8 text-success-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mensaje de Advertencia */}
              {hasStockIssues && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-r from-danger-50 to-warning-50 border-danger-200 mt-4">
                    <CardBody className="p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-danger-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-danger-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-danger-800 mb-1 text-sm sm:text-base">
                            ⚠️ Atención Requerida
                          </h5>
                          <p className="text-xs sm:text-sm text-danger-700 leading-relaxed">
                            Algunos productos no tienen stock suficiente. Al
                            aceptar esta orden, los productos quedarán con stock
                            negativo. Considera contactar al proveedor o ajustar
                            las cantidades antes de proceder.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )}
            </ModalBody>

            <ModalFooter className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                fullWidth
                size="sm"
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
                startContent={<X className="w-4 h-4" />}
                className="sm:flex-1 sm:mr-2"
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                size="sm"
                color={hasStockIssues ? "warning" : "success"}
                onPress={onConfirm}
                isLoading={isLoading}
                startContent={!isLoading && <Check className="w-4 h-4" />}
                className="font-medium sm:flex-1"
              >
                {isLoading
                  ? "Procesando..."
                  : hasStockIssues
                  ? "Aceptar de Todas Formas"
                  : "Confirmar y Aceptar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// Modal de Edición
export const EditModal = ({
  isOpen,
  onClose,
  editingPedido,
  handleEditChange,
  handleEditServicioChange,
  saveChanges,
  servicios,
  productos, // Agregar esta prop
}) => {
  const [showStockModal, setShowStockModal] = useState(false);
  const [pendingEstado, setPendingEstado] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);

  useEffect(() => {
    if (!editingPedido) return;
  }, [editingPedido]);

  const handleEstadoChange = async (estadoKey) => {
    // Si está cambiando a "aceptado", mostrar modal de stock
    if (estadoKey === "aceptado" && editingPedido.estado !== "aceptado") {
      // Verificar si es un pedido de productos
      if (
        editingPedido.tipo === "Producto" &&
        editingPedido.products &&
        editingPedido.products.length > 0
      ) {
        const productosStock = editingPedido.products.map((producto) => ({
          nombre: producto.nombre,
          stockActual: producto.stock || 0,
          cantidadOrden: producto.pivot?.cantidad || 1,
        }));

        setStockData(productosStock);
        setPendingEstado(estadoKey);
        setShowStockModal(true);
        return;
      }
    }

    // Si no es cambio a aceptado o no hay productos, cambiar directamente
    handleEditChange({ target: { name: "estado", value: estadoKey } });
  };

  const handleStockConfirm = async () => {
    setIsUpdatingStock(true);
    try {
      handleEditChange({ target: { name: "estado", value: pendingEstado } });
      setShowStockModal(false);
      setPendingEstado(null);
      setStockData([]);
    } catch (error) {
      console.error("Error al confirmar stock:", error);
    } finally {
      setIsUpdatingStock(false);
    }
  };

  const handleStockCancel = () => {
    setShowStockModal(false);
    setPendingEstado(null);
    setStockData([]);
  };

  if (!editingPedido) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ "@initial": "full", "@md": "lg" }}
      scrollBehavior="outside"
      placement="center"
      classNames={{
        base: "max-h-[90vh] sm:max-h-[85vh]",
        body: "p-3 sm:p-5",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="font-firelli text-textoVerde text-lg sm:text-xl">
                Editar Pedido
              </h3>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  name="nombre"
                  value={editingPedido.nombre || ""}
                  onChange={handleEditChange}
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={editingPedido.email || ""}
                  onChange={handleEditChange}
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Teléfono"
                  name="telefono"
                  value={editingPedido.telefono || ""}
                  onChange={handleEditChange}
                  variant="bordered"
                  size="sm"
                />

                <CustomSelect
                  label="Estado"
                  placeholder="Seleccionar estado"
                  value={editingPedido.estado}
                  onChange={handleEstadoChange}
                  options={estadosPedido}
                />

                <div className="md:col-span-2">
                  <Textarea
                    label="Dirección"
                    name="direccion"
                    value={editingPedido.direccion || ""}
                    onChange={handleEditChange}
                    variant="bordered"
                    minRows={2}
                    size="sm"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                fullWidth
                size="sm"
                color="danger"
                variant="light"
                onPress={onClose}
                className="sm:flex-1 sm:mr-2"
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                size="sm"
                color="success"
                onPress={saveChanges}
                className="font-medium sm:flex-1"
              >
                Guardar Cambios
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      {/* Modal de Confirmación de Stock */}
      <StockConfirmationModal
        isOpen={showStockModal}
        onClose={handleStockCancel}
        onConfirm={handleStockConfirm}
        productos={stockData}
        isLoading={isUpdatingStock}
      />
    </Modal>
  );
};

// Modal de Vista
export const ViewModal = ({
  isOpen,
  onClose,
  viewingPedido,
  servicios,
  productos,
}) => {
  if (!viewingPedido) return null;

  const servicio = viewingPedido.service_id
    ? servicios.find((s) => s.id === viewingPedido.service_id)
    : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ "@initial": "full", "@md": "lg" }}
      scrollBehavior="outside"
      placement="center"
      classNames={{
        base: "max-h-[90vh] sm:max-h-[85vh]",
        body: "p-3 sm:p-5",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="font-firelli text-textoVerde text-lg sm:text-xl">
                Detalles del Pedido
              </h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4 sm:space-y-6">
                {/* Información del Cliente */}
                <Card className="bg-gradient-to-r from-primary-50 to-primary-100">
                  <CardBody className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold">
                          {viewingPedido.nombre}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {viewingPedido.email}
                        </p>
                      </div>
                      <Chip
                        className="capitalize"
                        color={statusColorMap[viewingPedido.estado]}
                        size="sm"
                        variant="flat"
                      >
                        {viewingPedido.estado}
                      </Chip>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tooltip content="Enviar mensaje por WhatsApp">
                        <Button
                          as="a"
                          href={`https://wa.me/${viewingPedido.telefono?.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                          color="success"
                          variant="flat"
                          startContent={
                            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          }
                        >
                          {viewingPedido.telefono}
                        </Button>
                      </Tooltip>
                    </div>
                  </CardBody>
                </Card>

                {/* Información del Pedido */}
                <div>
                  <h4 className="font-medium mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    {viewingPedido.tipo === "Servicio" ? (
                      <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                    ) : (
                      <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                    )}
                    {viewingPedido.tipo === "Servicio"
                      ? "Servicio Solicitado"
                      : "Productos Solicitados"}
                  </h4>

                  {viewingPedido.tipo === "Servicio" && servicio ? (
                    <Card>
                      <CardBody className="p-3 sm:p-4">
                        <div className="flex gap-3 sm:gap-4">
                          <Image
                            alt={servicio.nombre}
                            className="object-cover rounded-lg w-16 h-16 sm:w-20 sm:h-20"
                            src={
                              servicio.imagenUrl ||
                              "/placeholder.svg?height=80&width=80"
                            }
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm sm:text-base">
                              {servicio.nombre}
                            </h5>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              {servicio.descripcion}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ) : viewingPedido.products &&
                    viewingPedido.products.length > 0 ? (
                    <div className="space-y-2 sm:space-y-3">
                      {viewingPedido.products.map((producto) => (
                        <Card key={producto.id}>
                          <CardBody className="p-3 sm:p-4">
                            <div className="flex gap-3 sm:gap-4">
                              <Image
                                alt={producto.nombre}
                                className="object-cover rounded-lg w-12 h-12 sm:w-16 sm:h-16"
                                src={
                                  producto.imagenUrl ||
                                  "/placeholder.svg?height=64&width=64"
                                }
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-semibold text-sm sm:text-base">
                                      {producto.nombre}
                                    </h5>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                      {producto.descripcion}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <Chip
                                      color="primary"
                                      variant="flat"
                                      size="sm"
                                    >
                                      Cantidad: {producto.pivot?.cantidad || 1}
                                    </Chip>
                                    {producto.pivot?.precioOrden && (
                                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        $
                                        {Number.parseFloat(
                                          producto.pivot.precioOrden
                                        ).toLocaleString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardBody className="p-3 sm:p-4 text-center">
                        <p className="text-gray-500 text-sm">
                          No hay información de productos/servicios disponible
                        </p>
                      </CardBody>
                    </Card>
                  )}
                </div>

                {/* Dirección de Entrega */}
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">
                    Dirección de Entrega
                  </h4>
                  <Card className="bg-gray-50">
                    <CardBody className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm">
                        {viewingPedido.direccion || "No especificada"}
                      </p>
                    </CardBody>
                  </Card>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Fecha de Creación
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {viewingPedido.created_at
                        ? new Date(viewingPedido.created_at).toLocaleDateString(
                            "es-ES"
                          )
                        : "No disponible"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Última Actualización
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {viewingPedido.updated_at
                        ? new Date(viewingPedido.updated_at).toLocaleDateString(
                            "es-ES"
                          )
                        : "No disponible"}
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth size="sm" color="primary" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// Componente para mostrar productos en el modal de creación
const ProductSelector = ({
  productos,
  selectedProducts,
  setSelectedProducts,
  categorias,
}) => {
  const [page, setPage] = useState(1);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const rowsPerPage = 6;

  const filteredProducts = useMemo(() => {
    if (!categoriaFiltro) return productos;
    return productos.filter((producto) => {
      const categoria = categorias.find((cat) =>
        cat.subcategorias?.some((sub) => sub.id === producto.subcategoria_id)
      );
      return categoria?.id.toString() === categoriaFiltro;
    });
  }, [productos, categoriaFiltro, categorias]);

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredProducts.slice(start, end);
  }, [page, filteredProducts, rowsPerPage]);

  const handleQuantityChange = (productoId, cantidad) => {
    if (cantidad === 0) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.productoId !== productoId)
      );
      return;
    }

    const existingIndex = selectedProducts.findIndex(
      (p) => p.productoId === productoId
    );
    if (existingIndex >= 0) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingIndex].cantidad = cantidad;
      setSelectedProducts(updatedProducts);
    } else {
      const producto = productos.find((p) => p.id === productoId);
      setSelectedProducts([
        ...selectedProducts,
        {
          productoId,
          cantidad,
          nombre: producto.nombre,
          precio: producto.precioActual || "0.00",
        },
      ]);
    }
  };

  const getQuantity = (productoId) => {
    const found = selectedProducts.find((p) => p.productoId === productoId);
    return found ? found.cantidad : 0;
  };

  const categoriaOptions = [
    { key: "", value: "Todas las categorías" },
    ...categorias.map((cat) => ({ key: cat.id.toString(), value: cat.nombre })),
  ];

  return (
    <div className="space-y-4">
      {/* Filtro por categoría */}
      <CustomSelect
        label="Filtrar por categoría"
        placeholder="Todas las categorías"
        value={categoriaFiltro}
        onChange={setCategoriaFiltro}
        options={categoriaOptions}
      />

      {/* Productos seleccionados */}
      {selectedProducts.length > 0 && (
        <Card className="bg-success-50 border border-success-200">
          <CardBody className="p-3 sm:p-4">
            <h4 className="font-medium mb-2 sm:mb-3 text-success-800 text-sm sm:text-base">
              Productos Seleccionados:
            </h4>
            <div className="space-y-2">
              {selectedProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded-lg"
                >
                  <span className="font-medium text-xs sm:text-sm">
                    {item.nombre}
                  </span>
                  <Chip color="success" variant="flat" size="sm">
                    Cantidad: {item.cantidad}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((producto) => (
          <Card key={producto.id} className="w-full">
            <CardBody className="p-2 sm:p-3">
              <div className="space-y-2 sm:space-y-3">
                <Image
                  alt={producto.nombre}
                  className="object-cover rounded-lg w-full h-24 sm:h-32"
                  src={
                    producto.imagenUrl ||
                    "/placeholder.svg?height=128&width=200"
                  }
                />
                <div>
                  <h4 className="text-sm sm:text-medium font-medium line-clamp-1">
                    {producto.nombre}
                  </h4>
                  <p className="text-xs sm:text-small text-default-500 line-clamp-2">
                    {producto.descripcion}
                  </p>
                  {producto.precioActual && (
                    <p className="text-xs sm:text-small font-semibold text-success-600 mt-1">
                      $
                      {Number.parseFloat(
                        producto.precioActual
                      ).toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs sm:text-tiny text-default-400">
                    Stock: {producto.stock || 0}
                  </p>
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between items-center p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  size="sm"
                  isIconOnly
                  variant="flat"
                  color="danger"
                  isDisabled={getQuantity(producto.id) === 0}
                  onPress={() => {
                    const currentQty = getQuantity(producto.id);
                    if (currentQty > 0) {
                      handleQuantityChange(producto.id, currentQty - 1);
                    }
                  }}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="min-w-[1.5rem] sm:min-w-[2rem] text-center font-medium text-xs sm:text-sm">
                  {getQuantity(producto.id)}
                </span>
                <Button
                  size="sm"
                  isIconOnly
                  variant="flat"
                  color="success"
                  isDisabled={producto.stock <= getQuantity(producto.id)}
                  onPress={() =>
                    handleQuantityChange(
                      producto.id,
                      getQuantity(producto.id) + 1
                    )
                  }
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              {getQuantity(producto.id) > 0 && (
                <Chip color="success" variant="flat" size="sm">
                  Agregado
                </Chip>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      {pages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            isCompact
            showControls
            total={pages}
            page={page}
            onChange={setPage}
            color="success"
          />
        </div>
      )}

      {filteredProducts.length === 0 && (
        <Card>
          <CardBody className="p-6 sm:p-8 text-center">
            <Package className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
            <p className="text-gray-500 text-xs sm:text-sm">
              No hay productos disponibles en esta categoría
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

// Modal de Creación
export const CreateModal = ({
  isOpen,
  onClose,
  newPedido,
  handleNewPedidoChange,
  handleServicioChange,
  handleProductosChange,
  handleTipoChange,
  createPedido,
  servicios,
  productos,
  categorias,
}) => {
  const [selectedTab, setSelectedTab] = useState("info");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePedido = async () => {
    setIsCreating(true);
    try {
      await createPedido();
      setSelectedProducts([]);
      toast.success("Orden creada exitosamente", {
        icon: "✅",
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Error al crear la orden");
    } finally {
      setIsCreating(false);
    }
  };

  const handleProductSelection = (productos) => {
    setSelectedProducts(productos);
    handleProductosChange(productos);
  };

  const isFormValid = () => {
    const basicInfo =
      newPedido.nombre &&
      newPedido.email &&
      newPedido.direccion &&
      newPedido.telefono;

    if (!basicInfo) return false;

    if (newPedido.tipo === "Servicio") {
      return newPedido.service_id;
    } else if (newPedido.tipo === "Producto") {
      return selectedProducts.length > 0;
    }

    return false;
  };

  const handleEstadoChange = (estado) => {
    handleNewPedidoChange({ target: { name: "estado", value: estado } });
  };

  const handleServicioDropdownChange = (servicioId) => {
    handleServicioChange({ target: { value: servicioId } });
  };

  const servicioOptions = servicios.map((servicio) => ({
    key: servicio.id.toString(),
    value: servicio.nombre,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ "@initial": "full", "@md": "3xl" }}
      scrollBehavior="outside"
      placement="center"
      classNames={{
        base: "max-h-[90vh] sm:max-h-[85vh]",
        body: "p-3 sm:p-5",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="font-firelli text-textoVerde text-lg sm:text-xl">
                Crear Nueva Orden
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Complete la información de la orden
              </p>
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
                color="success"
                size="sm"
              >
                <Tab key="info" title="Información del Cliente">
                  <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                    {/* Tipo de orden */}
                    <CustomSelect
                      label="Tipo de Orden"
                      placeholder="Seleccione el tipo"
                      value={newPedido.tipo}
                      onChange={handleTipoChange}
                      options={tiposPedido}
                      isRequired
                    />

                    {/* Información del cliente */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <Input
                        label="Nombre Completo"
                        name="nombre"
                        placeholder="Nombre del cliente"
                        value={newPedido.nombre || ""}
                        onChange={handleNewPedidoChange}
                        variant="bordered"
                        isRequired
                        size="sm"
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={newPedido.email || ""}
                        onChange={handleNewPedidoChange}
                        variant="bordered"
                        isRequired
                        size="sm"
                      />
                      <Input
                        label="Teléfono"
                        name="telefono"
                        placeholder="Número de contacto"
                        value={newPedido.telefono || ""}
                        onChange={handleNewPedidoChange}
                        variant="bordered"
                        isRequired
                        size="sm"
                      />

                      <CustomSelect
                        label="Estado"
                        placeholder="Seleccione un estado"
                        value={newPedido.estado || "pendiente"}
                        onChange={handleEstadoChange}
                        options={estadosPedido}
                      />
                    </div>

                    <Textarea
                      label="Dirección de Entrega"
                      name="direccion"
                      placeholder="Dirección completa para la entrega"
                      value={newPedido.direccion || ""}
                      onChange={handleNewPedidoChange}
                      variant="bordered"
                      minRows={2}
                      isRequired
                      size="sm"
                    />

                    {/* Selección de servicio si aplica */}
                    {newPedido.tipo === "Servicio" && (
                      <CustomSelect
                        label="Servicio"
                        placeholder="Seleccione un servicio"
                        value={newPedido.service_id?.toString() || ""}
                        onChange={handleServicioDropdownChange}
                        options={servicioOptions}
                        isRequired
                      />
                    )}

                    {newPedido.tipo === "Servicio" && (
                      <Textarea
                        label="Descripción del Servicio (Opcional)"
                        name="descripcion_servicio"
                        placeholder="Detalles adicionales sobre el servicio requerido"
                        value={newPedido.descripcion_servicio || ""}
                        onChange={handleNewPedidoChange}
                        variant="bordered"
                        minRows={2}
                        size="sm"
                      />
                    )}
                  </div>
                </Tab>

                {newPedido.tipo === "Producto" && (
                  <Tab key="productos" title="Seleccionar Productos">
                    <div className="pt-3 sm:pt-4">
                      <ProductSelector
                        productos={productos}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={handleProductSelection}
                        categorias={categorias}
                      />
                    </div>
                  </Tab>
                )}
              </Tabs>
            </ModalBody>
            <ModalFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                fullWidth
                size="sm"
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isCreating}
                className="sm:flex-1 sm:mr-2"
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                size="sm"
                color="success"
                onPress={handleCreatePedido}
                isLoading={isCreating}
                isDisabled={!isFormValid()}
                className="font-medium sm:flex-1"
              >
                {isCreating ? "Creando..." : "Crear Orden"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
