import type { Categoria } from "./Categoria"

export interface Exercicio {
    id: number
    nome: string
    imagem: string
    serie: number
    repeticao: number
    tempoEstimado: number
    categoria: Categoria | null
}