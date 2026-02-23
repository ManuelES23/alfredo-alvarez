import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FiUsers, FiAward, FiMic, FiShield } from "react-icons/fi";

const stats = [
  {
    prefix: "+",
    value: 500,
    suffix: "",
    label: "Clientes atendidos",
    Icon: FiUsers,
  },
  {
    prefix: "+",
    value: 8,
    suffix: "",
    label: "Años de experiencia",
    Icon: FiAward,
  },
  {
    prefix: "+",
    value: 200,
    suffix: "",
    label: "Episodios de podcast",
    Icon: FiMic,
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "Actualizado SAT 2025",
    Icon: FiShield,
  },
];

function Counter({ value, prefix, suffix, inView }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className='py-16 bg-white' style={{ marginTop: "-3px" }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div ref={ref} className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, i) => (
            <div key={i} className='text-center group'>
              <div
                className='w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110'
                style={{ background: "rgba(0,174,239,0.1)" }}
              >
                <stat.Icon size={26} style={{ color: "#00AEEF" }} />
              </div>
              <div
                className='text-4xl sm:text-5xl font-black mb-2'
                style={{ color: "#1A3A8F" }}
              >
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <p
                className='text-sm sm:text-base font-medium'
                style={{ color: "#4A4A4A" }}
              >
                {stat.label}
              </p>
              <div
                className='mt-3 h-1 w-12 mx-auto rounded-full transition-all duration-500 group-hover:w-20'
                style={{ background: "#00AEEF" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
