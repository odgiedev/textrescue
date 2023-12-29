import { useState } from "react";
import { Axios } from "../lib/axios";
import { SignInDto } from "../dto/user/signin.dto";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Message from "./Message";
import { setErrorMsg, setSuccessMsg } from "../redux/messageSlice";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSignIn(e: any) {
        e.preventDefault();

        const user_signin: SignInDto = {
            email,
            passwd: password,
        }

        Axios.post('/user/signin', user_signin)
        .then(res => {
            const user_data = res.data.split(" ");

            dispatch(setUser({token: user_data[1], user_id: user_data[3], username: user_data[5]}));
            localStorage.setItem('token', user_data[1]);
            localStorage.setItem('userId', user_data[3]);
            localStorage.setItem('username', user_data[5]);
            localStorage.setItem('authenticated', "true");
            dispatch(setSuccessMsg(['Successfully signed in.']));
            navigate('/dashboard')
            window.location.reload();
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
                    <form onSubmit={handleSignIn}>
                        <Message />

                        <h1 className="text-slate-200 font-bold text-2xl text-center">Sign In</h1>

                        <input name="email" onChange={event => setEmail(() => event.target.value)} type="email" placeholder="Email" className="w-80 p-3 my-2 rounded" /> <br />
                        <input onChange={event => setPassword(() => event.target.value)} type="password" placeholder="Password" className="w-80 p-3 mb-2 rounded" autoComplete="off"/> <br />
                        
                        <Link to="/signup" className="text-white hover:text-slate-200 text-right">Don't have an account?</Link> <br />
                        
                        <button type="submit" className="my-2 border-4 border-sky-950 bg-sky-900 text-white hover:text-slate-200 font-bold p-2 rounded w-80">Sign In</button>
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

export default SignIn
