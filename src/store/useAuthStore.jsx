import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Función para iniciar sesión
      login: async (email, password) => {
        try {
          const response = await fetch(
            "https://alberdiservicios.com/api/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
          }

          const data = await response.json();

          set({
            token: data.access_token,
            user: data.user,
            isAuthenticated: true,
          });

          return { success: true };
        } catch (error) {
          console.error("Error de login:", error);
          return {
            success: false,
            message: error.message || "Error al iniciar sesión",
          };
        }
      },

      // Función para cerrar sesión
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // nombre para localStorage
      getStorage: () => localStorage, // usar localStorage
    }
  )
);

export default useAuthStore;
