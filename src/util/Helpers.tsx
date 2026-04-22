export function badgeCatClasses() {
    return "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] rounded-full px-2.5 py-0.5 text-[11px]"
}

export function ImagemFallback({ nome }: { nome: string }) {
    return (
        <div className="h-36 w-full flex items-center justify-center relative bg-linear-to-br from-[#111E38] to-[#0D1528]">
            <span className="text-5xl opacity-60">🏋️</span>
            <span className="absolute bottom-3 text-[#4A5A7A] text-[11px] uppercase tracking-widest font-semibold truncate px-2">
                {nome}
            </span>
        </div>
    )
}