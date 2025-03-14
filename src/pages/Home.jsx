import React from "react";
import { Navbar } from "../components/Navbar";
import BannerServicio from "../components/BannerServicio";
import DivisorHome from "../components/DivisorHome";
import BannerCatalogo from "../components/BannerCatalogo";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-home">
        <BannerServicio />
        <DivisorHome />
      </div>
      <BannerCatalogo />
    </>
  );
};
