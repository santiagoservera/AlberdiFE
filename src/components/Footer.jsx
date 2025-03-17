import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoFooter from "../assets/logoFooter.png";
import iconFooter from "../assets/iconFooter.png";

const Footer = () => {
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // Evita la navegación si ya estás en "/"
      window.scrollTo({ top: 0, behavior: "smooth" }); // Hace scroll hacia arriba
    }
  };

  return (
    <div className="w-full bg-button h-auto">
      <Link to="/" onClick={handleClick}>
        <div className="flex absolute right-44 mt-[-45px] bg-[#8BA99C] p-5 rounded-full">
          <img src={iconFooter} alt="Ícono Footer" />
        </div>
      </Link>
      <div className="containerWidth flex justify-around py-10">
        <div className="flex flex-col justify-start items-start gap-3">
          <img src={logoFooter} alt="Logo Footer" />
          <p className="font-firelli text-[#F4EAE2]">
            alberdiserviciosas@gmail.com
          </p>
          <p className="font-firelli text-[#F4EAE2]">
            Alberdi 648 (0) San Juan, Argentina
          </p>
        </div>
        <div className="flex flex-col justify-center items-start gap-3 text-[#F4EAE2] font-firelli font-bold">
          <p>Home</p>
          <p>Contacto</p>
          <p>Nosotros</p>
          <p>Preguntas Frecuentes</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
