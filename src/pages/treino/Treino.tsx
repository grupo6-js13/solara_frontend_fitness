import { useContext, useState, useEffect } from "react"
import { TreinoContext } from "../../context/TreinoContext"
import { useNavigate } from "react-router-dom"
import { BarbellIcon, CheckIcon, ClockIcon, LightningIcon, MinusIcon, PencilSimpleIcon, PlusIcon, RepeatIcon, SunDimIcon, TrashIcon, TrendUpIcon } from "@phosphor-icons/react"
import { ToastAlerta } from "../../util/ToastAlerta"
import { AuthContext } from "../../context/AuthContext"

export default function Treino() {

    const [treinoIniciado, setTreinoIniciado] = useState(false)
    const [nomeTreino, setNomeTreino] = useState("Meu Treino")
    const [editandoNomeTreino, setEditandoNomeTreino] = useState(false)

    const { removerExercicio, atualizarExercicio, finalizarTreino, limparTreino,
        treinos, quantidadeExercicios, tempoTotal, seriesTotal, repeticoesTotal }
        = useContext(TreinoContext)

    const [exerciciosConcluidos, setExerciciosConcluidos] = useState<number[]>([])

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    const todosConcluidos = treinos.length > 0 && treinos.every(item => exerciciosConcluidos.includes(item.id))

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    function handleLimparTreino() {
        limparTreino()
        navigate('/exercicios')
    }

    function handleIniciarTreino() {
        setTreinoIniciado(true)
        ToastAlerta('Treino iniciado! Vamos iluminar a sua jornada!', 'treino')
    }

    function handleExercicioConcluido(id: number) {
        setExerciciosConcluidos((prev) =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    function formatarTempo(minutos: number): string {
        if (minutos < 60) return `${minutos} min`
        const horas = Math.floor(minutos / 60)
        const resto = minutos % 60
        return resto > 0 ? `${horas}h ${resto}min` : `${horas}h`
    }

    return (
        <main className="min-h-screen bg-[#040e27] py-10 px-4 md:py-16 md:px-6">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-start md:mb-10">
                    <div>
                        <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-1">
                            Meu Treino
                        </p>

                        {/* Nome do treino editável */}
                        {editandoNomeTreino ? (
                            <div className="flex items-center gap-2">
                                <input
                                    value={nomeTreino}
                                    onChange={(e) => setNomeTreino(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && setEditandoNomeTreino(false)}
                                    className="bg-transparent border-b border-[#4db3f6] text-[#F0F4FF] text-2xl md:text-3xl font-bold outline-none w-full"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setEditandoNomeTreino(false)}
                                    className="text-[#4ADE80] hover:opacity-80 transition shrink-0"
                                >
                                    <CheckIcon size={24} weight="bold" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <h1 className="text-[#F0F4FF] text-2xl md:text-3xl font-bold">
                                    {nomeTreino || "Meu Treino"}
                                </h1>
                                <button
                                    onClick={() => setEditandoNomeTreino(true)}
                                    className="text-[#8B9DC3] hover:text-[#4db3f6] transition shrink-0"
                                >
                                    <PencilSimpleIcon size={20} />
                                </button>
                            </div>
                        )}

                        <p className="text-[#8B9DC3] text-sm mt-1">
                            Organize seus exercícios e ilumine sua rotina.
                        </p>
                    </div>

                    {/* Botões de ação */}
                    {!treinoIniciado && (
                        <div className="flex gap-3 flex-wrap">
                            {quantidadeExercicios > 0 && (
                                <button
                                    onClick={handleLimparTreino}
                                    className="flex items-center gap-2 border border-[#F87171]/30 text-[#F87171] font-semibold rounded-xl px-4 py-2 text-sm hover:bg-[#F87171]/10 transition cursor-pointer"
                                >
                                    <TrashIcon size={16} />
                                    Limpar Treino
                                </button>
                            )}
                            <button
                                onClick={handleIniciarTreino}
                                disabled={quantidadeExercicios === 0}
                                className={`flex items-center gap-2 font-bold rounded-xl px-4 py-2 text-sm transition bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] ${quantidadeExercicios === 0
                                    ? 'opacity-40 cursor-not-allowed'
                                    : 'hover:opacity-90 cursor-pointer'
                                    }`}
                            >
                                <LightningIcon size={16} weight="fill" />
                                Iniciar Treino
                            </button>
                        </div>
                    )}

                    {treinoIniciado && (
                        <button
                            onClick={() => { finalizarTreino(); navigate('/exercicios') }}
                            disabled={!todosConcluidos}
                            className={`flex items-center gap-2 bg-linear-to-br from-[#4ADE80] to-[#16a34a] text-[#080D1A] font-bold rounded-xl px-4 py-2 text-sm transition cursor-pointer self-start ${!todosConcluidos ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'
                                }`}
                        >
                            <CheckIcon size={16} weight="bold" />
                            Finalizar Treino
                        </button>
                    )}
                </div>
                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 md:mb-10">
                    <div className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-4 md:p-5">
                        <div className="flex items-center gap-2 text-[#8B9DC3] text-[10px] uppercase tracking-widest mb-2">
                            <BarbellIcon size={16} className="text-[#4db3f6] shrink-0 md:hidden" />
                            <BarbellIcon size={30} className="text-[#4db3f6] shrink-0 hidden md:block" />
                            Exercícios
                        </div>
                        <p className="text-[#4db3f6] text-2xl md:text-3xl font-bold">{quantidadeExercicios}</p>
                    </div>

                    <div className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-4 md:p-5">
                        <div className="flex items-center gap-2 text-[#8B9DC3] text-[10px] uppercase tracking-widest mb-2">
                            <ClockIcon size={16} className="text-[#F59E0B] shrink-0 md:hidden" />
                            <ClockIcon size={30} className="text-[#F59E0B] shrink-0 hidden md:block" />
                            Tempo Total
                        </div>
                        <p className="text-[#F59E0B] text-2xl md:text-3xl font-bold">{formatarTempo(tempoTotal)}</p>
                    </div>

                    <div className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-4 md:p-5">
                        <div className="flex items-center gap-2 text-[#8B9DC3] text-[10px] uppercase tracking-widest mb-2">
                            <TrendUpIcon size={16} className="text-[#4db3f6] shrink-0 md:hidden" />
                            <TrendUpIcon size={30} className="text-[#4db3f6] shrink-0 hidden md:block" />
                            Séries Totais
                        </div>
                        <p className="text-[#4db3f6] text-2xl md:text-3xl font-bold">{seriesTotal}</p>
                    </div>

                    <div className="bg-[#1f1f64]/30 border border-[#1f1f64] rounded-2xl p-4 md:p-5">
                        <div className="flex items-center gap-2 text-[#8B9DC3] text-[10px] uppercase tracking-widest mb-2">
                            <RepeatIcon size={16} className="text-[#4db3f6] shrink-0 md:hidden" />
                            <RepeatIcon size={30} className="text-[#4db3f6] shrink-0 hidden md:block" />
                            <span className="md:hidden">Reps Totais</span>
                            <span className="hidden md:inline">Repetições Totais</span>
                        </div>
                        <p className="text-[#4db3f6] text-2xl md:text-3xl font-bold">{repeticoesTotal}</p>
                    </div>
                </div>

                {/* LISTA DE EXERCÍCIOS */}
                <div className="bg-[#1f1f64]/20 border border-[#1f1f64] rounded-2xl overflow-hidden">

                    {/* Cabeçalho da lista */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 md:p-6 border-b border-[#1f1f64]">
                        <div>
                            <h2 className="text-[#F0F4FF] font-bold text-lg flex items-center gap-2">
                                <span className="w-1 h-5 bg-[#F59E0B] rounded-full inline-block shrink-0" />
                                Lista de Exercícios
                            </h2>
                            <p className="text-[#8B9DC3] text-sm mt-1">
                                Ajuste séries, repetições e tempo de cada exercício.
                            </p>
                        </div>
                        {!treinoIniciado && (
                            <button
                                onClick={() => navigate('/exercicios?montagem=true')}
                                className="flex items-center gap-2 border border-[#F59E0B]/30 text-[#F59E0B] font-semibold rounded-xl px-4 py-2 text-sm hover:bg-[#F59E0B]/10 transition cursor-pointer self-start sm:self-auto shrink-0"
                            >
                                <PlusIcon size={16} weight="bold" />
                                Adicionar Exercício
                            </button>
                        )}
                    </div>

                    {/* Conteúdo */}
                    {treinos.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center gap-4">
                            <SunDimIcon
                                size={80}
                                weight="thin"
                                className="text-[#F59E0B]/50"
                                style={{ filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.2))' }}
                            />
                            <p className="text-[#F0F4FF] font-bold">Sua jornada ainda não começou</p>
                            <p className="text-[#8B9DC3] text-sm">Adicione exercícios e dê início à sua jornada</p>
                        </div>
                    ) : (
                        <>
                            {/* Header da tabela — só desktop */}
                            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 text-[#8B9DC3] text-xs uppercase tracking-widest border-b border-[#1f1f64]">
                                <span>Exercício</span>
                                <span className="text-center">Séries</span>
                                <span className="text-center">Repetições</span>
                                <span className="text-center">Tempo (min)</span>
                                <span className="text-center">Ações</span>
                            </div>

                            {treinos.map((item) => (
                                <div key={item.id} className={`border-b border-[#1f1f64]/50 last:border-0 transition-all duration-300 ${exerciciosConcluidos.includes(item.id) ? 'opacity-40' : ''
                                    }`}>

                                    {/* DESKTOP — linha da tabela */}
                                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center">

                                        {/* Exercício */}
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.imagem}
                                                alt={item.nome}
                                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                                            />
                                            <div>
                                                {item.categoria && (
                                                    <span className="text-[#F59E0B] text-xs font-semibold bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-2 py-0.5 mb-1 inline-block">
                                                        {item.categoria.nome}
                                                    </span>
                                                )}
                                                <p className="text-[#F0F4FF] font-semibold text-sm">{item.nome}</p>
                                            </div>
                                        </div>

                                        {/* Séries */}
                                        <div className="flex items-center justify-center gap-2">
                                            {!treinoIniciado && (
                                                <button onClick={() => atualizarExercicio(item.id, { serieLocal: Math.max(1, item.serieLocal - 1) })} className="w-7 h-7 rounded-lg bg-[#1f1f64]/60 border border-[#1f1f64] text-[#4db3f6] flex items-center justify-center hover:bg-[#1f1f64] transition">
                                                    <MinusIcon size={12} weight="bold" />
                                                </button>
                                            )}
                                            <span className="text-[#4db3f6] font-bold w-6 text-center">{item.serieLocal}</span>
                                            {!treinoIniciado && (
                                                <button onClick={() => atualizarExercicio(item.id, { serieLocal: item.serieLocal + 1 })} className="w-7 h-7 rounded-lg bg-[#1f1f64]/60 border border-[#1f1f64] text-[#4db3f6] flex items-center justify-center hover:bg-[#1f1f64] transition">
                                                    <PlusIcon size={12} weight="bold" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Repetições */}
                                        <div className="flex items-center justify-center gap-2">
                                            {!treinoIniciado && (
                                                <button onClick={() => atualizarExercicio(item.id, { repeticaoLocal: Math.max(1, item.repeticaoLocal - 1) })} className="w-7 h-7 rounded-lg bg-[#1f1f64]/60 border border-[#1f1f64] text-[#4db3f6] flex items-center justify-center hover:bg-[#1f1f64] transition">
                                                    <MinusIcon size={12} weight="bold" />
                                                </button>
                                            )}
                                            <span className="text-[#4db3f6] font-bold w-6 text-center">{item.repeticaoLocal}</span>
                                            {!treinoIniciado && (
                                                <button onClick={() => atualizarExercicio(item.id, { repeticaoLocal: item.repeticaoLocal + 1 })} className="w-7 h-7 rounded-lg bg-[#1f1f64]/60 border border-[#1f1f64] text-[#4db3f6] flex items-center justify-center hover:bg-[#1f1f64] transition">
                                                    <PlusIcon size={12} weight="bold" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Tempo */}
                                        <div className="flex items-center justify-center gap-2">
                                            {!treinoIniciado && (
                                                <button onClick={() => atualizarExercicio(item.id, { tempoLocal: Math.max(1, item.tempoLocal - 1) })} className="w-7 h-7 rounded-lg bg-[#1f1f64]/60 border border-[#1f1f64] text-[#4db3f6] flex items-center justify-center hover:bg-[#1f1f64] transition">
                                                    <MinusIcon size={12} weight="bold" />
                                                </button>
                                            )}
                                            <span className="text-[#4db3f6] font-bold w-6 text-center">{item.tempoLocal}</span>
                                            {!treinoIniciado && (
                                                <button onClick={() => atualizarExercicio(item.id, { tempoLocal: item.tempoLocal + 1 })} className="w-7 h-7 rounded-lg bg-[#1f1f64]/60 border border-[#1f1f64] text-[#4db3f6] flex items-center justify-center hover:bg-[#1f1f64] transition">
                                                    <PlusIcon size={12} weight="bold" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Ações */}
                                        <div className="flex justify-center">
                                            {treinoIniciado ? (
                                                <button onClick={() => handleExercicioConcluido(item.id)} className="w-8 h-8 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] flex items-center justify-center hover:bg-[#4ADE80]/20 transition" title="Marcar como concluído">
                                                    <CheckIcon size={16} weight="bold" />
                                                </button>
                                            ) : (
                                                <button onClick={() => removerExercicio(item.id)} className="w-8 h-8 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] flex items-center justify-center hover:bg-[#F87171]/20 transition" title="Remover exercício">
                                                    <TrashIcon size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* MOBILE — card vertical */}
                                    <div className="md:hidden p-4 flex flex-col gap-4">

                                        {/* Info do exercício */}
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.imagem}
                                                alt={item.nome}
                                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                {item.categoria && (
                                                    <span className="text-[#F59E0B] text-xs font-semibold bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-2 py-0.5 mb-1 inline-block">
                                                        {item.categoria.nome}
                                                    </span>
                                                )}
                                                <p className="text-[#F0F4FF] font-semibold text-sm truncate">{item.nome}</p>
                                            </div>
                                            {/* Ação mobile */}
                                            {treinoIniciado ? (
                                                <button onClick={() => handleExercicioConcluido(item.id)} className="w-9 h-9 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] flex items-center justify-center shrink-0">
                                                    <CheckIcon size={18} weight="bold" />
                                                </button>
                                            ) : (
                                                <button onClick={() => removerExercicio(item.id)} className="w-9 h-9 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] flex items-center justify-center shrink-0">
                                                    <TrashIcon size={18} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Controles mobile */}
                                        <div className="grid grid-cols-3 gap-3">

                                            {/* Séries */}
                                            <div className="bg-[#1f1f64]/40 border border-[#1f1f64] rounded-xl p-3 flex flex-col items-center gap-2">
                                                <p className="text-[#8B9DC3] text-[10px] uppercase tracking-wide">Séries</p>
                                                <div className="flex items-center gap-2">
                                                    {!treinoIniciado && (
                                                        <button onClick={() => atualizarExercicio(item.id, { serieLocal: Math.max(1, item.serieLocal - 1) })} className="w-6 h-6 rounded bg-[#1f1f64] text-[#4db3f6] flex items-center justify-center">
                                                            <MinusIcon size={10} weight="bold" />
                                                        </button>
                                                    )}
                                                    <span className="text-[#4db3f6] font-bold text-lg">{item.serieLocal}</span>
                                                    {!treinoIniciado && (
                                                        <button onClick={() => atualizarExercicio(item.id, { serieLocal: item.serieLocal + 1 })} className="w-6 h-6 rounded bg-[#1f1f64] text-[#4db3f6] flex items-center justify-center">
                                                            <PlusIcon size={10} weight="bold" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Repetições */}
                                            <div className="bg-[#1f1f64]/40 border border-[#1f1f64] rounded-xl p-3 flex flex-col items-center gap-2">
                                                <p className="text-[#8B9DC3] text-[10px] uppercase tracking-wide">Reps</p>
                                                <div className="flex items-center gap-2">
                                                    {!treinoIniciado && (
                                                        <button onClick={() => atualizarExercicio(item.id, { repeticaoLocal: Math.max(1, item.repeticaoLocal - 1) })} className="w-6 h-6 rounded bg-[#1f1f64] text-[#4db3f6] flex items-center justify-center">
                                                            <MinusIcon size={10} weight="bold" />
                                                        </button>
                                                    )}
                                                    <span className="text-[#4db3f6] font-bold text-lg">{item.repeticaoLocal}</span>
                                                    {!treinoIniciado && (
                                                        <button onClick={() => atualizarExercicio(item.id, { repeticaoLocal: item.repeticaoLocal + 1 })} className="w-6 h-6 rounded bg-[#1f1f64] text-[#4db3f6] flex items-center justify-center">
                                                            <PlusIcon size={10} weight="bold" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tempo */}
                                            <div className="bg-[#1f1f64]/40 border border-[#1f1f64] rounded-xl p-3 flex flex-col items-center gap-2">
                                                <p className="text-[#8B9DC3] text-[10px] uppercase tracking-wide">Tempo</p>
                                                <div className="flex items-center gap-2">
                                                    {!treinoIniciado && (
                                                        <button onClick={() => atualizarExercicio(item.id, { tempoLocal: Math.max(1, item.tempoLocal - 1) })} className="w-6 h-6 rounded bg-[#1f1f64] text-[#4db3f6] flex items-center justify-center">
                                                            <MinusIcon size={10} weight="bold" />
                                                        </button>
                                                    )}
                                                    <span className="text-[#4db3f6] font-bold text-lg">{item.tempoLocal}</span>
                                                    {!treinoIniciado && (
                                                        <button onClick={() => atualizarExercicio(item.id, { tempoLocal: item.tempoLocal + 1 })} className="w-6 h-6 rounded bg-[#1f1f64] text-[#4db3f6] flex items-center justify-center">
                                                            <PlusIcon size={10} weight="bold" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}