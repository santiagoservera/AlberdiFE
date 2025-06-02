"use client";

import { useState, useEffect, useMemo } from "react";
import { Button, Spinner, Card, CardBody } from "@heroui/react";
import { Plus, AlertCircle } from "lucide-react";
import useOrdenes from "../../hooks/useOrdenes";
import useCategorias from "../../hooks/useCategorias";
import useProductos from "../../hooks/useProductos";
import useServicios from "../../hooks/useServicios";
import { PedidosFiltros } from "../Dashboard/Pedidos/pedidos-filtros";
import { PedidosTable } from "../Dashboard/Pedidos/pedidos-table";
import {
  CreateModal,
  EditModal,
  ViewModal,
} from "../Dashboard/Pedidos/pedidos-modals";
import { toast } from "react-hot-toast";

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
  const [soloAceptados, setSoloAceptados] = useState(false);

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
    tipo: "",
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
        service: orden.service || null,
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
      // Si "Solo aceptados" está marcado, mostrar únicamente los aceptados
      if (soloAceptados) {
        return p.estado === "aceptado";
      }

      // Si no está marcado "Solo aceptados", ocultar los aceptados a menos que se filtren específicamente
      if (p.estado === "aceptado" && filtros.estado !== "aceptado") {
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
  }, [ordenesTransformadas, filtros, soloAceptados]);

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
      tipo: "",
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
        precioOrden: p.precio || "0.00",
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
      // Enviar solo el estado en el body como muestra la imagen
      const updateData = {
        estado: editingPedido.estado,
      };

      console.log("Actualizando orden con datos:", updateData);

      // Actualizar solo el estado de la orden
      await updateOrdenStatus(editingPedido.id, updateData.estado);

      // Refrescar datos
      await fetchOrdenes();

      closeModal();
      toast.success("Orden actualizada correctamente", {
        icon: "✅",
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      toast.error("Error al actualizar la orden");
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

      console.log("Creando orden con datos:", orderData);
      await createOrden(orderData);

      // Refrescar datos
      await fetchOrdenes();

      closeCreateModal();
      toast.success("Orden creada exitosamente", {
        icon: "✅",
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error al crear orden:", error);
      toast.error("Error al crear la orden");
    }
  };

  const handleDeleteOrden = async (ordenId) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta orden?")) {
      try {
        await deleteOrden(ordenId);
        await fetchOrdenes();
        toast.success("Orden eliminada correctamente", {
          icon: "🗑️",
          style: {
            borderRadius: "12px",
            background: "#ef4444",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Error al eliminar orden:", error);
        toast.error("Error al eliminar la orden");
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
        <Card className="w-full">
          <CardBody className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" color="success" />
              <p className="text-lg text-gray-600">Cargando órdenes...</p>
            </div>
          </CardBody>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6">
        <Card className="w-full border-l-4 border-l-danger">
          <CardBody className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-danger-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Error al cargar órdenes
                </h3>
                <p className="text-danger-600">{error}</p>
              </div>
              <Button
                color="primary"
                variant="flat"
                onPress={() => fetchOrdenes()}
              >
                Reintentar
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    );
  }

  return (
    <section className="md:p-6 md:space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center flex-col md:flex-row gap-5 md:gap-0">
        <div>
          <h2 className="text-3xl font-semibold font-firelli text-textoVerde">
            Gestión de Órdenes
          </h2>
        </div>
        <Button
          color="success"
          variant="shadow"
          startContent={<Plus className="w-4 h-4" />}
          onPress={openCreateModal}
          className="font-firelli font-medium"
        >
          Nueva Orden
        </Button>
      </div>

      {/* Filtros */}
      <Card className="shadow-lg">
        <CardBody className="p-6">
          <PedidosFiltros
            filtros={filtros}
            soloAceptados={soloAceptados}
            handleChange={handleChange}
            setSoloAceptados={setSoloAceptados}
          />
        </CardBody>
      </Card>

      {/* Tabla */}
      <Card className="shadow-lg">
        <CardBody className="p-0">
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
        </CardBody>
      </Card>

      {/* Modales */}
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingPedido={editingPedido}
        handleEditChange={handleEditChange}
        handleEditServicioChange={handleEditServicioChange}
        saveChanges={saveChanges}
        servicios={servicios}
        productos={productos} // Agregar esta línea
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
        categorias={categorias}
      />
    </section>
  );
};

export default SeccionPedidos;
