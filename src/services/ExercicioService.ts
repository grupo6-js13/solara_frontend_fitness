import { api , BASE_URL } from "./api"
import type { Exercicio } from "../models/Exercicios"


// ─────────────────────────────────────────────
// GET
// ─────────────────────────────────────────────

/**
 * GET /exercicios
 * Retorna todos os exercícios, com a categoria relacionada.
 * Ordenado por nome ASC (feito no backend).
 */
export async function findAllExercicios(): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(`${BASE_URL}/exercicios`)
    return response.data
}

/**
 * GET /exercicios/:id
 * Retorna um exercício pelo ID, com a categoria relacionada.
 * Lança 404 se não encontrado (tratado pelo backend).
 */
export async function findExercicioById(id: number): Promise<Exercicio> {
    const response = await api.get<Exercicio>(`${BASE_URL}/exercicios/${id}`)
    return response.data
}

/**
 * GET /exercicios/nome/:nome
 * Busca exercícios cujo nome contenha a string informada (ILike no backend).
 */
export async function findExerciciosByNome(nome: string): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(
        `${BASE_URL}/exercicios/nome/${encodeURIComponent(nome)}`
    )
    return response.data
}

/**
 * GET /exercicios/repeticao/min/:repeticao
 * Retorna exercícios com repeticao >= valor informado.
 * Ordenado por repeticao ASC (feito no backend).
 */
export async function findExerciciosByRepeticaoMin(repeticao: number): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(
        `${BASE_URL}/exercicios/repeticao/min/${repeticao}`
    )
    return response.data
}

/**
 * GET /exercicios/repeticao/max/:repeticao
 * Retorna exercícios com repeticao <= valor informado.
 * Ordenado por repeticao DESC (feito no backend).
 */
export async function findExerciciosByRepeticaoMax(repeticao: number): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(
        `${BASE_URL}/exercicios/repeticao/max/${repeticao}`
    )
    return response.data
}

// ─────────────────────────────────────────────
// POST
// ─────────────────────────────────────────────

/**
 * POST /exercicios
 * Cria um novo exercício.
 *
 * ATENÇÃO: o backend exige que categoria.id seja enviado no body.
 * O objeto deve ter a forma:
 * {
 *   nome, imagem, serie, repeticao, tempoEstimado,
 *   categoria: { id: number }
 * }
 *
 * O backend também valida:
 * - categoria.id é obrigatório
 * - nome duplicado retorna 400
 */
export async function createExercicio(exercicio: Omit<Exercicio, "id">): Promise<Exercicio> {
    const response = await api.post<Exercicio>(`${BASE_URL}/exercicios`, exercicio)
    return response.data
}

// ─────────────────────────────────────────────
// PUT
// ─────────────────────────────────────────────

/**
 * PUT /exercicios
 * Atualiza um exercício existente.
 *
 * ATENÇÃO: o backend exige que o id do exercício esteja no body (não na URL).
 * O backend valida:
 * - id inválido retorna 400
 * - exercício não encontrado retorna 404
 * - categoria.id obrigatório
 */
export async function updateExercicio(exercicio: Exercicio): Promise<Exercicio> {
    const response = await api.put<Exercicio>(`${BASE_URL}/exercicios`, exercicio)
    return response.data
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────

/**
 * DELETE /exercicios/:id
 * Deleta um exercício pelo ID.
 * Retorna 404 se não encontrado.
 */
export async function deleteExercicio(id: number): Promise<void> {
    await api.delete(`${BASE_URL}/exercicios/${id}`)
}