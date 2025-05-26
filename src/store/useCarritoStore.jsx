import { create } from "zustand";
import { persist } from "zustand/middleware";

// Función para generar un ID único de sesión
const generateSessionId = () => {
  return (
    "session_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
  );
};

// Función para obtener o crear un ID de sesión usando cookies
const getSessionId = () => {
  // Verificar si estamos en el cliente
  if (typeof window === "undefined") return "";

  // Buscar cookie existente
  const cookies = document.cookie.split(";");
  const sessionCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("cart_session_id=")
  );

  if (sessionCookie) {
    return sessionCookie.split("=")[1].trim();
  }

  // Si no existe, crear nueva sesión
  const newSessionId = generateSessionId();

  // Establecer cookie que expire en 30 días
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  document.cookie = `cart_session_id=${newSessionId}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;

  return newSessionId;
};

// Función para cargar los datos iniciales del localStorage con sesión
const getInitialState = () => {
  try {
    if (typeof window === "undefined") return [];

    const sessionId = getSessionId();
    const storageKey = `carrito-items-${sessionId}`;
    const storedItems = localStorage.getItem(storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Error al cargar datos del localStorage:", error);
    return [];
  }
};

// Función para obtener la clave de almacenamiento con sesión
const getStorageKey = () => {
  if (typeof window === "undefined") return "carrito-storage";
  const sessionId = getSessionId();
  return `carrito-storage-${sessionId}`;
};

const useCarritoStore = create(
  persist(
    (set, get) => ({
      isOpen: false,
      items: getInitialState(),
      sessionId: typeof window !== "undefined" ? getSessionId() : "",

      openCarrito: () => set({ isOpen: true }),
      closeCarrito: () => set({ isOpen: false }),

      // Método para obtener el ID de sesión actual
      getSessionId: () => {
        const state = get();
        return state.sessionId || getSessionId();
      },

      // Método para agregar un producto al carrito
      addToCart: (product) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id
          );

          let updatedItems;
          if (existingItemIndex >= 0) {
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
          } else {
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

      // Método para obtener datos del carrito para el pedido
      getOrderData: () => {
        const state = get();
        return {
          sessionId: state.sessionId || getSessionId(),
          items: state.items,
          total: state.getTotal(),
          itemCount: state.getItemCount(),
          timestamp: new Date().toISOString(),
        };
      },
    }),
    {
      name: getStorageKey(),
      getStorage: () => localStorage,
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== "undefined") {
          state.sessionId = getSessionId();
        }
      },
    }
  )
);

export default useCarritoStore;
