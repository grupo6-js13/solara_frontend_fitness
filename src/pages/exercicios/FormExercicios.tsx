import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    createExercicio,
    updateExercicio,
    findExercicioById
} from "../../services/ExercicioService"
import { findAllCategorias } from "../../services/CategoriaService"

export default function FormExercicio() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [exercicio, setExercicio] = useState<any>({
        nome: "",
        imagem: "",
        serie: 0,
        repeticao: 0,
        tempoEstimado: 0,
        categoria: null,
    })

    const [categorias, setCategorias] = useState<any[]>([])
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        findAllCategorias().then(setCategorias)

        if (id) {
            findExercicioById(Number(id)).then(setExercicio)
        }
    }, [id])

    async function handleSubmit(e: any) {
        e.preventDefault()

        try {
            if (id) await updateExercicio(exercicio)
            else await createExercicio(exercicio)

            navigate("/exercicios")
        } catch {
            setErro("Erro ao salvar.")
        }
    }

    return (
        <main className="min-h-screen bg-[#080D1A] p-10">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">

                <h1 className="text-white text-2xl mb-6">
                    {id ? "Editar" : "Novo"}
                </h1>

                {erro && <p className="text-red-400">{erro}</p>}

                <input
                    placeholder="Nome"
                    value={exercicio.nome}
                    onChange={(e) => setExercicio({ ...exercicio, nome: e.target.value })}
                />

                <input
                    placeholder="Imagem"
                    value={exercicio.imagem}
                    onChange={(e) => setExercicio({ ...exercicio, imagem: e.target.value })}
                />

                <select
                    onChange={(e) =>
                        setExercicio({
                            ...exercicio,
                            categoria: { id: Number(e.target.value) }
                        })
                    }
                >
                    <option>Categoria</option>
                    {categorias.map(c => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                </select>

                <button type="submit">Salvar</button>
            </form>
        </main>
    )
}