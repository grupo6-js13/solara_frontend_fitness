import type Categoria from "./Categoria"

export default interface Exercicio {
    id: number
    nome: string
    imagem: string
    serie: number
    repeticao: number
    tempoEstimado: number
    categoria: Categoria | null
}