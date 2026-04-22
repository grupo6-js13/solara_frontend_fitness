import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { UsuarioLogin } from '../models/UsuarioLogin'
import { logarUsuario } from '../services/UsuarioService'
import { toast } from 'react-toastify'

interface AuthContextProps {
  usuario: UsuarioLogin
  handleLogin: (usuario: UsuarioLogin) => Promise<void>
  handleLogout: () => void
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
    dataNascimento: '',
    peso: 0,
    altura: 0,
    imc: 0
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true)
    try {
      await logarUsuario('/usuarios/logar', userLogin, setUsuario)
      toast.success('Login efetuado com sucesso!')
    } catch (error) {
      toast.error('Dados do usuário inconsistentes.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
      token: ''
    })
    toast.info('Usuário deslogado!')
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}