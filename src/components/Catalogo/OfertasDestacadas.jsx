import React from "react";

const productosOfertas = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
  },

  {
    id: 3,
    nombre: "Producto 3",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
  },

  {
    id: 4,
    nombre: "Producto 4",
    descripcion:
      "Fórmula versátil que elimina la suciedad y grasa en todo tipo de superficies.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
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
