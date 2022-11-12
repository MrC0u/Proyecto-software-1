import { useEffect, useState } from 'react';
import {
  TextField, Autocomplete, Typography, createFilterOptions, Box, Container, Grid, Item, Card,
  CardContent, CardMedia, CardActions, Button, TableContainer, Paper, Table, TableHead, TableCell, TableRow,
  Badge, ButtonGroup, TableBody, chipClasses
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

function removeArray(array, value) {
  for (var i = array.length; i--;) {
    if (array[i] === value) {
      array.splice(i, 1);
    }
  }
  return array
}

function getStock(name) {

}

export const VentaInventario = () => {

  const [productos, setProductos] = useState([]);

  const loadProducts = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
    const data = await response.json();
    setProductos(data);
  }

  const [busqueda, setBusqueda] = useState([]);
  const [carro, setCarro] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [precio, setPrecio] = useState([]);
  const [selectCantidad, setSelectCantidad] = useState([1, 1, 1]);

  const navigate = useNavigate();

  // Buscador
  const handleChange = search => {
    // Busqueda por categoria
    var cat = filterItems(productos.map(object => object.categoria), search).filter(onlyUnique)
    var findCat = productos.map((object) => {
      if (cat.includes(object.categoria)) {
        return object.nombre
      }
      return null
    })
    findCat = removeArray(findCat, null)
    // Busqueda por nombre
    var findName = filterItems((productos.map(object => object.nombre)), search)
    // Filtro busqueda por Nombre + Categoria ( Evitar repeticiones )
    var buscar = (findName.concat(findCat)).filter(onlyUnique)
    buscar = buscar.slice(0, 3)
    setBusqueda(buscar)

    // Bug Fix - Para que siempre salga 1 para comprar almenos que no exista stock
    var stock = [1, 1, 1]
    var count = 0
    buscar.map((obj) => {
      if (productos.find(({ nombre }) => nombre === obj).stock === 0) {
        stock[count] = 0
      }
      count += 1
    })
    setSelectCantidad(stock)
  }

  // Agregar producto a Carro
  const agregarCarro = element => {
    var index = carro.indexOf(element)
    var cantidadCompra = selectCantidad[busqueda.indexOf(element)]
    var producto = productos.find(({ nombre }) => nombre === element)

    if (cantidadCompra > 0) {
      // No existe en el Carro
      if (index == -1) {
        setCarro(carro.concat(element))
        setCantidad(cantidad.concat(cantidadCompra))
        setPrecio(precio.concat((cantidadCompra) * (producto.precioventa)))
      } else {
        // Existe en el Carro
        cantidad[index] += cantidadCompra
        setCantidad([...cantidad])
        precio[index] += (cantidadCompra) * (producto.precioventa)
        setPrecio([...precio])
      }
      productos.find(({ nombre }) => nombre === element).stock -= cantidadCompra
      setProductos([...productos])
      selectCantidad[busqueda.indexOf(element)] = 0
      setSelectCantidad([...selectCantidad])
    }
  }


  // Eliminar producto de carro

  const eliminarCarro = index => {
    var name = carro[index]
    productos.find(({ nombre }) => nombre === name).stock += cantidad[index]
    setPrecio(precio.splice(index, 1))
    setCantidad(cantidad.splice(index, 1))
    setCarro(carro.splice(index, 1))
    selectCantidad[busqueda.indexOf(name)] = 1
    setSelectCantidad([...selectCantidad])
    setPrecio([...precio])
    setCantidad([...cantidad])
    setCarro([...carro])
    setProductos([...productos])
  }

  // Aumentar Cantidad de producto
  const selectMore = index => {
    var stock = productos.find(({ nombre }) => nombre === busqueda[index]).stock
    if (selectCantidad[index] < stock) {
      selectCantidad[index] += 1
      setSelectCantidad([...selectCantidad])
    }
  }

  // Disminuir Cantidad de producto
  const selectLess = index => {
    if (selectCantidad[index] > 1) {
      selectCantidad[index] -= 1
      setSelectCantidad([...selectCantidad])
    }
  }

  // Enviar Compra
  const finalizarCompra = index => {
    console.log('En proceso: Compra Finalizada')
  }

  const filterOptions = createFilterOptions({
    limit: 5,
  });

  useEffect(() => {
    loadProducts();
  }, []
  )

  // Render
  return (
    <div>
      {/* ---------------- Buscador ---------------- */}
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
      <Grid container wrap="nowrap" direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0} columns={32} sx={{ maxHeight: 700 }}>
        {/* ---------------- Productos ---------------- */}
        <Grid wrap="nowrap" container alignItems="center" justifyContent="flex-start" direction="row" sx={{ borderRadius: 2, width: 1100, height: 600, mt: 5, backgroundColor: '#DFDFDF' }}>
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
                  <Badge color="primary" badgeContent={selectCantidad[busqueda.indexOf(elemento)]}>
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
        {/* ---------------- Carro ---------------- */}
        <Grid sx={{ borderRadius: 2, width: 400, height: 600, mt: 5, ml: 5, backgroundColor: '#424444' }}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100, backgroundColor: '#FFFFFF' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carro.map((row, index) => (
                  <TableRow
                    onClick={() => {
                      eliminarCarro(index)
                    }}
                    hover
                    key={row}
                    sx={{ color: 'secondary', '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    <TableCell align="right">{cantidad[carro.indexOf(row)]}</TableCell>
                    <TableCell align="right">{numberWithCommas(precio[carro.indexOf(row)])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid wrap="nowrap" container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0} columns={32}>
        {/* ---------------- Boton Finalizar ---------------- */}
        <Button
          variant="contained"
          color="success"
          sx={{ width: 1100, height: 100, mt: 2, mr: 0 }}
          onClick={() => {
            finalizarCompra();
          }}
        >
          {" "}
          <Typography variant="h5" color="white">
            Finalizar Venta
          </Typography>
        </Button>

        {/* ---------------- Precio Total ---------------- */}
        <Card sx={{ width: 400, height: 100, mt: 2, ml: 5, backgroundColor: "#1c1c1c" }}>
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