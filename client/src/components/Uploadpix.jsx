import React,{useState, useEffect} from 'react'
import { Btncancel,  Textarea, Btnsuccess, Container, Heading, Inputgroup, Label, Labels, Nameinput, Wrapper } from './UploadpixCss'
import BackupIcon from '@mui/icons-material/Backup';
import app from '../Utils/Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {closeProfile} from '../Slice/ProfileSlice'
import {useDispatch} from 'react-redux'




const Uploadpix = () => {
  // creating states to handle input data
  const[image, setimage] = useState(undefined)
  const[desc, setdesc] = useState()
  const [imgUrl, setimgUrl] = useState()
  const [imgProgress, setimgProgress] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // @here we set up our upload in the google croud
  const uploadToGoogle = ()=>{

    const storage = getStorage(app)
    const filename = new Date().getTime() + image.name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setimgProgress(Math.round(progress));
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
    console.log(error)
  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setimgUrl(downloadURL);
    });
  }
);

  }

  console.log(imgUrl)

  // @we make use of useEffect here to run immediately there is change in image file.
  // that is, if there is image, then upload 
  useEffect(()=>{
    image && uploadToGoogle()
  }, [image])




  // @here making use of axios, we make a post request to our data base
  const uploadToDB = async(e)=>{
      e.preventDefault()
     
      await axios.post('/createPix', {imgUrl, desc}, {withCredentials: true})
      
      dispatch(closeProfile())
      navigate('/')
      window.location.reload(false)
  }
  
  const clearinputs = ()=>{
    setdesc('')
    setimgProgress('')
  }


  return (
    <Container>
        <Heading>upload your pictures here</Heading>
        <Wrapper>
            <BackupIcon sx={{width: '100px', height: '100px'}}/>
            <Labels>
                
                {
                  imgProgress > 0 ? (<p>loading: {imgProgress}%</p>)
                  :(<div>
                    <Label>select picture below</Label>
                    <Nameinput type='file' accept='image/*' onChange={(e)=>{ setimage(e.target.files[0]) }}/>
                    </div>
                  )
                }
                
                < Textarea value={desc} type='text' placeholder='add a description to your picture' onChange={(e)=>setdesc(e.target.value)}/>
                <Inputgroup>
                    <Btnsuccess onClick={uploadToDB}>UPLOAD</Btnsuccess>
                    <Btncancel onClick={clearinputs}>Cancel</Btncancel>
                </Inputgroup>
            </Labels>
        </Wrapper>
    </Container>
  )
}

export default Uploadpix