import React,{useState, useEffect} from 'react'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import CommentIcon from '@mui/icons-material/Comment';


import { Container,Modification,BottomPart, SubBottomPart, Videoshow,  Totalcontainer,VideoContainer,Time, VideoChannel, VideoChannelDetials, IframeContainer, Videotitle } from './VideosCss'
import skeletonObject from '../../components/Skeletonmap'
import Skeletonall from '../../components/Skeleton'
import Videomodel from '../../components/Videomodel';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {videoFailure, videoSuccess, videoPending} from '../../Slice/VideoSlice'
import Videocard from '../../components/Videocard';


const Videos = () => {
    const dispatch = useDispatch()
    const {loading, videos} = useSelector((state)=>state.video)
    const [testing, settesting] = useState([])
    const[clicked, setclicked] = useState(false)
    
  useEffect(()=>{
    const fetchingVideo = async()=>{
      dispatch(videoPending())
      try {
        const gottenVideo = await axios.get('/getVideo')
        dispatch(videoSuccess(gottenVideo.data))
        settesting(gottenVideo.data)
      } catch (error) {
        
        console.log(error)
      }
      
     
    }
    fetchingVideo()
  },[clicked])
console.log(testing)
  return (
    <Totalcontainer>
        <Container>
            {
                loading && (skeletonObject.map((each)=>(
                  <Skeletonall key={each.id}/>
                ))) 
            }
            {testing && (testing.map((video)=>(
              <Videocard key={video._id} video={video} setclicked={setclicked} clicked={clicked}/>
            )))
              }
           
            
        </Container>
    </Totalcontainer>
  )
}

export default Videos