import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServiciosPage from "./pages/ServiciosPage";

export default function App() {
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/servicios' element={<ServiciosPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
