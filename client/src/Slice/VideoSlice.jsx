import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    videos: [],
    error: null
}

const videoSlice = createSlice({
    name:"videoSlice",
    initialState,
    reducers:{
        videoPending: (state, action)=>{
            state.loading = true;
        },
        videoSuccess: (state, action)=>{
            state.loading = false;
            state.videos = action.payload
        },
        videoFailure: (state, action)=>{
            state.loading = false;
            state.videos = [];
            state.error = action.payload
        }

    }
})

export const {videoFailure, videoPending, videoSuccess} = videoSlice.actions
export default videoSlice.reducer