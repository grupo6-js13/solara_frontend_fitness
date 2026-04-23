import { useState, useContext, useEffect } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import type { UsuarioLogin } from '../../models/UsuarioLogin'

export default function Login() {
  const navigate = useNavigate()
  const { usuario, handleLogin, isLoading } = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: ''
  })

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/perfil')
    }
  }, [usuario.token, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  async function logar(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    await handleLogin(usuarioLogin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 relative bg-[#080D1A]">
      <div className="bg-[#0D1528] border border-[#1E3056] rounded-3xl p-12 w-full max-w-md z-10">
        
        <div className="flex flex-col items-center mb-9">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black mb-4"
               style={{ 
                 background: "linear-gradient(135deg, #F59E0B, #B45309)", 
                 boxShadow: "0 0 20px rgba(245,158,11,0.5)" 
               }}>
            ✦
          </div>
          <h1 className="font-['Orbitron'] text-2xl font-bold tracking-widest text-center mb-2"
              style={{
                background: "linear-gradient(90deg, #F59E0B 0%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
            SOLARA
          </h1>
          <p className="text-[#8B9DC3] text-sm text-center">
            Sua jornada começa aqui. Entre para continuar.
          </p>
        </div>

        <form onSubmit={logar} className="flex flex-col gap-5">
          <div>
            <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="usuario"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
              required
              className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              required
              className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] font-bold py-3.5 rounded-xl mt-4 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#8B9DC3] text-sm">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="text-[#F59E0B] font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}