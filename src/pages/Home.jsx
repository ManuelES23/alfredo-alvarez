import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Servicios from "../components/Servicios";
import SobreAlfredo from "../components/SobreAlfredo";
import Podcast from "../components/Podcast";
import NexumBanner from "../components/NexumBanner";
import RedesSociales from "../components/RedesSociales";
import Blog from "../components/Blog";
import Testimonios from "../components/Testimonios";
import ContactoCTA from "../components/ContactoCTA";

export default function Home() {
  const location = useLocation();

  useSEO({
    title: "Alfredo Álvarez | Contador Público - RESICO, CFDI 4.0",
    description:
      "Asesoría contable y fiscal para empresas y personas físicas. Especialista en RESICO, CFDI 4.0, declaraciones anuales y planeación fiscal. Conductor del podcast La Mesita Fiscal.",
    path: "/",
  });

  // Si llegamos desde otra página pidiendo scroll a una sección
  // (ver src/utils/scrollNav.js), o con un #hash directo en la URL.
  useEffect(() => {
    const id = location.state?.scrollTo || location.hash?.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [location.state, location.hash]);

  return (
    <>
      <Hero />
      <Stats />
      <Servicios />
      <SobreAlfredo />
      <Podcast />
      <NexumBanner />
      <RedesSociales />
      <Blog />
      <Testimonios />
      <ContactoCTA />
    </>
  );
}
