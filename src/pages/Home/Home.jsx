import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
// import EventPage from '../../pages/EventPage/EventPage';
import Button from '@mui/material/Button';

//appBar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';


const Home = ({ user, setUser }) => {

  const local = localStorage.getItem('User')
  const User = JSON.parse(local)

  useEffect(() => {
    if (user === "אורח" && User !== null) {

      // console.log("user", user)
      // console.log("User", User)

      setUser(User)
      // window.location.reload()
      console.log("user1", user)

    }
  }, []);


  let navigate = useNavigate()

  function handleClickOnEvent(eventId) {
    console.log('Button was clicked!');
    localStorage.setItem('eventId', eventId);
    console.log(eventId);
    navigate("/event")
  }

  function handleLogout() {
    if (localStorage.getItem('User') !== null) {
        localStorage.removeItem('User');
      }
    setUser("אורח")
    console.log(user)
    // window.location.reload()
    navigate('/');
  }
  
  function handleLogin() {
    navigate('/Login');
    console.log('Login')
  }


  return (
    <div>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton> */}
          {user !== "אורח" && <Button color="inherit" onClick={handleLogout}><LogoutIcon /></Button> }
          {user === "אורח" && <Button color="inherit" onClick={handleLogin}><LoginIcon /></Button> } 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Eventify
          </Typography>
          <Typography color="inherit">{user.username}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Button className='eventName' variant="contained" onClick={() => handleClickOnEvent(`63f223d550b543e0272d3257`)}>זולה בים אוגוסט 2023 🏖️</Button>
    </div>

  )
}

export default Home