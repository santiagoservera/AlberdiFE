import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgProducto from "../../assets/imgProducto.png";
const Categorias = [
  { id: 1, nombre: "Químicos" },
  { id: 2, nombre: "Papel" },
  { id: 3, nombre: "Equipamiento para baños" },
  { id: 4, nombre: "Guantes" },
  { id: 5, nombre: "Herramientas de limpieza" },
  { id: 6, nombre: "Herramientas sanitarias" },
  { id: 7, nombre: "Pisos" },
  { id: 8, nombre: "Tapetes" },
  { id: 9, nombre: "Gastronomía" },
  { id: 10, nombre: "Cestos y contenedores" },
  { id: 11, nombre: "Carros funcionales" },
  { id: 12, nombre: "Máquinas" },
  { id: 13, nombre: "Hidrolavadoras" },
  { id: 14, nombre: "Espacios verdes" },
  { id: 15, nombre: "Almacenamientos" },
  { id: 16, nombre: "Prevención" },
];

const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Elimina suciedad y grasa en todo tipo de superficies.",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.  Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.  Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.  Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    imagen: imgProducto,
    categoriaId: 1,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Limpieza profunda y desinfección.",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.  Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.  Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.  Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    imagen: imgProducto,

    categoriaId: 2,
  },
  {
    id: 3,
    nombre: "Producto 3",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.  Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.  Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.  Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    descripcion: "Aromatiza y deja un fresco aroma.",
    imagen: imgProducto,
    categoriaId: 1,
  },
  {
    id: 4,
    nombre: "Producto 4",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.  Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.  Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.  Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    descripcion: "Absorbe rápidamente los líquidos.",
    imagen: imgProducto,
    categoriaId: 2,
  },
];

const CatalogoProductos = () => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleCheckboxChange = (id) => {
    setCategoriasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((catId) => catId !== id)
        : [...prevSeleccionadas, id]
    );
  };

  const productosFiltrados =
    categoriasSeleccionadas.length === 0
      ? productos
      : productos
          .filter((producto) =>
            categoriasSeleccionadas.includes(producto.categoriaId)
          )
          .sort((a, b) => a.id - b.id);

  const categoriaSeleccionadaTexto =
    categoriasSeleccionadas.length === 0
      ? "Selecciona un filtro"
      : Categorias.filter((cat) => categoriasSeleccionadas.includes(cat.id))
          .map((cat) => cat.nombre)
          .join(", ");

  return (
    <div className="w-full">
      <div className="flex containerWidth md:justify-between justify-center">
        <div className="hidden md:flex flex-col gap-5 p-4 rounded-md  w-[30%]">
          <div className="bg-[#F4EAE2] flex items-center justify-center p-2 rounded-lg">
            <p className="font-bold text-xl font-firelli text-textoVerde">
              Categorías
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-[#F4EAE2] p-4 font-firelli text-[#8BA99C] font-bold">
            {Categorias.map((categoria) => (
              <label key={categoria.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={categoriasSeleccionadas.includes(categoria.id)}
                  onChange={() => handleCheckboxChange(categoria.id)}
                  className="w-4 h-4 #608274 "
                />
                {categoria.nombre}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:w-[65%] p-4 gap-5">
          <div className="bg-[#F4EAE2] p-2 rounded-md items-center flex justify-center">
            <p className="text-textoVerde text-xl font-firelli font-bold">
              {categoriaSeleccionadaTexto}
            </p>
          </div>
          <div className="relative md:hidden">
            {/* Botón hamburguesa */}
            <button
              className="md:hidden p-2 bg-[#F4EAE2] rounded-lg flex items-center gap-2"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {menuAbierto ? "✖" : "☰"} Categorías
            </button>

            {/* Contenedor del menú */}
            <div
              className={`absolute top-12 left-0 bg-[#F4EAE2] w-60 p-4 rounded-md shadow-lg transition-all duration-300
        ${
          menuAbierto ? "opacity-100 visible" : "opacity-0 invisible"
        } md:opacity-100 md:visible md:static md:w-[30%]`}
            >
              <p className="font-bold text-xl font-firelli text-textoVerde text-center">
                Categorías
              </p>
              <div className="flex flex-col gap-2 mt-4 font-firelli text-[#8BA99C] font-bold">
                {Categorias.map((categoria) => (
                  <label key={categoria.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={categoriasSeleccionadas.includes(categoria.id)}
                      onChange={() => handleCheckboxChange(categoria.id)}
                      className="w-4 h-4"
                    />
                    {categoria.nombre}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="flex flex-wrap justify-center md:justify-start gap-9 my-10">
              {productosFiltrados.map((producto) => (
                <Link
                  to={`/Catalogo/producto/${producto.id}`}
                  key={producto.id}
                  className="flex flex-col justify-center gap-1 w-[200px] hover:bg-[#F4EAE2] hover:rounded-lg hover:shadow-2xl p-2 cursor-pointer"
                >
                  <img
                    src={producto.imagen || "/placeholder.svg"}
                    alt={producto.nombre}
                    className="w-[200px] h-[200px]"
                  />
                  <h1 className="text-textoVerde font-firelli md:text-2xl text-3xl font-bold">
                    {producto.nombre}
                  </h1>
                  <p className="md:text-sm text-lg text-textoVerde font-firelli">
                    {producto.descripcion}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-textoVerde font-firelli font-bold text-center mt-10">
              No hay productos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogoProductos;
