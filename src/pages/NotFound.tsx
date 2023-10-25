import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <NavBar />
            <div className="h-screen bg-sky-900 text-slate-100 text-5xl font-bold flex flex-col justify-center items-center">
                <h1>PAGE NOT FOUND :(</h1>
                <Link to="/" className="text-lg italic underline hover:no-underline mt-2"> Home</Link>
            </div>
           <Footer />
        </>
    )
}

export default NotFoundPage;