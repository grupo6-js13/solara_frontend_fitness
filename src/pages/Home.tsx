import { Link } from "react-router-dom"

function Home() {

    return (
        <div 
            className="min-h-screen w-full relative overflow-hidden text-[#e1effc] bg-[#040e27]"
            style={{ 
                backgroundImage: "linear-gradient(rgba(225, 239, 252, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 239, 252, 0.02) 1px, transparent 1px)",
                backgroundSize: "60px 60px" 
            }}
        >
            {/* ── LUZES DE FUNDO (AMBIENT LIGHTS) ── */}
            {/* Ponto de luz amarelo (Topo Esquerdo) */}
            <div
                className="fixed top-0 left-0 w-[50vw] h-[50vw] min-w-125 rounded-full pointer-events-none translate-x-[-30%] translate-y-[-30%] z-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,217,77,0.15) 0%, transparent 60%)",
                }}
            />

            {/* Ponto de luz azul claro (Canto Inferior Direito) */}
            <div
                className="fixed bottom-0 right-0 w-[50vw] h-[50vw] min-w-125 rounded-full pointer-events-none translate-x-[30%] translate-y-[30%] z-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(77,179,246,0.15) 0%, transparent 60%)",
                }}
            />

            {/* ── ESTRELAS DO FUNDO ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
                {Array.from({ length: 80 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-[#e1effc] rounded-full shadow-[0_0_4px_rgba(225,239,252,0.8)]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.1,
                        }}
                    />
                ))}
            </div>

            {/* ── CONTEÚDO PRINCIPAL ── */}
            <section
                className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-20"
            >
                {/* Badge */}
                <span
                    className="relative mb-6 inline-block rounded-full border border-[#ffd94d] px-4 py-1 text-xs tracking-widest uppercase font-bold text-[#ffd94d] bg-[#ffd94d]/10 shadow-[0_0_10px_rgba(255,217,77,0.2)]"
                >
                    ✦ Sua jornada de saúde, iluminada
                </span>

                {/* Título */}
                <h1
                    className="relative font-['MuseoModerno'] font-black uppercase tracking-widest mb-5 text-transparent bg-clip-text"
                    style={{
                        fontSize: "clamp(3rem, 10vw, 6rem)",
                        backgroundImage: "linear-gradient(to right, #e1effc, #ffd94d, #ff9239, #4db3f6, #e1effc)",
                        filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.8))",
                        lineHeight: 1.1,
                    }}
                >
                    SOLARA
                </h1>

                {/* Subtítulo */}
                <p
                    className="relative max-w-md text-[#e1effc] font-bold text-base leading-relaxed mb-9 drop-shadow-md"
                >
                    Treinos personalizados adaptados ao seu perfil, objetivos e nível.
                    <br />
                    Você é o centro da sua jornada.
                </p>

                {/* Botões usando classes do Tailwind para garantir o funcionamento */}
                <div className="relative flex flex-wrap items-center justify-center gap-4">
                    <Link to="/cadastro">
                        <button
                            className="font-bold text-sm cursor-pointer rounded-lg px-7 py-3 uppercase tracking-wider text-[#040e27] bg-linear-to-br from-[#ffd94d] to-[#ff9239] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,217,77,0.5)] border-none"
                        >
                            Começar agora →
                        </button>
                    </Link>
                    <Link to="/projeto">
                        <button
                            className="font-bold text-sm cursor-pointer rounded-lg px-7 py-3 uppercase tracking-wider border border-[#1f1f64] text-[#e1effc] bg-transparent transition-all duration-300 hover:border-[#4db3f6] hover:text-[#4db3f6] hover:bg-[#4db3f6]/10 hover:shadow-[0_0_15px_rgba(77,179,246,0.3)]"
                        >
                            Saiba mais
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default Home