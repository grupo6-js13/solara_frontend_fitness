import { useState, useEffect } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../../services/UsuarioService'
import type { Usuario } from '../../models/Usuario'
import { ToastAlerta } from '../../util/ToastAlerta'

export default function Cadastro() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [confirmarSenha, setConfirmarSenha] = useState('')

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
    peso: 0,
    altura: 0
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      navigate('/login')
    }
  }, [usuario, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    } as any)
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrar(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha !== usuario.senha) {
      ToastAlerta('As senhas não coincidem!', 'erro')
      return
    }

    // pegamos o que o usuário digitou e garantimos que é um número (trocando vírgula por ponto)
    let pesoFormatado = parseFloat(String(usuario.peso).replace(',', '.'))
    let alturaFormatada = parseFloat(String(usuario.altura).replace(',', '.'))

    // conversão inteligente da altura 
    if (alturaFormatada > 3) {
      alturaFormatada = alturaFormatada / 100
    }

    if (isNaN(pesoFormatado) || pesoFormatado <= 0 || isNaN(alturaFormatada) || alturaFormatada <= 0) {
      ToastAlerta('Por favor, informe um peso e uma altura válidos!', 'erro')
      return
    }

    const usuarioEnvio = {
      ...usuario,
      peso: pesoFormatado,
      altura: alturaFormatada
    }

    setIsLoading(true)
    try {
      await cadastrarUsuario('/usuarios/cadastrar', usuarioEnvio, setUsuario)
      ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
    } catch (error) {
      ToastAlerta('Erro ao cadastrar. Verifique os dados.', 'erro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 relative bg-[#040e27]">
      <div className="bg-[#0D1528] border border-[#1E3056] rounded-3xl p-12 w-full max-w-lg z-10">
        
        <div className="flex flex-col items-center mb-9">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black mb-4"
               style={{ 
                 background: "linear-gradient(135deg, #F59E0B, #B45309)", 
                 boxShadow: "0 0 20px rgba(245,158,11,0.5)" 
               }}>
            ✦
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-center mb-2"
              style={{
                background: "linear-gradient(90deg, #F59E0B 0%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
            SOLARA
          </h1>
          <p className="text-[#8B9DC3] text-sm text-center">
            Crie sua conta e comece sua jornada.
          </p>
        </div>

        <form onSubmit={cadastrar} className="flex flex-col gap-4">
          <div>
            <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
              className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">E-mail</label>
            <input
              type="email"
              name="usuario"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
              className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Senha</label>
              <input
                type="password"
                name="senha"
                value={usuario.senha}
                onChange={atualizarEstado}
                required
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Confirmar Senha</label>
              <input
                type="password"
                name="confirmarSenha"
                value={confirmarSenha}
                onChange={handleConfirmarSenha}
                required
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">URL da Foto (Opcional)</label>
            <input
              type="text"
              name="foto"
              value={usuario.foto}
              onChange={atualizarEstado}
              className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={usuario.dataNascimento}
              onChange={atualizarEstado}
              required
              className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Peso (kg)</label>
              <input
                type="number"
                name="peso"
                step="0.1"
                min="0.1"
                value={usuario.peso === 0 ? '' : usuario.peso}
                onChange={atualizarEstado}
                required
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                placeholder="Ex: 75.5"
              />
            </div>
            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Altura (m)</label>
              <input
                type="number"
                name="altura"
                step="0.01"
                min="0.1"
                value={usuario.altura === 0 ? '' : usuario.altura}
                onChange={atualizarEstado}
                required
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                placeholder="Ex: 1.75"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] font-bold py-3.5 rounded-xl mt-4 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#8B9DC3] text-sm">
            Já tem conta?{' '}
            <Link to="/login" className="text-[#F59E0B] font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}