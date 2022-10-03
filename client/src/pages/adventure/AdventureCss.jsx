import styled from "styled-components";
import {Alert} from '@mui/material'

export const Totalcontainer = styled.div`
    width: 100%;
  
`
export const Container = styled.div`
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    margin: 0 auto;
    gap: 2rem;

    @media (max-width: 40rem){
        flex-direction: column-reverse;
    }
    
`
export const Writeupdiv = styled.div`
    
    background-color: #f0f1f5;
    min-height: 2rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
`
export const Adventuredisplay = styled.div`
    flex: 2;
    display: grid;
    
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media(max-width: 40rem){
        grid-template-columns: 1fr;
    }
`
export const Heading = styled.h3`
    margin: 5px auto;
    color: black;
    font-family: 'Pacifico', cursive, sans-serif;
    font-size: 15px;
    
`
export const InputGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
`
export const Input = styled.input`
    width: 100%;
    padding: 10px 5px;
    
`
export const Label = styled.label`
    font-size: 11px;
`
export const Textarea = styled.textarea`
    width: 100%;
    height: 5rem;
    padding: 10px;
    
`
export const Buttonsuccess = styled.button`
    width: 100%;
    background-color: green;
    color: white;
    padding: 10px;
    border: 0ch;
    cursor: pointer;
    border-radius: 10px;
`
export const Buttoncancel = styled.button`
    width: 100%;
    background-color: red;
    color: white;
    padding: 10px;
    border: 0ch;
    cursor: pointer;
    border-radius: 10px;
`
export const WriteupWrapper = styled.div`
    flex: 1;
`
export const AlertError = styled(Alert)`
    position: fixed;
    top: 1rem;
    left: 0rem;
    
    width: 100%;
    
    z-index: 999999;
`

    

