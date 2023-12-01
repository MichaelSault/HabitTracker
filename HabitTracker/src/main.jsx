import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import components
import Navbar from './components/navbar.component.jsx';
import Home from './components/home.component.jsx';
import Login from './components/login.component.jsx';
import SignUp from './components/signup.component.jsx';
import Habits from './components/habitTracker.component.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <> 
    <Navbar />
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/SignUp' element={<SignUp />}/>
            <Route path='/Habits' element={<Habits />}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
  </>
)
