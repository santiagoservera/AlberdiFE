import React, { useState } from "react";

const Dashboard = () => {
  const [seccionActual, setSeccionActual] = useState("Productos");

  const secciones = ["Productos", "Servicios", "Pedidos"];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4F6B5F] text-white p-4">
        <h2 className="text-xl font-bold mb-4">Panel</h2>
        <ul>
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
        <h1 className="text-2xl font-bold mb-4">{seccionActual}</h1>
        <div>
          {/* Aquí podrías renderizar contenido diferente según la sección */}
          <p>
            Aquí se muestra el contenido de <strong>{seccionActual}</strong>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
