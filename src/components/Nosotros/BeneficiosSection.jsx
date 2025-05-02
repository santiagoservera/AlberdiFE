import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ahorroCostos from "../../assets/AhorroCostos.jpg";

const Beneficios = [
  {
    id: 1,
    nombre: "Ahorra costos",
    descripcion:
      "Al tercerizar, las empresas evitan costos asociados a la contratación, capacitación, y gestión del personal de limpieza, así como la compra y mantenimiento de equipos y suministros de limpieza.",
    imagen:
      "https://images.pexels.com/photos/5805492/pexels-photo-5805492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    nombre: "Especialización y Calidad",
    descripcion:
      "Las empresas de limpieza profesional cuentan con personal capacitado y experimentado en técnicas de limpieza avanzadas, garantizando resultados de alta calidad y un entorno más limpio y saludable.",
    imagen:
      "https://images.pexels.com/photos/5805492/pexels-photo-5805492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    nombre: "Enfoque en el Core Business",
    descripcion:
      "Delegar la limpieza a una empresa especializada permite que la empresa se concentre en su actividad principal, mejorando la eficiencia y productividad.",
    imagen:
      "https://images.pexels.com/photos/5805492/pexels-photo-5805492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    nombre: "Flexibilidad y Adaptabilidad",
    descripcion:
      "Las empresas de limpieza pueden adaptar sus servicios a las necesidades específicas del cliente, ofreciendo horarios y frecuencias de limpieza flexibles que se ajusten a la operación del negocio.",
    imagen:
      "https://images.pexels.com/photos/5805492/pexels-photo-5805492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    nombre: "Cumplimiento Normativo",
    descripcion:
      "Las empresas de limpieza profesional están al tanto de las regulaciones y normativas en materia de higiene y seguridad, asegurando que todos los procedimientos cumplan con los estándares legales vigentes.",
    imagen:
      "https://images.pexels.com/photos/5805492/pexels-photo-5805492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    nombre: "Reducción de Riesgos y Responsabilidades",
    descripcion:
      "Las empresas de limpieza profesional cuentan con personal capacitado y experimentado en técnicas de limpieza avanzadas, garantizando resultados de alta calidad y un entorno más limpio y saludable.",
    imagen:
      "https://images.pexels.com/photos/5805492/pexels-photo-5805492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const BeneficiosSection = () => {
  // Estado para almacenar el beneficio seleccionado
  const [beneficioSeleccionado, setBeneficioSeleccionado] = useState(
    Beneficios[0]
  );

  return (
    <div className="w-full">
      <div className="containerWidth flex flex-col">
        <div>
          <p className="font-bold font-firelli text-textoVerde text-4xl text-center md:text-start">
            Creamos <br /> beneficios <br /> colaterales
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper my-10 w-full"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {Beneficios.map((beneficio) => (
            <SwiperSlide
              key={beneficio.id}
              onClick={() => setBeneficioSeleccionado(beneficio)}
              className="flex items-center justify-center"
            >
              <div className="flex items-center justify-center">
                <img
                  src={beneficio.imagen}
                  alt={beneficio.nombre}
                  className="h-[200px] w-[150px] rounded-lg cursor-pointer"
                />
              </div>
              <p className="py-2 font-firelli text-textoVerde text-center">
                {beneficio.nombre}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex md:justify-between items-center md:flex-row flex-col gap-8 pb-40">
          <p className="text-4xl text-textoVerde font-bold font-firelli">
            {beneficioSeleccionado.nombre}
          </p>
          <p className="md:w-[30%] text-textoVerde font-firelli tracking-widest md:text-sm text-lg">
            {beneficioSeleccionado.descripcion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeneficiosSection;
