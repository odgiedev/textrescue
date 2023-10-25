import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const isLogged = useSelector((state: any) => state.user.isLogged);
    
    const navigate = useNavigate();

    const [search, setSearch] = useState('a');

    function handleSearch(e:any) {
        e.preventDefault();
        navigate(`/search?tags=${search}`);
    }

    return (
        <nav className="text-slate-200 text-lg bg-sky-950 p-4">
            <div className="mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-semibold">TR</Link>
                    <ul className="flex space-x-4 w-full justify-end">
                        <form onSubmit={handleSearch} className="hidden sm:inline-block">
                            <input onChange={event => setSearch(() => event.target.value)} className="text-black bg-slate-300 p-2 text-center rounded" type="text" name="search" placeholder="Search tags"/>
                        </form>
                        {
                            isLogged == "true"
                            ?
                            <div className="flex flex-wrap w-1/5 justify-around items-center" >
                                <div className="flex flex-wrap items-center justify-around w-full">
                                    <Link to="/" className="hover:underline me-5">Home</Link>
                                    <Link to="/about" className="hover:underline me-5">About</Link>
                                    <Link to="/dashboard" className="hover:underline me-5">Dashboard</Link>
                                </div>
                            </div>
                            :
                            <div className="flex flex-wrap w-1/5 justify-around items-center" >
                                <div className="flex flex-wrap items-center justify-around w-full">
                                    <Link to="/" className="hover:underline me-5">Home</Link>
                                    <Link to="/about" className="hover:underline me-5">About</Link>
                                    <Link to="/signin" className="hover:underline me-5">Sign In</Link>
                                    <Link to="/signup" className="hover:underline me-5">Sign Up</Link>
                                </div>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;