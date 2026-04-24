import { Link } from "react-router-dom"
import type Categoria from "../../../models/Categoria"

interface CardCategoriaProps {
    categoria: Categoria
    onDelete: (id: number, nome: string) => void
}

function CardCategoria({ categoria, onDelete }: CardCategoriaProps) {
    return (
        <div className="flex flex-col rounded-2xl overflow-hidden justify-between transition-all duration-300 bg-[#1f1f64]/30 border border-[#1f1f64] backdrop-blur-md hover:-translate-y-1 hover:border-[#4db3f6] hover:shadow-[0_10px_30px_rgba(77,179,246,0.1)]">

            {/* Topo: ícone + nome */}
            <div className="flex items-center gap-3 py-4 px-5 border-b border-[#1f1f64]">
                <span className="text-2xl">
                    {categoria.icone && categoria.icone.startsWith('http')
                        ? <img src={categoria.icone} alt={categoria.nome} className="w-8 h-8 object-contain rounded" />
                        : categoria.icone && !categoria.icone.includes('.')
                            ? categoria.icone
                            : '🏷️'
                    }
                </span>
                <h3 className="text-sm font-semibold text-[#e1effc] line-clamp-2">
                    {categoria.nome}
                </h3>
            </div>

            {/* Corpo: descrição + badge */}
            <div className="flex flex-col gap-4 p-5 flex-1">
                <p className="text-xs leading-relaxed text-[#e1effc]/70">
                    {categoria.descricao || "Sem descrição."}
                </p>

                <Link
                    to={`/exercicios?categoria=${categoria.id}`}
                    className="self-start text-xs font-medium px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                    style={{
                        color: "#4db3f6",
                        backgroundColor: "rgba(77,179,246,0.1)",
                        border: "1px solid rgba(77,179,246,0.2)"
                    }}
                >
                    {categoria.exercicios?.length ?? 0} exercício(s)
                </Link>
            </div>

            {/* Ações */}
            <div className="flex border-t border-[#1f1f64]">
                <Link
                    to={`/editarcategoria/${categoria.id}`}
                    className="w-full flex items-center justify-center py-2.5 text-xs font-medium transition-all duration-200 text-[#4db3f6] hover:bg-[#4db3f6]/10"
                >
                    Editar
                </Link>
                <button
                    onClick={() => onDelete(categoria.id!, categoria.nome)}
                    className="w-full flex items-center justify-center py-2.5 text-xs font-medium transition-all duration-200 text-[#F87171] hover:bg-[#F87171]/10 border-l border-[#1f1f64] cursor-pointer"
                >
                    Deletar
                </button>
            </div>
        </div>
    )
}

export default CardCategoria