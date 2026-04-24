import { BarbellIcon, CloudIcon, FileTextIcon, FolderOpenIcon, LightningIcon, UserCircleIcon } from "@phosphor-icons/react"
import { SiReact, SiTypeorm, SiTypescript, SiPassport, SiVite, SiTailwindcss, SiNestjs, SiNodedotjs, SiMysql, SiPostgresql } from '@icons-pack/react-simple-icons'

function Projeto() {

    const stats = [
        {
            value: "47%",
            label: "dos brasileiros adultos são sedentários",
            fonte: "IBGE",
            link: "https://www.nationalgeographicbrasil.com/ciencia/2024/03/o-que-e-sedentarismo-e-como-ele-impacta-a-saude-veja-11-acoes-chave-para-deixar-de-ser-sedentario",
        },
        {
            value: "45%",
            label: "não conseguem conciliar exercícios com o dia a dia",
            fonte: "Fórum Econômico Mundial",
            link: "https://www.gazetasp.com.br/saude/entenda-o-porque-as-pessoas-abandonam-tanto-a-academia-especialista/1156084/",
        },
        {
            value: "64%",
            label: "abandonam o treino até o terceiro mês",
            fonte: "FioCruz",
            link: "https://www.gazetadopovo.com.br/vida-e-cidadania/na-era-fitness-apenas-37-dos-alunos-permanecem-um-ano-na-academia-8tzhbmlrjduld8def5tvgqw0k/",
        },
    ]

    const features = [
        { icon: <BarbellIcon size={24} color="#4db3f6" />, title: "Gerenciar Exercícios", desc: "Crie e gerencie exercícios com buscas por nome e repetições." },
        { icon: <FolderOpenIcon size={24} color="#4db3f6" />, title: "Gerenciar Categorias", desc: "Organize exercícios em categorias para facilitar a navegação." },
        { icon: <UserCircleIcon size={24} color="#4db3f6" />, title: "Gerenciar Usuários", desc: "Login autenticado com senha criptografada via Bcrypt." },
        { icon: <LightningIcon size={24} color="#4db3f6" />, title: "Cálculo de IMC", desc: "Cálculo automático de IMC com busca por faixa corporal." },
        { icon: <FileTextIcon size={24} color="#4db3f6" />, title: "Documentação Swagger", desc: "Documentação interativa da API para testes e integração." },
        { icon: <CloudIcon size={24} color="#4db3f6" />, title: "Deploy na Nuvem", desc: "Backend no Render com banco de dados PostgreSQL via Neon." },
    ]

    const tecnologias = [
        { name: "React", desc: "Biblioteca", type: "Frontend", icon: <SiReact size={35} color="#4db3f6" /> },
        { name: "TypeScript", desc: "Linguagem", type: "Frontend", icon: <SiTypescript size={35} color="#4db3f6" /> },
        { name: "Vite", desc: "Build", type: "Frontend", icon: <SiVite size={35} color="#4db3f6" /> },
        { name: "Tailwind CSS", desc: "Estilização", type: "Frontend", icon: <SiTailwindcss size={35} color="#4db3f6" /> },
        { name: "NestJS", desc: "Framework", type: "Backend", icon: <SiNestjs size={35} color="#4db3f6" /> },
        { name: "Node.js", desc: "Servidor", type: "Backend", icon: <SiNodedotjs size={35} color="#4db3f6" /> },
        { name: "TypeORM", desc: "ORM", type: "Backend", icon: <SiTypeorm size={35} color="#4db3f6" /> },
        { name: "MySQL", desc: "Banco Local", type: "Backend", icon: <SiMysql size={35} className="scale-125" color="#4db3f6" /> },
        { name: "PostgreSQL + Neon", desc: "Banco Nuvem", type: "Backend", icon: <SiPostgresql size={35} color="#4db3f6" /> },
        { name: "JWT + Passport", desc: "Autenticação", type: "Backend", icon: <SiPassport size={35} color="#4db3f6" /> },
    ]

    return (
        <div 
            className="min-h-screen text-[#e1effc] relative overflow-hidden"
            style={{ 
                backgroundColor: "#040e27",
                backgroundImage: "linear-gradient(rgba(225, 239, 252, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 239, 252, 0.02) 1px, transparent 1px)",
                backgroundSize: "60px 60px" 
            }}
        >
            {/* ── LUZES DE FUNDO (AMBIENT LIGHTS) ── */}
            {/* Ponto de luz amarelo (Topo Esquerdo) */}
            <div
                className="fixed top-0 left-0 w-[50vw] h-[50vw] min-w-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255,217,77,0.15) 0%, transparent 60%)",
                    transform: "translate(-30%, -30%)",
                    zIndex: 0,
                }}
            />

            {/* Ponto de luz azul claro (Canto Inferior Direito) */}
            <div
                className="fixed bottom-0 right-0 w-[50vw] h-[50vw] min-w-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(77,179,246,0.15) 0%, transparent 60%)",
                    transform: "translate(30%, 30%)",
                    zIndex: 0,
                }}
            />

            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 z-10">
                <h1
                    className="relative font-['Orbitron'] font-black uppercase tracking-widest mb-4"
                    style={{
                        fontSize: "clamp(2.5rem, 8vw, 5rem)",
                        background: "linear-gradient(to right, #e1effc, #ffd94d, #ff9239, #4db3f6, #e1effc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.8))",
                        lineHeight: 1.1,
                    }}
                >
                    SOLARA
                </h1>

                <p className="relative max-w-xl text-[#e1effc] text-base leading-relaxed font-bold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                    Iluminando hábitos diários e transformando a disciplina dos treinos
                    em uma jornada de saúde guiada e organizada.
                </p>
            </section>

            {/* ── PROBLEMA ── */}
            <section className="relative px-6 py-20 border-y border-[#1f1f64] bg-[#040e27]/80 backdrop-blur-sm z-10">
                <p className="text-center text-[#e1effc]/60 text-xs tracking-widest uppercase mb-12">
                    Por que a Solara existe?
                </p>

                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((s) => (
                        <div
                            key={s.value}
                            className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#4db3f6] hover:-translate-y-1 backdrop-blur-md"
                        >
                            <p
                                className="font-extrabold mb-3"
                                style={{
                                    fontSize: "2.8rem",
                                    color: "#ffd94d",
                                    textShadow: "0 0 20px rgba(255,217,77,0.3)",
                                    lineHeight: 1,
                                    fontFamily: "'Syne', sans-serif",
                                }}
                            >
                                {s.value}
                            </p>
                            <p className="text-[#e1effc]/80 text-sm leading-relaxed mb-2">{s.label}</p>
                            <a
                                href={s.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#4db3f6]/60 text-xs hover:text-[#4db3f6] transition-colors"
                            >
                                ({s.fonte})
                            </a>
                        </div>
                    ))}
                </div>

                <p className="text-center text-[#e1effc] text-base max-w-xl mx-auto mt-12 leading-relaxed">
                    A <span style={{ color: "#ffd94d" }}>Solara</span> entra como resposta a esses três pontos —{" "}
                    <span className="text-[#ff9239]">acessível</span>,{" "}
                    <span className="text-[#ff9239]">organizado</span> e{" "}
                    <span className="text-[#ff9239]">personalizado</span>.
                </p>
            </section>

            {/* ── O QUE OFERECE ── */}
            <section className="relative px-6 py-20 bg-transparent z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="font-['Orbitron'] font-bold text-[#e1effc] mb-3"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                        >
                            O que a <span style={{ color: "#ffd94d" }}>Solara</span> oferece
                        </h2>
                        <p className="text-[#e1effc]/80 text-sm max-w-md mx-auto">
                            Ferramentas pensadas para guiar sua evolução física com precisão e foco.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 hover:border-[#4db3f6] backdrop-blur-md"
                            >
                                <div
                                    className="shrink-0 flex items-center justify-center rounded-xl text-2xl"
                                    style={{
                                        width: 48, height: 48,
                                        background: "rgba(77,179,246,0.10)",
                                        border: "1px solid rgba(77,179,246,0.20)",
                                    }}
                                >
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="text-[#e1effc] font-semibold text-sm mb-1">{f.title}</h3>
                                    <p className="text-[#e1effc]/70 text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* ── TECNOLOGIAS ── */}
            <section className="relative px-6 py-20 border-t border-[#1f1f64] bg-[#040e27]/80 backdrop-blur-sm z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="font-['Orbitron'] font-bold text-[#e1effc] mb-3"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                        >
                            A construção da <span style={{ color: "#ffd94d" }}>Solara</span>
                        </h2>
                        <p className="text-[#e1effc]/80 text-sm">
                            Stack completa para um sistema full stack moderno e escalável.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {tecnologias.map((t) => (
                            <div
                                key={t.name}
                                className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:border-[#4db3f6] hover:-translate-y-1 backdrop-blur-md"
                            >
                                <div className="mb-3 mt-2 flex items-center justify-center h-12">
                                    {t.icon}
                                </div>

                                <p className="text-[#e1effc] text-xs font-semibold mb-1">{t.name}</p>
                                <p className="text-[#e1effc]/60 text-[10px] mb-3">{t.desc}</p>
                                
                                <span
                                    className="mt-auto text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                                    style={{
                                        color: "#ffd94d",
                                        borderColor: "#ffd94d",
                                        background: "rgba(255,217,77,0.08)",
                                    }}
                                >
                                    {t.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── IMPLEMENTAÇÕES FUTURAS ── */}
            <section className="relative px-6 py-20 border-t border-[#1f1f64] bg-transparent z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="font-['Orbitron'] font-bold text-[#e1effc] mb-3"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                        >
                            Implementações <span style={{ color: "#ff9239" }}>Futuras</span>
                        </h2>
                        <p className="text-[#e1effc]/80 text-sm">
                            O que a Solara planeja evoluir.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            { icon: "📈", title: "Histórico de IMC", desc: "Visualização gráfica do progresso corporal ao longo do tempo." },
                            { icon: "🤖", title: "Sugestão Automática de Treinos", desc: "Recomendações personalizadas por IMC e perfil do usuário." },
                            { icon: "🎥", title: "Vídeos dos Exercícios", desc: "Instrução visual para execução correta de cada exercício." },
                            { icon: "🛒", title: "Simulador de Treino", desc: "Montagem de treino inspirada em carrinho de compras." },
                            { icon: "🏅", title: "Níveis de Habilidade", desc: "Personalização de exercícios por nível: iniciante, intermediário, avançado." },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 hover:border-[#4db3f6]/60 backdrop-blur-md"
                            >
                                <div
                                    className="shrink-0 flex items-center justify-center rounded-xl text-xl"
                                    style={{
                                        width: 44, height: 44,
                                        background: "rgba(77,179,246,0.1)",
                                        border: "1px solid rgba(77,179,246,0.2)",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-[#e1effc] font-semibold text-sm mb-1">{item.title}</h3>
                                    <p className="text-[#e1effc]/70 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Projeto