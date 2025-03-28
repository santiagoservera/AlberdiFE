import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//components
import { Home } from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Catalogo from "./pages/Catalogo";

import ProductoDetalle from "./pages/ProductoDetalle";
import FormularioServiciosPage from "./pages/FormularioServiciosPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Servicios" element={<Servicios />} />
        <Route path="/Catalogo" element={<Catalogo />} />
        <Route path="Catalogo/producto/:id" element={<ProductoDetalle />} />
        <Route
          path="/FormularioServicio"
          element={<FormularioServiciosPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
