import { PasteFormDto } from "../dto/form/paste.form.dto";
import {useSelector} from "react-redux";

function PasteForm(props: PasteFormDto) {
    const username = useSelector((state: any) => state.user.username);

    return (
        <form onSubmit={props.handleForm} className="bg-sky-900 h-full w-10/12 mx-auto flex flex-col justify-center items-center w-screen text-black">
                <input value={props.title} name="title" onChange={event => props.setTitle(() => event.target.value)} type="text" placeholder="Title" className="bg-slate-300 w-4/5 p-2 mt-6 rounded" /> <br />
                <textarea value={props.paste} name="paste" onChange={event => props.setPaste(() => event.target.value)} placeholder="Paste" className="bg-slate-300 resize-none h-1/2 w-4/5 p-2 my-1 rounded" autoComplete="off"/> <br />
                
                <button type="button" onClick={props.handleOptional} className="text-white p-2 mb-2 font-bold">Optional</button>
                
                {
                    props.optional
                    &&
                    <div className="w-full flex flex-col items-center">
                        <input value={props.description} name="description" onChange={event => props.setDescription(() => event.target.value)} type="text" placeholder="Description" className="bg-slate-300 w-3/5 sm:w-1/2 p-2 my-1 rounded" /> <br />
                        <input value={props.pastePassword} name="password" onChange={event => props.setPastePassword(() => event.target.value)} type="password" placeholder="Password" className="bg-slate-300 w-3/5 sm:w-1/2 p-2 rounded" /> <br />
                        <input value={props.tags} name="tags" onChange={event => props.setTags(() => event.target.value)} type="text" placeholder="Tags ex: python javascript react" className="bg-slate-300 w-3/5 sm:w-1/2 p-2 rounded" /> <br />
                    </div>
                }
                
                <button type="submit" className="mb-10 bg-sky-700 text-slate-200 font-bold p-2 rounded w-4/5">{username == "guest" ? "Paste as guest" : "Paste"}</button>
            </form>
    )
}

export default PasteForm;