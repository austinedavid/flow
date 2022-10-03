import React,{useState, useEffect} from 'react'
import { Container, AlertError, AdDescContainer, PostAdven, InputGroup,EditionDiv, Totalcontainer, Writeupdiv,Adventuredisplay, Heading, Input, Label, Textarea, Buttonsuccess, Buttoncancel, WriteupWrapper, AdPicContainer, AdImg, AdWriteUp, AdTitle, AdDesc, AdContainer, AdInfo } from './AdventureCss'
import skeletonObject from '../../components/Skeletonmap'
import Skeletonall from '../../components/Skeleton'
import Videomodel from '../../components/Videomodel';
import adpic from '../../images/adpix.webp'
import {AlertTitle} from '@mui/material'

import app from '../../Utils/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import {adventureFailure, adventurePending, adventureSuccess} from '../../Slice/AdventureSlice'
import { async } from '@firebase/util';
import AdventureCard from '../../components/AdventureCard';


const Adventure = () => {
  
  // gathering the required input data for adventures
  const[img, setimg] = useState()
  const[imgprogress, setimgprogress] = useState()
  const[heading, setheading] = useState()
  const[imgUrl, setimgUrl] = useState()
  const[desc, setdesc] = useState()
  const[toUpdate, settoUpdata] = useState(false)
  const[deleteId, setdeleteId] = useState()
  const[alertshow, setalertshow] = useState(false)
  const[alertMessage, setalertMessage] = useState()
  const[updateDeclined, setupdateDeclined] = useState(false)
  const[testing, settesting] = useState([])
  
 

  // making use of use dispatch and selector from react-redux
  const dispatch = useDispatch()
  const {adventure,loading} = useSelector((state)=>state.adventure)

useEffect(()=>{
  const fetchingAdventure = async()=>{
    dispatch(adventurePending())
    try {
      const gottenAdventures = await axios.get('/getAdventure').then((res)=>{
        dispatch(adventureSuccess(res.data))
        settesting(res.data)
        
      })
    } catch (error) {
      console.log(error)
    }
  
  }

  fetchingAdventure()
},[dispatch])

// here we handle the functionality of uploading to google
const uploadToGoogle = ()=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + img.name
  const imgRef = ref(storage, fileName)
  const uploadTask = uploadBytesResumable(imgRef, img);

  uploadTask.on('state_changed',
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setimgprogress(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setimgUrl(downloadURL);
    });
  }
);
}
console.log(testing)

// here we make use of useeffect to trigget change in pix to get uploaded to google
useEffect(()=>{
  img && uploadToGoogle()
},[img])

// here we upload our adventures to the data base
const handleUploadAdventures = async()=>{
  const adventurePost = await axios.post('/createAdventure', {imgUrl, heading, desc}, {withCredentials: true}).then((res)=>{
    console.log(res.data)
  })

window.location.reload(false)
}

// here we clear inputs  of someone that does not want to submit
const clearInputs = ()=>{
  setdesc('')
  setheading('')
  setimgprogress('')
}

// here we handle our
const handleUpdateAdventures = async()=>{
  await axios.put(`/updateAdventure/${deleteId}`, {imgUrl, heading, desc}, {withCredentials: true}).then((res)=>{
    setalertMessage(res.data)
    
    window.location.reload(false)
  }).catch((error)=>{
    setupdateDeclined(true)
  })
  settoUpdata(false)
  
  
}
  return (
    <Totalcontainer>
      <Container>
        <Adventuredisplay>
          {
            loading && (skeletonObject.map((each)=>(
              <Skeletonall key={each.id}/>
            )))
          }
          {testing && (testing.map((adventure)=>(
            <AdventureCard key={adventure._id} adventure={adventure} setdesc={setdesc} setheading={setheading} setdeleteId = {setdeleteId} settoUpdata={settoUpdata}/>
          )))}
        </Adventuredisplay>
        <WriteupWrapper>
        <Writeupdiv>
          <Heading>WRITE YOUR ADVDENTURES</Heading>
          <InputGroup>
            <div>
            <Label>select your adventure picture below</Label>
            {
              imgprogress > 0 ? (<p>loading: {imgprogress}%</p>) : 
              (<Input type='file' accept='image/*' onChange={(e)=>setimg(e.target.files[0])}/>)
            }
            
            </div>
            <Input value={heading} type='text' placeholder='enter your title' onChange={(e)=>setheading(e.target.value)}/>
            <Textarea value={desc} placeholder='write in details about your adventure' onChange={(e)=>setdesc(e.target.value)}/>
            {
              !toUpdate? (<Buttonsuccess onClick={handleUploadAdventures}>SUBMIT</Buttonsuccess>):
              (<Buttonsuccess onClick={handleUpdateAdventures}>UPDATE</Buttonsuccess>)
            }
            
            
            <Buttoncancel onClick={clearInputs}>CANCEL</Buttoncancel>
          </InputGroup>
        </Writeupdiv>
        </WriteupWrapper>
      </Container>
      {
        alertshow && (<AlertError severity='success' variant='filled' onClose={()=>{setalertshow(false)}}><AlertTitle>AUTHORIZED</AlertTitle>{alertMessage}</AlertError>)
      }
      {
        updateDeclined && (<AlertError severity='error' variant='filled' onClose={()=>setupdateDeclined(false)}><AlertTitle>UNAUTHORIZED</AlertTitle>You can only update your adventures!!!</AlertError>)
      }
      
    </Totalcontainer>
  )
}

export default Adventure