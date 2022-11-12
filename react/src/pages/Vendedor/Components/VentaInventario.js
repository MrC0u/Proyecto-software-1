import { useEffect, useState } from 'react';
import {
  TextField, Autocomplete, Typography, createFilterOptions, Box, Container, Grid, Item, Card,
  CardContent, CardMedia, CardActions, Button, TableContainer, Paper, Table, TableHead, TableCell, TableRow,
  Badge, ButtonGroup, TableBody
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function filterItems(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

export const VentaInventario = () => {

  const [productos, setProductos] = useState([]);

  const loadProducts = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
    const data = await response.json();
    setProductos(data);
  }

  useEffect(() => {
    loadProducts();
  }, []
  )

  const [busqueda, setBusqueda] = useState((filterItems(productos.map(object => object.nombre), '')).slice(0, 3));
  const [carro, setCarro] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [precio, setPrecio] = useState([]);
  const [selectCantidad, setSelectCantidad] = useState([1, 1, 1]);

  const navigate = useNavigate();

  const handleChange = search => {
    setBusqueda((filterItems(productos.map(object => object.nombre), search)).slice(0, 3))
    setSelectCantidad([1, 1, 1])
  }

  const agregarCarro = async (element) => {
    var index = carro.indexOf(element)
    if (index == -1) {
      setCarro(carro.concat(element))
      setCantidad(cantidad.concat(selectCantidad[busqueda.indexOf(element)]))
      setPrecio(precio.concat((selectCantidad[busqueda.indexOf(element)]) * (productos.find(({ nombre }) => nombre === element).precioventa)))
    } else {
      cantidad[index] += selectCantidad[busqueda.indexOf(element)]
      setCantidad([...cantidad])
      precio[index] += (selectCantidad[busqueda.indexOf(element)]) * (productos.find(({ nombre }) => nombre === element).precioventa)
      setPrecio([...precio])
    }
  }

  const selectMore = index => {
    selectCantidad[index] += 1
    setSelectCantidad([...selectCantidad])
  }

  const selectLess = index => {
    if (selectCantidad[index] > 1) {
      selectCantidad[index] -= 1
      setSelectCantidad([...selectCantidad])
    }
  }

  const filterOptions = createFilterOptions({
    limit: 5,
  });

  return (
    <div>
      <Autocomplete
        freeSolo
        id="search-input"
        disableClearable
        filterOptions={filterOptions}
        onChange={(event, value) => {
          handleChange(value)
        }}
        options={
          ((productos.map(object => object.categoria)).concat(productos.map(object => object.nombre))).filter(onlyUnique)
        }
        sx={{ width: 700, mt: 4 }}
        renderInput={(params) => (
          <TextField
            onChange={(event) => {
              handleChange(event.target.value)
            }}
            {...params}
            label="Buscar"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0} columns={32}>

        <Grid container alignItems="center" justifyContent="flex-start" direction="row" sx={{ width: 1100, height: 600, mt: 5, backgroundColor: '#999999' }}>
          {
            busqueda?.map(elemento => (
              <Card sx={{ maxWidth: 300, minWidth: 300, minHeight: 300, ml: 4, mr: 2 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="https://www.smashbros.com/wiiu-3ds/images/character/link/main.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {productos.find(({ nombre }) => nombre === elemento).nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $ {numberWithCommas(productos.find(({ nombre }) => nombre === elemento).precioventa)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {productos.find(({ nombre }) => nombre === elemento).stock}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Badge color="secondary" badgeContent={selectCantidad[busqueda.indexOf(elemento)]}>
                    <ShoppingCartIcon />{" "}
                  </Badge>
                  <ButtonGroup>
                    <Button
                      type="submit"
                      onClick={() => {
                        selectLess(busqueda.indexOf(elemento))
                      }}
                    >
                      {" "}
                      <Remove fontSize="small" />
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        selectMore(busqueda.indexOf(elemento))
                      }}
                    >
                      {" "}
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>

                  <Button
                    onClick={(event) =>
                      agregarCarro(elemento)}
                  >
                    Agregar
                  </Button>

                </CardActions>
              </Card>

            )
            )}

        </Grid>
        <Grid sx={{ width: 400, height: 600, mt: 5, ml: 5, backgroundColor: '#999999' }}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100, backgroundColor: '#999999' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carro.map((row) => (
                  <TableRow
                    key={row}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    <TableCell align="right">{cantidad[carro.indexOf(row)]}</TableCell>
                    <TableCell align="right">{precio[carro.indexOf(row)]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


        </Grid>

      </Grid>

      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0} columns={32}>
        <Button
          variant="contained"
          color="success"
          sx={{ width: 1100, height: 100, mt: 2, mr: 5 }}
          onClick={() => {
            console.log('test')
          }}
        >
          {" "}
          <Typography variant="h5" color="white">
            Finalizar
          </Typography>
        </Button>

        <Card sx={{ width: 400, height: 100, mt: 2, backgroundColor: "#1c1c1c" }}>
          <CardContent >
            <Typography variant="h4" color="white" >
              Total: $ {numberWithCommas(precio.reduce((previousValue, currentValue) => previousValue + currentValue, 0))}
            </Typography>
          </CardContent>
        </Card>

      </Grid>








    </div>

  )
}