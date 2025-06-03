import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import SeccionProductos from "./SeccionProductos";
import SeccionServicios from "./SeccionServicios";
import SeccionPedidos from "./SeccionPedidos";
import SeccionCategorias from "./SeccionCategorias";
import SeccionConfiguracion from "./SeccionConfiguracion";
import logoBeige from "../../assets/LogoAlberdiBeige.png";

const Dashboard = () => {
  const [seccionActual, setSeccionActual] = useState("Productos");
  const { logout } = useAuthStore();

  const secciones = [
    "Productos",
    "Servicios",
    "Pedidos",
    "Categorias",
    "Configuracion",
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/admin";
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="md:w-64 bg-[#4F6B5F] text-white p-4 font-firelli flex flex-col">
        <div className="flex w-full justify-center">
          <img
            src={logoBeige || "/placeholder.svg"}
            alt="logo"
            className="w-[100px] h-[100px]"
          />
        </div>
        <div className="flex flex-col pt-14 flex-1">
          <h2 className="text-3xl font-bold mb-4 px-2">Panel</h2>
          <ul className=" flex gap-1 flex-col ">
            {secciones.map((seccion) => (
              <li
                key={seccion}
                className={`cursor-pointer p-2 rounded hover:bg-[#304139] ${
                  seccionActual === seccion ? "bg-[#304139]" : ""
                }`}
                onClick={() => setSeccionActual(seccion)}
              >
                {seccion}
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de Logout */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-semibold tracking-wide">
                Cerrar Sesión
              </span>
            </div>

            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700 ease-out"></div>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <div>
          {/* Seccion Productos */}
          {seccionActual === "Productos" && <SeccionProductos />}
          {/* Seccion Servicios */}
          {seccionActual === "Servicios" && <SeccionServicios />}
          {/* Seccion Pedidos */}
          {seccionActual === "Pedidos" && <SeccionPedidos />}
          {/* Seccion Categorias */}
          {seccionActual === "Categorias" && <SeccionCategorias />}
          {/* Seccion Configuracion */}
          {seccionActual === "Configuracion" && <SeccionConfiguracion />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
