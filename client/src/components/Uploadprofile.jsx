import { AlertTitle, Avatar } from '@mui/material'
import React,{useState, useEffect} from 'react'

import { Heading,AlertError, Label,  Btngroup, Container, Wrapper, Inputcontainer, Avatargroup, Labels, Nameinput, Btnsuccess, Btncancel} from './UploadprofileCss'
import {useDispatch, useSelector} from 'react-redux'
import app from '../Utils/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import {userSuccess} from '../Slice/UserSlice'


const Uploadprofile = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const [img, setimg] = useState()
    const [imgprogress, setimgprogress] = useState()
    const [name, setname] = useState()
    const [imgUrl, setimgUrl] = useState()
    const dispatch = useDispatch()
    const [alertsuccess, setalertsuccess] = useState(false)

    // here we handle all uploads to google
    const uploadToGoogle = ()=>{
        const storage = getStorage(app)
        const filename = new Date().getTime() + img.name
        const storageRef = ref(storage, filename)

        const uploadTask = uploadBytesResumable(storageRef, img);

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
            return;
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

    // setting a useEffect to trigger uploading of file to google
    useEffect(()=>{
        img && uploadToGoogle()
    }, [img])

    console.log(imgUrl)
    // here we make a put request to update the user profiles
    const handleUpdate = async()=>{
      if(name === ''){
        setname(currentUser.name)
      }
        const userUpdate = await axios.put(`/update/${currentUser._id}`, {name, imgUrl,}, {withCredentials: true}).then((res)=>{
            dispatch(userSuccess(res.data))
            setalertsuccess(true)
            setimgprogress('')
            
        })
    }
    const handleCancel = async()=>{
        
        setimgprogress('')
        setname('')
    }
  return (
    <Container>
        <Heading>Update your profile</Heading>
        <Wrapper>
            <Avatargroup>
                <Avatar src={currentUser.imgUrl} sx={{width: '100px', height: '100px'}}/>
                <Heading>{currentUser.name}</Heading>
            </Avatargroup>
            
            <Inputcontainer>
                <Labels>
                    <Label>select your profile picture</Label>
                    {
                        imgprogress > 0? (<p>loading: {imgprogress}%</p>):
                        (<Nameinput  type='file' accept='image/*' onChange={(e)=>setimg(e.target.files[0])}/>)
                    }
                    
                </Labels>
                <Labels>
                    <Nameinput value={name} type='text' placeholder='enter your new username' onChange={(e)=>setname(e.target.value)}/>
                    
                </Labels>
                <Btngroup>
                    <Btnsuccess onClick={handleUpdate}>UPDATE</Btnsuccess>
                    <Btncancel onClick={handleCancel}>CANCEL</Btncancel>
                </Btngroup>
            </Inputcontainer>
        </Wrapper>
        {
          alertsuccess && (<AlertError onClose={()=>setalertsuccess(false)} severity='success' variant='filled'><AlertTitle>AUTHORIZED</AlertTitle>Profile update successful</AlertError>)
        }
    </Container>
  )
}

export default Uploadprofile