import React from 'react'
import {Navigate}from 'react-router-dom'
import {useSelector} from 'react-redux'

const Protected = ({children}) => {
    const {currentUser} = useSelector((state)=>state.user)
 if(!currentUser){
   return <Navigate to="/login"/>
 }

 return children
}

export default Protected