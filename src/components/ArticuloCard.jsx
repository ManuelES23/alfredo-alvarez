import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

// Card de artículo reutilizable: la usan el slider del home (Blog.jsx) y la
// página que lista todos los artículos (pages/BlogIndex.jsx). Toda la card
// es clicleable cuando el artículo tiene página propia (art.url interno).
export default function ArticuloCard({ art, className = "" }) {
  const navigate = useNavigate();
  const esClickeable = art.url?.startsWith("/");

  return (
    <article
      className={`group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
        esClickeable ? "cursor-pointer" : ""
      } ${className}`}
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
      role={esClickeable ? "link" : undefined}
      tabIndex={esClickeable ? 0 : undefined}
      onClick={esClickeable ? () => navigate(art.url) : undefined}
      onKeyDown={
        esClickeable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(art.url);
              }
            }
          : undefined
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,174,239,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      }}
    >
      {/* Imagen de portada */}
      <div className='relative h-44 overflow-hidden shrink-0'>
        <img
          src={art.imagen}
          alt={art.titulo}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
        />
        <div
          className='absolute inset-0'
          style={{
            background:
              "linear-gradient(180deg, rgba(13,34,96,0.15) 0%, rgba(13,34,96,0.55) 100%)",
          }}
        />
        <div className='absolute top-4 left-4 flex items-center gap-2'>
          <span
            className='px-3 py-1 rounded-full text-xs font-bold text-white'
            style={{ background: "rgba(0,174,239,0.85)" }}
          >
            {art.categoria}
          </span>
          {art.autor && (
            <span
              className='px-3 py-1 rounded-full text-xs font-bold text-white'
              style={{ background: "rgba(13,34,96,0.75)" }}
            >
              Invitado
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className='p-6 bg-white flex flex-col flex-1'>
        <h3
          className='text-base font-bold leading-snug mb-2 group-hover:text-azul-brillante transition-colors'
          style={{ color: "#1A3A8F" }}
        >
          {art.titulo}
        </h3>
        {art.autor && (
          <p
            className='flex items-center gap-1.5 text-xs font-semibold mb-2'
            style={{ color: "#00AEEF" }}
          >
            <FiUser size={11} /> Por {art.autor.nombre}
          </p>
        )}
        <p className='text-sm leading-relaxed mb-5 text-gray-500 line-clamp-3'>
          {art.extracto}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          <div className='flex items-center gap-3 text-xs text-gray-400'>
            <span className='flex items-center gap-1'>
              <FiCalendar size={11} /> {art.fecha}
            </span>
            <span>·</span>
            <span className='flex items-center gap-1'>
              <FiClock size={11} /> {art.tiempoLectura}
            </span>
          </div>
          <span
            className='text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all'
            style={{ color: "#00AEEF" }}
          >
            Leer más →
          </span>
        </div>
        {/* Línea cyan inferior */}
        <div
          className='mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500'
          style={{ background: "#00AEEF" }}
        />
      </div>
    </article>
  );
}
