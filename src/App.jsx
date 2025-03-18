import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//components
import { Home } from "./pages/Home";
import Nosotros from "./pages/Nosotros";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nosotros" element={<Nosotros />} />
      </Routes>
    </Router>
  );
}

export default App;
