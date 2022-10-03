import styled from "styled-components"
import GoogleButton from 'react-google-button'
import {Alert} from '@mui/material'

export const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
    
    background-color: inherit;
`

export const Wrapper = styled.div`
    max-width: 400px;
    min-height: 400px;
    background-color: #bdbebf;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    border-radius: 20px;
`
export const Logowrapper = styled.div`
    width: 6rem;
`
export const Img = styled.img`
    width: 100%;
    border-radius: 50%;
`
export const Formwrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
export const Heading = styled.h3`
    margin: 0 auto;
`
export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
export const Input = styled.input`
    width: 100%;
    padding: 15px;
    font-weight: 700;
    background-color: #17421e;
    border: 0ch;
    border-radius: 10px;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
`
export const Hr = styled.hr`
    border: 1px solid black;
    background-color: black;
    margin-top: 1rem;
`

export const AlertError = styled(Alert)`
    position: fixed;
    top: 1rem;
    left: 0rem;
    
    width: 100%;
    
    z-index: 999999;
`

export const Google1 = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2828f1;
    gap: 1rem;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;

    &:hover{
        cursor: pointer;
        background-color: blue ;
    }
    
`
export const GoogleDiv = styled.div`
    width: 2.5rem;

`
export const GoogleIcon = styled.img`
    width: 100%;
    border-radius: 50%;
`
export const GooglePara = styled.p`
    color: white;
`