import { SetStateAction, useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { Axios } from "../lib/axios";
import Footer from "./Footer";
import Message from "./Message";
import NavBar from "./NavBar";
import Modal from "./Modal";
import {useDispatch} from "react-redux";
import {setErrorMsg} from "../redux/messageSlice.tsx";

function Paste() {
    const { user } = useParams();
    const { paste_id } = useParams();

    const [title, setTitle] = useState('');
    const [paste, setPaste] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const [pastePassword, setPastePassword] = useState('');
    const [trigger, setTrigger] = useState(false);

    const [anyPaste, setAnyPaste] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    function setModal(tf: SetStateAction<boolean>) {
        setIsModalOpen(tf)
    }

    useEffect(() => {
        Axios.post(`/paste/${user}/${paste_id}`, { "password": pastePassword })
        .then((res: any) => {
            setModal(false);
            setAnyPaste(true);

            setTitle(res.data.title);
            setPaste(res.data.paste);
            setDescription(res.data.description);
            setTags(res.data.tags);
            setCreatedAt(res.data.created_at);
        })
        .catch((err: any) => {
            setAnyPaste(false);

            const errors = err.response.data.split(",")

            if (errors[0].includes("XIPP")) {
                dispatch(setErrorMsg(["Incorrect password."]))
                setModal(true)
            }
            else if (errors[0].includes("NF")) {
                setAnyPaste(false);
            }
        })
    }, [trigger])


    return (
        <>
            <div className="h-screen bg-sky-900">
                <NavBar />

                <Modal isOpen={isModalOpen}>
                    <Message />

                    <div className="flex flex-col text-slate-100">
                        <h2 className="text-xl font-semibold mb-2 text-center">Paste password</h2>
                        <input type="password" placeholder="********" className="p-2 rounded text-black" onChange={(e:any) => setPastePassword(e.target.value)} />
                        <button className="mt-2 py-2 rounded bg-sky-700" onClick={() => setTrigger((old:any) => !old)}>Submit</button>
                        <hr className="my-2" />
                        <div className="font-semibold flex justify-around">
                            <Link to="/">Home</Link>
                            <Link to="/dashboard">Dashboard</Link>
                        </div>
                    </div>
                </Modal>
                {
                    anyPaste
                    ?
                    <div className="h-3/4 flex flex-col justify-center items-center w-screen text-black break-all">
                        <div className="text-lg font-bold text-slate-200 mt-6 w-1/2 flex justify-between">
                            <span>{`Created by: ${user}`}</span>
                            <span>{`Date: ${createdAt}`}</span>
                        </div>
                        <p className="bg-slate-300 w-4/5 p-2 mt-6 rounded">{title}</p>
                        <pre className="bg-slate-300 h-1/2 w-4/5 p-2 my-1 rounded whitespace-pre-wrap">{paste}</pre>
                        <div className="w-full flex flex-col items-center">
                            <p className="bg-slate-300 w-2/5 p-2 my-1 rounded">{description ? description : <span className="text-slate-400">Description</span>}</p>
                            <p className="bg-slate-300 w-2/5 p-2 rounded">{tags ? tags : <span className="text-slate-400">Tags</span>}</p>
                        </div>
                    </div>
                    :
                    <div className="min-h-screen font-bold text-xl mt-4 text-slate-200 text-center">
                        <span>Loading...</span>
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default Paste;
