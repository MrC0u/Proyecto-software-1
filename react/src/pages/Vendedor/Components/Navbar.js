import { AppBar, Box, Button, Container, Toolbar, Typography, Stack } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import React from 'react';

export default function Navbar({idUser}) {



  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
          <Container>
            <Toolbar>
              <Typography variant='h6' sx={{ flexGrow: 1}}>
                <Link to='' style={{textDecoration:'none', color:'#eee'}}> Inicio </Link>
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant='contained'  onClick={() => navigate(`/vendedor/${idUser}/venta`)}>
                    Venta
                </Button>
                <Button variant='contained'  onClick={() => navigate(`/vendedor/${idUser}/inventario`)}>
                    Inventario
                </Button>
                <Button variant='contained' color='warning' onClick={() => navigate(`/vendedor/${idUser}/cambioClave`)}>
                    Cambio Clave
                </Button>
                <Button variant='contained' color='error' onClick={() => navigate(`/`)}>
                    Salir
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  )
}
