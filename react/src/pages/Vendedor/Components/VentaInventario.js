import {useEffect ,useState} from 'react';
import {TextField, Autocomplete, Typography, createFilterOptions, Box, Container, Grid, Item, Card, CardContent,CardMedia,CardActions, Button} from '@mui/material'
import {useNavigate} from 'react-router-dom';

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function filterItems(arr, query) {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
  }

export const VentaInventario = () => {

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState([]);
    const [carro, setCarro] = useState([]);
    const [cantidad, setCantidad] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const navigate = useNavigate();


    async function refreshPage() {
      setRefresh(refresh.concat('-'))
      console.log(refresh)
    }

    const handleChange = search => {
      setBusqueda( (filterItems( productos.map( object => object.nombre ) , search )).slice(0,3) )
    }

    const agregarCarro = async element => {
      if(carro.indexOf(element) != -1){
        cantidad[carro.indexOf(element)] += 1
        setCantidad( cantidad )
        setCarro( carro )
      }else{
        setCarro( carro.concat(element) )
        setCantidad ( cantidad.concat(1) )
      }
      setRefresh();
    }

    const filterOptions = createFilterOptions({
        limit: 5,
      });

    const loadProducts = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
        const data = await response.json();
        setProductos(data);
      }


      useEffect( () => {
        loadProducts();
      }, [])

    return(
        <div>
            {console.log(carro)}
            <Autocomplete
                freeSolo
                id="search-input"
                disableClearable
                filterOptions={filterOptions}
                onChange={(event, value) => {
                  handleChange(value)
                 }}
                options={
                    ( ( productos.map(object => object.categoria ) ).concat( productos.map( object => object.nombre )) ).filter(onlyUnique)
                }
                sx={{ width: 700, mt:4, ml: -30 }}
                renderInput={(params) => (
                    <TextField
                    onChange={(event) => {
                      handleChange(event.target.value)
                     }}
                    {...params}
                    label="Buscar"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                    />
                )}
            />
            <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2} columns={32}>
              
              <Grid container alignItems="center" justifyContent="flex-start" direction="row" sx={{ width: 1000,height: 600, mt: 5 , ml: -30, backgroundColor: '#999999'}}>
              {
              busqueda.map(elemento => (
                <Card sx={{ maxWidth: 300, minWidth: 290 , ml:2, mr:2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://www.smashbros.com/wiiu-3ds/images/character/link/main.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {productos.find(({ nombre }) => nombre === elemento).nombre }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {productos.find(({ nombre }) => nombre === elemento).stock }
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                  onClick={(event) => agregarCarro(elemento)}
                  size="small"
                  >
                    Agregar
                  </Button>
                </CardActions>
              </Card>

              )
              )}
                
                {/* <Grid item sx={{ width: 300,height: 400, mt: 0 , ml: 2, backgroundColor: 'white'}} >

                </Grid>

                <Grid item sx={{ width: 300,height: 400, mt: 0 , ml: 0, backgroundColor: 'white'}} >

                </Grid>

                <Grid item sx={{ width: 300,height: 400, mt: 0 , mr: 2, backgroundColor: 'white'}} >

                </Grid> */}


              </Grid>
              <Grid sx={{ width: 300,height: 600,mt: 5 , ml: 5,backgroundColor: '#999999'}}>

              <Typography variant="h5" color="text.secondary">
                    Carro:
              </Typography>

              {
                carro.map(elemento =>(
                  <Typography variant="h6" color="white">
                    {elemento}  + {cantidad[carro.indexOf(elemento)]}
                  </Typography>
                ))
              }
              


              </Grid>

            </Grid>

            

            


            

        </div>

    )
}