import { Link } from "react-router-dom"

function Home() {

    return (
        <div className="min-h-screen w-full" style={{ background: "#040e27" }}>

            <section
                className="relative flex flex-col items-center justify-center text-center"
                style={{ minHeight: "100vh", padding: "80px 24px" }}
            >

                {/* Glow solar */}
                <div style={{
                    position: "absolute",
                    top: -200,
                    left: -250,
                    width: 650,
                    height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.08) 35%, transparent 65%)",
                    pointerEvents: "none",
                }} />
                {/* Estrelas */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                    {Array.from({ length: 80 }).map((_, i) => (
                        <span
                            key={i}
                            style={{
                                position: "absolute",
                                width: 2, height: 2,
                                background: "#fff",
                                borderRadius: "50%",
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.4 + 0.1,
                            }}
                        />
                    ))}
                </div>

                {/* Glow */}
                <div style={{
                    position: "absolute",
                    width: 600, height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }} />

                {/* Badge */}
                <span
                    className="relative z-10 mb-6 inline-block rounded-full border px-4 py-1 text-xs tracking-widest uppercase"
                    style={{ borderColor: "#F59E0B", color: "#F59E0B", background: "rgba(245,158,11,0.08)" }}
                >
                    ✦ Sua jornada de saúde, iluminada
                </span>

                {/* Título */}
                <h1
                    className="relative z-10 font-['Orbitron'] font-black uppercase tracking-widest"
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
                    className="relative z-10 max-w-md text-[#8B9DC3] text-base leading-relaxed"
                    style={{ marginBottom: "36px" }}
                >
                    Treinos personalizados adaptados ao seu perfil, objetivos e nível.
                    <br />
                    Você é o centro da sua jornada.
                </p>

                {/* Botões */}
                <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                    <Link to="/cadastro">
                        <button
                            className="font-['Orbitron'] font-bold text-sm cursor-pointer rounded-lg px-7 py-3"
                            style={{ background: "#F59E0B", color: "#080D1A", border: "none", letterSpacing: "0.05em" }}
                        >
                            Começar agora →
                        </button>
                    </Link>
                    <Link to="/projeto">
                        <button
                            className="font-['Orbitron'] text-sm cursor-pointer rounded-lg px-7 py-3"
                            style={{ background: "transparent", color: "#8B9DC3", border: "1px solid #1E3056" }}
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