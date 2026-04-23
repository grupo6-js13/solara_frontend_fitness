import { useState, useEffect, useContext } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { atualizarUsuario, buscarUsuario } from '../../services/UsuarioService'
import type { Usuario } from '../../models/Usuario'
import { ToastAlerta } from '../../util/ToastAlerta'

export default function EditarPerfil() {
  const navigate = useNavigate()
  const { usuario, handleLogout } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [isFetching, setIsFetching] = useState(true) // começa true porque já busca na montagem

  const [usuarioEditar, setUsuarioEditar] = useState<Usuario>({
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
    if (usuario.token === '') {
      navigate('/login')
    } else {
      buscarDadosAtuais()
    }
  }, [usuario.token])

  async function buscarDadosAtuais() {
    setIsFetching(true)
    try {
      let userTemp: any = {}
      await buscarUsuario(`/usuarios/${usuario.id}`, (dados: Usuario) => { userTemp = dados }, {
        headers: { Authorization: usuario.token }
      })
      setUsuarioEditar({
        ...userTemp,
        senha: ''
      })
    } catch (error: any) {
      ToastAlerta('Erro ao carregar dados.', 'erro')
      if (error.response?.status === 401) handleLogout()
    } finally {
      setIsFetching(false)
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioEditar({
      ...usuarioEditar,
      [e.target.name]: e.target.value
    } as any)
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function atualizar(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha !== usuarioEditar.senha) {
      ToastAlerta('As senhas não coincidem!', 'erro')
      return
    }

    let pesoFormatado = parseFloat(String(usuarioEditar.peso).replace(',', '.'))
    let alturaFormatada = parseFloat(String(usuarioEditar.altura).replace(',', '.'))

    if (alturaFormatada > 3) {
      alturaFormatada = alturaFormatada / 100
    }

    if (isNaN(pesoFormatado) || pesoFormatado <= 0 || isNaN(alturaFormatada) || alturaFormatada <= 0) {
      ToastAlerta('Por favor, informe um peso e uma altura válidos!', 'erro')
      return
    }

    const usuarioEnvio = {
      ...usuarioEditar,
      peso: pesoFormatado,
      altura: alturaFormatada
    }

    setIsLoading(true)
    try {
      await atualizarUsuario('/usuarios/atualizar', usuarioEnvio, setUsuarioEditar, {
        headers: { Authorization: usuario.token }
      })
      ToastAlerta('Perfil atualizado com sucesso!', 'sucesso')
      navigate('/perfil') // Volta para o perfil para ver o IMC recalculado
    } catch (error) {
      ToastAlerta('Erro ao atualizar o perfil.', 'erro')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#080D1A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#1E3056] border-t-[#F59E0B] rounded-full animate-spin" />
          <p className="text-[#8B9DC3] text-sm">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080D1A] py-16 px-6">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate('/perfil')}
          className="text-[#8B9DC3] text-sm mb-4 hover:text-white transition-colors bg-transparent border-none p-0"
        >
          ← Voltar para o Perfil
        </button>

        <h1 className="font-['Orbitron'] text-2xl font-bold text-[#F0F4FF] mb-10">
          Editar Perfil
        </h1>

        <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-6 sm:p-10">
          <form onSubmit={atualizar} className="flex flex-col gap-5">

            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={usuarioEditar.nome}
                onChange={atualizarEstado}
                required
                className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">E-mail</label>
              <input
                type="email"
                name="usuario"
                value={usuarioEditar.usuario}
                onChange={atualizarEstado}
                required
                className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Sua Senha (Obrigatório)</label>
                <input
                  type="password"
                  name="senha"
                  value={usuarioEditar.senha}
                  onChange={atualizarEstado}
                  required
                  placeholder="Confirme para salvar"
                  className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
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
                  placeholder="Repita a senha"
                  className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">URL da Foto</label>
              <input
                type="text"
                name="foto"
                value={usuarioEditar.foto}
                onChange={atualizarEstado}
                className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={usuarioEditar.dataNascimento ? String(usuarioEditar.dataNascimento).split('T')[0] : ''}
                onChange={atualizarEstado}
                required
                className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Peso (kg)</label>
                <input
                  type="number"
                  name="peso"
                  step="0.1"
                  min="0.1"
                  value={usuarioEditar.peso === 0 ? '' : usuarioEditar.peso}
                  onChange={atualizarEstado}
                  required
                  className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase mb-2">Altura (m)</label>
                <input
                  type="number"
                  name="altura"
                  step="0.01"
                  min="0.1"
                  value={usuarioEditar.altura === 0 ? '' : usuarioEditar.altura}
                  onChange={atualizarEstado}
                  required
                  className="w-full bg-[#080D1A] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => navigate('/perfil')}
                className="flex-1 bg-transparent border border-[#1E3056] text-[#8B9DC3] py-3.5 rounded-xl hover:border-[#8B9DC3] hover:text-white transition-all font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-2 bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}