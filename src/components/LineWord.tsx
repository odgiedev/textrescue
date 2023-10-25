function LineWord({word}: any) {
    return (
        <div className="flex items-center mb-4 text-slate-100">
            <div className="flex-grow bg-slate-400 h-1"></div>
            <div className="flex-grow-0 mx-5 font-bold text-3xl text-center">{word}</div>
            <div className="flex-grow bg-slate-400 h-1"></div>
        </div>
    )
}

export default LineWord