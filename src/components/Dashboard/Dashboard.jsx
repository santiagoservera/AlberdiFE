import React, { useState } from "react";

import SeccionProductos from "./SeccionProductos";
import SeccionServicios from "./SeccionServicios";
import SeccionPedidos from "./SeccionPedidos";
import SeccionCategorias from "./SeccionCategorias";

const Dashboard = () => {
  const [seccionActual, setSeccionActual] = useState("Productos");

  const secciones = ["Productos", "Servicios", "Pedidos", "Categorias"];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 bg-[#4F6B5F] text-white p-4 font-firelli">
        <h2 className="text-xl font-bold mb-4">Panel</h2>
        <ul className=" flex gap-3 flex-col ">
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
