import { Link } from "react-router-dom";
 
export default function Footer() {
 
  let data = new Date().getFullYear()
 
  return (
    <footer className="border-t border-[#1E3056]/30 bg-[#080D1A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Grid de 3 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
          
          {/* Coluna 1: Logo Solara (Com Gradiente) e Tagline */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black"
                   style={{ background: "linear-gradient(135deg, #F59E0B, #B45309)" }}>
                ✦
              </div>
              <span className="font-black tracking-widest text-sm uppercase"
                    style={{
                      background: "linear-gradient(90deg, #F59E0B 0%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                SOLARA
              </span>
            </div>
            <p className="text-[#4A5A7A] text-[13px] leading-relaxed max-w-60">
              Sua jornada de saúde, iluminada. <br />
              Treinos personalizados para cada estrela.
            </p>
          </div>
 
          {/* Coluna 2: Navegação */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h4 className="text-[#F59E0B] text-[11px] font-bold uppercase tracking-[0.2em]">Navegação</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-[#4A5A7A] text-[13px] hover:text-white transition-colors">Home</Link>
              <Link to="/projeto" className="text-[#4A5A7A] text-[13px] hover:text-white transition-colors">O Projeto</Link>
              <Link to="/sobre" className="text-[#4A5A7A] text-[13px] hover:text-white transition-colors">Sobre</Link>
              <Link to="/login" className="text-[#4A5A7A] text-[13px] hover:text-white transition-colors">Entrar</Link>
            </nav>
          </div>
 
          {/* Coluna 3: Orbyte */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <div className="h-6 flex items-center">
              <img
                src="https://ik.imagekit.io/jeaninny/Logo_digital_em_vetor_orbyte.png?updatedAt=1776205137349"
                alt="Orbyte"
                className="h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
            <p className="text-[#4A5A7A] text-[13px] leading-relaxed">
              Onde ideias orbitam em torno de conhecimento e tecnologia.
            </p>
          </div>
        </div>
 
        {/* Linha Divisória e Copyright */}
        <div className="pt-8 border-t border-[#1E3056]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#1E3056] text-[11px] uppercase tracking-widest text-center sm:text-left">
            © {data} Orbyte. Desenvolvido no Generation Brasil.
          </p>
          
          <div className="flex gap-2">
            <div className="w-6 h-0.5 bg-[#F59E0B] rounded-full"></div>
            <div className="w-6 h-0.5 bg-[#38BDF8] rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}