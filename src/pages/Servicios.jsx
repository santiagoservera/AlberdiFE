import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import SeleccionServicio from "../components/Servicios/SeleccionServicio";

const Servicios = () => {
  return (
    <>
      <Navbar />
      <SeleccionServicio />
      <Footer />
    </>
  );
};

export default Servicios;
