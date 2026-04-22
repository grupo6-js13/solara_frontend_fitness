export interface Usuario {
  id: number
  nome: string
  usuario: string // e-mail 
  senha?: string  // opcional pois nem sempre o backend devolve a senha
  foto: string
  dataNascimento: string // vem como string do backend
  peso: number
  altura: number
  imc?: number // calculado pelo backend
}