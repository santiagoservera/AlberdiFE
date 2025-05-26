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
import toast from "react-hot-toast";
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

  const handleRemoveItem = (itemId, itemName) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🗑️</span>
            <div>
              <p className="font-semibold text-gray-800">¿Eliminar producto?</p>
              <p className="text-sm text-gray-600">
                ¿Estás seguro de que quieres eliminar "{itemName}" del carrito?
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                removeFromCart(itemId);
                toast.dismiss(t.id);
                toast.success(`${itemName} eliminado del carrito`, {
                  duration: 2000,
                  position: "bottom-center",
                  style: {
                    background: "#dcfce7",
                    color: "#166534",
                    border: "1px solid #bbf7d0",
                  },
                  icon: "✅",
                });
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      {
        duration: Number.POSITIVE_INFINITY,
        position: "top-center",
        style: {
          background: "#fff",
          color: "#374151",
          border: "2px solid #ef4444",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          maxWidth: "350px",
        },
      }
    );
  };

  const handleIncrementQuantity = (itemId, itemName) => {
    incrementQuantity(itemId);
    toast.success(`Cantidad aumentada`, {
      duration: 1500,
      position: "bottom-center",
      style: {
        background: "#dbeafe",
        color: "#1e40af",
        border: "1px solid #bfdbfe",
      },
      icon: "➕",
    });
  };

  const handleDecrementQuantity = (itemId, itemName) => {
    decrementQuantity(itemId);
    toast.success(`Cantidad reducida`, {
      duration: 1500,
      position: "bottom-center",
      style: {
        background: "#fef3c7",
        color: "#d97706",
        border: "1px solid #fde68a",
      },
      icon: "➖",
    });
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
                  className="flex w-full justify-between items-center h-auto gap-4 border-b pb-4"
                >
                  <img
                    src={item.imagen || "/placeholder.svg"}
                    alt={item.nombre}
                    className="h-[100px] w-[80px] object-cover rounded"
                  />
                  <div className="flex flex-col justify-between gap-2 h-full flex-1">
                    <p className="text-center font-medium font-firelli text-textoVerde">
                      {item.nombre}
                    </p>

                    {/* Información de precios */}
                    <div className="text-center">
                      <p className="text-sm font-firelli text-textoVerde">
                        ${item.precio.toFixed(2)} c/u
                      </p>
                      <p className="text-sm font-bold font-firelli text-textoVerde">
                        Subtotal: ${(item.precio * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex bg-[#4F6B5F] font-firelli rounded-full text-white justify-around text-xl">
                      <button
                        className="cursor-pointer px-3"
                        onClick={() =>
                          handleDecrementQuantity(item.id, item.nombre)
                        }
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="cursor-pointer px-3"
                        onClick={() =>
                          handleIncrementQuantity(item.id, item.nombre)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.nombre)}
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

              {/* Total del carrito */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-bold text-xl font-firelli text-textoVerde">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </DrawerBody>
        {items.length > 0 && (
          <DrawerFooter className="flex flex-col gap-3">
            {/* Resumen final */}
            <div className="bg-[#F4EAE2] p-3 rounded-lg">
              <div className="flex justify-between items-center font-bold font-firelli text-textoVerde">
                <span>Total a pagar:</span>
                <span className="text-xl">${getTotal().toFixed(2)}</span>
              </div>
              <p className="text-sm text-center font-firelli text-textoVerde mt-1">
                {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                producto
                {items.reduce((total, item) => total + item.quantity, 0) !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

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
