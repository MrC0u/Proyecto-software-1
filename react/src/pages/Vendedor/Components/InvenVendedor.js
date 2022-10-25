import React from 'react';
import {Card,CardContent,CardMedia,Typography,CardActionArea} from '@mui/material'
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

export const InventVendedor = () => {
    const inv= inventario;
    return(
        <div>
            {
                inv.map( data => (
                    <Card sx={{ maxWidth: 345}}>
                        <CardActionArea>
                            <CardMedia 
                            component="img"
                            height="140"
                            image = {`Images/${data.imagen}.jpg`}
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
                ) )
            }
        </div>
    )
}