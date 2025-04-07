import { Button, Input } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";

const CardLogin = () => {
  return (
    <div className="w-full min-h-[calc(100vh-204px)] flex items-center">
      <div className="md:w-1/2 mx-auto rounded-xl shadow-lg p-6 flex flex-col justify-center items-center md:my-10">
        <div className="flex flex-col py-10 gap-5">
          <p className="text-3xl font-firelli font-bold text-textoVerde">
            Bienvenido Admin
          </p>
          <p className="font-firelli text-opacity-60 text-black text-lg">
            Ingresa tus credenciales
          </p>
        </div>
        <div className="flex flex-col md:w-[90%] mx-auto justify-between gap-5">
          <Input
            label="Nombre"
            type="text"
            variant="bordered"
            className=" rounded-lg"
            name="nombre"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            variant="bordered"
            className=" rounded-lg"
            name="nombre"
            required
          />
          <Link to="/Admin/Dashboard">
            <Button className="font-firelli bg-[#4F6B5F] text-white w-full">
              Ingresar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardLogin;
