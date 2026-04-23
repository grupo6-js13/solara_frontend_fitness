import { useEffect, useState, useContext } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import type Exercicio from "../../../models/Exercicio"
import { findAllExercicios, findExerciciosByNome } from "../../../services/ExercicioService"
import ModalConfirmDeleteExercicio from "../deletarexercicio/DeletarExercicio"
import ExercicioCard from "../../../components/exercicios/exerciciocard/ExercicioCard"

// LÓGICA INJETADA: Importando a Segurança
import { AuthContext } from "../../../context/AuthContext"

export default function ListarExercicios() {
    const navigate = useNavigate()

    const [exercicios, setExercicios] = useState<Exercicio[]>([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    const [busca, setBusca] = useState("")
    const [buscando, setBuscando] = useState(false)

    const [deleteTarget, setDeleteTarget] = useState<{ id: number; nome: string } | null>(null)

    // Para busca de exercícios
    const [searchParams] = useSearchParams()
    const categoriaId = searchParams.get('categoria')

    // LÓGICA INJETADA: Consumindo o Contexto de Autenticação
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // LÓGICA INJETADA: Proteção de Rota (Expulsa se não estiver logado)
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    async function carregar() {
        setErro(null)
        setLoading(true)
        try {
            // Agora ele passa o 'token' dinâmico do usuário, não o falso
            const dados = await findAllExercicios(token)
            setExercicios(dados)
        } catch (error: any) {
            if (error.response?.status === 401) {
                setErro("Sessão expirada.")
                // LÓGICA INJETADA: Segurança adicional se o token vencer
                alert('Sessão expirada. Faça login novamente.')
                handleLogout()
                navigate('/')
            } else {
                setErro("Erro ao carregar exercícios.")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    async function handleBusca() {
        if (!busca.trim()) return carregar()

        setErro(null)
        setBuscando(true)

        try {
            // Agora ele passa o 'token' dinâmico do usuário, não o falso
            const dados = await findExerciciosByNome(busca, token)
            setExercicios(dados)
        } catch {
            setErro("Erro na busca.")
        } finally {
            setBuscando(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#080D1A] py-16 px-6">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-1">
                            Gerenciamento
                        </p>
                        <h1 className="text-[#F0F4FF] text-3xl font-bold">
                            Exercícios
                        </h1>
                    </div>

                    <button
                        onClick={() => navigate("/exercicios/cadastrar")}
                        className="bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] font-bold rounded-xl px-6 py-3 text-sm hover:opacity-90 transition cursor-pointer"
                    >
                        + Novo exercício
                    </button>
                </div>

                {/* BUSCA */}
                <div className="flex gap-3 mb-10">
                    <input
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleBusca()}
                        placeholder="Buscar exercícios..."
                        className="flex-1 bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] placeholder:text-[#4A5A7A]"
                    />

                    <button
                        onClick={handleBusca}
                        className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#F59E0B]/20 transition"
                    >
                        {buscando ? "Buscando..." : "Buscar"}
                    </button>
                </div>

                {/* ERRO */}
                {erro && (
                    <div className="mb-6 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] px-4 py-3 rounded-xl text-sm">
                        {erro}
                    </div>
                )}

                {/* LOADING */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-[#111E38] border border-[#1E3056] rounded-2xl h-60 animate-pulse" />
                        ))}
                    </div>
                ) : !erro && exercicios.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-[#F0F4FF] font-bold mb-2">
                            Nenhum exercício encontrado
                        </p>
                        <p className="text-[#8B9DC3] text-sm">
                            Tente buscar outro nome ou crie um novo exercício.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {exercicios.
                        filter(ex => categoriaId ? ex.categoria?.id === Number(categoriaId) : true)
                            .map((ex) => (
                                <ExercicioCard
                                    key={ex.id}
                                    exercicio={ex}
                                    onEdit={(id: number) => navigate(`/exercicios/editar/${id}`)}
                                    onDelete={(id: number, nome: string) => setDeleteTarget({ id, nome })}
                                />
                            ))}
                    </div>
                )}
            </div>

            {deleteTarget && (
                <ModalConfirmDeleteExercicio
                    {...deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onSuccess={() =>
                        setExercicios((prev) =>
                            prev.filter((e) => e.id !== deleteTarget.id)
                        )
                    }
                />
            )}
        </main>
    )
}