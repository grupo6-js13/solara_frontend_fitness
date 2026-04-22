const team = [
  {
    name: 'Sofia Sabrina',
    role: 'UX/UI Designer',
    description: 'Responsável pela direção criativa e definição da identidade visual.',
    github: 'frsofitware',
    linkedin: 'https://www.linkedin.com/in/sofia-sabrina-silva',
  },
  {
    name: 'Jeaninny Teixeira',
    role: 'UX Engineer', // Ou UI Architect
    description: 'Especialista em Design System e padronização de componentes.',
    github: 'jeaninny',
    linkedin: 'https://www.linkedin.com/in/jeaninnyteixeira',
  },
  {
    name: 'Josué Bravo',
    role: 'Front End Developer',
    description: 'Responsável pela estrutura fundamental e interfaces institucionais.',
    github: 'Josue-Bravo',
    linkedin: 'https://linkedin.com/in/josue-bravo',
  },
  {
    name: 'Marcus Wendell',
    role: 'Fullstack Developer',
    description: 'Desenvolvimento de funcionalidades core e lógica de navegação.',
    github: 'mwendellsmce',
    linkedin: 'https://www.linkedin.com/in/marcus-wendell',
  },
  {
    name: 'Jhonatha Oliveira',
    role: 'Fullstack Developer',
    description: 'Implementação de módulos dinâmicos e integração de dados.',
    github: 'Bfr-Jhon',
    linkedin: 'https://www.linkedin.com/in/jhonatha-oliveira/',
  },
]

export function Team() {
  return (
    <section className="w-full flex justify-center px-6 py-20 bg-bg">
      
      <div className="max-w-275 w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="
            font-display text-3xl md:text-4xl font-bold
            text-text mb-4
            
          ">
            Nossa equipe
          </h2>

          <p className="
            text-muted text-lg
            max-w-150 mx-auto
          ">
            Conheça as pessoas por trás do Astra.
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="
    w-65

    bg-surface border border-border
    rounded-xl p-6

    flex flex-col items-center text-center

    transition-all duration-300
    hover:-translate-y-1.5
    hover:shadow-[0_0_20px_rgba(76,110,245,0.25)]
  "
            >

              {/* Avatar */}
              <img
                src={`https://github.com/${member.github}.png`}
                alt={member.name}
                className="
                  w-25 h-25 rounded-full
                  mb-4

                  border-2 border-border
                "
              />

              {/* Name */}
              <h3 className="
                font-display text-lg font-semibold
                text-text
              ">
                {member.name}
              </h3>

              {/* Role */}
              <span className="
                text-accent text-sm
                mb-2
              ">
                {member.role}
              </span>

              {/* Description */}
              <p className="
                text-muted text-sm
                leading-relaxed mb-5
              ">
                {member.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">

                {/* GitHub */}
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  className="
                    text-sm px-3 py-1.5 rounded-md
                    border border-border
                    text-muted
                    hover:bg-surface-hover transition
                  "
                >
                  GitHub
                </a>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  className="
                    text-sm px-3 py-1.5 rounded-md
                    border border-accent/40
                    text-accent
                    hover:bg-accent/10 transition
                  "
                >
                  LinkedIn
                </a>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}