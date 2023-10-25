import { useEffect, useState } from "react";
import { Axios } from "../lib/axios";
import { AuthDto } from "../dto/user/auth.dto";
import { PasteDto } from "../dto/paste/paste.dto";
import { PasteAuthDto } from "../dto/paste/paste.auth.dto";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { setSuccessMsg, setErrorMsg } from "../redux/messageSlice";
import Message from "./Message";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {PiArrowArcLeft, PiLockBold, PiArrowLeft, PiPencil, PiPlanet, PiSmiley, PiX, PiArrowRight} from "react-icons/pi";
import LineWord from "./LineWord";
import PasteForm from "./PasteForm";

function Dashboard() {
    const [pastes, setPastes] = useState([]);

    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);

    const token = useSelector((state: any) => state.user.token);
    const userId = useSelector((state: any) => state.user.userId);
    const username = useSelector((state: any) => state.user.username);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editTitle, editSetTitle] = useState('');
    const [editPaste, editSetPaste] = useState('');
    const [editDescription, editSetDescription] = useState('');
    const [editTags, editSetTags] = useState('');
    const [editPastePassword, editSetPastePassword] = useState('');
    
    const [optional, setOptional] = useState(false);
    const [pasteId, setPasteId] = useState('');

    const [page, setPage] = useState(1);

    const [firstPage, setFirstPage] = useState(true);
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        dispatch(setErrorMsg([]));
        Axios.get(`/paste/user/${userId}/${page}`)
        .then(res => {
            setLastPage(false)

            if(page == 1) {
                setFirstPage(true);
            } else {
                setFirstPage(false)
            }

            const pastes_sort = res.data.reverse();

            if (!pastes_sort.length) {
                setLastPage(true)
            }

            setPastes(pastes_sort);
        })
        .catch(() => {
            dispatch(setErrorMsg(["An error occured"]));
        })
    }, [page]);

    function handlePasteDelete(paste_id: string) {
        Axios.delete(`/paste/${paste_id}`)
        .then(() => {
            dispatch(setErrorMsg(["Paste deleted."]));
        })
        .catch(() => {
            dispatch(setErrorMsg(["An error occured while deleting."]));
        })
    }

    function handleEdit(p_pasteId: any, title: any, paste: any, description: any, tags: any, pass: any, ) {
        dispatch(setSuccessMsg(''));
        
        setEditTrigger((old:any) => !old);
        setPasteId(p_pasteId);

        editSetTitle(title);
        editSetPaste(paste);
        editSetDescription(description);
        editSetTags(tags);
        editSetPastePassword(pass);
    }

    function handleUpdatePaste(e: any) {
        e.preventDefault();

        const paste_data: PasteDto = {
            user_id: userId,
            username,
            title: editTitle,
            paste: editPaste,
            description: editDescription,
            tags : editTags,
            paste_password: editPastePassword,
        }

        const auth_data: AuthDto = {
            token
        }

        const paste_auth: PasteAuthDto = {
            paste: paste_data,
            auth: auth_data
        }

        Axios.put(`/paste/${pasteId}`, paste_auth)
            .then(() => {
                dispatch(setSuccessMsg(['Paste updated.']));
            })
            .catch(err => {
                dispatch(setErrorMsg([err.response.data]));
            })
    }

    function handleLogout() {
        dispatch(logOut())

        navigate('/');
        window.location.reload();
    }

    function decreasePage() {
        if (page - 1 == 0) {
            return setPage(1)
        }

        setPage(page - 1)
    }

    function increasePage() {
        setPage(page + 1)
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-sky-900">
                <div className="text-slate-200 flex justify-around items-center py-9 rounded mb-6 bg-sky-600">
                    <button type="button"><PiSmiley size={120} color="38bdf8" /></button>
                    <p>{username}</p>
                    <p className="hidden sm:inline-block">{pastes.length} pastes</p>
                    <p className="hidden sm:inline-block">2023</p>
                    <button type="button" onClick={handleLogout} className="bg-red-400 p-2 rounded">Logout</button>
                    {/* <button type="button" className="bg-red-400 p-2 rounded">Delete account</button> */}
                </div>
                <LineWord word="Pastes" />
                <Message />
                {
                    pastes.length == 0
                    ?
                    <div className="bg-red-400 flex justify-center text-lg p-2">
                        <h1>No pastes found.</h1>
                    </div>
                    :

                    editTrigger
                    ?
                    <div className="h-[70vh]">
                        <div className="flex justify-center"><button onClick={() => {dispatch(setSuccessMsg('')); setEditTrigger((old:any) => !old)}} type="button"><PiArrowArcLeft color="#FFF" size={24} /></button></div>

                        <PasteForm 
                            handleForm={handleUpdatePaste}
                            title={editTitle}
                            setTitle={editSetTitle}
                            paste={editPaste}
                            setPaste={editSetPaste}
                            handleOptional={() => setOptional((old:any) => !old)}
                            optional={optional}
                            description={editDescription}
                            setDescription={editSetDescription}
                            pastePassword={editPastePassword}
                            setPastePassword={editSetPastePassword}
                            tags={editTags}
                            setTags={editSetTags}
                        />
                    </div>
                    :
                    pastes.map((paste: any, i: number) => {
                        return (
                            <div key={i} className="text-slate-200 flex justify-around items-center py-3 my-3 bg-sky-700">
                                {
                                    paste.paste_password
                                    ?
                                    <button type="button"><PiLockBold size={20} /></button>
                                    :
                                    <button type="button"><PiPlanet size={20} /></button>
                                }
                                <Link to={`/paste/${username}/${paste._id.$oid}`} className="truncate w-1/4">{paste.title}</Link>
                                <Link to={`/paste/${username}/${paste._id.$oid}`} className="truncate w-1/4">{paste.description}</Link>
                                <Link to={`/paste/${username}/${paste._id.$oid}`} className="truncate w-1/4 hidden sm:inline-block">{paste.tags}</Link>
                                <Link to={`/paste/${username}/${paste._id.$oid}`} className="hidden sm:inline-block">{paste.created_at}</Link>

                                <button onClick={() => handleEdit(paste._id.$oid, paste.title, paste.paste, paste.description, paste.tags, paste.paste_password)} type="button"><PiPencil size={20} /></button>

                                {
                                    deleteTrigger
                                    ?
                                    <>
                                        <button onClick={() => setDeleteTrigger((old:any) => !old)} type="button"><PiX color="FF0000" size={20} /></button>
                                        <button onClick={() => handlePasteDelete(paste._id.$oid)} type="button" className="text-red-500">CONFIRM</button>
                                    </>
                                    :
                                    <button onClick={() => setDeleteTrigger((old:any) => !old)} type="button"><PiX color="FF0000" size={20} /></button>
                                }
                            </div>
                        )
                    })
                }
                {
                    !editTrigger
                    &&
                    <>
                        <div className="flex items-center justify-center py-3 my-3 text-slate-200">
                            <span>( VISIBILITY, TITLE, DESC, TAGS, CREATED AT, EDIT, DELETE )</span>
                        </div>

                        <div className="w-full flex justify-center pb-6">
                            <div className="w-1/6 flex justify-between items-center font-bold text-lg">
                                <button onClick={() => decreasePage()}>{firstPage ? null : <PiArrowLeft/>}</button>
                                <span className="cursor-pointer">[ {page} ]</span>
                                <button onClick={() => increasePage()}>{lastPage ? null : <PiArrowRight/>}</button>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Footer />
        </>
    )
}

export default Dashboard