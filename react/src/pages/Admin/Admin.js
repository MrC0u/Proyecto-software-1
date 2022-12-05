import React from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import VendorForm from './Components/VendorForm';
import VendorList from "./Components/VendorList";
import Navbar from "./Components/Navbar";
import { Container } from '@mui/material';
import { InventAdmin } from "./Components/InventAdmin";
import { ProductoForm } from "./Components/ProductoForm";
import { VentaInventario } from "./Components/VentaInventario";
import { CompraInventario } from "./Components/CompraInventario.js";
import { ModificarInventarioAdm } from "./Components/ModificarInventarioAdm";
import { Redirect } from "./Components/Redirect";
import {
    TextField, Autocomplete, Typography, createFilterOptions, Grid, Card,
    CardContent, CardMedia, CardActions, Button, TableContainer, Paper, Table, TableHead, TableCell, TableRow,
    Badge, ButtonGroup, TableBody
} from '@mui/material'


export const Admin = () => {

    const params = useParams()
    const idUser = params.id

    const [mostSold, setMostSold] = useState([]);

    const load = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/mostSold`);
        const result = await response.json();
        setMostSold(result);
    }

    useEffect(() => {
        load();
    }, []
    )

    return (
        <Container maxWidth={false}>
            <Navbar idUser={params.id} />
            <Routes>
                <Route path='/' element={<div>
                    <Typography sx={{ ml: 5, mt: 5 }} gutterBottom variant="h4" component="div">
                        Soy Admin
                    </Typography>


                    <Grid container sx={{ borderRadius: 2, width: 500, height: 200, mt: 5, ml: 5, backgroundColor: '#424444' }}>
                        <Grid container sx={{ borderRadius: 3, backgroundColor: '#424444' }}>
                            <Typography sx={{ borderRadius: 2, ml: 2, mt: 0, height: 5 }} variant="h4">
                                Producto Mas vendido:
                            </Typography>
                        </Grid>
                        <Grid wrap="wrap" container >
                            {
                                mostSold.map(data => (
                                    <CardContent>
                                        <Typography sx={{ ml: 0, mt: 0, width: 500, height: 2 }} gutterBottom variant="h7" component="div">
                                            {data.nombre + " "}
                                        </Typography>
                                    </CardContent>
                                ))

                            }
                            <Grid container sx={{ borderRadius: 3, backgroundColor: '#424445' }}>
                                <Typography sx={{ ml: 2, mt: 2, width: 500 }} gutterBottom variant="h5" component="div">
                                    {"Cantidad: " + mostSold[0]?.sum + " "}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                } />




                <Route path='/listVendedores' element={<VendorList idUser={params.id} />} />
                <Route path='/addVendedores' element={<VendorForm idUser={params.id} />} />
                <Route path='/inventario' element={<InventAdmin idUser={params.id} />} />
                <Route path='/addProducto' element={<ProductoForm idUser={params.id} />} />
                <Route path='/venta' element={<VentaInventario idUser={params.id} />} />
                <Route path='/compra' element={<CompraInventario idUser={params.id} />} />
                <Route path='/redirect' element={<Redirect idUser={params.id} />} />
                <Route path='/ModificarProducto' element={<ModificarInventarioAdm idUser={params.id} />} />
            </Routes>

        </Container>
    )

}