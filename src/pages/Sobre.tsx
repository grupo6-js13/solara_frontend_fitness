const team = [
  {
    name: "Sofia Sabrina",
    role: "UI Developer & Designer",
    description: "Responsável pela identidade visual da Solara, da paleta à tipografia, e implementação dos componentes de layout globais do projeto.",
    github: "frsofitware",
    linkedin: "https://www.linkedin.com/in/sofia-sabrina-silva",
  },
  {
    name: "Jeaninny Teixeira",
    role: "Frontend Developer",
    description: "Responsável por componentes, Design System e padronização do projeto.",
    github: "jeaninny",
    linkedin: "https://www.linkedin.com/in/jeaninnyteixeira",
  },
  {
    name: "Josué Bravo",
    role: "Frontend Developer",
    description: "Responsável por componentes e integração com o backend.",
    github: "Josue-Bravo",
    linkedin: "https://linkedin.com/in/josue-bravo",
  },
  {
    name: "Marcus Wendell",
    role: "Full Stack Developer",
    description: "Desenvolvimento de funcionalidades core e lógica de navegação.",
    github: "mwendellsmce",
    linkedin: "https://www.linkedin.com/in/marcus-wendell",
  },
  {
    name: "Jhonatha Oliveira",
    role: "Frontend Developer",
    description: "Responsável pelas páginas institucionais do projeto.",
    github: "Bfr-Jhon",
    linkedin: "https://www.linkedin.com/in/jhonatha-oliveira/",
  },
]

function Sobre() {
  return (
    <div className="min-h-screen bg-[#080D1A]">

      {/* HERO */}
      <section className="relative text-center px-10 pt-20 pb-16 border-b border-[#1E3056] overflow-hidden">
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600, height: 400,
            background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <span
          className="relative z-10 mb-6 inline-block rounded-full border px-4 py-1 text-xs tracking-widest uppercase"
          style={{
            borderColor: "#F59E0B",
            color: "#F59E0B",
            background: "rgba(245,158,11,0.08)",
          }}
        >
          ✦ Quem somos
        </span>

        <div className="flex justify-center mb-6">
          <img
            src="https://ik.imagekit.io/jeaninny/Logo_digital_em_vetor_orbyte.png?updatedAt=1776205137349"
            alt="Orbyte"
            className="h-20 object-contain opacity-80 hover:opacity-100 transition-all duration-300"
            style={{ filter: "drop-shadow(0 0 12px rgba(56,189,248,0.3))" }}
          />
        </div>

        <p className="relative z-10 text-[#8B9DC3] text-sm tracking-widest mb-4">
          Onde ideias orbitam em torno de conhecimento e tecnologia
        </p>

        <p className="relative z-10 max-w-xl mx-auto text-[#8B9DC3] text-sm leading-relaxed">
          Somos um time da Turma JavaScript 13 do Bootcamp de Desenvolvimento Full Stack da Generation Brasil.
          Unimos conhecimento, criatividade e tecnologia em nossos projetos.
        </p>
      </section>

      {/* TEAM */}
      <section className="w-full flex justify-center px-6 py-20">
        <div className="w-full max-w-5xl">

          <div className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-3xl font-bold text-[#F0F4FF] mb-4">
              Nossa equipe
            </h2>
            <p className="text-[#8B9DC3] text-base max-w-md mx-auto">
              Conheça as pessoas por trás da Solara.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[#111E38] border border-[#1E3056]
        rounded-2xl p-6 flex flex-col items-center text-center
        transition-all duration-300 hover:-translate-y-1.5
        cursor-default"
                style={{ width: "calc(33.333% - 16px)", minWidth: 260 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#F59E0B")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1E3056")}
              >
                <img
                  src={`https://github.com/${member.github}.png`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 border-2 border-[#1E3056] object-cover"
                />

                <h3 className="font-['Orbitron'] text-sm font-semibold text-[#F0F4FF] mb-1">
                  {member.name}
                </h3>

                <span className="text-[#F59E0B] text-xs mb-3">
                  {member.role}
                </span>

                <p className="text-[#8B9DC3] text-xs leading-relaxed mb-5">
                  {member.description}
                </p>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1E3056] text-[#8B9DC3] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Sobre