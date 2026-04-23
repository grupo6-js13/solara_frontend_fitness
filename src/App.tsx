import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Importações de Interface 
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Importações das Páginas Estáticas 
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";

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
        <div className="min-h-screen bg-[#080D1A] text-[#F0F4FF] flex flex-col font-sans relative overflow-hidden">
          
          <div className="absolute inset-0 z-0 opacity-10" 
               style={{ backgroundImage: `radial-gradient(#8B9DC3 1px, transparent 1px)`, backgroundSize: '24px 24px' }}>
          </div>

          <div className="absolute top-[20%] left-[-5%] w-100 h-100 rounded-full bg-[#F59E0B]/10 blur-[120px] z-0"></div>
          <div className="absolute bottom-[10%] right-[0%] w-75 h-75 rounded-full bg-[#38BDF8]/5 blur-[100px] z-0"></div>

          <Navbar />
          
          <main className="flex-1 flex flex-col z-10 relative">
            <Routes>
              {/* Páginas Estáticas */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/projeto" element={<div className="flex-1" />} />

              {/* Rotas de Autenticação */}
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

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}