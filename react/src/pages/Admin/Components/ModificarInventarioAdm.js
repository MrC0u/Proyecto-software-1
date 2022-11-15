import {Card, CardContent, Grid, Typography, TextField, Button, CircularProgress} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const ModificarInventarioAdm = () => {

    const [file,setFile] = useState(null)
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

  // const selectedHandler = e => {
  //   let algo = e.target.files[0]
  //   console.log("soy e: ",algo)
  //   setFile(algo)
  // }

  // const sendHandler = (e) => {
  //   e.preventDefault();
  //   if (!file){
  //     alert('tu necesitas subir una foto')
  //     return
  //   }
  //   const formdata = new FormData()
  //   formdata.append('image',file)
  //   formdata.append('nombre',producto.nombre)
  //   console.log(formdata)
  //   fetch('http://api:4000/images/post',{
  //     method: 'POST',
  //     body: formdata,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => res.text())
  //   .then(res => console.log(res))
  //   .catch(err => {
  //     console.error(err)
  //   })
  //   setFile(null)
  // }

  const handleChange = e =>{
    //console.log( ," - ",e.target.value)
    setProducto({...producto,[e.target.name]:[e.target.value]})
    console.log(file)
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    
    
    setLoading(true);
    const res = await fetch(`http://${process.env.REACT_APP_IP}:4000/createProducto`,{
        method:'POST',
        body: JSON.stringify(producto),
        headers: {"Content-Type": "application/json" },
    });
    const data= await res.json();
    console.log(data)
    setLoading(false);
    navigate("/admin/inventario")
    
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
            Modificar Producto
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
                }}
                name="detalle"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                
              />

              {<TextField
                //variant="filled"
                
                type="file"
                label="Imagen"
                sx={{
                  display: "block",
                  margin: ".10rem 0",
                }}
                name="imagen"
                onChange={console.log('Imagen Seleccionada')}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                focused
              />}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !producto.nombre ||
                  !producto.precioVenta ||
                  !producto.categoria ||
                  !producto.distribuidor ||
                  !producto.stock ||
                  !producto.precioCompra ||
                  !producto.detalle
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </form>
          </CardContent>
          
        </Card>
      </Grid>
    </Grid>
  );

};