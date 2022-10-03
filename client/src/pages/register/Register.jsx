import React,{useState} from 'react'
import {Container, Google1,GoogleDiv,GoogleIcon,GooglePara, AlertError, Form, Formwrapper,  Heading, Hr, Img, Input, Logowrapper, Wrapper} from './RegisterCss'
import dlogo from '../../images/dlogo.jpg'
import { TextField } from '@mui/material'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { signInWithPopup,  } from "firebase/auth";
import {auth,provider} from '../../Utils/Firebase'
import { async } from '@firebase/util'
import {useDispatch} from 'react-redux'
import {userSuccess} from '../../Slice/UserSlice'
import loginGoogle from '../../images/google.webp'


const Register = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState()
    const [close, setclose] = useState(false)
    const [errorMessage, seterrorMessage] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // here we handle our form submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            seterrorMessage("password does not match, check and try again")
           return setclose(true)
        }

        const credentials = {
            name,
            email,
            password
        }

        try {
            const uploadCredential = await axios.post('/signup', credentials).then((res)=>console.log(res))
        } catch (error) {
            console.log(error)
        }
        setname('')
        setemail('')
        setpassword('')
        setconfirmPassword('')

        navigate('/login')
    }

    // to handle google login here
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
                <Heading>REGISTER HERE</Heading>
                <Form onSubmit={handleSubmit}>
                    <TextField id="username" label="username" variant="outlined" required type='text' onChange={(e)=>setname(e.target.value)} />
                    <TextField id="email" label="email" variant="outlined" required type='email' onChange={(e)=>setemail(e.target.value)} />
                    <TextField type='password' id="password" label="password" variant="outlined" required onChange={(e)=>setpassword(e.target.value)} />
                    <TextField type='password' id="confirm-password" label="confirm-password" variant="outlined" required onChange={(e)=>setconfirmPassword(e.target.value)}/>
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
                    <p>I already have an account: <Link to='/login'>LOGIN</Link></p>
                </div>
                {
                    close && (<AlertError severity='error' onClose={()=>setclose(false)} >{errorMessage}</AlertError>)
                }
                
            </Formwrapper>
        </Wrapper>
    </Container>
  )
}

export default Register