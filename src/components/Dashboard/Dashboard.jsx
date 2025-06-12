"use client";

import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import SeccionProductos from "./SeccionProductos";
import SeccionServicios from "./SeccionServicios";
import SeccionPedidos from "./SeccionPedidos";
import SeccionCategorias from "./SeccionCategorias";
import SeccionConfiguracion from "./SeccionConfiguracion";
import logoBeige from "../../assets/LogoAlberdiBeige.png";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [seccionActual, setSeccionActual] = useState("Productos");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuthStore();

  const navigate = useNavigate();

  const secciones = [
    "Productos",
    "Servicios",
    "Ordenes",
    "Categorias",
    "Configuracion",
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const handleSectionChange = (seccion) => {
    setSeccionActual(seccion);
    setSidebarOpen(false); // Cerrar sidebar en mobile al seleccionar
  };

  // Función para obtener las iniciales del usuario
  const getUserInitials = (user) => {
    if (!user) return "U";

    if (user.name) {
      return user.name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }

    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "U";
  };

  // Función para obtener el nombre a mostrar
  const getDisplayName = (user) => {
    if (!user) return "Usuario";
    return user.name || user.username || "Usuario";
  };

  // Función para obtener el email a mostrar
  const getDisplayEmail = (user) => {
    if (!user) return "usuario@ejemplo.com";
    return user.email || "Sin email";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#4F6B5F] text-white p-4 font-firelli flex flex-col h-full
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header con botón cerrar en mobile */}
        <div className="flex items-center justify-between lg:justify-center mb-4">
          <img
            src={logoBeige || "/placeholder.svg"}
            alt="logo"
            className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex flex-col pt-6 lg:pt-14 flex-1 overflow-y-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 px-2">Panel</h2>
          <ul className="flex gap-1 flex-col">
            {secciones.map((seccion) => (
              <li
                key={seccion}
                className={`cursor-pointer p-2 rounded hover:bg-[#304139] transition-colors ${
                  seccionActual === seccion ? "bg-[#304139]" : ""
                }`}
                onClick={() => handleSectionChange(seccion)}
              >
                {seccion}
              </li>
            ))}
          </ul>
        </div>

        {/* User Info - Fixed above logout */}
        <div className="flex-shrink-0 px-2 py-4 border-t border-[#304139]">
          <div className="flex items-center space-x-3">
            {/* Avatar con iniciales reales del usuario */}
            <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#4F6B5F] font-bold text-sm">
                {getUserInitials(user)}
              </span>
            </div>

            {/* User Info Real */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate capitalize">
                {getDisplayName(user)}
              </p>
              <p className="text-xs text-stone-300 truncate capitalize">
                {getDisplayEmail(user)}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de Logout - Fixed at bottom */}
        <div className="pt-2 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-50 to-stone-200 hover:from-amber-100 hover:to-stone-300 text-[#4F6B5F] font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
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
      <main className="flex-1 overflow-y-auto lg:ml-0">
        {/* Header con botón hamburguesa para mobile */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {seccionActual}
            </h1>
            <div className="w-6" /> {/* Spacer para centrar el título */}
          </div>
        </div>

        {/* Contenido de las secciones */}
        <div className="p-4 lg:p-6">
          {/* Seccion Productos */}
          {seccionActual === "Productos" && <SeccionProductos />}
          {/* Seccion Servicios */}
          {seccionActual === "Servicios" && <SeccionServicios />}
          {/* Seccion Pedidos */}
          {seccionActual === "Ordenes" && <SeccionPedidos />}
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
