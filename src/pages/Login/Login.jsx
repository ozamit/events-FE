import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';

import { host } from '../../utils/host';

const Login = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("")
    
    let navigate = useNavigate()
    
    const onSubmit = async (data) => {
        console.log(data)
        const res = await axios.put(`${host}/user/login`, data)
        console.log('res:', res)
        if(res.data.status === "success") {
            localStorage.setItem('User', JSON.stringify(res.data.message));
            navigate("/")
        } else {
            console.log('error')
            setError(res.data.message)
        }
    }

    function handelGoToRegister() {
        navigate("/register")
    }

    function handleHome() {
        navigate("/")
    }


  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <HomeIcon color="inherit" onClick={handleHome}></HomeIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Events
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
            {error && 
                <div className='errorMsg'>
                    <Typography>{error}</Typography>
                </div>
                }

    <div className='login_page'>
            
        <div className="loginFormWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="loginBox">
                <Typography className="formTitle">Login</Typography>
                    <TextField
                    className="loginTextField"
                    id="email"
                    label="Email*"
                    variant="outlined"
                    {...register("email", { required: true })}
                    />
                    {errors.firstName && <p>This field is required</p>}
                    <TextField
                    className="loginTextField"
                    id="password"
                    label="Password*"
                    variant="outlined"
                    type="password"
                    {...register("password", { required: true })}
                    />

                    <Button type="submit"
                    className="loginBtn"
                    onClick={onSubmit}
                    variant="contained">Login
                    </Button>
            </Box>
        </form>
        <Typography sx={{ textDecoration: 'underline' }} onClick={handelGoToRegister}>אין לי חשבון, אני רוצה ליצור משתמש חדש</Typography>

        </div>
    </div>
    </div>
  )
}

export default Login