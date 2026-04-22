export interface UsuarioLogin {
  id: number
  nome: string
  usuario: string
  senha?: string
  foto: string
  token: string
  dataNascimento?: string
  peso?: number
  altura?: number
  imc?: number
}