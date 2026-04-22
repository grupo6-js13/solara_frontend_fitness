import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListarCategorias from './components/categoria/listarcategorias/ListarCategorias'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080D1A]">
        <Routes>
          <Route path="/" element={<h1 className="p-4 text-2xl font-bold">Solara App </h1>} />
          <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/cadastrarcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />                
        </Routes>
      </div>
    </BrowserRouter>
  )
}