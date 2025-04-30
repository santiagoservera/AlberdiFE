import React from "react";
import espaciosVerdes from "../../assets/espaciosVerdes.png";
import limpiezaHospitalaria from "../../assets/limpiezaHospitalaria.png";
import { Button } from "@heroui/react";

const Servicios = [
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
    nombre: "Limpieza Hospitalaria",
    descripcion:
      "La limpieza hospitalaria es un servicio altamente especializado que Alberdi S.A.S ofrece, garantizando la eliminación de residuos biomédicos, la desinfección de áreas críticas y el mantenimiento de un entorno seguro y estéril para pacientes y personal médico.",
    imagen: limpiezaHospitalaria,
  },
  {
    id: 4,
    nombre: "Limpieza Hospitalaria",
    descripcion:
      "La limpieza hospitalaria es un servicio altamente especializado que Alberdi S.A.S ofrece, garantizando la eliminación de residuos biomédicos, la desinfección de áreas críticas y el mantenimiento de un entorno seguro y estéril para pacientes y personal médico.",
    imagen: limpiezaHospitalaria,
  },
  {
    id: 5,
    nombre: "Limpieza Hospitalaria",
    descripcion:
      "La limpieza hospitalaria es un servicio altamente especializado que Alberdi S.A.S ofrece, garantizando la eliminación de residuos biomédicos, la desinfección de áreas críticas y el mantenimiento de un entorno seguro y estéril para pacientes y personal médico.",
    imagen: limpiezaHospitalaria,
  },
];

export default function SeccionServicios() {
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-firelli text-textoVerde">
          Servicios
        </h2>
        <Button className="py-2 px-3 text-[#FBF7F4] bg-[#4F6B5F] tracking-wider rounded-full font-firelli font-semibold hover:bg-[#2c3b35]">
          Agregar nuevo servicio
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer "
          >
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {servicio.nombre}
              </h3>
              <p className="text-sm text-gray-600">{servicio.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
