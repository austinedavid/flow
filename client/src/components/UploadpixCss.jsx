import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: ${({theme})=>theme.textHeading};
`
export const Wrapper = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border: 1px solid black;
    padding: 5px;
    align-items: center;
    border-radius: 10px;
    background-color: ${({theme})=>theme.bgCard};
    color: ${({theme})=>theme.ext};
    box-shadow: 0px 1px 4px ${({theme})=>theme.shadow};
`
export const Heading = styled.h4`
    font-family: 'Alumni Sans Pinstripe', sans-serif;
`
export const Labels = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
export const Label =styled.label`
    font-size: 10px;
`
export const Nameinput =styled.input`
    width: 100%;
    padding: 5px;
`
export const Inputgroup = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`
export const Btnsuccess = styled.button`
    width: 100%;
    padding: 10px;
    background-color: green;
    border-radius: 10px;
    color: white;
    border: 0ch;
    cursor: pointer;
`
export const Btncancel = styled.button`
    width: 100%;
    padding: 10px;
    background-color: red;
    border-radius: 10px;
    color: white;
    border: 0ch;
    cursor: pointer;
`
export const Textarea = styled.textarea`
    width: 100%;
    height: 5rem;
    padding: 10px;
`