export function badgeCatClasses() {
    return "bg-[#ffd94d]/10 border border-[#ffd94d]/20 text-[#ffd94d] rounded-full px-2.5 py-0.5 text-[11px]"
}

export function ImagemFallback({ nome }: { nome: string }) {
    return (
        <div className="h-36 w-full flex items-center justify-center relative bg-[#1f1f64]/40">
            <span className="text-5xl opacity-60">🏋️</span>
            <span className="absolute bottom-3 text-[#e1effc]/50 text-[11px] uppercase tracking-widest font-semibold truncate px-2">
                {nome}
            </span>
        </div>
    )
}