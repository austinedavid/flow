import React,{useState, useEffect} from 'react'
import {Avatar, AlertTitle} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import { VideoContainer,VideoChannel, AlertError, VideoChannelDetials,IframeContainer,Time, Videoshow, Videotitle, Modification, BottomPart,SubBottomPart } from './VideocardCss'
import {format} from 'timeago.js'
import axios from 'axios'
import PublicIcon from '@mui/icons-material/Public';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Videocard = ({video, clicked, setclicked}) => {
    const[channel, setchannel] = useState({})
    const[deletesuccessful, setdeletesuccessful] = useState(false)
    const[deleteMessage, setdeleteMessage] = useState()
    const[deleteVideoAction, setdeleteVideoAction] = useState(false)
    const[deleteError, setdeleteError] = useState()
    
    useEffect(()=>{
        const getChannel = async()=>{
            const channelGotten = await axios.get(`/getUser/${video.userId}`).then((res)=>{
                setchannel(res.data)
            })
        }
        getChannel()
    },[])

    // here we handle the like functionality
    const handleLike = async()=>{
        const sendlike = await axios.put(`/videolike/${video._id}`, {withCredentials: true})
            setclicked(!clicked)
        
    }
    //  here we handle dislikes of a particular video here
    const handleDislike = async()=>{
        const senddislike = await axios.put(`/videodislike/${video._id}`, {withCredentials: true})
        setclicked(!clicked)
        
    }

    //  here we handle the delete functionality of our video
    const handleDelete = async()=>{
      try {
        await axios.delete(`/deleteVideo/${video._id}`, {withCredentials: true}).then((res)=>{
          window.location.reload(false)
          setdeleteMessage("you have successfully deleted your video")
          setdeletesuccessful(true)
          
          
        })
      } catch (error) {
        setdeleteVideoAction(true)
        setdeleteError('you can only delete your video!!!')
        
      }  
     
       
    }

  
  return (
    <div>
        <VideoContainer key={video.id}>
                    <VideoChannel>
                      <Avatar src={channel.imgUrl} sx={{ width: 24, height: 24 }}/>
                      <VideoChannelDetials>
                        <p>{channel.name}</p>
                        <Time><p>{format(video.createdAt)}</p><PublicIcon sx={{ width: 15, height: 15 }}/></Time>
                      </VideoChannelDetials>
                      <Modification>
                      
                      <DeleteIcon onClick={handleDelete} sx={{ width: 20, height: 20, cursor: 'pointer'  }}/>
                    </Modification>
                    </VideoChannel>
                    <Videotitle>{video.desc}</Videotitle>
                    <IframeContainer>
                      <Videoshow src={video.videoUrl} controls/>
                    </IframeContainer>
                    <BottomPart>
                    <SubBottomPart><ThumbUpIcon onClick={handleLike} sx={{cursor: 'pointer'}}/><p>{video.likes.length}</p></SubBottomPart>
                    <SubBottomPart><p>{video.dislikes.length}</p><ThumbDownIcon sx={{cursor: 'pointer'}} onClick={handleDislike}/></SubBottomPart>
                    
                  </BottomPart>
                  </VideoContainer>

                  {
                  deletesuccessful && (<AlertError severity='success' variant='filled' onClose={()=>setdeletesuccessful(false)}><AlertTitle>AUTHORIZED</AlertTitle>{deleteMessage}</AlertError>)
                  }
                {
                  deleteVideoAction && (<AlertError severity='error' variant='filled' onClose={()=>setdeleteVideoAction(false)}><AlertTitle>UNAUTHORIZED</AlertTitle>{deleteError}</AlertError>)
                }
    </div>
  )
}

export default Videocard