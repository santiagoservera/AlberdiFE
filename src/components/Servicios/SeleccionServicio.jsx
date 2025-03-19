import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import espaciosVerdes from "../../assets/espaciosVerdes.png";
import limpiezaHospitalaria from "../../assets/limpiezaHospitalaria.png";

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
];

const SeleccionServicio = () => {
  const [servicioActivo, setServicioActivo] = useState(Servicios[0]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between p-8 gap-8 items-center py-20">
      <div className="w-full lg:w-1/2 flex flex-col gap-11">
        <p className="text-textoVerde font-firelli tracking-widest">
          Selecciona uno de <br /> nuestros servicios
        </p>
        <h2 className="text-3xl font-bold text-textoVerde w-1/2 font-firelli ">
          {servicioActivo.nombre}
        </h2>
        <p className="text-gray-700 mt-4">{servicioActivo.descripcion}</p>
        <button className="mt-4 px-4 py-2 bg-[#4F6B5F] text-white rounded-full shadow font-firelli w-[30%]">
          ¡Solicitar servicio!
        </button>
      </div>

      <div className="w-full lg:w-1/3 justify-between">
        <Swiper
          spaceBetween={30}
          navigation
          modules={[Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) =>
            setServicioActivo(Servicios[swiper.activeIndex])
          }
        >
          {Servicios.map((servicio) => (
            <SwiperSlide key={servicio.id}>
              <div className="w-[440px] h-[600px] flex justify-center items-center">
                <img
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  className=" rounded-lg shadow-lg cursor-pointer"
                  onClick={() => setServicioActivo(servicio)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SeleccionServicio;
