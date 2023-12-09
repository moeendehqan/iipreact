import { useEffect, useState } from "react"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import {getCookie, setCookie} from '../componets/cookie/cookie'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
 
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const Longin = () =>{
    const [input, setInput] = useState({username:'', password:''})
    const navigate = useNavigate()

    const submit = () =>{
        axios.post(OnRun+'/login',{username:input.username, password:input.password})
        .then(response=>{
            console.log(response.data)
            if (response.data.reply) {
                setCookie('id',response.data.id,1)
                navigate('/desk')
            }else{
                toast.warning(response.data.msg, {position:"bottom-right"})
            }
        })
    }
    
    const checkCookie = () =>{
        const id = getCookie('id')
        if (id.length>0) {
            axios.post(OnRun+'/cookie', {id:id})
            .then(response=>{
                if(response.data){
                    navigate('/desk')
                }
            })
        }
    }

    useEffect(checkCookie,[])


    return(
        <Container component="main" maxWidth="xs">
        <ToastContainer autoClose={3000} />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود
          </Typography>
          <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="نام کاربری"
              name="username"
              autoComplete="username"
              autoFocus
              value={input.username}
              onChange={(e)=>setInput({...input,username:e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="رمز عبوری"
              type="password"
              id="password"
              autoComplete="current-password"
              value={input.password}
              onChange={(e)=>setInput({...input,password:e.target.value})}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ورود
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  فراموشی رمز عبور
                </Link>
              </Grid>

            </Grid>
          </Box>
        </Box>

      </Container>
    )
}

export default Longin