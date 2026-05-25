import { useContext, useState } from "react"
import type Exercicio from "../../../models/Exercicio"
import { badgeCatClasses, ImagemFallback } from "../../../util/Helpers"
import { TreinoContext } from "../../../context/TreinoContext";

function Stat({ label, value }: { label: string; value: number | string }) {
    return (
        <div className="bg-[#1f1f64]/40 border border-[#1f1f64] rounded-lg p-2 text-center">
            <p className="text-[#4db3f6] font-bold">{value}</p>
            <p className="text-[#e1effc]/50 text-[10px] uppercase tracking-wide">{label}</p>
        </div>
    )
}

export default function ExercicioCard({
    exercicio,
    modoMontagem,
    onEdit,
    onDelete,
}: {
    exercicio: Exercicio
    modoMontagem: boolean
    onEdit: (id: number) => void
    onDelete: (id: number, nome: string) => void
}) {
    const [imgError, setImgError] = useState(false)
    const showFallback = !exercicio.imagem || imgError
    const { treinos, adicionarExercicio, removerExercicio } = useContext(TreinoContext)

    const jaAdicionado = treinos.some((item) => item.id === exercicio.id)

    return (
        <article className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl overflow-hidden hover:border-[#4db3f6] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(77,179,246,0.1)] transition-all duration-300 flex flex-col backdrop-blur-md">

            {/* Imagem */}
            <div className="overflow-hidden">
                {showFallback ? (
                    <ImagemFallback nome={exercicio.nome} />
                ) : (
                    <img
                        src={exercicio.imagem}
                        alt={exercicio.nome}
                        onError={() => setImgError(true)}
                        className="h-36 w-full object-cover"
                    />
                )}
            </div>

            {/* Conteúdo */}
            <div className="p-5 flex flex-col flex-1">

                {exercicio.categoria && (
                    <span className={`${badgeCatClasses()} mb-2 self-start`}>
                        {exercicio.categoria.nome}
                    </span>
                )}

                <h3 className="text-[#e1effc] font-bold mb-4 leading-snug">
                    {exercicio.nome}
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-5">
                    <Stat label="Séries" value={exercicio.serie} />
                    <Stat label="Reps" value={exercicio.repeticao} />
                    <Stat label="Tempo (MIN)" value={exercicio.tempoEstimado} />
                </div>

                <div className="flex-1" />

                <div className="flex gap-2">
                    {modoMontagem ? (
                        <button
                            onClick={() => jaAdicionado ? removerExercicio(exercicio.id) : adicionarExercicio(exercicio)}
                            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition group ${jaAdicionado
                                ? "bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] hover:bg-[#F87171]/10 hover:border-[#F87171]/30 hover:text-[#F87171]"
                                : "bg-[#4db3f6]/10 border border-[#4db3f6]/20 text-[#4db3f6] hover:bg-[#4db3f6]/20"
                                }`}
                        >
                            <span className="group-hover:hidden">
                                {jaAdicionado ? "✓ Adicionado ao treino" : "+ Adicionar ao treino"}
                            </span>
                            <span className="hidden group-hover:block">
                                {jaAdicionado ? "✕ Remover do treino" : "+ Adicionar ao treino"}
                            </span>
                        </button>

                    ) : (
                        <>
                            <button
                                onClick={() => onEdit(exercicio.id)}
                                className="flex-1 bg-[#4db3f6]/10 border border-[#4db3f6]/20 text-[#4db3f6] rounded-lg py-2 text-sm font-semibold hover:bg-[#4db3f6]/20 transition"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => onDelete(exercicio.id, exercicio.nome)}
                                className="flex-1 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] rounded-lg py-2 text-sm font-semibold hover:bg-[#F87171]/20 transition"
                            >
                                Deletar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </article >
    )
}