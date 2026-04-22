import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <BrowserRouter>
      {/* Container Principal com fundo escuro profundo */}
      <div className="min-h-screen bg-[#080D1A] flex flex-col font-sans relative overflow-hidden">
        
        {/* Camada 1: O Grid de Pontos (Background dinâmico) */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: `radial-gradient(#8B9DC3 1px, transparent 1px)`, backgroundSize: '24px 24px' }}>
        </div>

        {/* Camada 2: Pontos de Luz (Glows conforme a referência) */}
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#F59E0B]/10 blur-[120px] z-0"></div>
        <div className="absolute bottom-[10%] right-[0%] w-[300px] h-[300px] rounded-full bg-[#38BDF8]/5 blur-[100px] z-0"></div>

        <Navbar />
        
        <main className="flex-1 flex flex-col z-10 relative">
          <Routes>
            <Route path="/" element={<div className="flex-1" />} />
            <Route path="/sobre" element={<div className="flex-1" />} />
            <Route path="/projeto" element={<div className="flex-1" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}