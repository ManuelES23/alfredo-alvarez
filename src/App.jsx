import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Servicios from "./components/Servicios";
import SobreAlfredo from "./components/SobreAlfredo";
import Podcast from "./components/Podcast";
import RedesSociales from "./components/RedesSociales";
import Blog from "./components/Blog";
import Testimonios from "./components/Testimonios";
import ContactoCTA from "./components/ContactoCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Servicios />
        <SobreAlfredo />
        <Podcast />
        <RedesSociales />
        <Blog />
        <Testimonios />
        <ContactoCTA />
      </main>
      <Footer />
    </div>
  );
}
