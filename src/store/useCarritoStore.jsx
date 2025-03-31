import { create } from "zustand";

const useCarritoStore = create((set) => ({
  isOpen: false,
  items: [], // Array para almacenar los productos en el carrito
  openCarrito: () => set({ isOpen: true }),
  closeCarrito: () => set({ isOpen: false }),

  // Método para agregar un producto al carrito
  addToCart: (product) =>
    set((state) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar la cantidad
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return { items: updatedItems };
      } else {
        // Si el producto no existe, agregarlo con cantidad 1
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
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
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
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
    const state = useCarritoStore.getState();
    return state.items.reduce(
      (total, item) => total + (item.precio || 0) * item.quantity,
      0
    );
  },

  // Método para obtener la cantidad total de productos en el carrito
  getItemCount: () => {
    const state = useCarritoStore.getState();
    return state.items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export default useCarritoStore;
