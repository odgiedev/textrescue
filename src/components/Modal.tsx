function Modal({ isOpen, children }: any) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-96">
                <div className="p-4 bg-sky-500 rounded">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;