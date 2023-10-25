import { useState } from "react";
import Message from "./Message";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Axios } from "../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { PasteDto } from "../dto/paste/paste.dto";
import { AuthDto } from "../dto/user/auth.dto";
import { PasteAuthDto } from "../dto/paste/paste.auth.dto";
import { setErrorMsg, setSuccessMsg } from "../redux/messageSlice";
import PasteForm from "./PasteForm";
import LineWord from "./LineWord";

function Home() {
    const [optional, setOptional] = useState(false);

    const [title, setTitle] = useState('');
    const [paste, setPaste] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('_');
    const [isPrivate, setIsPrivate] = useState(false);
    const [PastePassword, setPastePassword] = useState('');

    const userId = useSelector((state: any) => state.user.userId);
    const token = useSelector((state: any) => state.user.token);
    const username = useSelector((state: any) => state.user.username);
    
    const dispatch = useDispatch();

    function handleOptional() {
        setOptional((old: any) => !old);
    }
    
    function handleCreatePaste(e: any) {
        e.preventDefault();

        const regex = /^(?=.*[a-zA-Z0-9_])[\w\s]*$/


        if (!regex.test(tags)) {
            return dispatch(setErrorMsg(["Tags can't contain special chars (only underline) or be empty."]));
        }

        PastePassword ? setIsPrivate(true) : setIsPrivate(false);

        const paste_data: PasteDto = {
            user_id: userId,
            username,
            title,
            paste,
            description,
            tags,
            is_private: isPrivate,
            paste_password: PastePassword,
        }

        const auth_data: AuthDto = {
            token
        }

        const paste_auth: PasteAuthDto = {
            paste: paste_data,
            auth: auth_data
        }

        Axios.post('/paste/create', paste_auth)
            .then(() => {
                dispatch(setSuccessMsg(['Paste created.']));
                setTitle('');
                setPaste('');
                setDescription('');
                setPastePassword('');
            })
            .catch(err => {
                dispatch(setErrorMsg([err.response.data]));
            })
    }

    return (
        <div className="h-screen bg-sky-900">
            <NavBar />
            <Message />

            <LineWord word={"New Paste"}/>
            
            <PasteForm 
                handleForm={handleCreatePaste}
                title={title}
                setTitle={setTitle}
                paste={paste}
                setPaste={setPaste}
                handleOptional={handleOptional}
                optional={optional}
                description={description}
                setDescription={setDescription}
                pastePassword={PastePassword}
                setPastePassword={setPastePassword}
                tags={tags}
                setTags={setTags}
            /> 

            <Footer />
        </div>
    )
}

export default Home;