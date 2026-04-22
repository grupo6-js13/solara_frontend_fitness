import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Importações de Usuário e Segurança 
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Perfil from './pages/perfil/Perfil'
import EditarPerfil from './pages/perfil/EditarPerfil'

// Importações de CRUD 
import ListarCategorias from './components/categoria/listarcategorias/ListarCategorias'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
import ListarExercicios from './components/exercicios/listarexercicios/ListarExercicios'
import FormExercicio from './components/exercicios/formexercicios/FormExercicios'

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-screen bg-[#080D1A] text-[#F0F4FF]">
          <Routes>
            {/* Rotas de Autenticação */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/editar" element={<EditarPerfil />} />

            {/* Rotas de Categorias */}
            <Route path="/categorias" element={<ListarCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />

            {/* Rotas de Exercícios */}
            <Route path="/exercicios" element={<ListarExercicios />} />
            <Route path="/exercicios/cadastrar" element={<FormExercicio />} />
            <Route path="/exercicios/editar/:id" element={<FormExercicio />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}