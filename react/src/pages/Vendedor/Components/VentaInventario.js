import {useState} from 'react';
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

export const VentaInventario = () => {

    const [productos, setProductos] = useState([]);

    //BASE DE DATOS FICTICIA
    const inv= inventario;

    const navigate = useNavigate();

    const loadProducts = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/products`);
        const data = await response.json();
        console.log(data);
        // setVendedores(data);
      }

    return(

        <div>
            
            <label>
            <Autocomplete
                // sx={{
                // display: 'inline-block',
                // '& input': {
                //     width: 500,
                //     bgcolor: 'background.paper',
                //     color: (theme) =>
                //     theme.palette.getContrastText(theme.palette.background.paper),
                // },
                // }}
                freeSolo
                id="search-input"
                disableClearable
                options={inventario.map(object => object.nombre )}
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