// import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import SignUo from './pages/SignUp';
import About from './pages/About';
import Projects from './pages/Projects';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUo />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

