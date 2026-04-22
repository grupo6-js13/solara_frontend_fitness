import { useState } from "react"
import { deleteExercicio } from "../../services/ExercicioService"

export default function ModalConfirmDeleteExercicio({
    id,
    nome,
    onClose,
    onSuccess
}: any) {

    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    async function handleDelete() {
        setLoading(true)
        setErro(null)

        try {
            await deleteExercicio(id)
            onSuccess()
            onClose()
        } catch (error: any) {
            if (error.response?.status === 401) {
                setErro("Sessão expirada.")
            } else {
                setErro("Erro ao deletar.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">

            <div onClick={onClose} className="absolute inset-0 bg-black/70" />

            <div className="relative bg-[#0D1528] p-8 rounded-2xl border border-[#1E3056]">

                <h2 className="text-white mb-4">Deletar exercício?</h2>

                <p className="text-[#8B9DC3] mb-6">
                    {nome}
                </p>

                {erro && <p className="text-red-400">{erro}</p>}

                <div className="flex gap-3">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleDelete}>
                        {loading ? "..." : "Deletar"}
                    </button>
                </div>
            </div>
        </div>
    )
}