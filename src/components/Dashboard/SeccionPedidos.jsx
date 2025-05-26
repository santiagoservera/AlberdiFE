"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@nextui-org/react";
import useOrdenes from "../../hooks/useOrdenes";
import useCategorias from "../../hooks/useCategorias";
import useProductos from "../../hooks/useProductos";
import useServicios from "../../hooks/useServicios";
import { PedidosFiltros } from "../Dashboard/Pedidos/pedidos-filtros";
import { PedidosTable } from "../Dashboard/Pedidos//pedidos-table";
import {
  CreateModal,
  EditModal,
  ViewModal,
} from "../Dashboard/Pedidos/pedidos-modals";

const SeccionPedidos = () => {
  // Hooks para datos reales
  const {
    ordenes,
    loading,
    error,
    fetchOrdenes,
    createOrden,
    updateOrdenStatus,
    deleteOrden,
  } = useOrdenes();
  const { categorias } = useCategorias();
  const { productos } = useProductos();
  const { servicios } = useServicios();

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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estado para modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPedido, setEditingPedido] = useState(null);
  const [viewingPedido, setViewingPedido] = useState(null);
  const [newPedido, setNewPedido] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    estado: "pendiente",
    service_id: null,
    productos: [],
    descripcion_servicio: "",
  });

  // Transformar órdenes reales al formato esperado por la tabla
  const ordenesTransformadas = useMemo(() => {
    console.log("=== TRANSFORMANDO ÓRDENES ===");
    console.log("Órdenes recibidas:", ordenes);
    console.log("Es array?", Array.isArray(ordenes));
    console.log("Longitud:", ordenes?.length);

    // Verificar si ordenes es un array válido
    if (!Array.isArray(ordenes) || ordenes.length === 0) {
      console.log("❌ Ordenes no es un array válido o está vacío");
      return [];
    }

    console.log("✅ Procesando", ordenes.length, "órdenes");

    const transformadas = ordenes.map((orden, index) => {
      console.log(`Procesando orden ${index + 1}:`, orden);

      // Determinar tipo basado en service_id
      const tipo = orden.service_id ? "Servicio" : "Producto";

      // Obtener información del servicio si aplica
      const servicio = orden.service_id
        ? servicios.find((s) => s.id === orden.service_id)
        : null;

      // Crear descripción del pedido
      let pedidoDescripcion = "";
      if (tipo === "Servicio") {
        pedidoDescripcion =
          servicio?.nombre || `Servicio ID: ${orden.service_id}`;
      } else {
        const cantidadProductos = orden.products?.length || 0;
        pedidoDescripcion =
          cantidadProductos === 1
            ? `${orden.products[0]?.nombre || "Producto"}`
            : `${cantidadProductos} productos`;
      }

      // Separar nombre y apellido
      const nombreCompleto = orden.nombre || "";
      const partesNombre = nombreCompleto.split(" ");
      const nombre = partesNombre[0] || "";
      const apellido = partesNombre.slice(1).join(" ") || "";

      const ordenTransformada = {
        id: orden.id,
        pedido: pedidoDescripcion,
        fecha: orden.created_at
          ? new Date(orden.created_at).toLocaleDateString("es-ES")
          : "Sin fecha",
        fechaPedido: orden.created_at
          ? new Date(orden.created_at).toLocaleDateString("es-ES")
          : "Sin fecha",
        estado: orden.estado || "pendiente",
        tipo: tipo,
        direccion: orden.direccion || "",
        telefono: orden.telefono || "",
        nombre: nombre,
        apellido: apellido,
        email: orden.email || "",
        // Datos originales para modales
        service_id: orden.service_id,
        products: orden.products || [],
        descripcion_servicio: orden.descripcion_servicio || "",
        created_at: orden.created_at,
        updated_at: orden.updated_at,
      };

      console.log(`✅ Orden ${index + 1} transformada:`, ordenTransformada);
      return ordenTransformada;
    });

    console.log("=== RESULTADO TRANSFORMACIÓN ===");
    console.log("Total transformadas:", transformadas.length);
    console.log("Órdenes transformadas:", transformadas);

    return transformadas;
  }, [ordenes, servicios]);

  // Manejadores de cambios en filtros
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Filtrado de pedidos
  const pedidosFiltrados = useMemo(() => {
    return ordenesTransformadas.filter((p) => {
      // Si "Solo finalizados" está marcado, mostrar únicamente los finalizados
      if (soloFinalizados) {
        return p.estado === "entregado" || p.estado === "finalizado";
      }

      // Si no está marcado "Solo finalizados", ocultar los finalizados a menos que se filtren específicamente
      if (
        (p.estado === "entregado" || p.estado === "finalizado") &&
        filtros.estado !== "entregado" &&
        filtros.estado !== "finalizado"
      ) {
        return false;
      }

      const coincideEstado =
        filtros.estado === "" || p.estado === filtros.estado;
      const coincideTipo = filtros.tipo === "" || p.tipo === filtros.tipo;
      const coincideNombre =
        filtros.nombre === "" ||
        `${p.nombre} ${p.apellido}`
          .toLowerCase()
          .includes(filtros.nombre.toLowerCase());
      const coincideFecha = filtros.fecha === "" || p.fecha === filtros.fecha;

      return coincideEstado && coincideTipo && coincideNombre && coincideFecha;
    });
  }, [ordenesTransformadas, filtros, soloFinalizados]);

  // Paginación
  const items = useMemo(() => {
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
      nombre: "",
      email: "",
      direccion: "",
      telefono: "",
      estado: "pendiente",
      service_id: null,
      productos: [],
      descripcion_servicio: "",
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

  const handleTipoChange = (tipo) => {
    setNewPedido({
      ...newPedido,
      tipo,
      // Resetear campos específicos según el tipo
      service_id: tipo === "Servicio" ? null : null,
      productos: tipo === "Producto" ? [] : [],
      pedido: "",
    });
  };

  const handleServicioChange = (e) => {
    const servicioId = e.target.value;
    const servicio = servicios.find(
      (s) => s.id === Number.parseInt(servicioId)
    );

    if (servicio) {
      setNewPedido({
        ...newPedido,
        service_id: Number.parseInt(servicioId),
        pedido: servicio.nombre,
      });
    }
  };

  const handleProductosChange = (productosSeleccionados) => {
    // Crear un resumen del pedido basado en los productos seleccionados
    let resumen = "";
    if (productosSeleccionados && productosSeleccionados.length > 0) {
      if (productosSeleccionados.length === 1) {
        resumen = `${productosSeleccionados[0].cantidad} ${productosSeleccionados[0].nombre}`;
      } else {
        resumen = `${productosSeleccionados.length} productos diferentes`;
      }
    }

    setNewPedido({
      ...newPedido,
      productos: productosSeleccionados.map((p) => ({
        product_id: p.productoId,
        cantidad: p.cantidad,
        precioOrden: "0.00", // Precio por defecto, se puede calcular después
      })),
      pedido: resumen || "Pedido de productos",
    });
  };

  const handleEditServicioChange = (e) => {
    const servicioId = e.target.value;
    const servicio = servicios.find(
      (s) => s.id === Number.parseInt(servicioId)
    );

    if (servicio) {
      setEditingPedido({
        ...editingPedido,
        service_id: Number.parseInt(servicioId),
        pedido: servicio.nombre,
      });
    }
  };

  // Acciones CRUD
  const saveChanges = async () => {
    try {
      // Actualizar estado de la orden
      await updateOrdenStatus(editingPedido.id, editingPedido.estado);

      // Refrescar datos
      await fetchOrdenes();

      closeModal();
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      alert("Error al actualizar la orden");
    }
  };

  const createPedidoAction = async () => {
    try {
      // Preparar datos para la API
      const orderData = {
        nombre: newPedido.nombre,
        email: newPedido.email,
        direccion: newPedido.direccion,
        telefono: newPedido.telefono,
        estado: newPedido.estado,
        service_id: newPedido.service_id,
        productos: newPedido.productos,
        descripcion_servicio: newPedido.descripcion_servicio,
      };

      await createOrden(orderData);

      // Refrescar datos
      await fetchOrdenes();

      closeCreateModal();
    } catch (error) {
      console.error("Error al crear orden:", error);
      alert("Error al crear la orden");
    }
  };

  const handleDeleteOrden = async (ordenId) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta orden?")) {
      try {
        await deleteOrden(ordenId);
        await fetchOrdenes();
      } catch (error) {
        console.error("Error al eliminar orden:", error);
        alert("Error al eliminar la orden");
      }
    }
  };

  // Debug logs
  const pedidosFiltradosMemo = useMemo(
    () => pedidosFiltrados,
    [pedidosFiltrados]
  );
  const itemsMemo = useMemo(() => items, [items]);
  console.log("Órdenes raw:", ordenes);
  console.log("Servicios:", servicios);
  console.log("Órdenes transformadas:", ordenesTransformadas);
  console.log("Pedidos filtrados:", pedidosFiltradosMemo);
  console.log("Items para tabla:", itemsMemo);

  useEffect(() => {
    fetchOrdenes();
  }, []);

  if (loading) {
    return (
      <section className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando órdenes...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-firelli text-textoVerde">
          Órdenes ({ordenesTransformadas.length})
        </h2>
        <Button
          className="bg-[#4F6B5F] text-white font-firelli"
          onClick={openCreateModal}
        >
          Nueva Orden
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
        handleDeleteOrden={handleDeleteOrden}
      />

      {/* Modales */}
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingPedido={editingPedido}
        handleEditChange={handleEditChange}
        handleEditServicioChange={handleEditServicioChange}
        saveChanges={saveChanges}
        servicios={servicios}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        viewingPedido={viewingPedido}
        servicios={servicios}
        productos={productos}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        newPedido={newPedido}
        handleNewPedidoChange={handleNewPedidoChange}
        handleServicioChange={handleServicioChange}
        handleProductosChange={handleProductosChange}
        handleTipoChange={handleTipoChange}
        createPedido={createPedidoAction}
        servicios={servicios}
        productos={productos}
      />
    </section>
  );
};

export default SeccionPedidos;
