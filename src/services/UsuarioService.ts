import { api } from './Service'
import type { Usuario } from '../models/Usuario'
import type { UsuarioLogin } from '../models/UsuarioLogin'

export const cadastrarUsuario = async (url: string, dados: Usuario, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const logarUsuario = async (url: string, dados: UsuarioLogin, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const buscarUsuario = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}

export const atualizarUsuario = async (url: string, dados: Usuario, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}