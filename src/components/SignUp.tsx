import { useState } from "react";
import { Axios } from "../lib/axios";
import { SignUpDto } from "../dto/user/signup.dto";
import Message from "./Message";
import { setErrorMsg, setSuccessMsg } from "../redux/messageSlice";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    function handleSignUp(e: any) {
        e.preventDefault();

        const user_signup: SignUpDto = {
            username,
            email,
            passwd: password
        }

        Axios.post('/user/create', user_signup)
        .then(() => {
            dispatch(setSuccessMsg(['User created.']));
        })
        .catch(err => {
            dispatch(setErrorMsg([err.response.data]));

        })
    }

    return (
        <>
            <NavBar />
            
            <div className="h-[100vh] flex justify-center items-center bg-sky-900">
                <div className="w-1/3 flex justify-center items-center h-screen bg-sky-700 border-r-4 border-sky-950">
                    <form onSubmit={handleSignUp}>
                        <Message />

                        <h1 className="text-slate-200 font-bold text-2xl">Sign Up</h1>

                        <input name="email" onChange={event => setEmail(() => event.target.value)} type="email" placeholder="Email" className="w-80 p-3 my-2 rounded" /> <br />
                        <input name="username" onChange={event => setUsername(() => event.target.value)} type="text" placeholder="Username" className="w-80 p-3 my-2 rounded" /> <br />
                        <input onChange={event => setPassword(() => event.target.value)} type="password" placeholder="Password" className="w-80 p-3 my-2 rounded" autoComplete="off"/> <br />
                        
                        <Link to="/signin" className="text-white hover:text-slate-200 text-right">Already have an account?</Link> <br />

                        <button type="submit" className="my-2 border-4 border-sky-950 bg-sky-900 text-white hover:text-slate-200 font-bold p-2 rounded w-80">Sign Up</button>
                    </form>
                </div>
                <div className="h-full w-2/3">
                    <img src="bg-tr.png" alt="bg" className="max-h-full w-full" />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default SignUp