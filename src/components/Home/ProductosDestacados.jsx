import { Link } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import { formatCurrency } from "../../utils/formatCurrency";

// Función para dividir los productos en grupos de 4
const chunkArray = (arr, size) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

function ProductosDestacados() {
  // Obtener productos reales usando el hook
  const { productos, loading } = useProductos();

  // Dividir los productos en grupos de 4
  const chunkedProductos = chunkArray(productos, 4);

  return (
    <div className="w-full my-14">
      <div className="containerWidth flex flex-col">
        <h1 className="text-3xl font-firelli font-bold text-textoVerde">
          Productos destacados
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-textoVerde font-firelli font-bold">
              Cargando productos destacados...
            </p>
          </div>
        ) : productos.length > 0 ? (
          chunkedProductos.map((grupo, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center md:justify-between gap-9 my-10"
            >
              {grupo.map((producto) => (
                <Link
                  to={`/Catalogo/producto/${producto.id}`}
                  key={producto.id}
                  className="flex flex-col justify-center gap-1 w-[200px] hover:bg-[#F4EAE2] hover:rounded-lg hover:shadow-2xl p-2"
                >
                  <img
                    src={producto.imagenUrl || "/placeholder.svg"}
                    alt={producto.nombre}
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <h1 className="text-textoVerde font-firelli md:text-2xl text-3xl font-bold">
                    {producto.nombre}
                  </h1>
                  <p className="md:text-sm text-lg text-textoVerde font-firelli">
                    {producto.descripcion_corta || producto.descripcion}
                  </p>
                  {producto.precioActual && (
                    <p className="text-textoVerde font-firelli font-bold">
                      {formatCurrency(producto.precioActual)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-textoVerde font-firelli font-bold">
              No hay productos destacados disponibles.
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            to="/Catalogo"
            className="rounded-full bg-button py-1 px-3 text-[#FBF7F4] text-sm hover:bg-[#2c3b35] font-firelli"
          >
            Explorar catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductosDestacados;
