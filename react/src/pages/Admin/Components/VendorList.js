import {useEffect, useState} from 'react';
import { Button, Card, CardContent, Typography, Stack } from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function VendorList({idUser}) {

  const navigate = useNavigate();

  const [vendedores, setVendedores] = useState([]);

  const loadVendedores = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/vendedores`);
    const data = await response.json();
    console.log(data);
    setVendedores(data);
  }

  const handleDelete = async (id) => {
    const res = await fetch(`http://${process.env.REACT_APP_IP}:4000/delete/${id}`,{
      method: "DELETE",
    })
    console.log(res)

    setVendedores(vendedores.filter((vendedor) => vendedor.id !== id));
  }

  useEffect( () => {
    loadVendedores();
  }, [])

  return (
    <div>
      <Stack direction="row" sx={{
          my: 5
        }}>
        <Typography sx={{ flexGrow: 1}}>
        <h1>Vendor List</h1>
        </Typography>
        <Button variant='contained' color='success'  onClick={() => navigate('/admin/addVendedores')}>
          Agregar
        </Button>
      </Stack>
      {
        vendedores.map(vendedor =>(
          <Card style ={{
            marginBottom: ".5rem",
            backgroundColor: '#1e272e'
          }}
          key={vendedor.id}
          >
            <CardContent style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div style={{color: 'white'}}>
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
                <Button variant='contained' color='error' onClick={() => handleDelete(vendedor.id) }>
                  Borrar
                </Button>
              </div>

            </CardContent>
          </Card>
        ))
      }
    </div>
  )
}
