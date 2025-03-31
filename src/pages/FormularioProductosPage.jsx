import React from "react";
import { Navbar } from "../components/Navbar";
import FormularioProductos from "../components/Catalogo/FormularioProductos";
import Footer from "../components/Footer";

const FormularioProductosPage = () => {
  return (
    <div>
      <Navbar />
      <FormularioProductos />
      <Footer />
    </div>
  );
};

export default FormularioProductosPage;
