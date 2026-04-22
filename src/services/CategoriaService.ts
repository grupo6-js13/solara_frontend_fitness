import axios from "axios"
import type Categoria from "../models/Categoria"


const BASE_URL = import.meta.env.VITE_API_URL

export async function findAllCategorias(token: string): Promise<Categoria[]> {
    const response = await axios.get<Categoria[]>(`${BASE_URL}/categorias`, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function findCategoriaById(id: number, token: string): Promise<Categoria> {
    const response = await axios.get<Categoria>(`${BASE_URL}/categorias/${id}`, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function findCategoriasByNome(nome: string, token: string): Promise<Categoria[]> {
    const response = await axios.get<Categoria[]>(
        `${BASE_URL}/categorias/nome/${encodeURIComponent(nome)}`, {
            headers: { Authorization: token }
        }
    )
    return response.data
}

export async function createCategoria(categoria: Omit<Categoria, "id">): Promise<Categoria> {
    const response = await axios.post<Categoria>(`${BASE_URL}/categorias/cadastrar`, categoria)
    return response.data
}


export async function updateCategoria(categoria: Categoria, token: string): Promise<Categoria> {
    const response = await axios.put<Categoria>(`${BASE_URL}/categorias/atualizar`, categoria, {
        headers: { Authorization: token }
    })
    return response.data
}

export async function deleteCategoria(id: number, token: string): Promise<void> {
    await axios.delete(`${BASE_URL}/categorias/${id}`, {
        headers: { Authorization: token }
    })
}