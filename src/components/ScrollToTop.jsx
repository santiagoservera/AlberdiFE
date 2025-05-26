import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  // Usamos useLocation de react-router-dom para detectar cambios en la ruta
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando cambia la ruta, hacer scroll hacia arriba
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Este componente no renderiza nada visible
  return null;
}

export default ScrollToTop;
