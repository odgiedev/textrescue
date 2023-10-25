import {Link} from "react-router-dom";

function Card({children, title, download}: any){
    return (
        <div className="w-5/6 md:w-2/5 my-3 flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <h1 className="font-bold my-4">{title}</h1>
                <h1 className="text-xl font-semibold text-green-500">Free</h1>
            </div>
            <div className="p-4">
                {children}
            </div>

            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-blue-600">
                    {
                        download
                        ?
                        <a href="tr">Download</a>
                        :
                        <Link to="/signup">Start</Link>
                    }
                </button>
            </div>
        </div>
    )
}

export default Card;