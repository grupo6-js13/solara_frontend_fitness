import { toast } from 'react-toastify'

const toastConfig = {
    position: 'top-right' as const,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: {
        backgroundColor: "#0D1528",
        border: "1px solid #1E3056",
        borderRadius: "0.75rem",
        color: "#F0F4FF",
        fontSize: "13px",
        fontFamily: "'Syne', sans-serif",
    }
}

export function ToastAlerta(mensagem: string, tipo: string) {
    switch (tipo) {
        case 'sucesso':
            toast.success(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #4ADE80",
                }
            })
            break

        case 'erro':
            toast.error(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #F87171",
                }
            })
            break

        case 'info':
        default:
            toast.info(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #38BDF8",
                }
            })
            break
    }
}