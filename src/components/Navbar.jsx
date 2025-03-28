import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//images
import logoAlberdi from "../assets/LogoAlberdi.png";
import Carrito from "../assets/Carrito.png";
import trash from "../assets/trash.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export const Navbar = () => {
  const location = useLocation();
  const mostrarCarrito = location.pathname.startsWith("/Catalogo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowModal = () => {
    if (dataLogin.userLogin) {
      setShowModal(!showModal);
    } else {
      navigate("/auth#login");
    }
  };

  return (
    <header className="w-full z-10 bg-transparent relative ">
      <nav className="containerWidth flex h-full w-full gap-3 justify-between ">
        <div className="flex h-full py-[25px] gap-1 ">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoAlberdi}
              alt="suinfi-logo"
              className="h-[60px] w-[62px]"
            />
          </Link>
        </div>
        <div className="flex w-1/2 justify-between items-center text-textoVerde">
          <div className="hidden md:flex items-center font-bold ">
            <Link
              to="/"
              className="hover:cursor-pointer text-lg hover:bg-[#4F6B5F] hover:rounded-full hover:text-[#F4EAE2] p-2"
            >
              Inicio
            </Link>
          </div>
          <div className="hidden md:flex items-center font-bold ">
            <Link
              to="/Catalogo"
              className="hover:cursor-pointer text-lg hover:bg-[#4F6B5F] hover:rounded-full hover:text-[#F4EAE2] p-2"
            >
              Productos
            </Link>
          </div>
          <div className="hidden md:flex items-center font-bold ">
            <Link
              to="/Servicios"
              className="hover:cursor-pointer text-lg hover:bg-[#4F6B5F] hover:rounded-full hover:text-[#F4EAE2] p-2"
            >
              Servicios
            </Link>
          </div>
          <div className="hidden md:flex items-center font-bold ">
            <Link
              to="/Nosotros"
              className="hover:cursor-pointer text-lg hover:bg-[#4F6B5F] hover:rounded-full hover:text-[#F4EAE2] p-2"
            >
              Beneficios
            </Link>
          </div>
          <div className="hidden md:flex items-center font-bold ">
            <Link
              to="/Nosotros"
              className="hover:cursor-pointer text-lg hover:bg-[#4F6B5F] hover:rounded-full hover:text-[#F4EAE2] p-2"
            >
              Nosotros
            </Link>
          </div>
          {mostrarCarrito && (
            <Button
              onPress={onOpen}
              className="hidden md:flex items-center font-bold bg-[#4F6B5F] rounded-full cursor-pointer py-2"
            >
              <img src={Carrito} alt="Carrito" className="h-[30px] w-[30px]" />
            </Button>
          )}
        </div>

        <div className="flex md:hidden gap-7 py-10">
          {mostrarCarrito && (
            <div className="md:hidden flex items-center font-bold bg-[#4F6B5F] rounded-full cursor-pointer p-2">
              <img src={Carrito} alt="Carrito" className="h-[50px] w-[50px]" />
            </div>
          )}
          <button onClick={toggleNavbar}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#4F6B5F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                _ngcontent-ng-c918816587=""
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  _ngcontent-ng-c918816587=""
                  d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M6 20C7.10457 20 8 19.1046 8 18C8 16.8954 7.10457 16 6 16C4.89543 16 4 16.8954 4 18C4 19.1046 4.89543 20 6 20Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z"
                  fill="#4F6B5F"
                ></path>
                <path
                  _ngcontent-ng-c918816587=""
                  d="M18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"
                  fill="#4F6B5F"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="absolute bg-white w-full md:hidden">
          <ul>
            <li className="p-2 border-b text-[#4F6B5F] font-bold">
              <Link to="/">Inicio</Link>
            </li>
            <li className="p-2 border-b text-[#4F6B5F] font-bold">
              <Link to="/newProduct">Productos</Link>
            </li>
            <li className="p-2 border-b text-[#4F6B5F] font-bold">
              <Link to="/">Servicios</Link>
            </li>
            <li className="p-2 border-b text-[#4F6B5F] font-bold">
              <Link to="/">Beneficios</Link>
            </li>
            <li className="p-2 border-b text-[#4F6B5F] font-bold">
              <Link to="/">Nosotros</Link>
            </li>

            <li></li>
          </ul>
        </div>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
        <ModalContent className="h-screen fixed right-0 top-0 w-[400px] bg-white shadow-lg">
          <ModalHeader className="font-firelli text-textoVerde text-center flex items-center justify-center text-4xl">
            Mi pedido
          </ModalHeader>
          <ModalBody>
            <div className="flex w-full justify-between items-center h-auto gap-6">
              <img
                src="https://s3-alpha-sig.figma.com/img/ac65/58aa/ebc0db7ba5737247e9a823315a0acf59?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Q8nc4mXrtvXL7bv770iVdLphwSxCrT3Oqgsyagv7WuD-fmgRMZwcZ1puBNX3r-lOyn0k9Djw8I~oamXfepwWXav4u5-O5zNiXVcu96gsx7qR1t7lgLAVaad8C3acElWSQ-MOF5g92QJRQpkw~uwnlsNEw~cWjkEsywsb6JSkx23cmuyhU9EvQpJolxpDlFG47WJwtTbMEkRy8l9pWS~HPS-pWXUejJppNfczCYWwlHR0moHg1l6YKySl2XmvF1ZNGO2Im~UpRMP0obT0TExGRk9e~TeeLQyprJy0nCfROS29QLx7oc~4JuViCkBXrmCZXjL3QQ0FbbE7UvQuttvTTQ__"
                alt=""
                className="h-[150px] w-[100px]"
              />
              <div className="flex flex-col justify-between gap-5 h-full">
                <p className="text-center">Nombre del producto</p>
                <div className="flex bg-[#4F6B5F] font-firelli rounded-full text-white justify-around text-xl">
                  <p className="cursor-pointer">-</p>
                  <p>1</p>
                  <p className="cursor-pointer">+</p>
                </div>
              </div>
              <div>
                <img src={trash} alt="trash" className="h-[20px] w-[20px]" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={onOpenChange}
              className="bg-button text-white py-2 rounded-full font-firelli w-full"
            >
              Finalizar compra
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </header>
  );
};
