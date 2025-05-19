import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//components
import { Home } from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Catalogo from "./pages/Catalogo";

import ProductoDetalle from "./pages/ProductoDetalle";
import FormularioServiciosPage from "./pages/FormularioServiciosPage";
import Carrito from "./components/Carrito";
import FormularioProductosPage from "./pages/FormularioProductosPage";
import AdminLogin from "./pages/AdminLogin";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Router>
      <Carrito />
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
        <Route
          path="/FormularioProductos"
          element={<FormularioProductosPage />}
        />
        <Route path="/Admin" element={<AdminLogin />} />
        <Route
          path="/Admin/Dashboard"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
