import React from "react";

/* ─────────────────────────────────────────────
   DADOS ESTÁTICOS
───────────────────────────────────────────── */
const stats = [
  {
    value: "47%",
    label: "de brasileiros sofrem com doenças que poderiam ser prevenidas com exercícios.",
  },
  {
    value: "45%",
    label: "das pessoas abandonam a academia por falta de orientação personalizada.",
  },
  {
    value: "64%",
    label: "mais resultados são alcançados com treinos personalizados para cada pessoa.",
  },
];

const features = [
  {
    icon: "🏋️",
    title: "Exercícios Personalizados",
    desc: "Treinos criados para o seu corpo, seus objetivos e seu nível de condicionamento.",
  },
  {
    icon: "📂",
    title: "Categorias Organizadas",
    desc: "Encontre treinos por categoria: força, cardio, yoga, mobilidade e muito mais.",
  },
  {
    icon: "🎯",
    title: "Foco no IMC",
    desc: "Acompanhamento personalizado do Índice de Massa Corporal e Peso Corporal.",
  },
  {
    icon: "🔒",
    title: "Acesso Seguro",
    desc: "Autenticação 360° para proteger o seu dado e sua saúde com privacidade total.",
  },
];

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────── */
export default function SolaraPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#0D1117", fontFamily: "'Orbitron', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;500&display=swap');

        /* Estrelas de fundo animadas */
        .stars-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle var(--dur, 4s) var(--delay, 0s) infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50%       { opacity: var(--op, 0.6); }
        }

        /* Gradiente radial dourado no hero */
        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,166,0,0.06) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* Hover nos cards de stats */
        .stat-card:hover {
          border-color: #FF59E0B !important;
          transform: translateY(-4px);
        }

        /* Hover nos cards de features */
        .feature-card:hover {
          border-color: #38BDF8 !important;
        }
      `}</style>

      {/* ══════════════════════════════════════
          SEÇÃO 1 — HERO
      ══════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center"
        style={{ minHeight: "100vh", padding: "80px 24px" }}
      >
        {/* Fundo estrelado */}
        <div className="stars-bg">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                "--dur": `${3 + Math.random() * 5}s`,
                "--delay": `${Math.random() * 5}s`,
                "--op": Math.random() * 0.5 + 0.2,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Brilho central */}
        <div className="hero-glow" />

        {/* Badge */}
        <span
          className="relative z-10 mb-6 inline-block rounded-full border px-4 py-1 text-xs tracking-widest uppercase"
          style={{
            borderColor: "#F59E0B",
            color: "#F59E0B",
            background: "rgba(245,158,11,0.08)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ✦ Sua jornada de saúde, iluminada
        </span>

        {/* Título */}
        <h1
          className="relative z-10 font-black uppercase tracking-widest"
          style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            color: "#F59E0B",
            textShadow: "0 0 40px rgba(245,158,11,0.4)",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          SOLARA
        </h1>

        {/* Subtítulo */}
        <p
          className="relative z-10 max-w-md"
          style={{
            color: "#94A3B8",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
            marginBottom: "36px",
          }}
        >
          Treinos personalizados adaptados ao seu perfil, objetivos e nível.
          <br />
          Você é o centro da sua jornada.
        </p>

        {/* Botões */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
          <button
            style={{
              background: "#F59E0B",
              color: "#0D1117",
              border: "none",
              borderRadius: "8px",
              padding: "12px 28px",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            Começar agora →
          </button>

          <button
            style={{
              background: "transparent",
              color: "#94A3B8",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "12px 28px",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 400,
              fontSize: "0.85rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            Saiba mais
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEÇÃO 2 — STATS (3 colunas)
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#0D1628",
          borderTop: "1px solid #1E3056",
          borderBottom: "1px solid #1E3056",
          padding: "80px 24px",
        }}
      >
        {/* Label superior */}
        <p
          className="mb-12 text-center text-xs tracking-widest uppercase"
          style={{ color: "#8B9DC3", fontFamily: "'Inter', sans-serif" }}
        >
          Por que a Solara?
        </p>

        {/* Grid 3 colunas */}
        <div
          className="mx-auto grid max-w-5xl"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card rounded-2xl p-8 text-center transition-all duration-300"
              style={{
                background: "#111E38",
                border: "1px solid #1E3056",
                cursor: "default",
              }}
            >
              {/* Número em destaque */}
              <p
                className="mb-3 font-extrabold"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "2.8rem",
                  color: "#F59E0B",
                  textShadow: "0 0 20px rgba(245,158,11,0.35)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>

              {/* Descrição */}
              <p
                style={{
                  color: "#64748B",
                  fontSize: "0.82rem",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEÇÃO 3 — FEATURES (grid 2x2)
      ══════════════════════════════════════ */}
      <section style={{ padding: "96px 24px" }}>
        {/* Título da seção */}
        <div className="mb-12 text-center">
          <h2
            className="font-bold"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              color: "#F1F5F9",
              marginBottom: "12px",
            }}
          >
            O que a{" "}
            <span style={{ color: "#F59E0B" }}>Solara</span>{" "}
            oferece
          </h2>
          <p
            style={{
              color: "#64748B",
              fontSize: "0.9rem",
              fontFamily: "'Inter', sans-serif",
              maxWidth: "360px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Conteúdos pensados para que sua evolução flua com propósito e foco.
          </p>
        </div>

        {/* Grid 2x2 */}
        <div
          className="mx-auto max-w-4xl"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card flex items-start gap-5 rounded-2xl p-8 transition-all duration-300"
              style={{
                background: "#111E38",
                border: "1px solid #1E3056",
              }}
            >
              {/* Ícone box */}
              <div
                className="flex shrink-0 items-center justify-center rounded-xl text-2xl"
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(56,189,248,0.10)",
                  border: "1px solid rgba(56,189,248,0.20)",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>

              {/* Texto */}
              <div>
                <h3
                  className="mb-2 font-semibold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.9rem",
                    color: "#F1F5F9",
                    letterSpacing: "0.03em",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "#64748B",
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
