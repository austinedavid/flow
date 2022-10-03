import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    darkmodetheme: false
}

const themeSlice = createSlice({
    name: 'darkmodetheme',
    initialState,
    reducers:{
        setLightmode: (state, action)=>{
            state.darkmodetheme = false
        },
        setDarkmode: (state, action)=>{
            state.darkmodetheme = true
        }
    }
})

export default themeSlice.reducer
export const {setDarkmode, setLightmode} = themeSlice.actions