import { useEffect, useRef } from "react";
import { Team } from "../components/sobre/Team";
 
const stats = [
  { value: "47%", label: "Redução no custo\nde deslocamento" },
  { value: "45%", label: "Menos veículos\nnas ruas" },
  { value: "64%", label: "Mais eficiência\nnas rotas" },
];
 
const sections = [
  {
    title: "Por que o Astra existe?",
    text: "O Astra surgiu para enfrentar desafios comuns no deslocamento de universitários e propor uma alternativa mais eficiente.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-amber-400 fill-none stroke-[1.5]">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "O Problema",
    text: "O deslocamento diário de universitários pode ser caro, ineficiente e cansativo. Muitos carros circulam com apenas uma pessoa, contribuindo para o aumento do trânsito e dos custos individuais de transporte.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-amber-400 fill-none stroke-[1.5]">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "A Solução",
    text: "O Astra conecta universitários que compartilham trajetos, permitindo dividir custos, reduzir o número de veículos nas ruas e tornar o transporte mais acessível, organizado e sustentável.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-amber-400 fill-none stroke-[1.5]">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: "Sobre o Projeto",
    text: "O Astra é um projeto desenvolvido como parte de um projeto integrador, com o objetivo de aplicar na prática conceitos de desenvolvimento web, design de interfaces e organização de sistemas.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-amber-400 fill-none stroke-[1.5]">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Construção",
    text: "A aplicação foi construída com foco em simplicidade e usabilidade, permitindo o gerenciamento de viagens e veículos de forma eficiente, enquanto explora boas práticas de desenvolvimento e experiência do usuário.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-amber-400 fill-none stroke-[1.5]">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    full: true,
  },
];
 
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 220; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 1.2;
        const op = Math.random() * 0.5 + 0.1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fill();
      }
    };
 
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);
 
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
 
function Divider() {
  return (
    <div
      className="w-full h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, #e8a020 30%, #e8a020 70%, transparent)",
      }}
    />
  );
}
 
function SectionCard({
  title,
  text,
  icon,
  full = false,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-amber-900/30 bg-[#0e1520] p-8 ${
        full ? "col-span-2" : ""
      }`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, #e8a020, transparent)" }}
      />
      <div className="w-10 h-10 border border-amber-400/40 rounded-sm flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-[2px] mb-3">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
    </div>
  );
}
 
export default function Sobre() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#0a0d14", color: "#e8e0d0" }}
    >
      <StarCanvas />
 
      {/* HERO */}
      <section className="relative z-10 text-center px-10 pt-20 pb-16">
        <div className="inline-block border border-amber-400 text-amber-400 text-[10px] tracking-[3px] uppercase px-4 py-1 rounded-sm mb-6">
          ◆ Conheça o projeto ◆
        </div>
        <h1
          className="text-5xl font-black uppercase tracking-[4px] text-amber-400 leading-none mb-2"
          style={{ textShadow: "0 0 40px rgba(232,160,32,0.3)" }}
        >
          ASTRA
        </h1>
        <p className="text-xs text-slate-500 tracking-widest mb-10">
          Uma aplicação desenvolvida para conectar universitários
        </p>
        <p className="max-w-xl mx-auto text-sm text-slate-400 leading-relaxed">
          Uma aplicação desenvolvida para conectar universitários, otimizar
          deslocamentos e tornar o transporte mais acessível e colaborativo.
        </p>
      </section>
 
      <Divider />
 
      {/* STATS */}
      <section className="relative z-10 bg-[#0e1520] border-y border-amber-400/30 px-10 py-10">
        <div className="max-w-3xl mx-auto flex justify-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex-1 text-center px-8 ${
                i < stats.length - 1 ? "border-r border-amber-400/20" : ""
              }`}
            >
              <div className="text-4xl font-black text-amber-400 tracking-widest">
                {s.value}
              </div>
              <div className="text-[11px] text-slate-500 tracking-wide mt-2 uppercase whitespace-pre-line leading-relaxed">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
 
      <Divider />
 
      {/* ABOUT SECTIONS */}
      <section className="relative z-10 px-10 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <SectionCard
              key={i}
              title={s.title}
              text={s.text}
              icon={s.icon}
              full={s.full}
            />
          ))}
        </div>
      </section>
 
      <Divider />
 
      {/* TEAM — componente externo */}
      <div className="relative z-10">
        <Team />
      </div>
 
      <div className="h-16" />
    </div>
  );
}
 