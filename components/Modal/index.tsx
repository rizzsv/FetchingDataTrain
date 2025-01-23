import { ReactNode } from "react"

type Props = {
    children: ReactNode
    isShow: boolean
}

const Modal = ({ children, isShow }: Props) => {
    return (
        <div className={`z-[1024] w-dvw h-dvh fixed top-0 left-0 bg-black bg-opacity-75 flex justify-center items-center ${isShow ? 'block' : 'hidden'}`}>
            <div className="w-5/6 md:w-4/5 lg:w-3/6 bg-white">
                {children}
            </div>
        </div>
    )
}

export default Modal