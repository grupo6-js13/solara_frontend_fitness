import { createContext, useState, type ReactNode } from "react";
import type Exercicio from "../models/Exercicio";
import { ToastAlerta } from "../util/ToastAlerta";

// Cria o tipo Treino, como uma herança do tipo Exercicio
export interface ItemTreino extends Exercicio {
    serieLocal: number
    repeticaoLocal: number
    tempoLocal: number
}

// Define os Atributos, Estados e Funções que serão compartilhados pelo Contexto
interface TreinoContextProps {
    adicionarExercicio: (exercicio: Exercicio) => void
    removerExercicio: (id: number) => void
    atualizarExercicio: (id: number, campos: Partial<ItemTreino>) => void
    limparTreino: () => void
    finalizarTreino: () => void
    treinos: ItemTreino[]
    quantidadeExercicios: number
    tempoTotal: number
    seriesTotal: number
    repeticoesTotal: number
}

interface TreinoProviderProps {
    children: ReactNode
}

export const TreinoContext = createContext({} as TreinoContextProps)

export function TreinoProvider({ children }: TreinoProviderProps) {

    // Inicializa o Estado treino, que armazenará os exercícios adicionados ao treino
    const [treinos, setTreinos] = useState<ItemTreino[]>([])

    // Calcula a quantidade de exercícios adicionados ao treino
    const quantidadeExercicios = treinos.length

    // Calcula tempo, series e repeticoes totais  dos exercícios adicionados ao treino
    const tempoTotal = treinos.reduce((acc, item) => acc + item.tempoLocal, 0)
    const seriesTotal = treinos.reduce((acc, item) => acc + item.serieLocal, 0)
    const repeticoesTotal = treinos.reduce((acc, item) => acc + item.repeticaoLocal, 0)

    // Função para adicionar exercícios ao treino
    function adicionarExercicio(exercicio: Exercicio) {

        // Verifica se o exercício já foi adicionado ao array de treinos
        const exercicioAdicionado = treinos.some((item) => item.id === exercicio.id)

        if (exercicioAdicionado) {
            ToastAlerta('Exercício já adicionado ao treino. Experimente atualizar o número de séries, repetições ou tempo para personalizar o seu treino!', 'erro')
        } else {
            setTreinos((treinosAtuais) => [...treinosAtuais, { ...exercicio, serieLocal: exercicio.serie, repeticaoLocal: exercicio.repeticao, tempoLocal: exercicio.tempoEstimado }])
            ToastAlerta('Exercício adicionado ao treino!', 'sucesso')
        }
    }

    // Função para remover exercícios do treino
    function removerExercicio(id: number) {

        const existe = treinos.some((item) => item.id === id)

        if (!existe) {
            ToastAlerta('Exercício não localizado no treino!', 'erro')
            return
        }

        // Se o exercício existe, remove do treino
        const novoTreino = treinos.filter((item) => item.id !== id)
        setTreinos(novoTreino)
        ToastAlerta('Exercício removido do treino!', 'sucesso')

    }

    // Função para localizar um exercício no treino e atualizar seus campos locais de acordo com a preferência do usuário
    function atualizarExercicio(id: number, campos: Partial<ItemTreino>) {

        const existe = treinos.some((item) => item.id === id)

        if (!existe) {
            ToastAlerta('Exercício não localizado no treino!', 'erro')
            return
        }

        // Se o exercício existe, atualiza
        const treinoAtualizado = treinos.map((item) => item.id === id ?
            { ...item, ...campos }
            : item
        )

        setTreinos(treinoAtualizado)
    }

    // Limpa treinos após desistência do usuário
    function limparTreino() {
        setTreinos([])
        ToastAlerta('Sua jornada continua! Volte quando estiver pronto para iluminar seus hábitos.', 'info')
    }

    function finalizarTreino() {
        setTreinos([])
        ToastAlerta('Treino concluído! Você iluminou mais um dia da sua jornada!', 'treino')
    }

    return (
        <TreinoContext.Provider
            value={{
                adicionarExercicio,
                removerExercicio,
                atualizarExercicio,
                limparTreino,
                finalizarTreino,
                treinos,
                quantidadeExercicios,
                tempoTotal,
                seriesTotal,
                repeticoesTotal
            }}
        >
            {children}
        </TreinoContext.Provider >
    )
}