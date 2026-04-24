import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { deleteCategoria } from "../../../services/CategoriaService"
import { AuthContext } from "../../../context/AuthContext"
import { ToastAlerta } from "../../../util/ToastAlerta"

export default function DeletarCategoria({
    id,
    nome,
    onClose,
    onSuccess
}: {
    id: number
    nome: string
    onClose: () => void
    onSuccess: () => void
}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function handleDelete() {
        setLoading(true)
        setErro(null)

        try {
            await deleteCategoria(id, token)
            ToastAlerta('Categoria deletada com sucesso!', 'sucesso')
            onSuccess()
            onClose()
        } catch (error: any) {
            if (error.response?.status === 401 || error.toString().includes('401')) {
                ToastAlerta('Sessão expirada. Faça login novamente.', 'info')
                handleLogout()
                onClose()
                navigate('/')
            } else {
                setErro("Erro ao deletar categoria.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-[#040e27]/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <div className="relative bg-[#0D1528] border border-[#1E3056] rounded-2xl p-8 w-full max-w-sm z-10">

                <div className="text-3xl text-center mb-4">⚠️</div>

                <h2 className="text-[#F0F4FF] font-bold text-center mb-2">
                    Deletar categoria?
                </h2>

                <p className="text-[#8B9DC3] text-sm text-center mb-6">
                    Você está prestes a deletar{" "}
                    <span className="text-[#F0F4FF] font-semibold">{nome}</span>.
                </p>

                {erro && (
                    <p className="text-[#F87171] text-sm text-center mb-4">
                        {erro}
                    </p>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 border border-[#1E3056] text-[#8B9DC3] py-3 rounded-xl hover:border-[#8B9DC3] hover:text-white transition disabled:opacity-50 cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] py-3 rounded-xl hover:bg-[#F87171]/20 transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Deletando..." : "Deletar"}
                    </button>
                </div>
            </div>
        </div>
    )
}