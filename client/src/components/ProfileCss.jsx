import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999;
    padding: 10px;
`

export const Wrapper = styled.div`
    width: 1000px;
    height: 500px;
    background-color: ${({theme})=>theme.bg};
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    
    @media (max-width: 60rem){
        overflow: auto;
    }
`
export const Actionbtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: ${({theme})=>theme.text};
`
export const UpdatesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 60rem){
       grid-template-columns : 1fr ;
    }
`