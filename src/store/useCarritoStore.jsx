import { create } from "zustand";
import { persist } from "zustand/middleware";

// Función para cargar los datos iniciales del localStorage
const getInitialState = () => {
  try {
    const storedItems = localStorage.getItem("carrito-items");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Error al cargar datos del localStorage:", error);
    return [];
  }
};

const useCarritoStore = create(
  persist(
    (set, get) => ({
      isOpen: false,
      items: getInitialState(), // Inicializar con datos del localStorage si existen

      openCarrito: () => set({ isOpen: true }),
      closeCarrito: () => set({ isOpen: false }),

      // Método para agregar un producto al carrito
      addToCart: (product) =>
        set((state) => {
          // Verificar si el producto ya está en el carrito
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id
          );

          let updatedItems;
          if (existingItemIndex >= 0) {
            // Si el producto ya existe, incrementar la cantidad
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
          } else {
            // Si el producto no existe, agregarlo con cantidad 1
            updatedItems = [...state.items, { ...product, quantity: 1 }];
          }

          return { items: updatedItems };
        }),

      // Método para eliminar un producto del carrito
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      // Método para incrementar la cantidad de un producto
      incrementQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Método para decrementar la cantidad de un producto
      decrementQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

      // Método para calcular el total del carrito
      getTotal: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + (item.precio || 0) * item.quantity,
          0
        );
      },

      // Método para obtener la cantidad total de productos en el carrito
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },

      // Método para limpiar el carrito
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "carrito-storage", // Nombre único para el almacenamiento
      getStorage: () => localStorage, // Usar localStorage como almacenamiento
    }
  )
);

export default useCarritoStore;
