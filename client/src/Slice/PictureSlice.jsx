import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    picture: [],
    error: null
}

const pictureSlice = createSlice({
    name:"pictureSlice",
    initialState,
    reducers:{
        picturePending:(state, action)=>{
            state.loading = true
        },
        pictureSuccess:(state, action)=>{
            state.loading = false;
            state.picture = action.payload
        },
        pictureFailure:(state, action)=>{
            state.loading = false;
            state.picture = [];
            state.error = action.payload
        },
  

    }
})
export const {pictureFailure, picturePending, pictureSuccess, } = pictureSlice.actions
export default pictureSlice.reducer