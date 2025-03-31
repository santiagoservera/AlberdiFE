"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import useCarritoStore from "../store/useCarritoStore";
import { Button } from "@heroui/react";

const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Elimina suciedad y grasa en todo tipo de superficies.",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WtnSi5vDVqzCzKC2JR1u4tXQgv2QyWbY3HqkpGJiWML2BDTPU1uLw-S6wU-G0l2ZXLYvH0v29yBUDoL~CijApUVJ2k5~tQWOAUwMSe0rfoOA3VSnBCjBJT4geeX1xa0viEtX74DjwN2MRYqp9I4aKtCtxSWvC2lEkDXwq1JrbzPEsDNlBB584AKV8x8DWXZ8QjInZwteqaIikoXvtSLj6qUQYbq8i0KBDabA6BtoX5p-olO5emYTbJVmSTrqHGGpvNsRkUl6qG~US2EggYwXVdGtyp5Id1S3wgIMm7GMgjbD-QbDfWAZObcO7fV95bXl9DUURj2-vkGFPXTtFlhh7A__",
    categoriaId: 1,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Limpieza profunda y desinfección.",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 2,
  },
  {
    id: 3,
    nombre: "Producto 3",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    descripcion: "Aromatiza y deja un fresco aroma.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 1,
  },
  {
    id: 4,
    nombre: "Producto 4",
    detalle:
      "Acabado de poliuretano compuesto por polímeros uretánicos y acrílicos. Proporciona un excelente nivel de brillo y mayor durabilidad.Es antideslizante y da un efecto piso mojado. Su transparencia característica, permite mantener el color original del piso.Su exclusiva fórmula protege los pisos formando una capa impermeabilizante resistente a pisadas, rayones, marcas y suciedades, facilitando el mantenimiento diario de los pisos.Ideal para alto tránsito, grandes áreas, pisos de mosaico, mármol, PVC, goma, flexiplast, plásticos, etc. y para ser utilizado con máquinas de alta velocidad (con un paño blanco o natural/porco).",
    descripcion: "Absorbe rápidamente los líquidos.",
    imagen:
      "https://s3-alpha-sig.figma.com/img/ee7f/e163/8792225593bf8799a5717739edb9e3bd?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pvK46a2ciMzq3-5VyRhz0r5RN0gXLLMAoFB2hMdQZLtaekwEENENkRGPL7-mM53L5p4enuEnQ7uFzd7hXkOk~kyuNfPkBVnjcsaY4pl1CUNdN0yENhhNaiTo37AuGamyfCLaaPndXvCffc8lBYaAGlYjsHwVal9dEr7j3srlghWxwXHBuVlyMxzcw62JnH5Z1ENExyzxxwoSnN7OebOXCV1dl2-ref4SRoHW9dg3YGHzHwoESQAS7BWYs~J0aRAxGnSqbUyMn8mkcxuM4b5Zck3jFqaKuBxDBeB~SFe7UJ2yt-i5tkRrJMvCxoYxNX3fVnxsYfJLUGYqJ8t7hPZUsA__",
    categoriaId: 2,
  },
];

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number.parseInt(id));
  const { addToCart, openCarrito } = useCarritoStore();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  const handleAddToCart = () => {
    addToCart(producto);
    setAddedToCart(true);

    // Mostrar mensaje de éxito por 2 segundos
    setTimeout(() => {
      setAddedToCart(false);
      openCarrito(); // Abrir el carrito después de agregar el producto
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Version desktop */}
      <div className="w-[70%] mx-auto md:flex justify-between items-center py-10 gap-10 hidden">
        <div className="border border-black rounded-md h-[600px] min-h-[500px] w-1/2 flex justify-center p-5">
          <img
            src={producto.imagen || "/placeholder.svg"}
            alt="producto"
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className="border border-black rounded-md flex flex-col w-1/2 h-[600px] min-h-[500px] p-5 gap-4">
          <h1 className="text-3xl text-center font-firelli text-textoVerde font-extrabold">
            {producto.nombre}
          </h1>

          {producto.detalle.split(".").map(
            (frase, index) =>
              frase.trim() && (
                <p key={index} className="text-lg font-firelli text-textoVerde">
                  {frase.trim()}.
                </p>
              )
          )}
        </div>
      </div>

      {/* Version mobile */}
      <div className="flex flex-col items-center justify-center w-[90%] mx-auto md:hidden py-10 border border-black rounded-md">
        <div>
          <img
            src={producto.imagen || "/placeholder.svg"}
            alt="producto"
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className="flex items-center justify-center flex-col gap-4">
          <h1 className="text-3xl font-firelli text-textoVerde font-extrabold">
            {producto.nombre}
          </h1>

          {producto.detalle.split(".").map(
            (frase, index) =>
              frase.trim() && (
                <p
                  key={index}
                  className="text-xl font-firelli text-textoVerde text-center"
                >
                  {frase.trim()}.
                </p>
              )
          )}
        </div>
      </div>

      <div className="md:pb-10 pt-10 pb-20">
        <Button
          onClick={handleAddToCart}
          className={`p-3 rounded-full font-firelli text-[#FBF7F4] ${
            addedToCart ? "bg-green-600" : "bg-[#4F6B5F]"
          }`}
        >
          {addedToCart ? "¡Agregado!" : "Agregar al carrito"}
        </Button>
      </div>
    </div>
  );
};

export default DetalleProducto;
