import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles.css';
import Image from './Image.png'
import { Routes, Route, useNavigate} from 'react-router-dom';
import OptionPannel from './OptionPannel';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Uva Wellassa University
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

const navigate=useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    navigate('/user')
  };

  const labelStyles = {
    color: 'white', // Change this to your desired label color
  };

  return (
    <div  className='bg'>
<div className='header'>
        <h2 className='title'>Welcome To the UWU Library Managment System</h2>
    </div>
    
    <ThemeProvider theme={defaultTheme}>
    
      <Container component="main" maxWidth="xs" style={{marginTop:300}} >
        
        <Box
          sx={{
          
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:'rgba(0, 0, 0, 0.5)'
             
          }}
        >
           
          <Typography component="h1" variant="h5" color='common.white' >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <TextField
              InputLabelProps={{
                style: labelStyles,
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter Your Nic Number"
              type="text"
              id="password"
              autoComplete="current-password" 
               
            />
            
             
             
          </Box>
        </Box>
        
        <Copyright sx={{ mt:50, mb: 4 }} />
      </Container>
      
    </ThemeProvider>

    
    
    <Routes>
          <Route exact path="/OptionPannel" element={<OptionPannel />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>

        
    </div>
  );
}