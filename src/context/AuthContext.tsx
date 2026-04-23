import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { UsuarioLogin } from '../models/UsuarioLogin'
import { logarUsuario } from '../services/UsuarioService'
import { ToastAlerta } from '../util/ToastAlerta'

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
      ToastAlerta('Login efetuado com sucesso!', 'sucesso')
    } catch (error) {
      ToastAlerta('Dados do usuário inconsistentes.', 'erro')
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
    ToastAlerta('Usuário deslogado!', 'info')
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}