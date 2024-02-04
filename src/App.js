import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import NoteState from './Context/Notes/NoteState';
// import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import './App.css'

const App = () => {
  return (
    <div className='centerilized-data'>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {/* <Alert message={"Alert message : "}/> */}
          <Routes>
            <Route exact index element={<Home />} />
            <Route exact path='home' element={<Home />} />
            <Route exact path='about' element={<About />} />
            <Route exact path="contact" element={<Contact />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </NoteState >
    </div>
  )
}

export default App