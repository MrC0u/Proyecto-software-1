import {useEffect ,useState} from 'react';
import {TextField, Autocomplete} from '@mui/material'
import {useNavigate} from 'react-router-dom';

const inventario = [
    {
        Id:'1',
        nombre:'Becker',
        precioVenta:'1000',
        categoria:'cerveza',
        distribuidor:'BeckerCompani',
        cantidad:'15',
        precioCompra:'100',
        detalle:'',
        imagen:'becker'

    },
    {
        Id:'2',
        nombre:'Escudo',
        precioVenta:'1100',
        categoria:'cerveza',
        distribuidor:'CCU',
        cantidad:'16',
        precioCompra:'200',
        detalle:'',
        imagen:'escudo'

    },
    {
        Id:'3',
        nombre:'sprite',
        precioVenta:'1900',
        categoria:'bebida',
        distribuidor:'Coca-Cola Company',
        cantidad:'1',
        precioCompra:'900',
        detalle:'',
        imagen:'sprite'

    },
    {
        Id:'4',
        nombre:'papitas',
        precioVenta:'2000',
        categoria:'cerveza',
        distribuidor:'Evercrisp',
        cantidad:'1000',
        precioCompra:'1200',
        detalle:'',
        imagen:'papitas'

    },
]

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

export const VentaInventario = () => {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    //BASE DE DATOS FICTICIA
    const inv= inventario;

    const navigate = useNavigate();

    const loadProducts = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/productos`);
        const data = await response.json();
        console.log(data);
        setProductos(data);
      }


      useEffect( () => {
        loadProducts();
      }, [])

    return(

        <div>
            
            <label>
            <Autocomplete
                freeSolo
                id="search-input"
                disableClearable
                options={productos.map(object => object.categoria ).filter(onlyUnique)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Buscar"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                    />
                )}
            />
            </label>
            

        </div>

    )
}