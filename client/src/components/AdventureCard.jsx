import React, {useState, useEffect} from 'react'
import { Avatar, AlertTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {AdContainer, AlertError, AdDescContainer,PostAdven, EditionDiv,AdDesc,AdInfo,AdTitle,AdPicContainer,AdImg,AdWriteUp} from './AdventureCardcss'
import axios from 'axios';
import {format} from 'timeago.js'
import {useSelector} from 'react-redux'


const AdventureCard = ({adventure, setdesc, setheading, settoUpdata, setdeleteId}) => {
    const[channel, setchannel] = useState({})
    const[deletesuccessful, setdeletesuccessful] = useState(false)
    const[deleteMessage, setdeleteMessage] = useState()
    const[deleteAdventureAction, setdeleteAdventureAction] = useState(false)
    const[deleteError, setdeleteError] = useState()
    const {currentUser} = useSelector((state)=> state.user)
    const[updateError, setupdateError] = useState(false)
    
    
    // making use of this particular useEffect to fetch the individual channels that posted the adventure
    useEffect(()=>{
        const getChannel = async()=>{
            const ourChannels = await axios.get(`/getUser/${adventure.userId}`).then((res)=>{
                setchannel(res.data)
            })
        }
        getChannel()
    },[])

    // here we handle our delete functionality
    const handleDelete = async()=>{
      try {
        await axios.delete(`/deleteAdventure/${adventure._id}`, {withCredentials: true}).then((res)=>{
          window.location.reload(false)
        })
      } catch (error) {
        setdeleteError('you can only delete your adventures!!!')
        setdeleteAdventureAction(true)
      }
    }

    // this is functionlity to handle update
    const handleUpdate = ()=>{
      if(currentUser._id !== adventure.userId){
        return setupdateError(true)
      }
      setdesc(adventure.desc)
      setheading(adventure.heading)
      settoUpdata(true)
      setdeleteId(adventure._id)
      document.documentElement.scrollTo(0,0)
    }

  return (
    <div>
        <AdContainer>
                  <AdPicContainer>
                    <AdImg src={adventure.imgUrl}/>
                    <EditionDiv>
                      <EditIcon onClick={handleUpdate} sx={{width: '22px', height: '22px', color: 'white', cursor: 'pointer'}}/>
                      <DeleteForeverIcon onClick={handleDelete} sx={{width: '22px', height: '22px', color: 'white', cursor: 'pointer'}}/>
                    </EditionDiv>
                  </AdPicContainer>
                  <AdWriteUp>
                    <AdTitle>{adventure.heading}</AdTitle>
                    <AdDesc>{adventure.desc}</AdDesc>
                  </AdWriteUp>
                  <AdInfo>
                    <Avatar src={channel.imgUrl} sx={{width: '25px', height: '25px'}}/>
                    <AdDescContainer>
                      <PostAdven>{channel.name}</PostAdven>
                      <AdDesc>{format(adventure.createdAt)}</AdDesc>
                    </AdDescContainer>
                    
                  </AdInfo>
                </AdContainer>

                {
                  deletesuccessful && (<AlertError severity='success' variant='filled' onClose={()=>setdeletesuccessful(false)}><AlertTitle>AUTHORIZED</AlertTitle>{deleteMessage}</AlertError>)
                }
                {
                  deleteAdventureAction && (<AlertError severity='error' variant='filled' onClose={()=>setdeleteAdventureAction(false)}><AlertTitle>UNAUTHORIZED</AlertTitle>{deleteError}</AlertError>)
                }
                {
                  
                  updateError && (<AlertError severity='error' variant='filled' onClose={()=>setupdateError(false)}><AlertTitle>UNAUTHORIZED</AlertTitle>You can only update your adventure</AlertError>)
                }
               
    </div>
  )
}

export default AdventureCard