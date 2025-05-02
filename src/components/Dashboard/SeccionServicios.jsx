"use client";

import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { CreateServicioModal } from "./Servicios/servicios-modal";
import { ConfirmacionModal } from "./Servicios/confirmacion-modal";
import espaciosVerdes from "../../assets/espaciosVerdes.png";
import limpiezaHospitalaria from "../../assets/limpiezaHospitalaria.png";
// Datos iniciales de servicios
const serviciosIniciales = [
  {
    id: 1,
    nombre: "Mantenimiento de espacios verdes",
    descripcion:
      "En cuanto al mantenimiento de espacios verdes, Alberdi S.A.S cuenta con expertos en jardinería que se encargan de la poda, riego, y cuidado de plantas y césped. Esto no solo embellece el entorno, sino que también contribuye a un ambiente más saludable y agradable para empleados y visitantes.",
    imagen: espaciosVerdes,
  },
  {
    id: 2,
    nombre: "Limpieza Hospitalaria",
    descripcion:
      "La limpieza hospitalaria es un servicio altamente especializado que Alberdi S.A.S ofrece, garantizando la eliminación de residuos biomédicos, la desinfección de áreas críticas y el mantenimiento de un entorno seguro y estéril para pacientes y personal médico.",
    imagen: limpiezaHospitalaria,
  },
  {
    id: 3,
    nombre: "Fumigación y Control de Plagas",
    descripcion:
      "El servicio de fumigación y control de plagas de Alberdi S.A.S utiliza productos seguros y efectivos para eliminar insectos, roedores y otras plagas, protegiendo la salud de las personas y la integridad de las instalaciones.",
    imagen: limpiezaHospitalaria,
  },
  {
    id: 4,
    nombre: "Limpieza de Oficinas",
    descripcion:
      "Nuestro servicio de limpieza de oficinas garantiza espacios de trabajo impecables, mejorando la productividad y la imagen corporativa con personal capacitado y productos de alta calidad.",
    imagen: limpiezaHospitalaria,
  },
  {
    id: 5,
    nombre: "Desinfección Especializada",
    descripcion:
      "El servicio de desinfección especializada de Alberdi S.A.S elimina virus, bacterias y otros patógenos utilizando tecnología avanzada y productos certificados, ideal para entornos que requieren los más altos estándares de higiene.",
    imagen: limpiezaHospitalaria,
  },
];

export default function SeccionServicios() {
  // Estado para la lista de servicios
  const [servicios, setServicios] = useState(serviciosIniciales);

  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para el modo del modal (crear o editar)
  const [modalMode, setModalMode] = useState("crear");

  // Estado para el servicio a editar
  const [servicioEditar, setServicioEditar] = useState(null);

  // Estado para el modal de confirmación de eliminación
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [servicioEliminar, setServicioEliminar] = useState(null);

  // Función para abrir el modal en modo crear
  const openCreateModal = () => {
    setModalMode("crear");
    setServicioEditar(null);
    setIsModalOpen(true);
  };

  // Función para abrir el modal en modo editar
  const openEditModal = (servicio) => {
    setModalMode("editar");
    setServicioEditar(servicio);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para abrir el modal de confirmación de eliminación
  const openConfirmModal = (servicio, e) => {
    e.stopPropagation(); // Evitar que se abra el modal de edición
    setServicioEliminar(servicio);
    setIsConfirmModalOpen(true);
  };

  // Función para cerrar el modal de confirmación
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setServicioEliminar(null);
  };

  // Función para guardar un nuevo servicio o actualizar uno existente
  const saveServicio = (servicioData) => {
    if (modalMode === "crear") {
      // Agregar nuevo servicio
      setServicios([...servicios, servicioData]);
    } else {
      // Actualizar servicio existente
      setServicios(
        servicios.map((s) => (s.id === servicioData.id ? servicioData : s))
      );
    }
  };

  // Función para eliminar un servicio
  const deleteServicio = () => {
    if (servicioEliminar) {
      setServicios(servicios.filter((s) => s.id !== servicioEliminar.id));
    }
  };

  return (
    <section className="p-6">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-firelli text-textoVerde">
          Servicios
        </h2>
        <Button
          className="py-2 px-3 text-[#FBF7F4] bg-[#4F6B5F] tracking-wider rounded-full font-firelli font-semibold hover:bg-[#2c3b35]"
          onClick={openCreateModal}
        >
          Agregar nuevo servicio
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative group"
          >
            <div
              className="cursor-pointer"
              onClick={() => openEditModal(servicio)}
            >
              <img
                src={
                  servicio.imagenURL || servicio.imagen || "/placeholder.svg"
                }
                alt={servicio.nombre}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/servicio-default.jpg";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {servicio.nombre}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {servicio.descripcion}
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              <Tooltip content="Editar servicio">
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="bg-white/80 backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(servicio);
                  }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip content="Eliminar servicio" color="danger">
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  variant="flat"
                  className="bg-white/80 backdrop-blur-md"
                  onClick={(e) => openConfirmModal(servicio, e)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear o editar servicio */}
      <CreateServicioModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveServicio}
        modo={modalMode}
        servicioEditar={servicioEditar}
      />

      {/* Modal de confirmación para eliminar */}
      <ConfirmacionModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={deleteServicio}
        titulo="Eliminar servicio"
        mensaje={`¿Está seguro que desea eliminar el servicio "${servicioEliminar?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}

// Iconos para los botones
const EditIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.33 16.5H13.66"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 12.5H14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
