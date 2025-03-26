import React from "react";
import { Navbar } from "../components/Navbar";
import BannerCatalogo from "../components/Home/BannerCatalogo";
import OfertasDestacadas from "../components/Catalogo/OfertasDestacadas";
import DivisorHome from "../components/Home/DivisorHome";
import CatalogoProductos from "../components/Catalogo/CatalogoProductos";
import Footer from "../components/Footer";

const Catalogo = () => {
  return (
    <>
      <Navbar />
      <BannerCatalogo />
      <OfertasDestacadas />
      <DivisorHome />
      <CatalogoProductos />
      <Footer />
    </>
  );
};

export default Catalogo;
