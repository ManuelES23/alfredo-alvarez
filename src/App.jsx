import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ServiciosPage from "./pages/ServiciosPage";
import NexumFiscal from "./pages/NexumFiscal";

export default function App() {
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/servicios' element={<ServiciosPage />} />
          <Route path='/nexum-fiscal' element={<NexumFiscal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
