const team = [
  {
    name: "Sofia Sabrina",
    role: "UI Developer & Designer",
    description: "Liderou a concepção da identidade visual e a estratégia de UI, garantindo a consistência estética e a usabilidade do projeto Solara.",
    github: "frsofitware",
    linkedin: "https://www.linkedin.com/in/sofia-sabrina-silva",
  },
  {
    name: "Jeaninny Teixeira",
    role: "UX Designer & Frontend",
    description: "Liderou as diretrizes de Experiência do Usuário (UX), estruturando o Design System e assegurando uma jornada fluida e padronizada.",
    github: "jeaninny",
    linkedin: "https://www.linkedin.com/in/jeaninnyteixeira",
  },
  {
    name: "Josué Bravo",
    role: "Frontend Developer",
    description: "Focou na comunicação da aplicação, orquestrando a integração do lado do cliente com os serviços e APIs do backend.",
    github: "Josue-Bravo",
    linkedin: "https://linkedin.com/in/josue-bravo",
  },
  {
    name: "Marcus Wendell",
    role: "Full Stack Developer",
    description: "Atuou no núcleo tecnológico do projeto, definindo a lógica de negócios e arquitetando a estrutura de navegação central.",
    github: "mwendellsmce",
    linkedin: "https://www.linkedin.com/in/marcus-wendell",
  },
  {
    name: "Jhonatha Oliveira",
    role: "Frontend Developer",
    description: "Responsável por projetar a presença institucional da marca, desenvolvendo interfaces voltadas para a apresentação estratégica do produto.",
    github: "Bfr-Jhon",
    linkedin: "https://www.linkedin.com/in/jhonatha-oliveira/",
  },
]

function Sobre() {
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
          className="fixed top-0 left-0 w-[50vw] h-[50vw] min-w-125 rounded-full pointer-events-none"
          style={{
              background: "radial-gradient(circle, rgba(255,217,77,0.15) 0%, transparent 60%)",
              transform: "translate(-30%, -30%)",
              zIndex: 0,
          }}
      />

      {/* Ponto de luz azul claro (Canto Inferior Direito) */}
      <div
          className="fixed bottom-0 right-0 w-[50vw] h-[50vw] min-w-125 rounded-full pointer-events-none"
          style={{
              background: "radial-gradient(circle, rgba(77,179,246,0.15) 0%, transparent 60%)",
              transform: "translate(30%, 30%)",
              zIndex: 0,
          }}
      />

      {/* HERO */}
      <section className="relative z-10 text-center px-6 sm:px-10 pt-20 pb-16">
        
        <span
          className="relative z-10 mb-6 inline-block rounded-full border px-4 py-1 text-xs tracking-widest uppercase font-bold"
          style={{
            borderColor: "#ffd94d",
            color: "#ffd94d",
            background: "rgba(255,217,77,0.08)",
          }}
        >
          ✦ Quem somos
        </span>

        <div className="relative z-10 max-w-2xl mx-auto bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-8 backdrop-blur-md shadow-lg">
          <div className="flex justify-center mb-6">
            <img
              src="https://ik.imagekit.io/jeaninny/Logo_digital_em_vetor_orbyte.png?updatedAt=1776205137349"
              alt="Orbyte"
              className="h-20 object-contain opacity-90"
              style={{ filter: "drop-shadow(0 0 12px rgba(77,179,246,0.4))" }}
            />
          </div>

          <p className="text-[#e1effc]/80 text-sm tracking-widest mb-4 text-center font-medium">
            Onde ideias orbitam em torno de conhecimento e tecnologia
          </p>

          <p className="text-[#e1effc]/70 text-sm leading-relaxed text-center">
            Somos um time da Turma JavaScript 13 do Bootcamp de Desenvolvimento Full Stack da Generation Brasil.
            Unimos conhecimento, criatividade e tecnologia em nossos projetos.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative z-10 w-full flex justify-center px-6 py-20">
        <div className="w-full max-w-5xl">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#e1effc] mb-4">
              Nossa equipe
            </h2>
            <p className="text-[#e1effc]/80 text-base max-w-md mx-auto">
              Conheça as pessoas por trás da Solara.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4db3f6] hover:shadow-[0_10px_30px_rgba(77,179,246,0.1)] backdrop-blur-md cursor-default w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <img
                  src={`https://github.com/${member.github}.png`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 border-2 border-[#1f1f64] object-cover"
                />

                <h3 className="text-sm font-semibold text-[#e1effc] mb-1">
                  {member.name}
                </h3>

                <span className="text-[#ffd94d] text-xs font-medium mb-3 tracking-wide">
                  {member.role}
                </span>

                <p className="text-[#e1effc]/70 text-xs leading-relaxed mb-5">
                  {member.description}
                </p>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1f1f64] text-[#e1effc]/80 hover:border-[#ffd94d] hover:text-[#ffd94d] transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#4db3f6]/40 text-[#4db3f6] hover:bg-[#4db3f6]/10 hover:border-[#4db3f6] transition-all"
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