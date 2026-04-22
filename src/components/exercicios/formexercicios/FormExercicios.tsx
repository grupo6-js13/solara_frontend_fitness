import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import {
    createExercicio,
    updateExercicio,
    findExercicioById
} from "../../../services/ExercicioService"
import { findAllCategorias } from "../../../services/CategoriaService"
import type Exercicio from "../../../models/Exercicio"
import type Categoria from "../../../models/Categoria"
import { AuthContext } from "../../../context/AuthContext"

export default function FormExercicio() {

    const IMAGEM_PADRAO = "https://via.placeholder.com/300x200?text=Exercicio"

    const { id } = useParams()
    const navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const [imagemValida, setImagemValida] = useState<boolean | null>(null)

    const [exercicio, setExercicio] = useState<Exercicio>({
        id: 0,
        nome: "",
        imagem: "",
        serie: 0,
        repeticao: 0,
        tempoEstimado: 0,
        categoria: null,
    })

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [erro, setErro] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Proteção de rota
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // ─── INIT ─────────────────────────────────

    useEffect(() => {
        let mounted = true

        async function init() {
            try {
                const cats = await findAllCategorias(token)
                if (!mounted) return
                setCategorias(cats)

                if (id && !isNaN(Number(id))) {
                    const ex = await findExercicioById(Number(id), token)
                    if (!mounted) return
                    setExercicio(ex)
                    validarImagem(ex.imagem)
                }

            } catch (error: any) {
                if (!mounted) return
                if (error.response?.status === 401) {
                    alert('Sessão expirada. Faça login novamente.')
                    handleLogout()
                    navigate('/')
                } else {
                    setErro("Erro ao carregar dados.")
                }
            } finally {
                if (mounted) setLoading(false)
            }
        }

        if (token !== '') {
            init()
        }
        
        return () => { mounted = false }

    }, [id, token])

    // ─── VALIDAÇÃO IMAGEM ─────────────────────

    function validarImagem(url: string) {
        if (!url) {
            setImagemValida(null)
            return
        }

        try {
            new URL(url)
        } catch {
            setImagemValida(false)
            return
        }

        const img = new Image()
        img.src = url

        img.onload = () => setImagemValida(true)
        img.onerror = () => setImagemValida(false)
    }

    // ─── SUBMIT ───────────────────────────────

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()

        // 🔴 validações básicas
        if (!exercicio.nome.trim()) {
            return setErro("Nome é obrigatório.")
        }

        if (!exercicio.categoria?.id) {
            return setErro("Selecione uma categoria.")
        }

        // ✅ aplica fallback de imagem
        const payload: Exercicio = {
            ...exercicio,
            imagem: exercicio.imagem.trim()
                ? exercicio.imagem
                : IMAGEM_PADRAO
        }

        setSaving(true)
        setErro(null)

        try {
            if (id) {
                await updateExercicio(payload, token)
            } else {
                await createExercicio(payload, token)
            }

            navigate("/exercicios")

        } catch (error: any) {
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.')
                handleLogout()
                navigate('/')
            } else {
                setErro("Erro ao salvar.")
            }
        } finally {
            setSaving(false)
        }
    }

    // ─── LOADING ──────────────────────────────

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#080D1A]">
                <ClipLoader size={50} color="#F59E0B" />
            </div>
        )
    }

    // ─── UI ───────────────────────────────────

    return (
        <main className="min-h-screen bg-[#080D1A] py-16 px-6">
            <div className="max-w-2xl mx-auto">

                <div className="mb-10">
                    <p className="text-[#8B9DC3] text-xs uppercase tracking-widest mb-2">
                        Gerenciamento
                    </p>
                    <h1 className="text-[#F0F4FF] text-3xl font-bold">
                        {id ? "Editar Exercício" : "Novo Exercício"}
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#111E38] border border-[#1E3056] rounded-2xl p-8 space-y-6"
                >

                    {erro && (
                        <div className="bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] rounded-lg px-4 py-3 text-sm">
                            {erro}
                        </div>
                    )}

                    {/* Nome */}
                    <Input
                        label="Nome"
                        value={exercicio.nome}
                        onChange={(v: string) => setExercicio({ ...exercicio, nome: v })}
                    />

                    {/* Imagem */}
                    <div>
                        <label className="label">URL da imagem</label>

                        <input
                            value={exercicio.imagem}
                            onChange={(e) => {
                                const url = e.target.value
                                setExercicio({ ...exercicio, imagem: url })
                                validarImagem(url)
                            }}
                            className={`input ${imagemValida === false && "border-red-500"}`}
                        />

                        {/* preview */}
                        {imagemValida && (
                            <img
                                src={exercicio.imagem}
                                className="mt-3 rounded-lg h-32 object-cover border border-[#1E3056]"
                            />
                        )}

                        {imagemValida === false && (
                            <p className="text-red-400 text-xs mt-2">
                                URL inválida
                            </p>
                        )}
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="label">Categoria</label>

                        <select
                            value={exercicio.categoria?.id || ""}
                            onChange={(e) => {
                                const cat = categorias.find(c => c.id === Number(e.target.value))
                                setExercicio({ ...exercicio, categoria: cat || null })
                            }}
                            className="input"
                        >
                            <option value="">Selecione</option>
                            {categorias.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Números */}
                    <div className="grid grid-cols-3 gap-4">
                        <InputNumber label="Séries" value={exercicio.serie} onChange={(v: number) => setExercicio({ ...exercicio, serie: v })} />
                        <InputNumber label="Reps" value={exercicio.repeticao} onChange={(v: number) => setExercicio({ ...exercicio, repeticao: v })} />
                        <InputNumber label="Tempo" value={exercicio.tempoEstimado} onChange={(v: number) => setExercicio({ ...exercicio, tempoEstimado: v })} />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/exercicios")}
                            className="flex-1 btn-secondary cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 btn-primary cursor-pointer"
                        >
                            {saving ? <ClipLoader size={18} color="#080D1A" /> : "Salvar"}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    )
}

// ─── COMPONENTES ─────────────────────────────

function Input({ label, value, onChange }: any) {
    return (
        <div>
            <label className="label">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input"
            />
        </div>
    )
}

function InputNumber({ label, value, onChange }: any) {
    return (
        <div>
            <label className="label">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="input"
            />
        </div>
    )
}