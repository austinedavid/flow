
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import styled,{ThemeProvider} from 'styled-components'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Videos from './pages/videos/Videos';
import Adventure from './pages/adventure/Adventure';
import {Darkmode, Lightmode} from './Utils/Theme'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import ScrollToTop from './components/ScrollToTop';
import Protected from './components/Protected';

const Container = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({theme})=>theme.bg};
`
const Main = styled.div`

`

function App() {
  const {darkmodetheme} = useSelector((state)=> state.settheme)
  
  return (
    <ThemeProvider theme={darkmodetheme? Darkmode : Lightmode}>
    <Container>
      <Router>
      <ScrollToTop>
        <Navbar/>
        <Main>
          
          <Routes>
            <Route path='login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Protected><Home/></Protected>}/>
            <Route path='videos' element={<Protected><Videos/></Protected>}/>
            <Route path='adventure' element={<Protected><Adventure/></Protected>}/>
          </Routes>
          
        </Main>
        </ScrollToTop>
      </Router>
    </Container>
    </ThemeProvider>
  );
}

export default App;
