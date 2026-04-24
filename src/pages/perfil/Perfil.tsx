import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { buscarUsuario } from '../../services/UsuarioService'
import type { Usuario } from '../../models/Usuario'
import { ToastAlerta } from '../../util/ToastAlerta'
import Loading from '../../components/loading/Loading'

export default function Perfil() {
  const { usuario, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isFetching, setIsFetching] = useState(true)

  const [usuarioCompleto, setUsuarioCompleto] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
    peso: 0,
    altura: 0,
    imc: 0
  })

  useEffect(() => {
    if (usuario.token === '') {
      navigate('/login')
    } else {
      buscarDadosPerfil()
    }
  }, [usuario.token])

  async function buscarDadosPerfil() {
    setIsFetching(true)
    try {
      await buscarUsuario(`/usuarios/${usuario.id}`, setUsuarioCompleto, {
        headers: { Authorization: usuario.token }
      })
    } catch (error: any) {
      ToastAlerta('Erro ao carregar os dados do perfil.', 'erro')
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout()
      }
    } finally {
      setIsFetching(false)
    }
  }

  function sair() {
    handleLogout()
    navigate('/login')
  }

  function formatarData(dataIso: string | undefined) {
    if (!dataIso) return '--/--/----'
    const data = new Date(dataIso)
    data.setMinutes(data.getMinutes() + data.getTimezoneOffset())
    return data.toLocaleDateString('pt-BR')
  }

  function getImcInfo(imc: number) {
    if (!imc || imc <= 0) return { texto: 'Não calculado', cor: 'text-[#8B9DC3]', bg: 'bg-[#111E38]', border: 'border-[#1E3056]' }
    if (imc < 18.5) return { texto: 'Abaixo do peso', cor: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10', border: 'border-[#38BDF8]/30' }
    if (imc >= 18.5 && imc <= 24.9) return { texto: 'Peso normal', cor: 'text-[#4ADE80]', bg: 'bg-[#4ADE80]/10', border: 'border-[#4ADE80]/30' }
    if (imc >= 25 && imc <= 29.9) return { texto: 'Sobrepeso', cor: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/30' }
    if (imc >= 30 && imc <= 34.9) return { texto: 'Obesidade Grau I', cor: 'text-[#FB923C]', bg: 'bg-[#FB923C]/10', border: 'border-[#FB923C]/30' }
    return { texto: 'Obesidade Grau II ou +', cor: 'text-[#F87171]', bg: 'bg-[#F87171]/10', border: 'border-[#F87171]/30' }
  }

  const imcNumerico = usuarioCompleto.imc ? Number(usuarioCompleto.imc) : 0
  const imcInfo = getImcInfo(imcNumerico)

  if (usuario.token === '') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#040e27]">
        <p className="text-[#8B9DC3]">Você não está autenticado. Redirecionando...</p>
      </div>
    )
  }

  if (isFetching) return <Loading />
  return (
    <div className="min-h-screen py-16 px-6"
      style={{ backgroundColor: "#040e27" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header do perfil */}
        <div className="bg-[#1f1f64]/30 border border-[#1f1f64] backdrop-blur-md rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-8 mb-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-[#F59E0B]/40 overflow-hidden shrink-0 flex items-center justify-center bg-[#111E38]">
              {usuarioCompleto.foto || usuario.foto ? (
                <img src={usuarioCompleto.foto || usuario.foto} alt="Foto de perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#F0F4FF] uppercase tracking-widest mb-1">
                {usuarioCompleto.nome || usuario.nome}
              </h1>
              <p className="text-[#8B9DC3] text-sm">{usuarioCompleto.usuario || usuario.usuario}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center sm:justify-end">
            <button
              onClick={() => navigate('/perfil/editar')}
              className="bg-[#111E38] border border-[#1E3056] text-[#F0F4FF] px-6 py-2 rounded-xl hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors"
            >
              Editar Perfil
            </button>
            <button
              onClick={sair}
              className="bg-transparent border border-[#F87171]/30 text-[#F87171] px-6 py-2 rounded-xl hover:bg-[#F87171]/10 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Cards de dados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Dados Pessoais */}
          <div className="bg-[#1f1f64]/30 border border-[#1f1f64] backdrop-blur-md rounded-2xl p-5 sm:p-8">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#F0F4FF]">
              Dados Pessoais
            </h2>
            <div className="flex flex-col">
              <div className="py-3.5 border-b border-[#1f1f64] flex justify-between items-center gap-4">
                <span className="text-[#8B9DC3] text-sm shrink-0">Nome</span>
                <span className="text-[#F0F4FF] font-medium text-right">{usuarioCompleto.nome || '--'}</span>
              </div>
              <div className="py-3.5 border-b border-[#1f1f64] flex justify-between items-center gap-4">
                <span className="text-[#8B9DC3] text-sm shrink-0">E-mail</span>
                <span className="text-[#F0F4FF] font-medium text-right break-all">{usuarioCompleto.usuario || '--'}</span>
              </div>
              <div className="py-3.5 flex justify-between items-center gap-4">
                <span className="text-[#8B9DC3] text-sm shrink-0">Nascimento</span>
                <span className="text-[#F0F4FF] font-medium text-right">{formatarData(usuarioCompleto.dataNascimento)}</span>
              </div>
            </div>
          </div>

          {/* Métricas Corporais */}
          <div className="bg-[#1f1f64]/30 border border-[#1f1f64] backdrop-blur-md rounded-2xl p-5 sm:p-8">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#F0F4FF]">
              Métricas Corporais
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#1f1f64]/40 border border-[#1f1f64] rounded-xl p-4 text-center">
                <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-1">Peso</p>
                <p className="text-[#F0F4FF] font-bold">{usuarioCompleto.peso ? `${usuarioCompleto.peso} kg` : '--'}</p>
              </div>
              <div className="bg-[#1f1f64]/40 border border-[#1f1f64] rounded-xl p-4 text-center">
                <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-1">Altura</p>
                <p className="text-[#F0F4FF] font-bold">{usuarioCompleto.altura ? `${usuarioCompleto.altura} m` : '--'}</p>
              </div>
            </div>

            <div className={`${imcInfo.bg} border ${imcInfo.border} rounded-2xl p-6 text-center transition-colors`}>
              <p className={`${imcInfo.cor} text-xs uppercase tracking-widest mb-2 font-semibold`}>Seu IMC</p>
              <p className={`text-4xl font-extrabold ${imcInfo.cor} mb-2`}>
                {imcNumerico > 0 ? imcNumerico.toFixed(1) : '--'}
              </p>
              <span className={`inline-block rounded-full px-3.5 py-1 text-sm font-semibold ${imcInfo.bg} border ${imcInfo.border} ${imcInfo.cor}`}>
                {imcInfo.texto}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}