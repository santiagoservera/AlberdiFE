import React from "react";
import { Navbar } from "../components/Navbar";
import CardLogin from "../components/CardLogin";
import Footer from "../components/Footer";

const AdminLogin = () => {
  return (
    <div className="bg-home">
      <Navbar />
      <CardLogin />
      <Footer />
    </div>
  );
};

export default AdminLogin;
