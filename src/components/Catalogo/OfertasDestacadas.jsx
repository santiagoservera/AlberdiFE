import React from "react";
import imgProducto from "../../assets/imgProducto.png";
const productosOfertas = [
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
];

// Función para dividir los productos en grupos de 4
const chunkArray = (arr, size) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};
const OfertasDestacadas = () => {
  const chunkedProductos = chunkArray(productosOfertas, 4);
  return (
    <div className="w-full h-auto mt-20">
      <div className="containerWidth flex flex-col justify-center items-center">
        <div className="flex w-full md:justify-start justify-center">
          <p className="font-firelli text-3xl text-textoVerde font-extrabold">
            Ofertas destacadas
          </p>
        </div>

        {chunkedProductos.map((grupo, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center gap-7 md:gap-0 w-full md:justify-between  my-10"
          >
            {grupo.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col justify-center gap-1 w-[200px] hover:bg-[#F4EAE2] hover:rounded-lg hover:shadow-2xl cursor-pointer"
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
      </div>
    </div>
  );
};

export default OfertasDestacadas;
