import { api, BASE_URL } from "../services/api"
import type Categoria from "../models/Categoria"

export async function findAllCategorias(token: string): Promise<Categoria[]> {
    const response = await api.get<Categoria[]>(`${BASE_URL}/categorias`, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function findCategoriaById(id: number, token: string): Promise<Categoria> {
    const response = await api.get<Categoria>(`${BASE_URL}/categorias/${id}`, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function findCategoriasByNome(nome: string, token: string): Promise<Categoria[]> {
    const response = await api.get<Categoria[]>(
        `${BASE_URL}/categorias/nome/${encodeURIComponent(nome)}`, {
        headers: { Authorization: token }
    }
    )
    return response.data
}

export const createCategoria = async (categoria: Categoria, header: any) => {
    const resposta = await api.post('/categorias/cadastrar', categoria, header)
    return resposta.data
}


export async function updateCategoria(categoria: Categoria, token: string): Promise<Categoria> {
    const response = await api.put<Categoria>(`${BASE_URL}/categorias/atualizar`, categoria, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function deleteCategoria(id: number, token: string): Promise<void> {
    await api.delete(`${BASE_URL}/categorias/${id}`, {
        headers: { Authorization: token }
    })
}