import { Link } from "react-router-dom";

export default function Footer() {

  let data = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1f1f64] bg-[#040e27] relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Grid de 3 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
          
          {/* Coluna 1: Logo Solara (Com Gradiente) e Tagline */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#040e27] text-[10px] font-black transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,217,77,0.5)]"
                style={{ background: "linear-gradient(135deg, #ffd94d, #ff9239)" }}
              >
                ✦
              </div>
              <span 
                className="font-black tracking-widest text-sm uppercase font-['MuseoModerno'] transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #e1effc, #ffd94d, #ff9239, #4db3f6, #e1effc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.8))",
                }}
              >
                SOLARA
              </span>
            </div>
            <p className="text-[#e1effc]/70 text-[13px] leading-relaxed max-w-60">
              Sua jornada de saúde, iluminada. <br />
              Treinos personalizados para cada estrela.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h4 className="text-[#ffd94d] text-[11px] font-bold uppercase tracking-[0.2em]">Navegação</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-[#e1effc]/60 text-[13px] hover:text-[#ffd94d] hover:translate-x-1 transition-all">Home</Link>
              <Link to="/projeto" className="text-[#e1effc]/60 text-[13px] hover:text-[#ffd94d] hover:translate-x-1 transition-all">O Projeto</Link>
              <Link to="/sobre" className="text-[#e1effc]/60 text-[13px] hover:text-[#ffd94d] hover:translate-x-1 transition-all">Sobre</Link>
              <Link to="/login" className="text-[#e1effc]/60 text-[13px] hover:text-[#4db3f6] hover:translate-x-1 transition-all">Entrar</Link>
            </nav>
          </div>

          {/* Coluna 3: Orbyte */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <div className="h-6 flex items-center">
              <img
                src="https://ik.imagekit.io/jeaninny/Logo_digital_em_vetor_orbyte.png?updatedAt=1776205137349"
                alt="Orbyte"
                className="h-6 object-contain opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer" 
                style={{ filter: "drop-shadow(0 0 8px rgba(77,179,246,0.3))" }}
              />
            </div>
            <p className="text-[#e1effc]/70 text-[13px] leading-relaxed">
              Onde ideias orbitam em torno de conhecimento e tecnologia.
            </p>
          </div>
        </div>

        {/* Linha Divisória e Copyright */}
        <div className="pt-8 border-t border-[#1f1f64] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#e1effc]/40 text-[11px] uppercase tracking-widest text-center sm:text-left">
            © {data} Orbyte.
          </p>
          
          <div className="flex gap-2">
            <div className="w-6 h-0.5 bg-[#ffd94d] rounded-full shadow-[0_0_8px_rgba(255,217,77,0.6)]"></div>
            <div className="w-6 h-0.5 bg-[#4db3f6] rounded-full shadow-[0_0_8px_rgba(77,179,246,0.6)]"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}