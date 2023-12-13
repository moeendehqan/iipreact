import axios from "axios"
import { OnRun } from "../config/OnRun"
import {getCookie, setCookie} from '../componets/cookie/cookie'
import { useNavigate , Outlet } from "react-router-dom";
import {useEffect} from 'react'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LanIcon from '@mui/icons-material/Lan';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PeopleIcon from '@mui/icons-material/People';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RuleIcon from '@mui/icons-material/Rule';

const Desk = () =>{
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    const id = getCookie('id')
    const navigate = useNavigate()

    const checkCookie = () =>{
        if (id.length==0) {
            setCookie('id','',0)
            navigate('/')
        }else{
            axios.post(OnRun+'/cookie', {id:id})
            .then(response=>{
                if(!response.data){
                    setCookie('id','',0)
                    navigate('/')
                }
            })

        }
    }

    useEffect(checkCookie,[])

    const drawerWidth = 240;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));

      const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              width: theme.spacing(7),
              [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
              },
            }),
          },
        }),
      );
      
return(
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              میزکار
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">

                <ListItemButton onClick={()=>navigate('users')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="کاربران" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('connection')}>
                <ListItemIcon>
                    <LanIcon />
                </ListItemIcon>
                <ListItemText primary="اتصالات" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('rules')}>
                <ListItemIcon>
                    <RuleIcon />
                </ListItemIcon>
                <ListItemText primary="قوانین" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('live')}>
                <ListItemIcon>
                    <LiveTvIcon />
                </ListItemIcon>
                <ListItemText primary="پخش زنده" />
                </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
            <Toolbar />

            <Outlet />
        </Box>
        </Box>
)
    
}


export default Desk