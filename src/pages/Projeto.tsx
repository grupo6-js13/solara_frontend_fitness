import { BarbellIcon, CloudIcon, FileTextIcon, FolderOpenIcon, LightningIcon, UserCircleIcon } from "@phosphor-icons/react"

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
        { icon: <BarbellIcon size={24} color="#38BDF8" />, title: "Gerenciar Exercícios", desc: "Crie e gerencie exercícios com buscas por nome e repetições." },
        { icon: <FolderOpenIcon size={24} color="#38BDF8" />, title: "Gerenciar Categorias", desc: "Organize exercícios em categorias para facilitar a navegação." },
        { icon: <UserCircleIcon size={24} color="#38BDF8" />, title: "Gerenciar Usuários", desc: "Login autenticado com senha criptografada via Bcrypt." },
        { icon: <LightningIcon size={24} color="#38BDF8" />, title: "Cálculo de IMC", desc: "Cálculo automático de IMC com busca por faixa corporal." },
        { icon: <FileTextIcon size={24} color="#38BDF8" />, title: "Documentação Swagger", desc: "Documentação interativa da API para testes e integração." },
        { icon: <CloudIcon size={24} color="#38BDF8" />, title: "Deploy na Nuvem", desc: "Backend no Render com banco de dados PostgreSQL via Neon." },
    ]

    const techs = [
        { name: "React", desc: "Biblioteca Frontend", icon: "⚛️" },
        { name: "TypeScript", desc: "Linguagem", icon: "🔷" },
        { name: "Vite", desc: "Build", icon: "⚡" },
        { name: "Tailwind CSS", desc: "Estilização", icon: "🎨" },
        { name: "NestJS", desc: "Framework Backend", icon: "🐈" },
        { name: "Node.js", desc: "Servidor", icon: "🟢" },
        { name: "TypeORM", desc: "ORM", icon: "🗄️" },
        { name: "MySQL", desc: "Banco Relacional Local", icon: "🐬" },
        { name: "PostgreSQL + Neon", desc: "Banco de Dados em Nuvem", icon: "☁️" },
        { name: "JWT + Passport", desc: "Autenticação", icon: "🔐" },
    ]
    return (
        <div className="min-h-screen bg-[#080D1A] text-[#F0F4FF]">

            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
                {/* Glow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: 600, height: 400,
                        background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                <h1
                    className="relative z-10 font-['Orbitron'] font-black uppercase tracking-widest mb-4"
                    style={{
                        fontSize: "clamp(2.5rem, 8vw, 5rem)",
                        color: "#F59E0B",
                        textShadow: "0 0 40px rgba(245,158,11,0.35)",
                        lineHeight: 1.1,
                    }}
                >
                    SOLARA
                </h1>

                <p
                    className="relative z-10 max-w-xl text-[#8B9DC3] text-base leading-relaxed"
                >
                    Iluminando hábitos diários e transformando a disciplina dos treinos
                    em uma jornada de saúde guiada e organizada.
                </p>
            </section>

            {/* ── PROBLEMA ── */}
            <section
                className="px-6 py-20 border-y border-[#1E3056]"
                style={{ background: "#0D1528" }}
            >
                <p className="text-center text-[#8B9DC3] text-xs tracking-widest uppercase mb-12">
                    Por que a Solara existe?
                </p>

                <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
                    {stats.map((s) => (
                        <div
                            key={s.value}
                            className="bg-[#111E38] border border-[#1E3056] rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#F59E0B] hover:-translate-y-1"
                        >
                            <p
                                className="font-extrabold mb-3"
                                style={{
                                    fontSize: "2.8rem",
                                    color: "#F59E0B",
                                    textShadow: "0 0 20px rgba(245,158,11,0.35)",
                                    lineHeight: 1,
                                    fontFamily: "'Syne', sans-serif",
                                }}
                            >
                                {s.value}
                            </p>
                            <p className="text-[#8B9DC3] text-sm leading-relaxed mb-2">{s.label}</p>
                            <a
                                href={s.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#4A5A7A] text-xs hover:text-[#8B9DC3] transition-colors"
                            >
                                ({s.fonte})
                            </a>

                        </div>
                    ))}
                </div>

                <p
                    className="text-center text-[#F0F4FF] text-base max-w-xl mx-auto mt-12 leading-relaxed"
                >
                    A <span style={{ color: "#F59E0B" }}>Solara</span> entra como resposta a esses três pontos —{" "}
                    <span className="text-[#38BDF8]">acessível</span>,{" "}
                    <span className="text-[#38BDF8]">organizado</span> e{" "}
                    <span className="text-[#38BDF8]">personalizado</span>.
                </p>
            </section>

            {/* ── O QUE OFERECE ── */}
            <section className="px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="font-['Orbitron'] font-bold text-[#F0F4FF] mb-3"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                        >
                            O que a <span style={{ color: "#F59E0B" }}>Solara</span> oferece
                        </h2>
                        <p className="text-[#8B9DC3] text-sm max-w-md mx-auto">
                            Ferramentas pensadas para guiar sua evolução física com precisão e foco.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="bg-[#111E38] border border-[#1E3056] rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 hover:border-[#38BDF8]"
                            >
                                <div
                                    className="shrink-0 flex items-center justify-center rounded-xl text-2xl"
                                    style={{
                                        width: 48, height: 48,
                                        background: "rgba(56,189,248,0.10)",
                                        border: "1px solid rgba(56,189,248,0.20)",
                                    }}
                                >
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="text-[#F0F4FF] font-semibold text-sm mb-1">{f.title}</h3>
                                    <p className="text-[#8B9DC3] text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECNOLOGIAS ── */}
            <section
                className="px-6 py-20 border-t border-[#1E3056]"
                style={{ background: "#0D1528" }}
            >
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="font-['Orbitron'] font-bold text-[#F0F4FF] mb-3"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                        >
                            A construção da <span style={{ color: "#F59E0B" }}>Solara</span>
                        </h2>
                        <p className="text-[#8B9DC3] text-sm">
                            Stack completa para um sistema full stack moderno e escalável.
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        {techs.map((t) => (
                            <div
                                key={t.name}
                                className="bg-[#111E38] border border-[#1E3056] rounded-xl p-4 text-center transition-all duration-300 hover:border-[#F59E0B] hover:-translate-y-1"
                            >
                                <div className="text-2xl mb-2">{t.icon}</div>
                                <p className="text-[#F0F4FF] text-xs font-semibold mb-1">{t.name}</p>
                                <p className="text-[#4A5A7A] text-[10px]">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── IMPLEMENTAÇÕES FUTURAS ── */}
            <section className="px-6 py-20 border-t border-[#1E3056]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="font-['Orbitron'] font-bold text-[#F0F4FF] mb-3"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                        >
                            Implementações <span style={{ color: "#38BDF8" }}>Futuras</span>
                        </h2>
                        <p className="text-[#8B9DC3] text-sm">
                            O que a Solara planeja evoluir.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {[
                            { icon: "📈", title: "Histórico de IMC", desc: "Visualização gráfica do progresso corporal ao longo do tempo." },
                            { icon: "🤖", title: "Sugestão Automática de Treinos", desc: "Recomendações personalizadas por IMC e perfil do usuário." },
                            { icon: "🎥", title: "Vídeos dos Exercícios", desc: "Instrução visual para execução correta de cada exercício." },
                            { icon: "🛒", title: "Simulador de Treino", desc: "Montagem de treino inspirada em carrinho de compras." },
                            { icon: "🏅", title: "Níveis de Habilidade", desc: "Personalização de exercícios por nível: iniciante, intermediário, avançado." },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-[#111E38] border border-[#1E3056] rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 hover:border-[#38BDF8]/50"
                            >
                                <div
                                    className="shrink-0 flex items-center justify-center rounded-xl text-xl"
                                    style={{
                                        width: 44, height: 44,
                                        background: "rgba(56,189,248,0.08)",
                                        border: "1px solid rgba(56,189,248,0.15)",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-[#F0F4FF] font-semibold text-sm mb-1">{item.title}</h3>
                                    <p className="text-[#8B9DC3] text-xs leading-relaxed">{item.desc}</p>
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