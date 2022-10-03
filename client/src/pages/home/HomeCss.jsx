import styled from "styled-components";

export const Totalcontainer = styled.div`
    width: 100%;
   
`
export const Container = styled.div`
    max-width: 1000px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    padding: 10px;
    margin: 0 auto;

   

    @media (max-width: 60rem){
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 40rem){
        grid-template-columns: 1fr;
    };
   
  `
  

  export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: ${({theme})=>theme.bgCard};
    color: ${({theme})=>theme.text};
  `
  export const ImageChannel = styled.div`
    width: 100%;
    padding: 5px 10px;
    display: flex;
    gap: 0.3rem;

  `
  export const ImageChannelDetials = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 11px;
  `
  export const IframeContainer = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 0px;
  `
  export const Time = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
  `
  export const Imageshow = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 0ch;
  `
  export const Imagetitle = styled.div`
    width: 100%;
    padding: 0 10px;
  `
  export const Modification = styled.div`
    display: flex;
    gap: 0.2rem;
    align-items: center;
    margin-right: 0px;
  `
  export const BottomPart = styled.div`
    width: 100%;
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  `
  export const SubBottomPart = styled.div`
    display: flex;
    gap: 0.3rem;
    align-items: centrr;
  `
  