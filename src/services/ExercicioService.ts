import { api, BASE_URL } from "./api"
import type Exercicio from "../models/Exercicio"

// GET
export async function findAllExercicios(token: string): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(`${BASE_URL}/exercicios`, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function findExercicioById(id: number, token: string): Promise<Exercicio> {
    const response = await api.get<Exercicio>(`${BASE_URL}/exercicios/${id}`, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function findExerciciosByNome(nome: string, token: string): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(
        `${BASE_URL}/exercicios/nome/${encodeURIComponent(nome)}`,
        { headers: { Authorization: token } }
    )
    return response.data
}

export async function findExerciciosByRepeticaoMin(
    repeticao: number,
    token: string
): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(
        `${BASE_URL}/exercicios/repeticoes/min/${repeticao}`,
        { headers: { Authorization: token } }
    )
    return response.data
}

export async function findExerciciosByRepeticaoMax(
    repeticao: number,
    token: string
): Promise<Exercicio[]> {
    const response = await api.get<Exercicio[]>(
        `${BASE_URL}/exercicios/repeticoes/max/${repeticao}`,
        { headers: { Authorization: token } }
    )
    return response.data
}


export async function createExercicio(
    exercicio: Omit<Exercicio, "id">,
    token: string
): Promise<Exercicio> {
    const response = await api.post<Exercicio>(
        `${BASE_URL}/exercicios/cadastrar`,
        exercicio,
        { headers: { Authorization: token } }
    )
    return response.data
}

export async function updateExercicio(
    exercicio: Exercicio,
    token: string
): Promise<Exercicio> {
    const response = await api.put<Exercicio>(
        `${BASE_URL}/exercicios/atualizar`,
        exercicio,
        { headers: { Authorization: token } }
    )
    return response.data
}

export async function deleteExercicio(
    id: number,
    token: string
): Promise<void> {
    await api.delete(`${BASE_URL}/exercicios/${id}`, {
        headers: { Authorization: token }
    })
}