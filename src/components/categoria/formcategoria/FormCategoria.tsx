import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import type Categoria from "../../../models/Categoria";
import { createCategoria, findCategoriaById, updateCategoria } from "../../../services/CategoriaService";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../util/ToastAlerta";

function FormCategoria() {

  // Objeto responsável por redirecionar o usuário para uma outra rota
  const navigate = useNavigate();

  // Estado para controlar o Loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado que irá receber os dados da categoria que será persistido no Backend
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  // Acessa o token do usuário autenticado
  const { usuario, handleLogout } = useContext(AuthContext)
  // Cria um objeto para armazenar o token
  const token = usuario.token

  // Acessar o parâmetro id da rota de edição da Categoria
  const { id } = useParams<{ id: string }>();

  // Função para buscar uma categoria pelo id no backend
  // que será atualizado no form
  async function buscarCategoriaPorId() {
    try {
      setIsLoading(true);
      const dados = await findCategoriaById(Number(id), token)
      setCategoria(dados)

    } catch (error: any) {
      if (error.toString().includes('401')) {
        ToastAlerta('Sessão expirada. Faça login novamente.', 'info')
        handleLogout()
        navigate('/')
      }

    } finally {
      setIsLoading(false);
    }
  }

  // Cria um useEffect para monitorar o token
  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  // Cria um useEffect para monitorar o id (rota)
  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId();
    }
  }, [id])

  // Função de atualização do estado categoria
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  async function gerarNovaCategoria(e: SyntheticEvent<HTMLFormElement>) {

    e.preventDefault();

    setIsLoading(true);

    if (id !== undefined) {

      // Atualização
      try {
        await updateCategoria(categoria, token)

        ToastAlerta('Categoria atualizada com sucesso!', 'sucesso')

      } catch (error: any) {

        if (error.toString().includes('401')) {
          ToastAlerta('Sessão expirada. Faça login novamente.', 'info')
          handleLogout()
          navigate('/')
        } else {
          ToastAlerta('Erro ao Atualizar a Categoria!', 'erro')
        }
      }

    } else {

      // Cadastro
      try {

        await createCategoria(categoria, token);
        ToastAlerta('Categoria cadastrada com sucesso!', 'sucesso');

      } catch (error: any) {
        if (error.toString().includes('401')) {
          ToastAlerta('Sessão expirada. Faça login novamente.', 'info')
          handleLogout()
          navigate('/')
        } else {
          ToastAlerta('Erro ao Cadastrar a Categoria!', 'erro')
        }
      }

    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate('/categorias');
  }

  return (
    <div className="min-h-screen bg-[#080D1A] py-16 px-6">
      <div className="max-w-xl mx-auto">

        {/* Botão voltar */}
        <button
          onClick={retornar}
          className="text-[#8B9DC3] text-sm mb-4 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
        >
          ← Voltar para categorias
        </button>

        {/* Título */}
        <h1 className="font-['Orbitron'] text-2xl font-bold text-[#F0F4FF] mb-10">
          {id === undefined ? "Cadastrar" : "Editar"} Categoria
        </h1>

        {/* Panel */}
        <div className="bg-[#0D1528] border border-[#1E3056] rounded-2xl p-10">
          <form
            onSubmit={gerarNovaCategoria}
            className="flex flex-col gap-5"
          >
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase">
                Nome da Categoria
              </label>
              <input
                type="text"
                placeholder="Nome da categoria"
                name="nome"
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                value={categoria.nome ?? ''}
                onChange={atualizarEstado}
              />
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-2">
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase">
                Descrição
              </label>
              <input
                type="text"
                placeholder="Descreva a categoria"
                name="descricao"
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                value={categoria.descricao ?? ''}
                onChange={atualizarEstado}
              />
            </div>

            {/* Ícone */}
            <div className="flex flex-col gap-2">
              <label className="block text-[#8B9DC3] text-xs font-semibold tracking-widest uppercase">
                Ícone
              </label>
              <input
                type="text"
                placeholder="Ex: 💪 ou https://..."
                name="icone"
                className="w-full bg-[#111E38] border border-[#1E3056] rounded-xl px-4 py-3 text-[#F0F4FF] text-sm outline-none focus:border-[#F59E0B] transition-colors"
                value={categoria.icone ?? ''}
                onChange={atualizarEstado}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={retornar}
                className="flex-1 bg-transparent border border-[#1E3056] text-[#8B9DC3] py-3 rounded-xl hover:border-[#8B9DC3] hover:text-white transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-2 bg-linear-to-br from-[#F59E0B] to-[#B45309] text-[#080D1A] font-bold py-3 rounded-xl flex justify-center items-center cursor-pointer disabled:opacity-60"
              >
                {isLoading
                  ? <ClipLoader color="#080D1A" size={20} />
                  : (id === undefined ? "Cadastrar" : "Salvar alterações")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormCategoria;