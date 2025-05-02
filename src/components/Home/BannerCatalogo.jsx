import React from "react";
import imgBannerCatalogo from "../../assets/imgBannerCatalogorr.png";
import { Link } from "react-router-dom";
function BannerCatalogo() {
  return (
    <div className="w-full ">
      <div className="containerWidth flex md:flex-row flex-col-reverse items-center pb-5 md:pb-0 md:justify-between w-1/2 md:h-[450px] h-auto bg-[#F4EAE2] rounded-lg shadow-2xl mt-24">
        <div className="flex flex-col md:w-1/2 justify-center md:items-start  gap-10 md:pl-24">
          <p className="font-bold text-5xl text-start font-firelli text-textoVerde">
            Transforma tus <br /> espacios con <br /> nuestra línea <br /> de
            limpieza.
          </p>
          <Link to={"/Catalogo"}>
            <div className="flex justify-center">
              <a
                href=""
                className="md:text-left text-xl text-center  font-firelli text-[#FBF7F4] bg-[#4F6B5F] py-2 md:px-3 px-10 rounded-full tracking-wider font-semibold hover:bg-[#2c3b35]"
              >
                Explorar catálogo
              </a>
            </div>
          </Link>
        </div>
        <div className="mt-[-35px] ">
          <img
            src={imgBannerCatalogo}
            alt="banner"
            className="img-banner-catalogo h-[650px]"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerCatalogo;
