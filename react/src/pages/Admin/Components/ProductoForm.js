import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export const ProductoForm = ({idUser}) => {

  const [producto, setProducto] = useState({
    nombre: '',
    precioVenta: 0,
    categoria: '',
    distribuidor: '',
    stock: 0,
    precioCompra: 0,
    detalle: '',
  })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  // Seleccion Archivo

  const [file, setFile] = useState(null)

  const selectedHandler = e => {
    let imagen = e.target.files[0]
    console.log("soy e: ", imagen)
    setFile(imagen)
  }

  const sendHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Debes subir una imagen')
      return
    }
    const formData = new FormData()
    //formData.append('image', file)
    formData.append('nombre', producto.nombre)
    console.log(producto.nombre)
    console.log(formData)
    fetch(`http://${process.env.REACT_APP_IP}:4000/images/post`, {
      method: 'POST',
      body: formData
    }).then((resp) => {
      resp.json().then((result) => {
        //console.log("Resultado: ", result)
      })
    }).catch(err => {
        console.error(err)
      })
    //setFile(null)
  }

  // Fin Seleccion Imagen 

  const handleChange = e => {
    //console.log( ," - ",e.target.value)
    setProducto({ ...producto, [e.target.name]: [e.target.value] })
    console.log(file)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const res = await fetch(`http://${process.env.REACT_APP_IP}:4000/createProducto`, {
      method: 'POST',
      body: JSON.stringify(producto),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    //console.log(data)
    setLoading(false);
    navigate(`/admin/${idUser}/inventario`)

  }


  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}
      >
        <Card

          sx={{ mt: 6 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Crear un producto
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit/*sendHandler*/}>
              <TextField
                variant="filled"
                placeholder="Nombre del Producto"
                label="Nombre Producto"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="nombre"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                placeholder="Precio venta"
                label="Precio venta"
                type="number"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="precioVenta"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                placeholder="Categoria"
                label="Categoria"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="categoria"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Distribuidor "
                placeholder="Distribuidora"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="distribuidor"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Cantidad de productos"
                placeholder="Stock"
                type="number"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="stock"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Precio de compra"
                placeholder="Precio de compra"
                type="number"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="precioCompra"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Descripcion del Producto"
                placeholder="Detalles"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                  width: '100%'
                }}
                name="detalle"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              <TextField
                variant="filled"
                label="Imagen"
                placeholder="URL"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                  width: '100%'
                }}
                name="imagen"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />

              {/* {<TextField
                // Subida Imagen

                //variant="filled"
                type="file"
                label="Imagen"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                  mt: 3
                }}
                name="imagen"
                onChange={selectedHandler}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                focused
              />} */}


              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  mt: 2
                }}
                disabled={
                  !producto.nombre ||
                  !producto.precioVenta ||
                  !producto.categoria ||
                  !producto.distribuidor ||
                  !producto.stock ||
                  !producto.precioCompra ||
                  !producto.detalle ||
                  !producto.imagen
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Crear"
                )}
              </Button>
            </form>
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  );
};
