import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';


export const InventVendedor = () => {
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

                <Grid sx={{ ml: 0 }}>
                    <Grid container sx={{ alignItems: "center", justifyContent: 'center', backgroundColor: '#424444', ml: 0, mt: 3, width: 400, height: 70, borderRadius: 2 }} >
                        <Typography variant="h4">
                            Inventario
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Grid wrap="wrap" container alignItems="center" justifyContent="flex-start" direction="row" sx={{ overflow: 'auto', borderRadius: 2, width: '100%', minHeight: 400, maxHeight: 700, mt: 2, backgroundColor: '#DFDFDF' }}>
                {
                    inv.map(data => (
                        <Card sx={{ maxWidth: 300, minWidth: 300, minHeight: 300, ml: 4, mr: 2, mt: 3, mb: 3 }}>
                            <CardMedia
                                component="img"
                                height="160"
                                image={`${data?.imagen === '' ? process.env.REACT_APP_IMAGE_LINK : data?.imagen}`}
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
                        </Card>

                    ))
                }
            </Grid>

        </div>
    );
};
