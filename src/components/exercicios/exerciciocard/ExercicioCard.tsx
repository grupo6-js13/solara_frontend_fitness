import { useState } from "react"
import type Exercicio from "../../../models/Exercicio"
import { badgeCatClasses, ImagemFallback } from "../../../util/Helpers"

function Stat({ label, value }: { label: string; value: number | string }) {
    return (
        <div className="bg-[#0D1528] border border-[#1E3056] rounded-lg p-2 text-center">
            <p className="text-[#38BDF8] font-bold">{value}</p>
            <p className="text-[#4A5A7A] text-[10px] uppercase tracking-wide">{label}</p>
        </div>
    )
}

export default function ExercicioCard({
    exercicio,
    onEdit,
    onDelete,
}: {
    exercicio: Exercicio
    onEdit: (id: number) => void
    onDelete: (id: number, nome: string) => void
}) {
    const [imgError, setImgError] = useState(false)

    const showFallback = !exercicio.imagem || imgError

    return (
        <article className="bg-[#111E38] border border-[#1E3056] rounded-2xl overflow-hidden hover:border-[#38BDF8] hover:-translate-y-1 transition-all duration-300 flex flex-col">

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

                <h3 className="text-[#F0F4FF] font-bold mb-4 leading-snug">
                    {exercicio.nome}
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-5">
                    <Stat label="Séries" value={exercicio.serie} />
                    <Stat label="Reps" value={exercicio.repeticao} />
                    <Stat label="Tempo (MIN)" value={exercicio.tempoEstimado} />
                </div>

                <div className="flex-1" />

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(exercicio.id)}
                        className="flex-1 bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] rounded-lg py-2 text-sm font-semibold hover:bg-[#38BDF8]/20 transition"
                    >
                        Editar
                    </button>

                    <button
                        onClick={() => onDelete(exercicio.id, exercicio.nome)}
                        className="flex-1 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] rounded-lg py-2 text-sm font-semibold hover:bg-[#F87171]/20 transition"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </article>
    )
}