import styled from "styled-components";
import {Alert} from '@mui/material'

export const AdContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: ${({theme})=>theme.bgCard};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 4px  ${({theme})=>theme.shadow};
`
export const AdPicContainer = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
`
export const AdImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
export const AdWriteUp = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
export const AdTitle = styled.h3`
    color: ${({theme})=>theme.textHeading};
    text-transform: uppercase;
    
`
export const AdDesc = styled.p`
    color: ${({theme})=>theme.text};
`
export const AdInfo = styled.div`
    width: 100%;
    display: flex;
    gap: 0.4rem;
    align-items: center;
   padding-left: 10px;
   padding-bottom: 10px;
   font-size: 12px;
`
export const EditionDiv = styled.div`
    width: 4rem;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0,0,0,0.7);
`
export const AdDescContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const PostAdven = styled.p`
    font-size: 12px;
    color: ${({theme})=>theme.text};
`
export const AlertError = styled(Alert)`
    position: fixed;
    top: 1rem;
    left: 0rem;
    
    width: 100%;
    
    z-index: 999999;
`