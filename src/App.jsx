import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ServiciosPage from "./pages/ServiciosPage";
import NexumFiscal from "./pages/NexumFiscal";
import BlogArticulo from "./pages/BlogArticulo";
import BlogIndex from "./pages/BlogIndex";
import Cursos from "./pages/Cursos";
import CursoDetalle from "./pages/CursoDetalle";

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
          <Route path='/blog' element={<BlogIndex />} />
          <Route path='/blog/:slug' element={<BlogArticulo />} />
          <Route path='/cursos' element={<Cursos />} />
          <Route path='/cursos/:slug' element={<CursoDetalle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
