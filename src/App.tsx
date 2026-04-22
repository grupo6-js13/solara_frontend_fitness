import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <Routes>
          <Route path="/" element={<h1 className="p-4 text-2xl font-bold">Solara App </h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}