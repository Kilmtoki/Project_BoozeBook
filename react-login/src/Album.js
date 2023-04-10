import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import STATE from './images/STATE.png'
import Table from './images/Table.png'
import Home from './Home';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/album">
        BoozeBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token 
      },
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === 'ok'){
        //alert('authen sucess')
      } else {
        alert('authen failed')
        localStorage.removeItem('token');
        window.location = '/login'
      }
  
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [])
  
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12];
  let i = 1;
  const handlewindow = (event) => {
    event.preventDefault();
    window.location = '/payment'
  }
  const handleBoozeBook = (event) => {
    event.preventDefault();
    window.location = '/Album'
  }
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }
  return (
    <ThemeProvider theme={theme}>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" style={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,color:"#ffffff"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "#ffffff"  }}  onClick={handleBoozeBook}>
                BoozeBook
          </Typography>
          <Button color="inherit" sx={{ color: "#ffffff" }} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Home />
      <main>
        {/* Hero unit */}
        <Box
          color="inherit"
          sx={{
            backgroundColor: "#ffffff",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              แผนผังร้าน
              <div style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}>
                <img 
                  src={STATE}
                  alt="STATE"
                  style={{ 
                    maxWidth: "100%",
                    maxHeight: "100%",
                    margin: "auto",
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </Typography >
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
            </Stack>
          </Container>
        </Box>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
              เลือกโต๊ะที่ต้องการจอง
          </Typography >
       
        <Container sx={{ py: 8, background: 'black' }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '56.25%',
                      objectFit: 'cover',
                    }}
                    image={Table}
                    onClick={handlewindow}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Table No.{i++} 
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      ราคา 399
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Button size="small"onClick={handlewindow}>เลือกเพื่อชำระเงิน </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}