import { useState } from "react"
import { badgeCatClasses, ImagemFallback } from "../../util/Helpers"

function Stat({ label, value }: any) {
    return (
        <div className="bg-[#0D1528] border border-[#1E3056] rounded-lg p-2 text-center">
            <p className="text-[#38BDF8] font-bold">{value}</p>
            <p className="text-[#4A5A7A] text-[10px] uppercase">{label}</p>
        </div>
    )
}

export default function ExercicioCard({
    exercicio,
    onEdit,
    onDelete,
}: any) {
    const [imgError, setImgError] = useState(false)

    const showFallback = !exercicio.imagem || imgError

    return (
        <article className="bg-[#111E38] border border-[#1E3056] rounded-2xl overflow-hidden hover:border-[#38BDF8] transition">

            {showFallback ? (
                <ImagemFallback nome={exercicio.nome} />
            ) : (
                <img
                    src={exercicio.imagem}
                    onError={() => setImgError(true)}
                    className="h-36 w-full object-cover"
                />
            )}

            <div className="p-5 flex flex-col flex-1">

                {exercicio.categoria && (
                    <span className={`${badgeCatClasses()} mb-2`}>
                        {exercicio.categoria.nome}
                    </span>
                )}

                <h3 className="text-[#F0F4FF] font-bold mb-4">
                    {exercicio.nome}
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-5">
                    <Stat label="Séries" value={exercicio.serie} />
                    <Stat label="Reps" value={exercicio.repeticao} />
                    <Stat label="Tempo" value={exercicio.tempoEstimado} />
                </div>

                <div className="flex gap-2">
                    <button onClick={() => onEdit(exercicio.id)} className="flex-1 text-[#38BDF8] border border-[#38BDF8]/20 rounded-lg py-2">
                        Editar
                    </button>
                    <button onClick={() => onDelete(exercicio.id, exercicio.nome)} className="flex-1 text-[#F87171] border border-[#F87171]/30 rounded-lg py-2">
                        Deletar
                    </button>
                </div>
            </div>
        </article>
    )
}