import * as React from 'react';
import { useState } from 'react';
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
      BoozeBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleChangeEmail = e => {
    setEmail(e.target.value); 
  }
  const handleChangeFirstName = e => {
    setFirstName(e.target.value);
  }
  const handleChangeLastName = e => {
    setLastName(e.target.value);  
  }
  const handleChangePassword = e => {
    setPassword(e.target.value);  
  }
  const handleChangeAge = e => {
    setAge(e.target.value); 
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(firstName===''||lastName===''||email===''||password===''||age===''){
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
    else if(age<20){
      alert('อายุ 20 ปีขึ้นไปถึงจะสามารถใช้งาานได้')
    }
    else{
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const jsonData = {
        email: data.get('email'),
        password: data.get('password'),  
        fname: data.get('firstName'),
        lname: data.get('lastName'),
    }
    fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 'ok'){
          alert('สมัครสมาชิกสำเร็จ')
          window.location = '/login'
        } else {
          alert('สมัครสมาชิกล้มเหลว')
        }
    
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  required
                  fullWidth
                  label="First Name"
                  autoComplete="given-name"
                  autoFocus
                  onChange={handleChangeFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  required
                  fullWidth
                  label="Last Name"
                  autoComplete="family-name"
                  onChange={handleChangeLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="age"
                  name="age"
                  value={age}
                  label="Age"
                  required
                  fullWidth
                  autoComplete="age"
                  onChange={handleChangeAge}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  value={email}
                  label="Email"
                  required
                  fullWidth
                  autoComplete="email"
                  onChange={handleChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  value={password}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept Sign up"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}