import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:'login',
    initialState:{
        loginUsers:[],
        token: localStorage.getItem('token')
    },
    reducers:{
        fetchedLogin: (state, action) => {
            state.loginUsers = action.payload
        }
    }
})

export const {fetchedLogin} = loginSlice.actions
export default loginSlice.reducer