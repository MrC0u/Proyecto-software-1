import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Button, Backdrop, ClickAwayListener, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



export const InventAdmin = () => {
  //BASE DE DATOS FICTICIA
  //const inv= inventario;
  const navigate = useNavigate();

  const [inv, setInv] = useState([])

  const loadProductos = async () => {

    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
    const data = await response.json();
    console.log(data);
    setInv(data);
  }

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);


  const handleClose = () => {
    setOpen(false);
    console.log('close')
  }

  const handleClick = (data) => {
    setSelection(data)
    setOpen((prev) => !prev)
    console.log('handle')
  }

  useEffect(() => {
    loadProductos();
  }, [])

  const BorrarProducto = async (data) => {

    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/deleteProducto/${data}`, {
      method: 'DELETE'
    });
    console.log(response);
    loadProductos();
  }

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ borderRadius: 2, mt: 1, /*backgroundColor: 'black'*/ }}>

        <Grid sx={{ ml: 5 }}>
          <Typography>
            <h1>Inventario Admin</h1>
          </Typography>
        </Grid>

        <Grid sx={{ minHeight: '46px', minWidth: '46px', mr: 5 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/admin/addProducto")}
            sx={{ minHeight: 50, minWidth: 100 }}
          >
            Agregar
          </Button>
        </Grid>
        
      </Grid>

      <Grid wrap="wrap" container alignItems="center" justifyContent="flex-start" direction="row" sx={{ overflow: 'auto', borderRadius: 2, width: '100%', minHeight: 400, maxHeight: 700, mt: 2, backgroundColor: '#DFDFDF' }}>
        {
          inv.map(data => (
            <Card sx={{ maxWidth: 300, minWidth: 300, minHeight: 300, ml: 4, mr: 2, mt: 3, mb: 3 }}>
              <CardActionArea
                onClick={() => { handleClick(data) }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image="https://www.smashbros.com/wiiu-3ds/images/character/link/main.png"
                  alt={data.imagen}
                />

                <CardContent>
                  <Typography>
                    Nombre: {data.nombre}
                  </Typography>

                  <Typography>
                    Precio Venta: {data.precioVenta}
                  </Typography>

                  <Typography>
                    Categoria: {data.categoria}
                  </Typography>

                  <Typography>
                    Distribuidor: {data.distribuidor}
                  </Typography>

                  <Typography>
                    Stock: {data.cantidad}
                  </Typography>

                  <Typography>
                    Precio compra: {data.precioCompra}
                  </Typography>

                  <Typography>
                    Descripcion: {data.detalle}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          ))
        }
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <></>
        <Grid container wrap="nowrap" justifyContent="flex-end" sx={{ borderRadius: 2, height: '50%', width: '50%', backgroundColor: '#DFDFDF' }}>

          <Grid spacing={2} sx={{ height: '90%', width: '90%', mt: 3 }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              height="140"
              image="https://www.smashbros.com/wiiu-3ds/images/character/link/main.png"
              alt={selection?.imagen}
            />

            <CardContent>
              <Typography>
                Nombre: {selection?.nombre}
              </Typography>

              <Typography>
                Precio Venta: {selection?.precioVenta}
              </Typography>

              <Typography>
                Categoria: {selection?.categoria}
              </Typography>

              <Typography>
                Distribuidor: {selection?.distribuidor}
              </Typography>

              <Typography>
                Stock: {selection?.cantidad}
              </Typography>

              <Typography>
                Precio compra: {selection?.precioCompra}
              </Typography>

              <Typography>
                Descripcion: {selection?.detalle}
              </Typography>
            </CardContent>
            <Button
              onClick={ () => { BorrarProducto(selection?.id) }}
              variant="contained"
              color="error"
            >
              Borrar
            </Button>
            <Button
              onClick={() => {console.log('Se Modifica: ', selection.nombre)}}
              variant="contained"
              color="warning"
              sx={{ ml: 5 }}
            >
              Modificar
            </Button>
          </Grid>


          <Grid sx={{ position: "flex", top: '50%', right: '50%', zIndex: 2000, height: 50, width: 50, mt: 3, mr: 3 }}>
            <Button onClick={handleClose} color='error' sx={{ height: 50, width: 50 }}>
              <CloseIcon sx={{ height: 50, width: 50 }} />
            </Button>
          </Grid>

        </Grid>
      </Backdrop>

    </div>
  );
};
