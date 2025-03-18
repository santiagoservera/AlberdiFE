import React from "react";
import { Navbar } from "../components/Navbar";
import BannerServicio from "../components/Home/BannerServicio";
import DivisorHome from "../components/Home/DivisorHome";
import BannerCatalogo from "../components/Home/BannerCatalogo";
import ProductosDestacados from "../components/Home/ProductosDestacados";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <>
      <div className="bg-home">
        <Navbar />

        <BannerServicio />
        <DivisorHome />
      </div>
      <BannerCatalogo />
      <ProductosDestacados />
      <Footer />
    </>
  );
};
