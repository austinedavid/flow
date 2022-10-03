import React from 'react'
import { Actionbtn, Container, UpdatesContainer, Wrapper } from './ProfileCss'
import ClearIcon from '@mui/icons-material/Clear';
import Uploadprofile from './Uploadprofile';
import Uploadpix from './Uploadpix';
import Uploadvideo from './Uploadvideo';
import {useDispatch, useSelector}from 'react-redux'
import {openProfile, closeProfile} from '../Slice/ProfileSlice'

const Profile = ({setexpanded}) => {
  const dispatch = useDispatch()
  return (
    <Container>
        <Wrapper>
          <Actionbtn>
          <ClearIcon onClick={()=>dispatch(closeProfile())} sx={{cursor: 'pointer'}}/>
          </Actionbtn>
           <UpdatesContainer>
              <Uploadprofile/>
              <Uploadpix/>
              <Uploadvideo/>
           </UpdatesContainer>
          
        </Wrapper>
    </Container>
  )
}

export default Profile