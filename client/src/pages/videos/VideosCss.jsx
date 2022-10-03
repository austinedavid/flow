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


  