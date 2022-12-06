import { AppBar, Box, Button, Container, Toolbar, Typography, Stack } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import React from 'react';

export default function Navbar({idUser}) {



  const navigate = useNavigate();

  return (
    <AppBar position='static' /*color='transparent'*/>
      <Container maxWidth="2">
            <Toolbar disableGutters>
              <Typography variant='h6' sx={{ flexGrow: 1}}>
                <Link to='' style={{textDecoration:'none', color:'#eee'}}> Inicio </Link>
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant='contained' color='success'  onClick={() => navigate(`/vendedor/${idUser}/venta`)}>
                    Venta
                </Button>
                <Button variant='contained' color='primary'  onClick={() => navigate(`/vendedor/${idUser}/inventario`)}>
                    Inventario
                </Button>
              </Stack>
            </Toolbar>
        </Container>
      </AppBar>
  )
}
