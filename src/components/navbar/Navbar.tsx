import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { AuthContext } from "../../context/AuthContext";
 
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
 
  const isActive = (path: string) =>
    location.pathname === path ? "text-white" : "text-[#8B9DC3]";
 
  function logout() {
    handleLogout();
    navigate("/login");
    setMenuAberto(false);
  }
 
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1E3056]/30 backdrop-blur-xl bg-[#080D1A]/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
 
        {/* Logo Solara */}
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #B45309)",
              boxShadow: "0 0 15px rgba(245,158,11,0.4)",
            }}
          >
            ✦
          </div>
          <span
            className="font-black tracking-widest text-lg uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(90deg, #F59E0B 0%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SOLARA
          </span>
        </Link>
 
        {/* Links Centrais — só desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`${isActive("/")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Home</Link>
          <Link to="/sobre" className={`${isActive("/sobre")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Sobre</Link>
          <Link to="/projeto" className={`${isActive("/projeto")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>O Projeto</Link>
 
          {usuario.token !== "" && (
            <>
              <Link to="/categorias" className={`${isActive("/categorias")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Categorias</Link>
              <Link to="/exercicios" className={`${isActive("/exercicios")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Exercícios</Link>
            </>
          )}
        </div>
 
        {/* Botões da Direita — só desktop */}
        <div className="hidden md:flex items-center gap-3">
          {usuario.token !== "" ? (
            <>
              <Link
                to="/perfil"
                className="text-[#8B9DC3] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all mr-4"
              >
                Perfil
              </Link>
              <button
                onClick={logout}
                className="text-[#F0F4FF] cursor-pointer text-xs font-bold border border-[#1E3056] px-5 py-2 rounded-lg transition-all duration-300 hover:border-[#F0F4FF] hover:shadow-[0_0_15px_rgba(240,244,255,0.3)] hover:bg-white/5"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#F0F4FF] text-xs font-bold border border-[#1E3056] px-5 py-2 rounded-lg transition-all duration-300 hover:border-[#F0F4FF] hover:shadow-[0_0_15px_rgba(240,244,255,0.3)] hover:bg-white/5"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="text-[#080D1A] font-bold rounded-lg px-5 py-2 text-xs shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                style={{ background: "linear-gradient(135deg, #F59E0B, #B45309)" }}
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
 
        {/* Ícone Hamburguer — só mobile */}
        <button
          className="md:hidden text-[#8B9DC3] hover:text-white transition-all"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>
 
      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden border-t border-[#1E3056]/30 bg-[#080D1A]/95 px-6 py-4 flex flex-col gap-4">
 
          {/* Links de navegação */}
          <Link to="/" onClick={() => setMenuAberto(false)} className={`${isActive("/")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Home</Link>
          <Link to="/sobre" onClick={() => setMenuAberto(false)} className={`${isActive("/sobre")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Sobre</Link>
          <Link to="/projeto" onClick={() => setMenuAberto(false)} className={`${isActive("/projeto")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>O Projeto</Link>
 
          {usuario.token !== "" && (
            <>
              <Link to="/categorias" onClick={() => setMenuAberto(false)} className={`${isActive("/categorias")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Categorias</Link>
              <Link to="/exercicios" onClick={() => setMenuAberto(false)} className={`${isActive("/exercicios")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all`}>Exercícios</Link>
            </>
          )}
 
          {/* Divisor + botões de auth */}
          <div className="border-t border-[#1E3056]/30 pt-4 flex flex-col gap-3">
            {usuario.token !== "" ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setMenuAberto(false)}
                  className="text-[#8B9DC3] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all"
                >
                  Perfil
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-[#F0F4FF] cursor-pointer text-xs font-bold border border-[#1E3056] px-5 py-2 rounded-lg transition-all duration-300 hover:border-[#F0F4FF] hover:bg-white/5"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuAberto(false)}
                  className="text-[#F0F4FF] text-xs font-bold border border-[#1E3056] px-5 py-2 rounded-lg text-center transition-all duration-300 hover:border-[#F0F4FF] hover:bg-white/5"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={() => setMenuAberto(false)}
                  className="text-[#080D1A] font-bold rounded-lg px-5 py-2 text-xs text-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #B45309)" }}
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}