import React from "react";
import { Navbar } from "../components/Navbar";
import NosotrosSection from "../components/Nosotros/NosotrosSection";
import BeneficiosSection from "../components/Nosotros/BeneficiosSection";
import Footer from "../components/Footer";

const Nosotros = () => {
  return (
    <>
      <Navbar />
      <div>
        <NosotrosSection />
        <BeneficiosSection />
        <Footer />
      </div>
    </>
  );
};

export default Nosotros;
