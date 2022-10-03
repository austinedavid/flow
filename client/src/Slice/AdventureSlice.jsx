import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    adventure:[],
    error: null
}

const adventureSlice = createSlice({
    name: "adventureSlice",
    initialState,
    reducers:{
        adventurePending: (state)=>{
            state.loading = true
        },
        adventureSuccess: (state, action)=>{
            state.loading = false;
            state.adventure = action.payload;
        },
        adventureFailure: (state, action)=>{
            state.loading = false;
            state.adventure = [];
            state.error = action.payload
        }
    }
})

export const {adventureFailure, adventurePending, adventureSuccess} = adventureSlice.actions
export default adventureSlice.reducer