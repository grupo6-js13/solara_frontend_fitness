import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { buscarUsuario } from '../../services/UsuarioService'
import type { Usuario } from '../../models/Usuario'
import { ToastAlerta } from '../../util/ToastAlerta'

export default function Perfil() {
  const { usuario, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

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
    try {
      await buscarUsuario(`/usuarios/${usuario.id}`, setUsuarioCompleto, {
        headers: {
          Authorization: usuario.token
        }
      })
    } catch (error: any) {
      ToastAlerta('Erro ao carregar os dados do perfil.', 'erro')
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout()
      }
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

  // Convertemos para número aqui para garantir que a lógica de cores e o toFixed funcionem
  const imcNumerico = usuarioCompleto.imc ? Number(usuarioCompleto.imc) : 0
  const imcInfo = getImcInfo(imcNumerico)

  if (usuario.token === '') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080D1A]">
        <p className="text-[#8B9DC3]">Você não está autenticado. Redirecionando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080D1A] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-[#0D1528] border border-[#1E3056] rounded-3xl p-10 flex items-center justify-between gap-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-[#F59E0B]/40 overflow-hidden shrink-0 flex items-center justify-center bg-[#111E38]">
              {usuarioCompleto.foto || usuario.foto ? (
                <img src={usuarioCompleto.foto || usuario.foto} alt="Foto de perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div>
              <h1 className="font-['Orbitron'] text-2xl font-bold text-[#F0F4FF] uppercase tracking-widest mb-1">
                {usuarioCompleto.nome || usuario.nome}
              </h1>
              <p className="text-[#8B9DC3] text-sm">{usuarioCompleto.usuario || usuario.usuario}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-8">
            <h2 className="font-['Orbitron'] text-sm font-bold tracking-widest uppercase mb-6 text-[#F0F4FF]">
              Dados Pessoais
            </h2>
            <div className="flex flex-col">
              <div className="py-3.5 border-b border-[#1E3056] flex justify-between items-center">
                <span className="text-[#8B9DC3] text-sm">Nome</span>
                <span className="text-[#F0F4FF] font-medium">{usuarioCompleto.nome || '--'}</span>
              </div>
              <div className="py-3.5 border-b border-[#1E3056] flex justify-between items-center">
                <span className="text-[#8B9DC3] text-sm">E-mail</span>
                <span className="text-[#F0F4FF] font-medium">{usuarioCompleto.usuario || '--'}</span>
              </div>
              <div className="py-3.5 flex justify-between items-center">
                <span className="text-[#8B9DC3] text-sm">Nascimento</span>
                <span className="text-[#F0F4FF] font-medium">{formatarData(usuarioCompleto.dataNascimento)}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-8">
            <h2 className="font-['Orbitron'] text-sm font-bold tracking-widest uppercase mb-6 text-[#F0F4FF]">
              Métricas Corporais
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#111E38] border border-[#1E3056] rounded-xl p-4 text-center">
                <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-1">Peso</p>
                <p className="text-[#F0F4FF] font-bold">{usuarioCompleto.peso ? `${usuarioCompleto.peso} kg` : '--'}</p>
              </div>
              <div className="bg-[#111E38] border border-[#1E3056] rounded-xl p-4 text-center">
                <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-1">Altura</p>
                <p className="text-[#F0F4FF] font-bold">{usuarioCompleto.altura ? `${usuarioCompleto.altura} m` : '--'}</p>
              </div>
            </div>

            <div className={`${imcInfo.bg} border ${imcInfo.border} rounded-2xl p-6 text-center transition-colors`}>
              <p className={`${imcInfo.cor} text-xs uppercase tracking-widest mb-2 font-semibold`}>Seu IMC</p>
              <p className={`font-['Orbitron'] text-4xl font-extrabold ${imcInfo.cor} mb-2`}>
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