import React,{useState, useEffect} from 'react'
import {IframeContainer, AlertError, ImageContainer,Modification,SubBottomPart,BottomPart,Time,Imagetitle, Imageshow ,ImageChannel,ImageChannelDetials, } from './PixcardCss'
import {Avatar, AlertTitle} from '@mui/material'
import PublicIcon from '@mui/icons-material/Public';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import {format} from 'timeago.js'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'





const Pixcard = ({pix,setclicked, clicked}) => {
    const [channel, setchannel] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=>state.user)
    const[deletesuccessful, setdeletesuccessful] = useState(false)
    const[deleteMessage, setdeleteMessage] = useState()
    const[deletePictureAction, setdeletePictureAction] = useState(false)
    const[deleteError, setdeleteError] = useState()
    
    
   

    useEffect(()=>{
        const getchannels = async()=>{
            const channelsdata = await axios.get(`/getUser/${pix.userId}`).then((res)=>{
                setchannel(res.data)
            })

        }
       
        getchannels()
    },[dispatch])
    

    // here we make a put request to handle like functionality
    const handleLikes = async()=>{
      await axios.put(`/picturelike/${pix._id}`, {withCredentials: true}).then((res)=>console.log(res.data))

    setclicked(!clicked)
      
    }

    // here we make a put request to handle dislike functionality
    const handleDislikes = async()=>{
      await axios.put(`/picturedislike/${pix._id}`, {withCredentials: true})
      setclicked(!clicked)
    }

    // here we make our delete request to delete a particular post
    const deletePix = async()=>{
      await axios.delete(`/deletePix/${pix._id}`, {withCredentials: true}).then((res)=>{
        setdeleteMessage(res.data)
        setdeletesuccessful(true)
        window.location.reload(false)
    })
      .catch((error)=>{
        setdeleteError('you can only delete your pictures!!!')
        setdeletePictureAction(true)
      })
     
     
    }

  return (
    <div>
    <ImageContainer>
                  <ImageChannel>
                    <Avatar src={channel.imgUrl}  sx={{ width: 27, height: 27}}/>
                    <ImageChannelDetials>
                      <p>{channel.name}</p>
                      <Time><p>{format(pix.createdAt)}</p><PublicIcon sx={{ width: 15, height: 15 }}/></Time>
                    </ImageChannelDetials>
                    <Modification>
                      
                      <DeleteIcon onClick={deletePix} sx={{ width: 20, height: 20, cursor: 'pointer'  }}/>
                    </Modification>
                  </ImageChannel>
                  <Imagetitle>{pix.desc}</Imagetitle>
                  <IframeContainer>
                    <Imageshow src={pix.imgUrl}/>
                  </IframeContainer>
                  <BottomPart>
                    <SubBottomPart><ThumbUpIcon onClick={handleLikes} sx={{cursor: 'pointer'}}/><p>{pix.likes.length}</p></SubBottomPart>
                    <SubBottomPart><ThumbDownIcon onClick={handleDislikes} sx={{cursor: 'pointer'}}/><p>{pix.dislikes.length}</p></SubBottomPart>
                    
                  </BottomPart>
                </ImageContainer>
                {
                  deletesuccessful && (<AlertError severity='success' variant='filled' onClose={()=>setdeletesuccessful(false)}><AlertTitle>AUTHORIZED</AlertTitle>{deleteMessage}</AlertError>)
                }
                {
                  deletePictureAction && (<AlertError severity='error' variant='filled' onClose={()=>setdeletePictureAction(false)}><AlertTitle>UNAUTHORIZED</AlertTitle>{deleteError}</AlertError>)
                }
                </div>
  )
}

export default Pixcard