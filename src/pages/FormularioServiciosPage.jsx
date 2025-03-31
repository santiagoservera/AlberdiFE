import React from "react";
import FormularioServicios from "../components/Servicios/FormularioServicios";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const FormularioServiciosPage = () => {
  return (
    <div className="bg-[#FBF7F4]">
      <Navbar />
      <FormularioServicios />
      <Footer />
    </div>
  );
};

export default FormularioServiciosPage;
