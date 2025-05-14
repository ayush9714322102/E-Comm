import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ show,closeModal,children }) => {
    if (!show) return null;

    return(
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg relative p-6">
                <button onClick={closeModal} className="absolute top-2 right-2 text-2xl text-gray-700"><IoIosCloseCircle/></button>
                {children}
            </div>
        </div>
    )
}

export default Modal;