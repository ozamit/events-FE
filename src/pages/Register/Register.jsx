import React, { useState } from 'react'
import "./Register.css"
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

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("")
    
    let navigate = useNavigate()
    
    const onSubmit = async (data) => {
        console.log(data)
        const res = await axios.put("http://localhost:3000/user/register", data)
        console.log(res)
        if (res.data.status === "success") {
        navigate("/login")
    } else {
        console.log('error')
        setError(res.data.message)
    }}
    

    function handleHome() {
        navigate("/")
    }

    function handelGoToLogin() {
        navigate("/login")
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
        <div className="loginFormWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="loginBox">
                <Typography className="formTitle">Register</Typography>
                    <TextField
                    className="loginTextField"
                    id="username"
                    label="username*"
                    variant="outlined"
                    {...register("username", { required: true })}
                    />
                    <TextField
                    className="loginTextField"
                    id="email"
                    label="Email*"
                    variant="outlined"
                    type="email"
                    {...register("email", { required: true })}
                    />
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
                    variant="contained">Register
                    </Button>
            </Box>
        </form>
        <Typography sx={{ textDecoration: 'underline' }} onClick={handelGoToLogin}>בעצם יש לי חשבון 🤦🏻‍♂️, חזרה להתחברות</Typography>

        </div>
    </div>
  )
}

export default Register