function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#040e27" }}>
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-[#1f1f64] border-t-[#ffd94d] rounded-full animate-spin" />
                <p className="text-[#e1effc]/60 text-sm">Carregando...</p>
            </div>
        </div>
    )
}

export default Loading