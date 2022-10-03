import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    profileopend: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        openProfile: (state, action)=>{
            state.profileopend = true
        },
        closeProfile: (state, action)=>{
            state.profileopend = false
        }
    }
})

export default profileSlice.reducer
export const {openProfile, closeProfile} = profileSlice.actions