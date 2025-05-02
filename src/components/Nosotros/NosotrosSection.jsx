import React from "react";
import Nosotros from "../../assets/nosotros.png";
import DivisorHome from "../Home/DivisorHome";

const NosotrosSection = () => {
  return (
    <div className="w-full">
      <div className="containerWidth flex flex-col">
        <div className="flex justify-between md:flex-row flex-col py-10">
          <p className="font-bold font-firelli text-center md:text-start text-textoVerde text-6xl">
            La limpieza <br />
            en los espacios
          </p>
          <p className=" md:w-[30%] text-textoVerde font-firelli tracking-widest">
            Toda empresa o entidad que tenga un espacio físico donde se realizan
            actividades necesita mantener estas instalaciones limpias. Esto
            incluye la limpieza organizacional, tanto interior como exterior,
            mantenimiento de espacios verdes y fumigaciones.
          </p>
        </div>
        <div className="flex  w-full">
          <img src={Nosotros} alt="" className="rounded-lg h-[700px] w-full" />
        </div>
        <div className="flex md:flex-row-reverse flex-col  justify-between py-10">
          <p className="font-bold md:text-end font-firelli text-textoVerde text-6xl text-center">
            Sobre <br />
            Alberdi Servicios
          </p>
          <p className=" md:w-[30%] text-textoVerde font-firelli tracking-widest">
            Alberdi S.A.S es una empresa originada en Argentina en 2001.
            Inicialmente enfocada en darle solución a los desechos generados por
            la construcción, eventualmente diversifica su enfoque hacia la
            higiene ambiental, el cuidado de materias primas y la higiene
            personal, así como la gestión y prevención de residuos
          </p>
        </div>
      </div>
      <div className="bg-[#608274] w-full h-auto my-10 text-center py-4 font-firelli text-[#B9CBC4] font-bold tracking-widest">
        "Proveer soluciones y servicios de limpieza y mantenimiento de alta
        calidad <br /> y eficiencia, asegurando ambientes saludables y
        productivos para nuestros <br /> clientes."
      </div>
    </div>
  );
};

export default NosotrosSection;
