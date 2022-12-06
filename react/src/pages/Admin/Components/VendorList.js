import { useEffect, useState } from 'react';
import { Grid, Stack, Card, CardContent, CardMedia, Typography, CardActionArea, Button, Backdrop, ClickAwayListener, Box, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function VendorList({ idUser }) {

  const navigate = useNavigate();

  const [vendedores, setVendedores] = useState([]);

  const loadVendedores = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/vendedores`);
    const data = await response.json();
    console.log(data);
    setVendedores(data);
  }

  const handleDelete = async (id) => {
    const res = await fetch(`http://${process.env.REACT_APP_IP}:4000/delete/${id}`, {
      method: "DELETE",
    })
    console.log(res)

    setVendedores(vendedores.filter((vendedor) => vendedor.id !== id));
  }

  useEffect(() => {
    loadVendedores();
  }, [])

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ borderRadius: 2, mt: 1, /*backgroundColor: 'black'*/ }}>

        <Grid sx={{ ml: 0 }}>
          <Grid container sx={{ alignItems: "center", justifyContent: 'center', backgroundColor: '#424444', ml: 0, mt: 3, width: 400, height: 70, borderRadius: 2 }} >
            <Typography variant="h4">
              Vendor List
            </Typography>
          </Grid>
        </Grid>

        <Grid sx={{ mr: 5 }}>
          <Button variant='contained' color='success' size="large" sx={{ height: 60, width: 200, mt: 3 }} onClick={() => navigate(`/admin/${idUser}/addVendedores`)}>
            Agregar
          </Button>
        </Grid>

      </Grid>
      {
        <Grid sx={{mt:2}}>{
        vendedores.map(vendedor => (
          <Card style={{
            marginBottom: ".5rem",
            backgroundColor: '#1e272e'
          }}
            key={vendedor.id}
          >
            <CardContent style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div style={{ color: 'white' }}>
                <Typography>
                  Id Vendedor: {vendedor.id}
                </Typography>
                <Typography>
                  Nombres: {vendedor.nombre}
                </Typography>
                <Typography>
                  Apellidos: {vendedor.apellido}
                </Typography>
                <Typography>
                  Direccion: {vendedor.direccion}
                </Typography>
                <Typography>
                  Usuario: {vendedor.usuario}
                </Typography>
                <Typography>
                  Clave: {vendedor.clave}
                </Typography>
              </div>
              <div>
                <Button variant='contained' color='error' onClick={() => handleDelete(vendedor.id)}>
                  Borrar
                </Button>
              </div>

            </CardContent>
          </Card>
          ))
        }
        </Grid>
      }
    </div>
  )
}
