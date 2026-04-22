import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Exercicio } from "../../models/Exercicios"
import {
    findAllExercicios,
    findExerciciosByNome,
} from "../../services/ExercicioService"
import ModalConfirmDeleteExercicio from "./ModalConfirmDeleteExercicio"
import ExercicioCard from "./ExercicioCard"

// ─── Página ───────────────────────────────────

export default function ListarExercicios() {
    const navigate = useNavigate()

    const [exercicios, setExercicios] = useState<Exercicio[]>([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    const [busca, setBusca] = useState("")
    const [buscando, setBuscando] = useState(false)

    const [deleteTarget, setDeleteTarget] = useState<any>(null)

    async function carregar() {
        setErro(null)
        setLoading(true)
        try {
            setExercicios(await findAllExercicios())
        } catch (error: any) {
            if (error.response?.status === 401) {
                setErro("Sessão expirada.")
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
            setExercicios(await findExerciciosByNome(busca))
        } catch {
            setErro("Erro na busca.")
        } finally {
            setBuscando(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#080D1A] py-16 px-6">
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between mb-10">
                    <h1 className="text-white text-3xl font-bold">Exercícios</h1>
                    <button onClick={() => navigate("/exercicios/novo")}>+ Novo</button>
                </div>

                <div className="flex gap-3 mb-6">
                    <input
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="flex-1"
                    />
                    <button onClick={handleBusca}>
                        {buscando ? "..." : "Buscar"}
                    </button>
                </div>

                {erro && (
                    <div className="mb-6 text-[#F87171]">
                        {erro}
                    </div>
                )}

                {loading ? (
                    <p>Carregando...</p>
                ) : !erro && exercicios.length === 0 ? (
                    <p>Nenhum exercício encontrado</p>
                ) : (
                    <div className="grid grid-cols-3 gap-5">
                        {exercicios.map((ex) => (
                            <ExercicioCard
                                key={ex.id}
                                exercicio={ex}
                                onEdit={(id: number) => navigate(`/exercicios/editar/${id}`)}
                                onDelete={(id: number, nome: string) =>
                                    setDeleteTarget({ id, nome })
                                }
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