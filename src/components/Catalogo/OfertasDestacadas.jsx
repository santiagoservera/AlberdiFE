import { Link } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import { formatCurrency } from "../../utils/formatCurrency";

const OfertasDestacadas = () => {
  // Obtener productos reales usando el hook
  const { productos, loading } = useProductos();

  // Tomar solo los primeros 4 productos
  const productosDestacados = productos.slice(0, 4);

  return (
    <div className="w-full h-auto mt-20">
      <div className="containerWidth flex flex-col justify-center items-center">
        <div className="flex w-full md:justify-start justify-center">
          <p className="font-firelli text-3xl text-textoVerde font-extrabold">
            Ofertas destacadas
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <p className="text-textoVerde font-firelli font-bold">
              Cargando productos destacados...
            </p>
          </div>
        ) : productosDestacados.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-7 md:gap-0 w-full md:justify-between my-10">
            {productosDestacados.map((producto) => (
              <Link
                to={`/Catalogo/producto/${producto.id}`}
                key={producto.id}
                className="flex flex-col justify-center gap-1 w-[200px] hover:bg-[#F4EAE2] hover:rounded-lg hover:shadow-2xl p-2 cursor-pointer"
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
        ) : (
          <div className="flex justify-center items-center h-64 w-full">
            <p className="text-textoVerde font-firelli font-bold">
              No hay productos destacados disponibles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfertasDestacadas;
