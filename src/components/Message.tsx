import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setErrorMsg, setSuccessMsg } from "../redux/messageSlice";

function Message() {
    const successMsg = useSelector((state: any) => state.message.successMsg);
    const errorMsg = useSelector((state: any) => state.message.errorMsg);

    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        dispatch(setSuccessMsg(null));
        dispatch(setErrorMsg(null));
    }, [location]);

    return (
        <>
            {
                successMsg
                &&
                successMsg.map((success: any, index: any) => {
                    return (
                        <div key={index} className="w-full my-3 flex justify-center">
                            <span className="p-2 rounded bg-green-400 text-center font-bold text-slate-200">{success}</span>
                        </div>
                    )
                })
            }
            {
                errorMsg
                &&
                errorMsg.map((error: any, index: any) => {
                    return (
                        <div key={index} className="w-80 my-2 mx-auto p-2 rounded bg-red-400 text-center font-bold text-slate-200">
                            {error}
                        </div>
                    )
                })
            }
        </>
    );
}

export default Message;