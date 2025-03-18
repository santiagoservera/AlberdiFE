import React, { useRef, useState } from "react";
("react");
// import Swiper core and required modules

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import ahorroCostos from "../../assets/AhorroCostos.jpg";
const BeneficiosSection = () => {
  return (
    <div className="w-full">
      <div className="containerWidth flex flex-col">
        <div>
          <p className="font-bold font-firelli text-textoVerde text-4xl">
            Creamos <br /> beneficios <br /> colaterales
          </p>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper my-10"
        >
          <div>
            <SwiperSlide>
              <img
                src={ahorroCostos}
                alt=""
                className="h-[200px] w-[100px] rounded-lg"
              />
              <p className="py-2 font-firelli text-textoVerde text-center">
                Ahorro de costos
              </p>
            </SwiperSlide>
          </div>
          <div>
            <SwiperSlide>
              <img
                src={ahorroCostos}
                alt=""
                className="h-[200px] w-[100px] rounded-lg"
              />
              <p className="py-2 font-firelli text-textoVerde text-center">
                Especialización y Calidad
              </p>
            </SwiperSlide>
          </div>
          <div>
            <SwiperSlide>
              <img
                src={ahorroCostos}
                alt=""
                className="h-[200px] w-[100px] rounded-lg"
              />
              <p className="py-2 font-firelli text-textoVerde text-center">
                Enfoque en el Core Business
              </p>
            </SwiperSlide>
          </div>
          <div>
            <SwiperSlide>
              <img
                src={ahorroCostos}
                alt=""
                className="h-[200px] w-[100px] rounded-lg"
              />
              <p className="py-2 font-firelli text-textoVerde text-center">
                Flexibilidad y Adaptabilidad
              </p>
            </SwiperSlide>
          </div>
          <div>
            <SwiperSlide>
              <img
                src={ahorroCostos}
                alt=""
                className="h-[200px] w-[100px] rounded-lg"
              />
              <p className="py-2 font-firelli text-textoVerde text-center">
                Ahorro de costos
              </p>
            </SwiperSlide>
          </div>
        </Swiper>
        <div className="flex justify-between pb-40">
          <p className="text-4xl text-textoVerde font-bold font-firelli">
            Ahorro <br /> de Costos
          </p>
          <p className="w-[30%] text-textoVerde font-firelli tracking-widest text-sm">
             Al tercerizar, las empresas evitan costos asociados a la
            contratación, capacitación, y gestión del personal de limpieza, así
            como la compra y mantenimiento de equipos y suministros de limpieza.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeneficiosSection;
