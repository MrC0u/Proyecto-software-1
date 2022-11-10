import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import {Grid,Card,CardContent,CardMedia,Typography,CardActionArea,Stack,Button} from '@mui/material';



export const InventAdmin = () => {
  //BASE DE DATOS FICTICIA
  //const inv= inventario;
  const navigate = useNavigate();

  const [inv,setInv] = useState([])

  const loadProductos = async () => {

    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
    const data = await response.json();
    console.log(data);
    setInv(data);
  }

  useEffect( () => {
    loadProductos();
  }, [])

  return (
    <div>
      <Stack direction="row" sx={{ my: 5 }}>
        <Typography sx={{ flexGrow: 1 }}>
          <h1>Inventario Admin</h1>
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/admin/addProducto")}
        >
          Agregar
        </Button>
      </Stack>

      <Grid>
        <Card sx={{ maxWidth: 345 }}>
          {inv.map((data) => (
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.smashbros.com/wiiu-3ds/images/character/link/main.png"
                alt={data.imagen}
              />

              <CardContent>
                <Typography>Nombre: {data.nombre}</Typography>

                <Typography>Precio Venta: {data.precioventa}</Typography>

                <Typography>Categoria: {data.categoria}</Typography>

                <Typography>Distribuidor: {data.distribuidor}</Typography>

                <Typography>Stock: {data.stock}</Typography>

                <Typography>Precio compra: {data.preciocompra}</Typography>

                <Typography>Descripcion: {data.detalle}</Typography>

              </CardContent>
            </CardActionArea>
          ))}
        </Card>
      </Grid>
    </div>
  );
};
