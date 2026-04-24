import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { findAllCategorias } from '../../../services/CategoriaService'
import CardCategoria from '../cardcategoria/CardCategoria'
import DeletarCategoria from '../deletarcategoria/DeletarCategoria'
import { ToastAlerta } from '../../../util/ToastAlerta'
import Loading from "../../loading/Loading";

function ListarCategorias() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate()

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Estado que irá receber todas as categorias persistidas no Backend
    const [categorias, setCategorias] = useState<Categoria[]>([])

    // Estado que guarda um termo de busca e filtra na hora de renderizar
    const [busca, setBusca] = useState<string>('')

    // Estado para controlar o modal de deletar
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; nome: string } | null>(null)

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
            ToastAlerta('Você precisa estar logado!', 'info')
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
                ToastAlerta('Sessão expirada. Faça login novamente.', 'info')
                handleLogout()
                navigate('/')
            } else {
                ToastAlerta('Erro ao carregar as categorias!', 'erro')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#040e27] py-16 px-6">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div>
                        <p className="text-[#8B9DC3] text-xs tracking-widest uppercase mb-2">
                            Gerenciamento
                        </p>
                        <h1 className="text-3xl font-bold text-[#F0F4FF]">
                            Categorias
                        </h1>
                    </div>

                    <Link to="/cadastrarcategoria">
                        <button className="bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer hover:-translate-y-0.5 transition-all">
                            + Nova categoria
                        </button>
                    </Link>
                </div>

                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Buscar categoria..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && setBusca(busca)}
                        className="input"
                    />
                    <button className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#F59E0B]/20 transition shrink-0 cursor-pointer">
                        Buscar
                    </button>
                </div>

                {isLoading && <Loading />}

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {categoriasFiltradas.map((categoria) => (
                            <CardCategoria
                                key={categoria.id}
                                categoria={categoria}
                                onDelete={(id, nome) => setDeleteTarget({ id, nome })}
                            />
                        ))}
                    </div>
                )}

            </div>

            {/* Modal de confirmação de deleção */}
            {deleteTarget && (
                <DeletarCategoria
                    {...deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onSuccess={() => {
                        setCategorias(prev => prev.filter(c => c.id !== deleteTarget.id))
                        setDeleteTarget(null)
                    }}
                />
            )}

        </div>
    )
}

export default ListarCategorias