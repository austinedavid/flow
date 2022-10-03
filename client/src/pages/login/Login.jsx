import React,{useState} from 'react'
import {Container, Google1,GoogleDiv,GoogleIcon,GooglePara, AlertError, Form, Formwrapper, Google, Heading, Hr, Img, Input, Logowrapper, Wrapper} from './LoginCss'
import dlogo from '../../images/dlogo.jpg'
import { TextField, AlertTitle } from '@mui/material'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'
import { async } from '@firebase/util'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {userFailure, userPending, userSuccess} from '../../Slice/UserSlice'
import { signInWithPopup,  } from "firebase/auth";
import {auth,provider} from '../../Utils/Firebase'
import loginGoogle from '../../images/google.webp'


const Login = () => {
    const [email, setemail ] = useState();
    const [password, setpassword] = useState()
    const [close, setclose] = useState(false)
    const [errorMessage, seterrorMessage] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()
// creaing axios header here
const config = {
    headers:{
        "Content-Type": "application/json"
    },
    widthCredentials: true
}
    // handling signin of user here
    const handleSubmit = async(e)=>{
        e.preventDefault()
            dispatch(userPending())
        
            const login = await axios.post("/signin", {
                email, password
            }, config).then((res)=>{
                console.log(res)
                dispatch(userSuccess(res.data))
                if(res.status === 200){
                    navigate('/')
                }
               
            }).catch((error)=>{
                if(error){
                    seterrorMessage('Invalid username or password !!!')
                    return setclose(true)
                }
            })
       
    }

    // @login with google account
    const handleGoogleLogin = async(e)=>{
        e.preventDefault()
        signInWithPopup(auth, provider).then((result)=>{
          
              axios.post("/google", {
                name: result.user.displayName,
                email: result.user.email,
                imgUrl: result.user.photoURL
              }).then((results)=>{
                dispatch(userSuccess(results.data))
                navigate('/')
              })
            console.log(result)
            
        }).catch((error)=>{
            console.log(error)
        })

        
    }
  return (
    <Container>
        <Wrapper>
          
            <Formwrapper>
                <Heading>LOGIN HERE</Heading>
                <Form onSubmit={handleSubmit}>
                    <TextField id="email" label="email" variant="outlined" required type='email' onChange={(e)=>setemail(e.target.value)} />
                    <TextField type='password' id="password" label="password" variant="outlined" required onChange={(e)=>setpassword(e.target.value)}/>
                   
                    <Input type='submit'></Input>
                </Form>
                <Hr/>
                <Google1 onClick={handleGoogleLogin}>
                    <GoogleDiv>
                        <GoogleIcon src={loginGoogle}/>
                    </GoogleDiv>
                    <GooglePara>sign in with google</GooglePara>
                </Google1>
                <Hr/>
                <div>
                    <p>I don't have an account: <Link to='/register'>REGISTER</Link></p>
                </div>
                {
                    close && (<AlertError severity='error'  onClose={()=>setclose(false)} >{errorMessage}</AlertError>)
                }
            </Formwrapper>
        </Wrapper>
    </Container>
  )
}

export default Login