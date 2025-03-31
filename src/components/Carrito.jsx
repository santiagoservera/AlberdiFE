"use client";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import trash from "../assets/trash.png";
import useCarritoStore from "../store/useCarritoStore";

const Carrito = () => {
  const navigate = useNavigate();
  const {
    isOpen,
    closeCarrito,
    items,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotal,
  } = useCarritoStore();

  console.log("Carrito component - isOpen:", isOpen);
  console.log("Carrito items:", items);

  const handleFinalizarCompra = () => {
    closeCarrito(); // Cerrar el carrito
    navigate("/FormularioProductos"); // Navegar al formulario
  };

  return (
    <Drawer isOpen={isOpen} onClose={closeCarrito} placement="right">
      <DrawerContent className="h-screen fixed right-0 top-0 w-[400px] bg-white shadow-lg">
        <DrawerHeader className="font-firelli text-textoVerde text-center flex items-center justify-center text-4xl">
          Mi pedido
        </DrawerHeader>
        <DrawerBody className="overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <Button
                onClick={closeCarrito}
                className="mt-4 bg-[#4F6B5F] text-white py-2 rounded-full font-firelli"
              >
                Seguir comprando
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full justify-between items-center h-auto gap-6 border-b pb-4"
                >
                  <img
                    src={item.imagen || "/placeholder.svg"}
                    alt={item.nombre}
                    className="h-[100px] w-[80px] object-cover"
                  />
                  <div className="flex flex-col justify-between gap-3 h-full">
                    <p className="text-center font-medium">{item.nombre}</p>

                    <div className="flex bg-[#4F6B5F] font-firelli rounded-full text-white justify-around text-xl">
                      <button
                        className="cursor-pointer px-3"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="cursor-pointer px-3"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <img
                        src={trash || "/placeholder.svg"}
                        alt="trash"
                        className="h-[20px] w-[20px]"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
        {items.length > 0 && (
          <DrawerFooter>
            <Button
              onClick={handleFinalizarCompra}
              className="bg-[#4F6B5F] text-white py-2 rounded-full font-firelli w-full"
            >
              Finalizar compra
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Carrito;
