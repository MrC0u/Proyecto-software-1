import {Card, CardContent, Grid, Typography, TextField, Button, CircularProgress} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function VendorForm() {

  const [vendedor, setVendedor] = useState({
    nombre:'',
    apellido:'',
    direccion:'',
    usuario:'',
    clave:'',
  })

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setVendedor({...vendedor, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch('http://localhost:4000/create', {
      method: 'POST',
      body: JSON.stringify(vendedor),
      headers: {"Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data)
    setLoading(false);
    navigate('/admin/listVendedores');
  };

  return (
    
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style={{
          backgroundColor: "#1e272e",
          padding: "1rem",
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            Crear Vendedor
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>

              <TextField 
                variant='filled' 
                placeholder='Nombres del Vendedor' 
                label='Nombres'
                sx={{
                  display:'block',
                  margin:'.10rem 0'
                }}
                
                name='nombre'
                onChange={handleChange}
                inputProps={{ style: {color:"white"} }}
                InputLabelProps={{ style: {color:"white"} }}
              />

              <TextField 
                variant='filled' 
                placeholder='Apellidos del Vendedor' 
                label='Apellidos'
                sx={{
                  display:'block',
                  margin:'.10rem 0'
                }}  
                
                name='apellido'
                onChange={handleChange}
                inputProps={{ style: {color:"white"} }}
                InputLabelProps={{ style: {color:"white"} }}
              />

              <TextField 
                variant='filled' 
                placeholder='Direccion de Residencia' 
                label='Direccion'
                sx={{
                  display:'block',
                  margin:'.10rem 0'
                }}  

                name='direccion'
                onChange={handleChange}
                inputProps={{ style: {color:"white"} }}
                InputLabelProps={{ style: {color:"white"} }}
              />

              <TextField 
                variant='filled' 
                label='Nombre de Usuario '
                sx={{
                  display:'block',
                  margin:'.10rem 0'
                }}  

                name='usuario'
                onChange={handleChange}
                inputProps={{ style: {color:"white"} }}
                InputLabelProps={{ style: {color:"white"} }}
              />

              <TextField 
                variant='filled' 
                label='Clave de Ingreso '
                sx={{
                  display:'block',
                  margin:'.10rem 0'
                }}  

                name='clave'
                onChange={handleChange}
                inputProps={{ style: {color:"white"} }}
                InputLabelProps={{ style: {color:"white"} }}
              />

              <Button variant='contained' color='primary' type='submit' disabled={!vendedor.nombre || !vendedor.apellido || !vendedor.direccion || !vendedor.usuario || !vendedor.clave } >
                { loading ? (
                  <CircularProgress color='inherit' size={24} /> 
                  ) : (
                    "Crear"
                  )}
              </Button>

            </form>
          </CardContent>
        </Card>

      </Grid>
    </Grid>
  )
}
