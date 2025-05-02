import React from "react";
import imgBannerServicio from "../../assets/imgBannerServicio.png";
import { Link } from "react-router-dom";
function BannerServicio() {
  return (
    <div className="containerWidth">
      <div className="flex md:flex-row flex-col justify-between gap-10 w-full pt-10">
        <div className="flex flex-col gap-10 text-center py-7 items-start">
          <h1 className="text-5xl font-bold text-start font-firelli text-textoVerde">
            Servicios Profesionales <br /> de Limpieza en <br />
            Argentina.
          </h1>
          <p className="text-lg text-start tracking-widest font-firelli text-textoVerde font-medium">
            Líderes en soluciones de higiene y mantenimiento, <br /> reconocidos
            por nuestra innovación, calidad y compromiso <br /> para con el
            bienestar de la comunidad.
          </p>
          <Link to="/Servicios">
            <a
              href=""
              className="py-2 px-3 text-[#FBF7F4] bg-[#4F6B5F] tracking-wider rounded-full font-firelli font-semibold hover:bg-[#2c3b35]"
            >
              Solicitar servicio
            </a>
          </Link>
        </div>
        <div className="md:w-[400px]">
          <img
            src={imgBannerServicio}
            alt="banner"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerServicio;
