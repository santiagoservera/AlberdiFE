"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategorias from "../../hooks/useCategorias";
import useProductos from "../../hooks/useProductos";
import { formatCurrency } from "../../utils/formatCurrency";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const CatalogoProductos = () => {
  // Obtener datos reales usando los hooks personalizados
  const { categorias, loading: loadingCategorias } = useCategorias();
  const {
    productos,
    loading: loadingProductos,
    fetchProductos,
  } = useProductos();

  // Estados para el filtrado y la UI
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [subcategoriasSeleccionadas, setSubcategoriasSeleccionadas] = useState(
    []
  );
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState({});
  const [busqueda, setBusqueda] = useState("");

  // Estado derivado: todas las subcategorías de las categorías seleccionadas
  const [subcategoriasDeCategorias, setSubcategoriasDeCategorias] = useState(
    []
  );

  // Actualizar las subcategorías derivadas cuando cambian las categorías seleccionadas
  useEffect(() => {
    // Obtener todas las subcategorías de las categorías seleccionadas
    const todasSubcategorias = categorias
      .filter((cat) => categoriasSeleccionadas.includes(cat.id))
      .flatMap((cat) => (cat.subcategorias || []).map((subcat) => subcat.id));

    setSubcategoriasDeCategorias(todasSubcategorias);
  }, [categoriasSeleccionadas, categorias]);

  // Manejar cambios en los checkboxes de categorías
  const handleCheckboxChange = (id) => {
    setCategoriasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((catId) => catId !== id)
        : [...prevSeleccionadas, id]
    );
  };

  // Manejar cambios en los checkboxes de subcategorías
  const handleSubcategoriaChange = (id) => {
    setSubcategoriasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((subId) => subId !== id)
        : [...prevSeleccionadas, id]
    );
  };

  // Manejar la expansión/colapso de categorías
  const toggleCategoria = (id) => {
    setCategoriasExpandidas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtrar productos según las categorías, subcategorías seleccionadas y búsqueda
  const productosFiltrados = productos
    .filter((producto) => {
      // Filtrar por búsqueda (si hay término de búsqueda)
      if (
        busqueda &&
        !producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        !(
          producto.descripcion_corta &&
          producto.descripcion_corta
            .toLowerCase()
            .includes(busqueda.toLowerCase())
        ) &&
        !(
          producto.descripcion &&
          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        )
      ) {
        return false;
      }

      // Si no hay categorías ni subcategorías seleccionadas, mostrar todos
      if (
        categoriasSeleccionadas.length === 0 &&
        subcategoriasSeleccionadas.length === 0
      ) {
        return true;
      }

      // Filtrar por categoría (incluye productos de la categoría y sus subcategorías)
      if (categoriasSeleccionadas.includes(producto.categoria_id)) {
        return true;
      }

      // Filtrar por subcategorías derivadas de las categorías seleccionadas
      if (subcategoriasDeCategorias.includes(producto.subcategoria_id)) {
        return true;
      }

      // Filtrar por subcategoría seleccionada explícitamente
      if (subcategoriasSeleccionadas.includes(producto.subcategoria_id)) {
        return true;
      }

      return false;
    })
    .sort((a, b) => a.id - b.id);

  // Texto para mostrar las categorías y subcategorías seleccionadas
  const categoriaSeleccionadaTexto = (() => {
    if (
      categoriasSeleccionadas.length === 0 &&
      subcategoriasSeleccionadas.length === 0
    ) {
      return busqueda
        ? `Resultados para: "${busqueda}"`
        : "Todos los productos";
    }

    const nombresSeleccionados = [];

    // Añadir nombres de categorías seleccionadas
    categorias
      .filter((cat) => categoriasSeleccionadas.includes(cat.id))
      .forEach((cat) => {
        nombresSeleccionados.push(cat.nombre);
      });

    // Añadir nombres de subcategorías seleccionadas explícitamente
    // (solo si su categoría padre no está ya seleccionada)
    const subcategoriasExplicitas = [];
    categorias.forEach((cat) => {
      if (cat.subcategorias) {
        cat.subcategorias
          .filter(
            (subcat) =>
              subcategoriasSeleccionadas.includes(subcat.id) &&
              !categoriasSeleccionadas.includes(cat.id)
          )
          .forEach((subcat) => {
            subcategoriasExplicitas.push(subcat.nombre);
          });
      }
    });

    return [...nombresSeleccionados, ...subcategoriasExplicitas].join(", ");
  })();

  // Función para manejar click en producto con logging
  const handleProductClick = (producto) => {
    console.log("Navegando a producto:", {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precioActual || producto.precio,
      imagen: producto.imagenUrl,
    });

    // Validar que el producto tenga los datos mínimos necesarios
    if (!producto.id || !producto.nombre) {
      console.error("Producto incompleto:", producto);
      alert(
        "Este producto no tiene todos los datos necesarios. Por favor, contacte con soporte."
      );
      return false;
    }

    return true;
  };

  return (
    <div className="w-full">
      {/* Buscador */}
      <div className="containerWidth mx-auto mb-6 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-[#8BA99C] font-firelli focus:outline-none focus:ring-2 focus:ring-[#8BA99C] focus:border-transparent"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8BA99C]"
            size={18}
          />
        </div>
      </div>

      <div className="flex containerWidth md:justify-between justify-center">
        {/* Sidebar de categorías para pantallas medianas y grandes */}
        <div className="hidden md:flex flex-col gap-5 p-4 rounded-md w-[30%]">
          <div className="bg-[#F4EAE2] flex items-center justify-center p-2 rounded-lg">
            <p className="font-bold text-xl font-firelli text-textoVerde">
              Categorías
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-[#F4EAE2] p-4 font-firelli text-[#8BA99C] font-bold">
            {loadingCategorias ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8BA99C]"></div>
                <span className="ml-2">Cargando categorías...</span>
              </div>
            ) : (
              categorias.map((categoria) => (
                <div key={categoria.id} className="mb-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-textoVerde transition-colors">
                      <input
                        type="checkbox"
                        checked={categoriasSeleccionadas.includes(categoria.id)}
                        onChange={() => handleCheckboxChange(categoria.id)}
                        className="w-4 h-4 text-[#608274] focus:ring-[#608274] border-gray-300 rounded"
                      />
                      {categoria.nombre}
                    </label>
                    {categoria.subcategorias &&
                      categoria.subcategorias.length > 0 && (
                        <button
                          onClick={() => toggleCategoria(categoria.id)}
                          className="text-[#8BA99C] hover:text-textoVerde transition-colors p-1"
                        >
                          {categoriasExpandidas[categoria.id] ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      )}
                  </div>

                  {/* Subcategorías */}
                  {categoria.subcategorias &&
                    categoria.subcategorias.length > 0 &&
                    categoriasExpandidas[categoria.id] && (
                      <div className="ml-6 mt-2 flex flex-col gap-1">
                        {categoria.subcategorias.map((subcategoria) => (
                          <label
                            key={subcategoria.id}
                            className="flex items-center gap-2 cursor-pointer hover:text-textoVerde transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={subcategoriasSeleccionadas.includes(
                                subcategoria.id
                              )}
                              onChange={() =>
                                handleSubcategoriaChange(subcategoria.id)
                              }
                              className="w-4 h-4 text-[#608274] focus:ring-[#608274] border-gray-300 rounded"
                            />
                            {subcategoria.nombre}
                          </label>
                        ))}
                      </div>
                    )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col md:w-[65%] p-4 gap-5">
          <div className="bg-[#F4EAE2] p-2 rounded-md items-center flex justify-center">
            <p className="text-textoVerde text-xl font-firelli font-bold">
              {categoriaSeleccionadaTexto}
            </p>
          </div>

          {/* Menú hamburguesa para móviles */}
          <div className="relative md:hidden">
            <button
              className="md:hidden p-2 bg-[#F4EAE2] rounded-lg flex items-center gap-2 font-firelli text-textoVerde font-bold"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {menuAbierto ? "✖" : "☰"} Categorías
            </button>

            <div
              className={`absolute top-12 left-0 bg-[#F4EAE2] w-60 p-4 rounded-md shadow-lg transition-all duration-300 z-50
                ${
                  menuAbierto ? "opacity-100 visible" : "opacity-0 invisible"
                } md:opacity-100 md:visible md:static md:w-[30%]`}
            >
              <p className="font-bold text-xl font-firelli text-textoVerde text-center">
                Categorías
              </p>
              <div className="flex flex-col gap-2 mt-4 font-firelli text-[#8BA99C] font-bold">
                {loadingCategorias ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8BA99C]"></div>
                    <span className="ml-2">Cargando...</span>
                  </div>
                ) : (
                  categorias.map((categoria) => (
                    <div key={categoria.id} className="mb-2">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-textoVerde transition-colors">
                          <input
                            type="checkbox"
                            checked={categoriasSeleccionadas.includes(
                              categoria.id
                            )}
                            onChange={() => handleCheckboxChange(categoria.id)}
                            className="w-4 h-4"
                          />
                          {categoria.nombre}
                        </label>
                        {categoria.subcategorias &&
                          categoria.subcategorias.length > 0 && (
                            <button
                              onClick={() => toggleCategoria(categoria.id)}
                              className="text-[#8BA99C] hover:text-textoVerde transition-colors p-1"
                            >
                              {categoriasExpandidas[categoria.id] ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          )}
                      </div>

                      {/* Subcategorías */}
                      {categoria.subcategorias &&
                        categoria.subcategorias.length > 0 &&
                        categoriasExpandidas[categoria.id] && (
                          <div className="ml-6 mt-2 flex flex-col gap-1">
                            {categoria.subcategorias.map((subcategoria) => (
                              <label
                                key={subcategoria.id}
                                className="flex items-center gap-2 cursor-pointer hover:text-textoVerde transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={subcategoriasSeleccionadas.includes(
                                    subcategoria.id
                                  )}
                                  onChange={() =>
                                    handleSubcategoriaChange(subcategoria.id)
                                  }
                                  className="w-4 h-4"
                                />
                                {subcategoria.nombre}
                              </label>
                            ))}
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          {loadingProductos ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F6B5F] mb-4"></div>
              <p className="text-textoVerde font-firelli font-bold">
                Cargando productos...
              </p>
            </div>
          ) : productosFiltrados.length > 0 ? (
            <div className="flex flex-wrap justify-center md:justify-start gap-9 my-10">
              {productosFiltrados.map((producto) => (
                <Link
                  to={`/Catalogo/producto/${producto.id}`}
                  key={producto.id}
                  className="flex flex-col items-center justify-center gap-1 w-[200px] hover:bg-[#F4EAE2] hover:rounded-lg hover:shadow-2xl p-2 cursor-pointer transition-all duration-200 transform hover:scale-105"
                  onClick={(e) => {
                    if (!handleProductClick(producto)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <img
                    src={producto.imagenUrl || "/placeholder.svg"}
                    alt={producto.nombre}
                    className="w-[100px] h-[150px]  rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <h1 className="text-textoVerde font-firelli md:text-2xl text-3xl font-bold line-clamp-2">
                    {producto.nombre}
                  </h1>
                  <p className="md:text-sm text-lg text-textoVerde font-firelli line-clamp-2">
                    {producto.descripcion_corta ||
                      producto.descripcion ||
                      "Sin descripción"}
                  </p>
                  {(producto.precioActual || producto.precio) && (
                    <p className="text-textoVerde font-firelli font-bold">
                      {formatCurrency(producto.precioActual || producto.precio)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-textoVerde font-firelli font-bold text-xl mb-2">
                No hay productos disponibles para esta búsqueda.
              </p>
              {(busqueda ||
                categoriasSeleccionadas.length > 0 ||
                subcategoriasSeleccionadas.length > 0) && (
                <button
                  onClick={() => {
                    setBusqueda("");
                    setCategoriasSeleccionadas([]);
                    setSubcategoriasSeleccionadas([]);
                  }}
                  className="text-[#4F6B5F] hover:text-textoVerde font-firelli underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogoProductos;
