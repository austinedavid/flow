import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    currentUser: null,
    error: false
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{
        userPending: (state, action)=>{
            state.loading = true
        },
        userSuccess: (state, action)=>{
            state.loading = false;
            state.currentUser = action.payload
        },

        userFailure:(state, action)=>{
            state.loading = false;
            state.currentUser = null;
            state.error = true
        },
       logout:(state, action)=>{
        state.loading = false;
        state.currentUser = null;
        state.error = false
       }

    }
})

export const {userFailure, userPending, userSuccess, logout} = userSlice.actions;
export default userSlice.reducer