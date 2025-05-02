// Datos iniciales de categorías
export const categoriasIniciales = [
  {
    id: 1,
    nombre: "Limpieza",
    descripcion: "Productos y servicios para la limpieza de espacios",

    subcategorias: [
      {
        id: 101,
        nombre: "Limpieza de Oficinas",
        descripcion: "Productos específicos para oficinas",
      },
      {
        id: 102,
        nombre: "Limpieza Hospitalaria",
        descripcion: "Productos especializados para entornos médicos",
      },
    ],
  },
  {
    id: 2,
    nombre: "Desinfección",
    descripcion: "Productos y servicios para desinfección de espacios",

    subcategorias: [
      {
        id: 201,
        nombre: "Desinfectantes",
        descripcion: "Productos químicos para desinfección",
      },
    ],
  },
  {
    id: 3,
    nombre: "Mantenimiento",
    descripcion: "Servicios de mantenimiento para diferentes espacios",

    subcategorias: [],
  },
];

// Función para generar un ID único
export const generarId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// Función para generar un ID para subcategoría basado en la categoría padre
export const generarSubcategoriaId = (categoriaId) => {
  const baseId = parseInt(categoriaId.toString().substring(0, 1) + "00");
  return baseId + Math.floor(Math.random() * 100);
};
