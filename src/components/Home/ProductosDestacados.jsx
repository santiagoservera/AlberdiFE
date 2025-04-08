import React from "react";
import { Link } from "react-router-dom";
import imgProducto from "../../assets/imgProducto.png";
const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 3,
    nombre: "Producto 3",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 4,
    nombre: "Producto 4",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },
  {
    id: 5,
    nombre: "Producto 5",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 6,
    nombre: "Producto 6",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 7,
    nombre: "Producto 7",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },

  {
    id: 8,
    nombre: "Producto 8",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen: imgProducto,
  },
];

// Función para dividir los productos en grupos de 4
const chunkArray = (arr, size) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

function ProductosDestacados() {
  const chunkedProductos = chunkArray(productos, 4);

  return (
    <div className="w-full my-14">
      <div className="containerWidth flex flex-col">
        <h1 className="text-3xl font-firelli font-bold text-textoVerde">
          Productos destacados
        </h1>
        {chunkedProductos.map((grupo, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center md:justify-between gap-9 my-10"
          >
            {grupo.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col justify-center gap-1 w-[200px] hover:bg-[#F4EAE2] hover:rounded-lg hover:shadow-2xl"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-[200px] h-[200px]"
                />
                <h1 className="text-textoVerde font-firelli md:text-2xl text-3xl font-bold">
                  {producto.nombre}
                </h1>
                <p className="md:text-sm text-lg text-textoVerde font-firelli">
                  {producto.descripcion}
                </p>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center ">
          <Link to={"/Catalogo"}>
            <a
              href=""
              className="  rounded-full bg-button py-1 px-3 text-[#FBF7F4] text-sm hover:bg-[#2c3b35] font-firelli"
            >
              Explorar catálogo
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductosDestacados;
