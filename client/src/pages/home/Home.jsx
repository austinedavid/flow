import React,{useState, useEffect} from 'react'

import { Container,  Totalcontainer, ImageContainer, ImageChannel,ImageChannelDetials, IframeContainer, Time, Imageshow, Imagetitle, Modification, BottomPart, SubBottomPart } from './HomeCss'
import skeletonObject from '../../components/Skeletonmap'
import Skeletonall from '../../components/Skeleton'

import Videomodel from '../../components/Videomodel';

import {useDispatch, useSelector} from 'react-redux'
import {pictureFailure, picturePending, pictureSuccess} from '../../Slice/PictureSlice'
import axios from 'axios'
import Pixcard from '../../components/Pixcard'

const Home = () => {
    const [channel, setchannel] = useState()
    const[testing, settesting] = useState([])
    const[clicked, setclicked] = useState(false)
    
    const dispatch = useDispatch()
    const {picture, loading} = useSelector((state)=> state.picture)
    
    
    // @under the useEffect we create an asych function to get all the pictures
    useEffect(()=>{
      const getPix = async()=>{
        // @here we set loading to true in our splice
        // @and also get our individual pictures
        dispatch(picturePending())
        try {
          const pixGotten = await axios.get('/getPix')
         
            dispatch(pictureSuccess(pixGotten.data))
            settesting(pixGotten.data)
         
        } catch (error) {
          console.log(error)
        }
       
        
      }
     
      getPix()
    },[clicked])
console.log(testing)
  return (
    <Totalcontainer>
        <Container>
          
            {loading && (skeletonObject.map((each)=>(
                  <Skeletonall key={each.id}/>)))}
           {testing && (testing.map((pix)=>(
            <Pixcard key={pix._id} pix={pix} setclicked={setclicked} clicked={clicked}/>
           )))}
            
        </Container>
    </Totalcontainer>
  )
}

export default Home