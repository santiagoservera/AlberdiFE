import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import SeleccionServicio from "../components/Servicios/SeleccionServicio";

const Servicios = () => {
  return (
    <>
      <div className="bg-home lg:absolute">
        <Navbar />
        <SeleccionServicio />
        <Footer />
      </div>
    </>
  );
};

export default Servicios;
