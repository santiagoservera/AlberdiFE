"use client";

import { useState } from "react";

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
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 1,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Limpieza profunda y desinfección.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 2,
  },
  {
    id: 3,
    nombre: "Producto 3",
    descripcion: "Aromatiza y deja un fresco aroma.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 1,
  },
  {
    id: 4,
    nombre: "Producto 4",
    descripcion: "Absorbe rápidamente los líquidos.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 2,
  },
];

const CatalogoProductos = () => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

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
      <div className="flex containerWidth justify-between">
        <div className="flex flex-col gap-5 p-4 rounded-md  w-[30%]">
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
        <div className="flex flex-col w-[65%] p-4">
          <div className="bg-[#F4EAE2] p-2 rounded-md items-center flex justify-center">
            <p className="text-textoVerde text-xl font-firelli font-bold">
              {categoriaSeleccionadaTexto}
            </p>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="flex flex-wrap justify-center md:justify-start gap-9 my-10">
              {productosFiltrados.map((producto) => (
                <div
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
                </div>
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
