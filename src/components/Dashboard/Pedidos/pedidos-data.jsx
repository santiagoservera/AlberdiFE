// Datos de servicios
export const Servicios = [
  {
    id: 1,
    nombre: "Mantenimiento de espacios verdes",
    descripcion:
      "En cuanto al mantenimiento de espacios verdes, Alberdi S.A.S cuenta con expertos en jardinería que se encargan de la poda, riego, y cuidado de plantas y césped. Esto no solo embellece el entorno, sino que también contribuye a un ambiente más saludable y agradable para empleados y visitantes.",
    imagen: "/espacios-verdes.jpg",
  },
  {
    id: 2,
    nombre: "Limpieza Hospitalaria",
    descripcion:
      "La limpieza hospitalaria es un servicio altamente especializado que Alberdi S.A.S ofrece, garantizando la eliminación de residuos biomédicos, la desinfección de áreas críticas y el mantenimiento de un entorno seguro y estéril para pacientes y personal médico.",
    imagen: "/limpieza-hospitalaria.jpg",
  },
  {
    id: 3,
    nombre: "Fumigación y Control de Plagas",
    descripcion:
      "El servicio de fumigación y control de plagas de Alberdi S.A.S utiliza productos seguros y efectivos para eliminar insectos, roedores y otras plagas, protegiendo la salud de las personas y la integridad de las instalaciones.",
    imagen: "/fumigacion.jpg",
  },
  {
    id: 4,
    nombre: "Limpieza de Oficinas",
    descripcion:
      "Nuestro servicio de limpieza de oficinas garantiza espacios de trabajo impecables, mejorando la productividad y la imagen corporativa con personal capacitado y productos de alta calidad.",
    imagen: "/limpieza-oficinas.jpg",
  },
  {
    id: 5,
    nombre: "Desinfección Especializada",
    descripcion:
      "El servicio de desinfección especializada de Alberdi S.A.S elimina virus, bacterias y otros patógenos utilizando tecnología avanzada y productos certificados, ideal para entornos que requieren los más altos estándares de higiene.",
    imagen: "/desinfeccion.jpg",
  },
];

// Sample data
export const PedidosIniciales = [
  {
    id: 1,
    pedido: "Servicio de mantenimiento de espacios verdes",
    fecha: "2022-05-01",
    estado: "Pendiente",
    tipo: "Servicio",
    fechaPedido: "2022-05-01",
    direccion: "Calle 123, 123 123, 123 123",
    telefono: "123456789",
    nombre: "Juan",
    apellido: "Perez",
    servicioId: 1,
  },
  {
    id: 2,
    pedido: "Entrega de productos de limpieza",
    fecha: "2022-06-15",
    estado: "Aprobado",
    tipo: "Producto",
    fechaPedido: "2022-06-10",
    direccion: "Av. Siempre Viva 742",
    telefono: "987654321",
    nombre: "María",
    apellido: "Gomez",
  },
  {
    id: 3,
    pedido: "Desinfección de oficinas",
    fecha: "2022-07-10",
    estado: "Rechazado",
    tipo: "Servicio",
    fechaPedido: "2022-07-05",
    direccion: "Calle Falsa 123",
    telefono: "1122334455",
    nombre: "Carlos",
    apellido: "Ramírez",
    servicioId: 5,
  },
  {
    id: 4,
    pedido: "Entrega de insumos médicos",
    fecha: "2022-08-20",
    estado: "Finalizado",
    tipo: "Producto",
    fechaPedido: "2022-08-15",
    direccion: "Ruta 9, Km 32",
    telefono: "2233445566",
    nombre: "Lucía",
    apellido: "Martínez",
  },
  {
    id: 5,
    pedido: "Limpieza profunda de hospital",
    fecha: "2022-09-01",
    estado: "Pendiente",
    tipo: "Servicio",
    fechaPedido: "2022-08-30",
    direccion: "Hospital Central, Planta Baja",
    telefono: "3344556677",
    nombre: "Diego",
    apellido: "Fernández",
    servicioId: 2,
  },
  {
    id: 6,
    pedido: "Reposición de productos de higiene",
    fecha: "2022-10-05",
    estado: "Aprobado",
    tipo: "Producto",
    fechaPedido: "2022-10-02",
    direccion: "Barrio Norte, Calle 20",
    telefono: "4455667788",
    nombre: "Sofía",
    apellido: "López",
  },
  {
    id: 7,
    pedido: "Fumigación de espacios comunes",
    fecha: "2022-11-11",
    estado: "Finalizado",
    tipo: "Servicio",
    fechaPedido: "2022-11-09",
    direccion: "Condominio El Árbol, Torre 2",
    telefono: "5566778899",
    nombre: "Matías",
    apellido: "Silva",
    servicioId: 3,
  },
];

// Define columns for the table
export const columns = [
  { name: "CLIENTE", uid: "cliente" },
  { name: "PEDIDO", uid: "pedido" },
  { name: "TIPO", uid: "tipo" },
  { name: "ESTADO", uid: "estado" },
  { name: "FECHA", uid: "fecha" },
  { name: "DIRECCIÓN", uid: "direccion" },
  { name: "TELÉFONO", uid: "telefono" },
  { name: "ACCIONES", uid: "acciones" },
];

// Status color mapping
export const statusColorMap = {
  Pendiente: "warning",
  Aprobado: "success",
  Rechazado: "danger",
  Finalizado: "primary",
};

// Tipos de pedido
export const tiposPedido = [
  { key: "Servicio", value: "Servicio" },
  { key: "Producto", value: "Producto" },
];

// Estados de pedido
export const estadosPedido = [
  { key: "Pendiente", value: "Pendiente" },
  { key: "Aprobado", value: "Aprobado" },
  { key: "Rechazado", value: "Rechazado" },
  { key: "Finalizado", value: "Finalizado" },
];

// Tipos de pedido para filtros (incluye opción vacía)
export const tiposPedidoFiltro = [
  { key: "", value: "Todos los tipos" },
  ...tiposPedido,
];

// Estados de pedido para filtros (incluye opción vacía)
export const estadosPedidoFiltro = [
  { key: "", value: "Todos los estados" },
  ...estadosPedido,
];

// Opciones de filas por página
export const rowsPerPageOptions = [
  { key: "5", value: "5" },
  { key: "10", value: "10" },
  { key: "15", value: "15" },
];

// Pedido vacío para crear nuevos pedidos
export const pedidoVacio = {
  id: 0,
  pedido: "",
  fecha: new Date().toISOString().split("T")[0],
  estado: "Pendiente",
  tipo: "Servicio",
  fechaPedido: new Date().toISOString().split("T")[0],
  direccion: "",
  telefono: "",
  nombre: "",
  apellido: "",
  servicioId: "",
};
