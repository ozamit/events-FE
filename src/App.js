import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EventPage from './pages/EventPage/EventPage';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function App() {

  const [user, setUser] = useState("אורח")

  const local = localStorage.getItem('User')
  const User = JSON.parse(local)

  // use navigate breaks the app...
  // const navigate = useNavigate();

  useEffect(() => {
    console.log('Refresh')

    if (User === null && user !== "אורח") {
      setUser("אורח")
      console.log("1")
    }
    if (User === null && user === "אורח") {
      console.log("already not logged")
      console.log("2")
    }

    if (User !== null && user !== "אורח") {
      console.log("already logged")
      console.log("3")
    }
    if (User !== null && user === "אורח") {
      setUser(User)
      console.log("4")
    }
    
  }, []);

  useEffect(() => {
    console.log('Refresh')

    if (User === null && user !== "אורח") {
      setUser("אורח")
      console.log("1")
    }
    if (User === null && user === "אורח") {
      console.log("already not logged")
      console.log("2")
    }

    if (User !== null && user !== "אורח") {
      console.log("already logged")
      console.log("3")
    }
    if (User !== null && user === "אורח") {
      setUser(User)
      console.log("4")
    }
    
  }, [user]);

// function handleLogout() {
//   localStorage.removeItem('User');
//   setUser("אורח")
//   window.location.reload()
// }

// function handleLogin() {
//   console.log('Login')
// }

function handleRefresh() {
  window.location.reload();
}

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Event" element={<EventPage setUser={setUser} user={user} handleRefresh={handleRefresh}/>} />
        </Routes>  

      </BrowserRouter>
    </div>
  );
}

export default App;
