import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperNavButtons } from "../SwiperNavButtons";
import { useNavigate } from "react-router-dom";

// Importaciones de imágenes (asumiendo que están en la ruta correcta)
import espaciosVerdes from "../../assets/espaciosVerdes.png";
import limpiezaHospitalaria from "../../assets/limpiezaHospitalaria.png";

// Datos de servicios
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

const SeleccionServicio = () => {
  const navigate = useNavigate();
  const [servicioActivo, setServicioActivo] = useState(Servicios[0]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <>
      <div className="w-full md:w-[25%] absolute md:right-[450px] z-[9999] pb-14 flex justify-center bottom-[-100px] lg:bottom-auto">
        <SwiperNavButtons swiper={swiperInstance} />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between p-8 gap-8 items-center w-[90%] mx-auto md:relative pb-20">
        <div className="w-full lg:w-1/2 flex flex-col gap-5 relative md:min-h-[500px] justify-center text-center lg:text-left">
          <p className="text-[#8BA99C] font-firelli tracking-widest text-2xl">
            Selecciona uno de <br /> nuestros servicios
          </p>
          <h2 className="text-4xl font-bold text-textoVerde w-full lg:w-[80%] font-firelli">
            {servicioActivo.nombre}
          </h2>
          <p className="text-textoVerde mt-4 tracking-widest w-full lg:w-[70%] font-firelli">
            {servicioActivo.descripcion}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-[#4F6B5F] text-white rounded-full shadow font-firelli w-[80%] sm:w-[30%] mx-auto lg:mx-0"
            onClick={() =>
              navigate("/FormularioServicio", {
                state: { servicio: servicioActivo },
              })
            }
          >
            ¡Solicitar servicio!
          </button>
        </div>

        <div className="w-full lg:w-[90%] right-0 md:absolute md:z-[-1]">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={5}
            slidesPerView={1} // Default
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[]}
            className="mySwiper servicios"
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) =>
              setServicioActivo(Servicios[swiper.activeIndex])
            }
          >
            {Servicios.map((servicio) => (
              <SwiperSlide key={servicio.id}>
                <div className="w-full md:w-[340px] md:h-[450px] flex justify-center items-center object-cover relative">
                  <img
                    src={servicio.imagen || "/placeholder.svg"}
                    alt={servicio.nombre}
                    className="shadow-lg cursor-pointer w-full h-full object-cover"
                    onClick={() => setServicioActivo(servicio)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SeleccionServicio;
