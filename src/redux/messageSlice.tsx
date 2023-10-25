import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        successMsg: null,
        errorMsg: null,
    },
    reducers: {
        setSuccessMsg(state, { payload }) {
            return {...state, errorMsg: null, successMsg: payload};
        },

        setErrorMsg(state, { payload }) {
            return {...state, errorMsg: payload, successMsg: null};
        },
    }
});

export const {setSuccessMsg, setErrorMsg} = messageSlice.actions;

export default messageSlice.reducer;
