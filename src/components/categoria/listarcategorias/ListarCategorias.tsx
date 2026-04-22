import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import type Categoria from '../../../models/Categoria'
import { findAllCategorias } from '../../../services/CategoriaService'
import CardCategoria from '../cardcategoria/CardCategoria'

function ListarCategorias() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate()

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Estado que irá receber todas as categorias persistidas no Backend
    const [categorias, setCategorias] = useState<Categoria[]>([])

    // Estado que guarda um termo de busca e filtra na hora de renderizar
    const [busca, setBusca] = useState<string>('')

    // Filtragem de categorias
    const categoriasFiltradas = categorias.filter(cat =>
        cat.nome.toLowerCase().includes(busca.toLowerCase())
    )

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext)
    // Cria um objeto para armazenar o token
    const token = usuario.token

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para inicializar a função buscarCategorias
    useEffect(() => {
        buscarCategorias()
    }, [])

    // Função para buscar todas as categorias no backend
    async function buscarCategorias() {
        try {
            setIsLoading(true)
            const dados = await findAllCategorias(token)
            setCategorias(dados)

        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('Sessão expirada. Faça login novamente.')
                handleLogout() // Bônus de segurança: garante que o estado zere se der 401
                navigate('/')
            } else {
                alert('Erro ao carregar as categorias!')
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#080D1A] py-16 px-6">
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-10">
                    <div>
                        <p className="text-[#8B9DC3] text-xs tracking-widest uppercase mb-2">
                            Gerenciamento
                        </p>
                        <h1 className="font-['Orbitron'] text-3xl font-bold text-[#F0F4FF]">
                            Categorias
                        </h1>
                    </div>

                    <Link to="/cadastrarcategoria">
                        <button className="bg-linear-to-br from-[#F59E0B] to-[#B45309]
                         text-[#080D1A] font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer
                          hover:-translate-y-0.5 transition-all">
                            + Nova categoria
                        </button>
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Buscar categoria..."
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors mb-8"
                />

                {isLoading && (
                    <div className="flex justify-center py-20">
                        <SyncLoader color="#F59E0B" size={12} />
                    </div>
                )}

                {!isLoading && categorias.length === 0 && (
                    <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-20 flex flex-col items-center gap-4">
                        <span className="text-4xl">📂</span>
                        <p className="text-[#8B9DC3] text-sm">
                            Nenhuma categoria cadastrada ainda.
                        </p>
                        <Link to="/cadastrarcategoria">
                            <button className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] px-5 py-2 rounded-xl text-sm cursor-pointer hover:bg-[#F59E0B]/20 transition-all">
                                Criar primeira categoria
                            </button>
                        </Link>
                    </div>
                )}

                {!isLoading && categorias.length > 0 &&
                    categoriasFiltradas.length === 0 && (
                        <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-20 flex flex-col items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            <p className="text-[#8B9DC3] text-sm">
                                Nenhuma categoria encontrada para "{busca}".
                            </p>
                        </div>
                    )}

                {!isLoading && categoriasFiltradas.length > 0 && (
                        <div className="grid grid-cols-3 gap-5">
                            {categoriasFiltradas.map((categoria) => (
                                    <CardCategoria
                                        key={categoria.id}
                                        categoria={categoria}
                                    />
                                ))}
                        </div>
                    )}

            </div>
        </div>
    )
}

export default ListarCategorias