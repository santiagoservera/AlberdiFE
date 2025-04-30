"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { PedidosIniciales, pedidoVacio } from "./Pedidos/pedidos-data";
import { PedidosFiltros } from "./Pedidos/pedidos-filtros";
import { PedidosTable } from "./Pedidos/pedidos-table";
import { CreateModal, EditModal, ViewModal } from "./Pedidos/pedidos-modals";

// Mock Servicios data (replace with actual data fetching if needed)
const Servicios = [
  { id: 1, nombre: "Servicio A" },
  { id: 2, nombre: "Servicio B" },
  { id: 3, nombre: "Servicio C" },
];

const SeccionPedidos = () => {
  // Estado para la lista de pedidos
  const [listaPedidos, setListaPedidos] = useState(PedidosIniciales);

  // Estado para filtros
  const [filtros, setFiltros] = useState({
    estado: "",
    tipo: "",
    nombre: "",
    fecha: "",
  });
  const [soloFinalizados, setSoloFinalizados] = useState(false);

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Estado para modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPedido, setEditingPedido] = useState(null);
  const [viewingPedido, setViewingPedido] = useState(null);
  const [newPedido, setNewPedido] = useState(pedidoVacio);

  // Manejadores de cambios en filtros
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Filtrado de pedidos
  const pedidosFiltrados = listaPedidos.filter((p) => {
    // Si "Solo finalizados" está marcado, mostrar únicamente los finalizados
    if (soloFinalizados) {
      return p.estado === "Finalizado";
    }

    // Si no está marcado "Solo finalizados", ocultar los finalizados a menos que se filtren específicamente
    if (p.estado === "Finalizado" && filtros.estado !== "Finalizado") {
      return false;
    }

    const coincideEstado = filtros.estado === "" || p.estado === filtros.estado;
    const coincideTipo = filtros.tipo === "" || p.tipo === filtros.tipo;
    const coincideNombre =
      filtros.nombre === "" ||
      `${p.nombre} ${p.apellido}`
        .toLowerCase()
        .includes(filtros.nombre.toLowerCase());
    const coincideFecha = filtros.fecha === "" || p.fecha === filtros.fecha;

    return coincideEstado && coincideTipo && coincideNombre && coincideFecha;
  });

  // Paginación
  const items = React.useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return pedidosFiltrados.slice(start, end);
  }, [currentPage, pedidosFiltrados, rowsPerPage]);

  // Manejadores de modales
  const openEditModal = (pedido) => {
    setEditingPedido({ ...pedido });
    setIsModalOpen(true);
  };

  const openViewModal = (pedido) => {
    setViewingPedido({ ...pedido });
    setIsViewModalOpen(true);
  };

  const openCreateModal = () => {
    setNewPedido({
      ...pedidoVacio,
      id:
        listaPedidos.length > 0
          ? Math.max(...listaPedidos.map((p) => p.id)) + 1
          : 1,
    });
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPedido(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingPedido(null);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Manejadores de cambios en formularios
  const handleEditChange = (e) => {
    setEditingPedido({
      ...editingPedido,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewPedidoChange = (e) => {
    setNewPedido({
      ...newPedido,
      [e.target.name]: e.target.value,
    });
  };

  const handleServicioChange = (e) => {
    const servicioId = e.target.value;
    const servicio = Servicios.find(
      (s) => s.id === Number.parseInt(servicioId)
    );

    if (servicio) {
      setNewPedido({
        ...newPedido,
        servicioId: servicioId,
        pedido: servicio.nombre,
      });
    }
  };

  const handleEditServicioChange = (e) => {
    const servicioId = e.target.value;
    const servicio = Servicios.find(
      (s) => s.id === Number.parseInt(servicioId)
    );

    if (servicio) {
      setEditingPedido({
        ...editingPedido,
        servicioId: servicioId,
        pedido: servicio.nombre,
      });
    }
  };

  // Acciones CRUD
  const saveChanges = () => {
    // Update the pedido in the list
    const updatedPedidos = listaPedidos.map((p) =>
      p.id === editingPedido.id ? editingPedido : p
    );
    setListaPedidos(updatedPedidos);
    closeModal();
  };

  const createPedido = () => {
    // Add the new pedido to the list
    setListaPedidos([...listaPedidos, newPedido]);
    closeCreateModal();
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-firelli text-textoVerde">
          Pedidos
        </h2>
        <Button color="success" onClick={openCreateModal}>
          Nuevo Pedido
        </Button>
      </div>

      {/* Filtros */}
      <PedidosFiltros
        filtros={filtros}
        soloFinalizados={soloFinalizados}
        handleChange={handleChange}
        setSoloFinalizados={setSoloFinalizados}
      />

      {/* Tabla */}
      <PedidosTable
        items={items}
        pedidosFiltrados={pedidosFiltrados}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        openViewModal={openViewModal}
        openEditModal={openEditModal}
      />

      {/* Modales */}
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingPedido={editingPedido}
        handleEditChange={handleEditChange}
        handleEditServicioChange={handleEditServicioChange}
        saveChanges={saveChanges}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        viewingPedido={viewingPedido}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        newPedido={newPedido}
        handleNewPedidoChange={handleNewPedidoChange}
        handleServicioChange={handleServicioChange}
        createPedido={createPedido}
      />
    </section>
  );
};

export default SeccionPedidos;
