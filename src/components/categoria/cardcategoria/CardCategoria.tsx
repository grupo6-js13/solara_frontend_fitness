import { Link } from "react-router-dom"
import type Categoria from "../../../models/Categoria"

interface CardCategoriaProps {
    categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
    return (
        <div
            className="flex flex-col rounded-2xl overflow-hidden justify-between transition-all duration-300"
            style={{
                backgroundColor: "#111E38",
                border: "1px solid #1E3056"
            }}
            onMouseEnter={e => {
                e.currentTarget.style.border = "1px solid #F59E0B"
                e.currentTarget.style.transform = "translateY(-4px)"
            }}
            onMouseLeave={e => {
                e.currentTarget.style.border = "1px solid #1E3056"
                e.currentTarget.style.transform = "translateY(0)"
            }}
        >
            {/* Topo: ícone + nome */}
            <div
                className="flex items-center gap-3 py-4 px-5"
                style={{ borderBottom: "1px solid #1E3056" }}
            >
                <span className="text-2xl">{categoria.icone}</span>
                <h3 className="text-sm font-semibold text-[#F0F4FF] line-clamp-2">
                    {categoria.nome}
                </h3>
            </div>

            {/* Corpo: descrição + badge */}
            <div className="flex flex-col gap-4 p-5 flex-1">
                <p className="text-xs leading-relaxed" style={{ color: "#8B9DC3" }}>
                    {categoria.descricao || "Sem descrição."}
                </p>

                <span
                    className="self-start text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                        color: "#38BDF8",
                        backgroundColor: "rgba(56,189,248,0.1)",
                        border: "1px solid rgba(56,189,248,0.2)"
                    }}
                >
                    {categoria.exercicios?.length ?? 0} exercício(s)
                </span>
            </div>

            {/* Ações */}
            <div
                className="flex"
                style={{ borderTop: "1px solid #1E3056" }}
            >
                <Link
                    to={`/editarcategoria/${categoria.id}`}
                    className="w-full flex items-center justify-center py-2.5 text-xs font-medium transition-all duration-200"
                    style={{ color: "#38BDF8", backgroundColor: "rgba(56,189,248,0.05)" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(56,189,248,0.15)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(56,189,248,0.05)")}
                >
                    Editar
                </Link>
                <Link
                    to={`/deletarcategoria/${categoria.id}`}
                    className="w-full flex items-center justify-center py-2.5 text-xs font-medium transition-all duration-200"
                    style={{
                        color: "#F87171",
                        backgroundColor: "rgba(248,113,113,0.05)",
                        borderLeft: "1px solid #1E3056"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.15)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.05)")}
                >
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardCategoria