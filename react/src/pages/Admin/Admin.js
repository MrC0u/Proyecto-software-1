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
        setMostSold([...result]);
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
                    <Grid container sx={{ alignItems: "center", justifyContent: 'center', backgroundColor: '#424444', ml: 5, mt: 5, width: 500, height: 80, borderRadius: 2 }} >
                        <Typography sx={{ ml: 0, mt: 1 }} gutterBottom variant="h4" component="div">
                            Bienvenido Administrador
                        </Typography>
                    </Grid>

                    <Grid container sx={{ borderRadius: 2, width: 500, height: 200, mt: 5, ml: 5, backgroundColor: '#424444' }}>
                        <Grid container sx={{ borderRadius: 3, backgroundColor: '#424444' }}>
                            <Typography sx={{ borderRadius: 2, ml: 2, mt: 0, height: 5 }} variant="h4">
                                Productos Mas vendido:
                            </Typography>
                        </Grid>
                            <TableContainer sx={{mt:5}} component={Paper}>
                                <Table sx={{ width: 500}} aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right">Cantidad</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mostSold.map((row, index) => (
                                        <TableRow
                                            hover
                                            key={row}
                                            sx={{ color: 'secondary', '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                            {row.nombre}
                                            </TableCell>
                                            <TableCell align="right">{row.sum}</TableCell>
                                            {/*<TableCell align="right">{numberWithCommas(precio[carro.indexOf(row)])}</TableCell>*/}
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </Grid>
                </div>

                } />




                <Route path='/listVendedores' element={<VendorList idUser={params.id} />} />
                <Route path='/addVendedores' element={<VendorForm idUser={params.id} />} />
                <Route path='/inventario' element={<InventAdmin idUser={params.id} />} />
                <Route path='/addProducto' element={<ProductoForm idUser={params.id} />} />
                <Route path='/venta' element={<VentaInventario idUser={params.id} />} />
                <Route path='/addCompra' element={<CompraInventario idUser={params.id} />} />
                <Route path='/redirect' element={<Redirect idUser={params.id} />} />
                <Route path='/ModificarProducto' element={<ModificarInventarioAdm idUser={params.id} />} />
            </Routes>

        </Container>
    )

}