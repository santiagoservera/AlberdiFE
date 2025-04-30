"use client";

import React from "react";
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
} from "@nextui-org/react";
import {
  Servicios,
  estadosPedido,
  statusColorMap,
  tiposPedido,
} from "./pedidos-data";

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
                    <p className="text-sm text-gray-500">
                      {viewingPedido.telefono}
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

// Modal de Creación
export const CreateModal = ({
  isOpen,
  onClose,
  newPedido,
  handleNewPedidoChange,
  handleServicioChange,
  createPedido,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Nuevo Pedido
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 md:col-span-2">
                  <Select
                    label="Tipo"
                    name="tipo"
                    selectedKeys={["Servicio"]}
                    isDisabled={true}
                    fullWidth
                  >
                    <SelectItem key="Servicio" value="Servicio">
                      Servicio
                    </SelectItem>
                  </Select>
                </div>

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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="success" onPress={createPedido}>
                Crear Pedido
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
