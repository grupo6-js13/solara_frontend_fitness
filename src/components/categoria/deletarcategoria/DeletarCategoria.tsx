import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import type Categoria from '../../../models/Categoria'
import { deleteCategoria, findCategoriaById } from '../../../services/CategoriaService'

function DeletarCategoria() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate()

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Estado que irá receber os dados da categoria a ser deletada
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Acessar o parâmetro id da rota de deleção da categoria
    const { id } = useParams<{ id: string }>()

    // Função para buscar uma categoria pelo id no backend
    // para exibir os dados antes de confirmar a deleção
    async function buscarCategoriaPorId() {
        try {
            setIsLoading(true)
            const dados = await findCategoriaById(Number(id), token)
            setCategoria(dados)
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('Sessão expirada. Faça login novamente.')
                handleLogout()
                navigate('/')
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarCategoriaPorId()
        }
    }, [id])

    function retornar() {
        navigate('/categorias')
    }

    async function deletarCategoria() {
        setIsLoading(true)
        try {
            await deleteCategoria(Number(id), token)
            alert('Categoria deletada com sucesso!')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('Sessão expirada. Faça login novamente.')
                handleLogout()
                navigate('/')
            } else {
                alert('Erro ao deletar a categoria!')
            }
        } finally {
            setIsLoading(false)
            retornar()
        }
    }

    return (
        <div className="min-h-screen bg-[#080D1A] flex items-center justify-center px-6 py-16">
            <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-10 w-full max-w-md flex flex-col gap-6">
                
                <div className="text-center">
                    <h1 className="font-['Orbitron'] text-2xl font-bold text-[#F0F4FF] mb-2">
                        Deletar Categoria
                    </h1>
                    <p className="text-[#8B9DC3] text-sm">
                        Você tem certeza que deseja apagar a categoria a seguir?
                    </p>
                </div>
                
                <div className="bg-[#111E38] border border-[#1E3056] rounded-xl p-5 flex items-center gap-4">
                    <span className="text-3xl">{categoria.icone}</span>
                    <div>
                        <p className="text-[#F0F4FF] font-semibold">{categoria.nome}</p>
                        <p className="text-[#8B9DC3] text-xs mt-1">{categoria.descricao}</p>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button
                        onClick={retornar}
                        className="flex-1 bg-transparent border border-[#1E3056] text-[#8B9DC3] py-3 rounded-xl hover:border-[#8B9DC3] hover:text-white transition-all cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={deletarCategoria}
                        disabled={isLoading}
                        className="flex-2 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] py-3 rounded-xl flex items-center justify-center hover:bg-[#F87171]/20 transition-all cursor-pointer disabled:opacity-60"
                    >
                        {isLoading
                            ? <ClipLoader color="#F87171" size={20} />
                            : 'Sim, deletar'
                        }
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DeletarCategoria