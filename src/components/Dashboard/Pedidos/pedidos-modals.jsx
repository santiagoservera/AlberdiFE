import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
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
} from "@nextui-org/react";
import {
  Servicios,
  Productos,
  estadosPedido,
  statusColorMap,
  tiposPedido,
  categoriasFiltro,
} from "./pedidos-data";
import { useState, useMemo } from "react";

// Modal de Edición
export const EditModal = ({
  isOpen,
  onClose,
  editingPedido,
  handleEditChange,
  handleEditServicioChange,
  saveChanges,
}) => {
  if (!editingPedido) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Pedido
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 md:col-span-2">
                  <Select
                    label="Tipo"
                    name="tipo"
                    selectedKeys={[editingPedido.tipo]}
                    onChange={(e) =>
                      handleEditChange({
                        target: { name: "tipo", value: e.target.value },
                      })
                    }
                    fullWidth
                  >
                    {tiposPedido.map((tipo) => (
                      <SelectItem key={tipo.key} value={tipo.key}>
                        {tipo.value}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {editingPedido.tipo === "Servicio" ? (
                  <div className="space-y-4 md:col-span-2">
                    <Select
                      label="Servicio"
                      name="servicioId"
                      selectedKeys={[
                        editingPedido.servicioId
                          ? editingPedido.servicioId.toString()
                          : "",
                      ]}
                      onChange={handleEditServicioChange}
                      fullWidth
                    >
                      {Servicios.map((servicio) => (
                        <SelectItem
                          key={servicio.id.toString()}
                          value={servicio.id.toString()}
                        >
                          {servicio.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-4 md:col-span-2">
                    <Input
                      label="Pedido"
                      name="pedido"
                      value={editingPedido.pedido}
                      onChange={handleEditChange}
                      fullWidth
                    />
                  </div>
                )}

                <Input
                  label="Nombre"
                  name="nombre"
                  value={editingPedido.nombre}
                  onChange={handleEditChange}
                />
                <Input
                  label="Apellido"
                  name="apellido"
                  value={editingPedido.apellido}
                  onChange={handleEditChange}
                />
                <Input
                  label="Teléfono"
                  name="telefono"
                  value={editingPedido.telefono}
                  onChange={handleEditChange}
                />
                <Input
                  label="Fecha"
                  type="date"
                  name="fecha"
                  value={editingPedido.fecha}
                  onChange={handleEditChange}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Dirección"
                    name="direccion"
                    value={editingPedido.direccion}
                    onChange={handleEditChange}
                    fullWidth
                  />
                </div>
                <Select
                  label="Estado"
                  name="estado"
                  selectedKeys={[editingPedido.estado]}
                  onChange={(e) =>
                    handleEditChange({
                      target: { name: "estado", value: e.target.value },
                    })
                  }
                >
                  {estadosPedido.map((estado) => (
                    <SelectItem key={estado.key} value={estado.key}>
                      {estado.value}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Fecha de Pedido"
                  type="date"
                  name="fechaPedido"
                  value={editingPedido.fechaPedido}
                  onChange={handleEditChange}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="success" onPress={saveChanges}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// Modal de Vista
export const ViewModal = ({ isOpen, onClose, viewingPedido }) => {
  if (!viewingPedido) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Detalles del Pedido
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{`${viewingPedido.nombre} ${viewingPedido.apellido}`}</h3>
                    <Tooltip content="Mandar mensaje">
                      <a
                        href={`https://wa.me/${viewingPedido.telefono}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 flex-row-reverse hover:border-green-400 hover:border-2 rounded-lg"
                      >
                        <p className="text-sm text-gray-500 cursor-pointer hover:text-green-600">
                          {viewingPedido.telefono}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#000000"
                            d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
                          />
                        </svg>
                      </a>
                    </Tooltip>
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

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Información del Pedido</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Pedido</p>
                      <p>{viewingPedido.pedido}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tipo</p>
                      <p>{viewingPedido.tipo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p>{viewingPedido.fecha}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Pedido</p>
                      <p>{viewingPedido.fechaPedido}</p>
                    </div>
                  </div>
                </div>

                {viewingPedido.tipo === "Producto" &&
                  viewingPedido.productos &&
                  viewingPedido.productos.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Productos</h4>
                      <div className="space-y-2">
                        {viewingPedido.productos.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <p className="font-medium">{item.nombre}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                Cantidad: {item.cantidad}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Dirección de Entrega</h4>
                  <p>{viewingPedido.direccion}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onPress={onClose}>
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
  categoria,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const filteredProducts = useMemo(() => {
    return categoria
      ? productos.filter((producto) => producto.categoria === categoria)
      : productos;
  }, [productos, categoria]);

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredProducts.slice(start, end);
  }, [page, filteredProducts, rowsPerPage]);

  const handleQuantityChange = (productoId, cantidad) => {
    // Si la cantidad es 0, eliminar el producto
    if (cantidad === 0) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.productoId !== productoId)
      );
      return;
    }

    // Si el producto ya está seleccionado, actualizar cantidad
    const existingIndex = selectedProducts.findIndex(
      (p) => p.productoId === productoId
    );
    if (existingIndex >= 0) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingIndex].cantidad = cantidad;
      setSelectedProducts(updatedProducts);
    } else {
      // Si no está seleccionado, agregarlo
      const producto = productos.find((p) => p.id === productoId);
      setSelectedProducts([
        ...selectedProducts,
        {
          productoId,
          cantidad,
          nombre: producto.nombre,
        },
      ]);
    }
  };

  const getQuantity = (productoId) => {
    const found = selectedProducts.find((p) => p.productoId === productoId);
    return found ? found.cantidad : 0;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((producto) => (
          <Card key={producto.id} className="w-full">
            <CardBody className="p-3">
              <div className="flex gap-3">
                <Image
                  alt={producto.nombre}
                  className="object-cover rounded-lg w-20 h-20"
                  src={producto.imagen || "/placeholder.svg?height=80&width=80"}
                />
                <div className="flex-1">
                  <h4 className="text-medium font-medium">{producto.nombre}</h4>
                  <p className="text-small text-default-500">
                    {producto.descripcion}
                  </p>
                  <p className="text-tiny text-default-400">
                    {producto.categoria}
                  </p>
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  isIconOnly
                  variant="flat"
                  onClick={() => {
                    const currentQty = getQuantity(producto.id);
                    if (currentQty > 0) {
                      handleQuantityChange(producto.id, currentQty - 1);
                    }
                  }}
                >
                  -
                </Button>
                <span>{getQuantity(producto.id)}</span>
                <Button
                  size="sm"
                  isIconOnly
                  variant="flat"
                  onClick={() =>
                    handleQuantityChange(
                      producto.id,
                      getQuantity(producto.id) + 1
                    )
                  }
                >
                  +
                </Button>
              </div>
              {getQuantity(producto.id) > 0 && (
                <Chip color="success" variant="flat">
                  Agregado
                </Chip>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            isCompact
            showControls
            total={pages}
            initialPage={1}
            page={page}
            onChange={setPage}
          />
        </div>
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
}) => {
  const [selectedTab, setSelectedTab] = useState("info");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Nuevo Pedido
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
              >
                <Tab key="info" title="Información del Pedido">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-4 md:col-span-2">
                      <Select
                        label="Tipo"
                        name="tipo"
                        selectedKeys={[newPedido.tipo]}
                        onChange={(e) => handleTipoChange(e.target.value)}
                        fullWidth
                      >
                        {tiposPedido.map((tipo) => (
                          <SelectItem key={tipo.key} value={tipo.key}>
                            {tipo.value}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {newPedido.tipo === "Servicio" && (
                      <div className="space-y-4 md:col-span-2">
                        <Select
                          label="Servicio"
                          name="servicioId"
                          placeholder="Seleccione un servicio"
                          onChange={handleServicioChange}
                          fullWidth
                        >
                          {Servicios.map((servicio) => (
                            <SelectItem
                              key={servicio.id.toString()}
                              value={servicio.id.toString()}
                            >
                              {servicio.nombre}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    )}

                    <Input
                      label="Nombre"
                      name="nombre"
                      placeholder="Nombre del cliente"
                      value={newPedido.nombre}
                      onChange={handleNewPedidoChange}
                    />
                    <Input
                      label="Apellido"
                      name="apellido"
                      placeholder="Apellido del cliente"
                      value={newPedido.apellido}
                      onChange={handleNewPedidoChange}
                    />
                    <Input
                      label="Teléfono"
                      name="telefono"
                      placeholder="Teléfono de contacto"
                      value={newPedido.telefono}
                      onChange={handleNewPedidoChange}
                    />
                    <Input
                      label="Fecha"
                      type="date"
                      name="fecha"
                      value={newPedido.fecha}
                      onChange={handleNewPedidoChange}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Dirección"
                        name="direccion"
                        placeholder="Dirección completa"
                        value={newPedido.direccion}
                        onChange={handleNewPedidoChange}
                        fullWidth
                      />
                    </div>
                    <Select
                      label="Estado"
                      name="estado"
                      selectedKeys={[newPedido.estado]}
                      onChange={(e) =>
                        handleNewPedidoChange({
                          target: { name: "estado", value: e.target.value },
                        })
                      }
                    >
                      {estadosPedido.map((estado) => (
                        <SelectItem key={estado.key} value={estado.key}>
                          {estado.value}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="Fecha de Pedido"
                      type="date"
                      name="fechaPedido"
                      value={newPedido.fechaPedido}
                      onChange={handleNewPedidoChange}
                    />
                  </div>
                </Tab>

                {newPedido.tipo === "Producto" && (
                  <Tab key="productos" title="Seleccionar Productos">
                    <div className="pt-4">
                      <div className="mb-4">
                        <Select
                          label="Filtrar por categoría"
                          placeholder="Todas las categorías"
                          onChange={(e) => setCategoriaFiltro(e.target.value)}
                          className="mb-4"
                        >
                          {categoriasFiltro.map((cat) => (
                            <SelectItem key={cat.key} value={cat.key}>
                              {cat.value}
                            </SelectItem>
                          ))}
                        </Select>

                        {newPedido.productos &&
                          newPedido.productos.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-medium font-medium mb-2">
                                Productos seleccionados:
                              </h4>
                              <div className="space-y-2">
                                {newPedido.productos.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {item.nombre}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-gray-500">
                                        Cantidad: {item.cantidad}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        <ProductSelector
                          productos={Productos}
                          selectedProducts={newPedido.productos || []}
                          setSelectedProducts={(productos) =>
                            handleProductosChange(productos)
                          }
                          categoria={categoriaFiltro}
                        />
                      </div>
                    </div>
                  </Tab>
                )}
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="success"
                onPress={createPedido}
                isDisabled={
                  !newPedido.nombre ||
                  !newPedido.apellido ||
                  !newPedido.direccion ||
                  (newPedido.tipo === "Servicio" && !newPedido.servicioId) ||
                  (newPedido.tipo === "Producto" &&
                    (!newPedido.productos || newPedido.productos.length === 0))
                }
              >
                Crear Pedido
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
