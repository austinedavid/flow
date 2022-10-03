import React, {useState, useEffect} from 'react'
import { Btncancel,  Textarea, Btnsuccess, Container, Heading, Inputgroup, Label, Labels, Nameinput, Wrapper } from './UploadvideoCss'
import BackupIcon from '@mui/icons-material/Backup';
import app from '../Utils/Firebase'
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Navigate, useNavigate} from 'react-router-dom'
import {closeProfile} from '../Slice/ProfileSlice'
import {useDispatch} from 'react-redux'


const Uploadvideo = () => {
  // creating use states to handle all file upload to google
  const[video, setvideo] = useState()
  const[videoUrl, setvideoUrl] = useState()
  const[videoprogress, setvideoprogress] = useState()
  const[desc, setdesc] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // here we execute the upload to google located below the useeffect
  const uploadToGoogle = ()=>{
    const storage = getStorage(app)
    const filename = new Date().getTime() + video.name
    const storageRef = ref(storage, filename)

    const uploadTask = uploadBytesResumable(storageRef, video);
    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setvideoprogress(Math.round(progress));
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
      setvideoUrl(downloadURL);
    });
  }
);

  }

  // here we create a useeffect that can handle auto upload to firebase immediatly there is change
  useEffect(()=>{
    video && uploadToGoogle()
  },[video])

  // here we upload to our database
  const handleUpload = async()=>{
    const videoSent = await axios.post('/createVideo', {videoUrl, desc}, {withCredentials: true})
    dispatch(closeProfile())
    navigate('/videos')
    window.location.reload(false)
      
      
    
  }

  // here we handle cancel, if the user dont want to upload
  const handleCancel = ()=>{
    setdesc('')
    setvideoprogress('')
  }
  return (
    <Container>
        <Heading>upload your videos here</Heading>
        <Wrapper>
            <BackupIcon sx={{width: '100px', height: '100px'}}/>
            <Labels>
                <Label>select video below</Label>
                {
                  videoprogress > 0? (<p>loading: {videoprogress}%</p>):
                  ( <Nameinput type='file' accept='video/*' onChange={(e)=>setvideo(e.target.files[0])}/>)
                }
               
                < Textarea value={desc} type='text' placeholder='add a description to your picture' onChange={(e)=>setdesc(e.target.value)}/>
                <Inputgroup>
                    <Btnsuccess onClick={handleUpload}>UPLOAD</Btnsuccess>
                    <Btncancel onClick={handleCancel}>Cancel</Btncancel>
                </Inputgroup>
            </Labels>
        </Wrapper>
    </Container>
  )
}

export default Uploadvideo