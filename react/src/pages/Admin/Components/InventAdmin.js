import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Button, Backdrop, ClickAwayListener, Box, TextField, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



export const InventAdmin = ({idUser}) => {
  //BASE DE DATOS FICTICIA
  //const inv= inventario;
  const navigate = useNavigate();

  const [inv, setInv] = useState([])

  const loadProductos = async () => {

    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
    const data = await response.json();
    setInv(data);
  }

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [modificar, setModificar] = useState(false);
  const [loading, setLoading] = useState(false)

  const [producto, setProducto] = useState({
    nombre: '',
    precioventa: 0,
    categoria: '',
    distribuidor: '',
    stock: 0,
    preciocompra: 0,
    detalle: '',
    imagen: ''
  })

  const handleClose = () => {
    setModificar(false);
    setOpen(false);
  }

  const handleClick = (data) => {
    setSelection(data)
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    loadProductos();
  }, [])

  const BorrarProducto = async (data) => {

    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/deleteProducto/${data}`, {
      method: 'DELETE'
    });
    loadProductos();
  }

  const enviarModificacion = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_IP}:4000/modificarProducto`, {
      method: 'POST',
      body: JSON.stringify(producto),
      headers: {"Content-Type": "application/json" },
  });
    const data = await res.json();
    handleClose()
    loadProductos()
  }

  const modificarProducto = e => {
    //console.log( ," - ",e.target.value)
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }

  const handleModify = async (value) => {
    setProducto(value)
    setModificar(true)
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
            onClick={() => navigate(`/admin/${idUser}/addProducto`)}
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
                  image={`${data.imagen === '' ? process.env.REACT_APP_IMAGE_LINK : data.imagen}`}
                  alt={data.imagen}
                />

                <CardContent>
                  <Typography>
                    Nombre: {data.nombre}
                  </Typography>

                  <Typography>
                    Precio Venta: {data.precioventa}
                  </Typography>

                  <Typography>
                    Categoria: {data.categoria}
                  </Typography>

                  <Typography>
                    Distribuidor: {data.distribuidor}
                  </Typography>

                  <Typography>
                    Stock: {data.stock}
                  </Typography>

                  <Typography>
                    Precio compra: {data.preciocompra}
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
        <Grid container wrap="nowrap" justifyContent="flex-end" sx={{ borderRadius: 2, height: '60%', width: '50%', backgroundColor: '#424444' }}>
          {modificar ? (

            <Grid container wrap="nowrap" direction="column" justifyContent="center" spacing={5} sx={{ height: '90%', width: '90%', mt: 3, ml: '35%' }}>

              <TextField
                variant="filled"
                placeholder="Nombre del Producto"
                label="Nombre Producto"
                defaultValue={selection?.nombre}
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="nombre"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                placeholder="Precio venta"
                label="Precio venta"
                defaultValue={selection?.precioventa}
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                type="number"
                name="precioventa"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                placeholder="Categoria"
                label="Categoria"
                defaultValue={selection?.categoria}
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="categoria"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Distribuidor "
                placeholder="Distribuidora"
                defaultValue={selection?.distribuidor}
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="distribuidor"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Cantidad de productos"
                placeholder="Stock"
                defaultValue={selection?.stock}
                type="number"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="stock"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Precio de compra"
                placeholder="Precio de compra"
                defaultValue={selection?.preciocompra}
                type="number"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="preciocompra"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Descripcion del Producto"
                placeholder="Detalles"
                defaultValue={selection?.detalle}
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="detalle"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Imagen"
                placeholder="URL"
                defaultValue={selection?.imagen}
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="imdagen"
                onChange={modificarProducto}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <Button
                onClick={enviarModificacion}
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  ml: 0,
                  mt: 1,
                  height: '90%',
                  width: 210
                }}
                disabled={
                  !producto.nombre ||
                  !producto.precioventa ||
                  !producto.categoria ||
                  !producto.distribuidor ||
                  !producto.stock ||
                  !producto.preciocompra ||
                  !producto.detalle ||
                  !producto.imagen
                }
              >
                Guardar Cambios
              </Button>

            </Grid>

          ) : (
            <Grid container justifyContent="center" direction="column" spacing={2} sx={{ height: '100%', width: '100%', mt: 3, ml: '30%' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                height="140"
                image={`${selection?.imagen === '' ? process.env.REACT_APP_IMAGE_LINK : selection?.imagen}`}
                alt={selection?.imagen}
              />

              <CardContent>
                <Typography>
                  Nombre: {selection?.nombre}
                </Typography>

                <Typography>
                  Precio Venta: {selection?.precioventa}
                </Typography>

                <Typography>
                  Categoria: {selection?.categoria}
                </Typography>

                <Typography>
                  Distribuidor: {selection?.distribuidor}
                </Typography>

                <Typography>
                  Stock: {selection?.stock}
                </Typography>

                <Typography>
                  Precio compra: {selection?.preciocompra}
                </Typography>

                <Typography>
                  Descripcion: {selection?.detalle}
                </Typography>

              </CardContent>
              <Grid>
                <Button
                  onClick={() => {
                    BorrarProducto(selection?.id)
                    handleClose()
                  }}
                  variant="contained"
                  color="error"
                  sx={{ height: 40, width: 100 }}
                >
                  Borrar
                </Button>
                <Button
                  onClick={() => handleModify(selection)}
                  variant="contained"
                  color="warning"
                  sx={{ ml: 5, height: 40, width: 100 }}
                >
                  Modificar
                </Button>
              </Grid>
            </Grid>
          )}



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
