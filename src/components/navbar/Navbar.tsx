import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);

  // Adaptação de cores: text-[#e1effc] para ativo, opacidade menor para inativo
  const isActive = (path: string) =>
    location.pathname === path ? "text-[#ffd94d]" : "text-[#e1effc]/60";

  function logout() {
    handleLogout();
    navigate("/login");
    setMenuAberto(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1f1f64] backdrop-blur-xl bg-[#040e27]/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Solara */}
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#040e27] text-xs font-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,217,77,0.6)]"
            style={{
              background: "linear-gradient(135deg, #ffd94d, #ff9239)",
              boxShadow: "0 0 15px rgba(255,217,77,0.4)",
            }}
          >
            ✦
          </div>
          <span
            className="font-black tracking-widest text-lg uppercase transition-all duration-300 font-['MuseoModerno']"
            style={{
              background: "linear-gradient(to right, #e1effc, #ffd94d, #ff9239, #4db3f6, #e1effc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.8))",
            }}
          >
            SOLARA
          </span>
        </Link>

        {/* Links Centrais — só desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`${isActive("/")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Home</Link>
          <Link to="/sobre" className={`${isActive("/sobre")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Sobre</Link>
          <Link to="/projeto" className={`${isActive("/projeto")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>O Projeto</Link>

          {usuario.token !== "" && (
            <>
              <Link to="/categorias" className={`${isActive("/categorias")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Categorias</Link>
              <Link to="/exercicios" className={`${isActive("/exercicios")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Exercícios</Link>
            </>
          )}
        </div>

        {/* Botões da Direita — só desktop */}
        <div className="hidden md:flex items-center gap-3">
          {usuario.token !== "" ? (
            <>
              <Link
                to="/perfil"
                className="text-[#e1effc]/60 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all mr-4"
              >
                Perfil
              </Link>
              <button
                onClick={logout}
                className="text-[#e1effc] cursor-pointer text-xs font-bold border border-[#1f1f64] px-5 py-2 rounded-lg transition-all duration-300 hover:border-[#ffd94d] hover:text-[#ffd94d] hover:shadow-[0_0_15px_rgba(255,217,77,0.3)] hover:bg-[#ffd94d]/5"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#e1effc] text-xs font-bold border border-[#1f1f64] px-5 py-2 rounded-lg transition-all duration-300 hover:border-[#4db3f6] hover:text-[#4db3f6] hover:shadow-[0_0_15px_rgba(77,179,246,0.3)] hover:bg-[#4db3f6]/5"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="text-[#040e27] font-bold rounded-lg px-5 py-2 text-xs shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,217,77,0.5)]"
                style={{ background: "linear-gradient(135deg, #ffd94d, #ff9239)" }}
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>

        {/* Ícone Hamburguer — só mobile */}
        <button
          className="md:hidden text-[#e1effc]/80 hover:text-[#ffd94d] transition-all"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden border-t border-[#1f1f64] bg-[#040e27] px-6 py-4 flex flex-col gap-4">

          {/* Links de navegação */}
          <Link to="/" onClick={() => setMenuAberto(false)} className={`${isActive("/")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Home</Link>
          <Link to="/sobre" onClick={() => setMenuAberto(false)} className={`${isActive("/sobre")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Sobre</Link>
          <Link to="/projeto" onClick={() => setMenuAberto(false)} className={`${isActive("/projeto")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>O Projeto</Link>

          {usuario.token !== "" && (
            <>
              <Link to="/categorias" onClick={() => setMenuAberto(false)} className={`${isActive("/categorias")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Categorias</Link>
              <Link to="/exercicios" onClick={() => setMenuAberto(false)} className={`${isActive("/exercicios")} text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all`}>Exercícios</Link>
            </>
          )}

          {/* Divisor + botões de auth */}
          <div className="border-t border-[#1f1f64] pt-4 flex flex-col gap-3">
            {usuario.token !== "" ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setMenuAberto(false)}
                  className="text-[#e1effc]/60 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ffd94d] transition-all"
                >
                  Perfil
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-[#e1effc] cursor-pointer text-xs font-bold border border-[#1f1f64] px-5 py-2 rounded-lg transition-all duration-300 hover:border-[#ffd94d] hover:text-[#ffd94d] hover:bg-[#ffd94d]/5"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuAberto(false)}
                  className="text-[#e1effc] text-xs font-bold border border-[#1f1f64] px-5 py-2 rounded-lg text-center transition-all duration-300 hover:border-[#4db3f6] hover:text-[#4db3f6] hover:bg-[#4db3f6]/5"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={() => setMenuAberto(false)}
                  className="text-[#040e27] font-bold rounded-lg px-5 py-2 text-xs text-center shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,217,77,0.5)]"
                  style={{ background: "linear-gradient(135deg, #ffd94d, #ff9239)" }}
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