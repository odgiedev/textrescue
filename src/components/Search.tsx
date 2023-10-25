import { useEffect, useState } from "react";
import { Axios } from "../lib/axios";

import { useDispatch } from "react-redux";
import { setErrorMsg } from "../redux/messageSlice";
import { Link, useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { PiPlanet } from "react-icons/pi";
import LineWord from "./LineWord";

function Search() {
    const [pastes, setPastes] = useState([]);

    const dispatch = useDispatch();

    const [param] = useSearchParams();
    const tags = param.get("tags");

    useEffect(() => {
        Axios.post(`/paste/search/tags/${tags}`)
        .then(res => {
            setPastes(res.data);

        })
        .catch(() => {
            dispatch(setErrorMsg(["An error occured."]))

        })
    }, [tags]);

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-sky-800">
                <LineWord word={"Search"}/>
                {
                    pastes.length > 0
                    ?
                    pastes.map((paste: any, i: number) => {
                        return (
                            <div key={i} className="flex justify-around items-center py-3 my-2 bg-sky-600">
                                <Link to={`/paste/${paste.username}/${paste._id.$oid}`}><button type="button"><PiPlanet size={20} /></button></Link>
                                <button type="button"></button>
                                <Link to={`/paste/${paste.username}/${paste._id.$oid}`} className="truncate w-1/4">{paste.title}</Link>
                                <Link to={`/paste/${paste.username}/${paste._id.$oid}`} className="truncate w-1/4">{paste.description}</Link>
                                <Link to={`/paste/${paste.username}/${paste._id.$oid}`} className="truncate w-1/4">{paste.tags}</Link>
                                <Link to={`/paste/${paste.username}/${paste._id.$oid}`}>05/07/23</Link>
                            </div>
                        )
                    })
                    :
                    <div className="flex justify-center font-bold text-xl mt-6">
                        <h1>Any paste find with this tag.</h1>
                    </div>
                    
                }
                <div className="text-center">
                    <span>( VISIBILITY, TITLE, DESC, TAGS, CREATED AT )</span>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Search