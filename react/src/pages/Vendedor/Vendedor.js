import React from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import { Backdrop, Container } from '@mui/material';
import Navbar from './Components/Navbar';
import { CambioClave } from './Components/CambioClave';
import { InventVendedor } from "./Components/InvenVendedor";
import { VentaInventario } from "./Components/VentaInventario";
import { CompraInventario } from "./Components/CompraInventario";
import { Redirect } from "./Components/Redirect";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
    TextField, Autocomplete, Typography, createFilterOptions, Grid, Card, Box,
    CardContent, CardMedia, CardActions, Button, TableContainer, Paper, Table, TableHead, TableCell, TableRow,
    Badge, ButtonGroup, TableBody
} from '@mui/material'



export const Vendedor = ({ }) => {

    const navigate = useNavigate();

    const params = useParams();
    const idUser = { "id": params.id };

    const [vendedor, setVendedor] = useState([]);
    const [modificar, setModificar] = useState(false);
    const [modificacion, setModificacion] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        direccion: '',
        usuario: ''
    })

    const onLoad = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/vendedor`, {
            method: 'POST',
            body: JSON.stringify(idUser),
            headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        setVendedor(result);
        setModificacion(result);
        console.log(vendedor);
    }

    const handleClose = () => {
        setModificar(false);
    }

    const handleClick = (data) => {
        setModificacion(vendedor[0]);
        setModificar((prev) => !prev)
    }

    const modificarVendedor = e => {
        //console.log(e.target.name, " - ", e.target.value)
        setModificacion({ ...modificacion, [e.target.name]: e.target.value })
        console.log(modificacion)
    }

    const enviarModificacion = async () => {
        // const res = await fetch(`http://${process.env.REACT_APP_IP}:4000/modificarProducto`, {
        //     method: 'POST',
        //     body: JSON.stringify(producto),
        //     headers: { "Content-Type": "application/json" },
        // });
        // const data = await res.json();
        handleClose();
        onLoad();
    }

    useEffect(() => {
        onLoad();
    }, []
    )


    return (
        <Container maxWidth={false}>
            <Navbar idUser={params.id} />
            <Routes>
                <Route path='/' element={
                    <div>
                        <Grid sx={{ ml: 10 }}>
                            <Grid container sx={{ alignItems: "center", justifyContent: 'center', backgroundColor: '#424444',ml:5, mt:5, width: 680, height: 80, borderRadius: 2 }} >
                                <Typography sx={{ ml: 3, mt: 0, mb: 7, width: 500, height: 2 }} gutterBottom variant="h3" component="div">
                                    Bienvenido Vendedor
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Grid container sx={{ borderRadius: 2, width: 680, height: 500, mt: 5, ml: 5, backgroundColor: '#424444' }}>
                                    <Grid sx={{ ml: 2 }}>
                                        <Typography sx={{ ml: 0, mt: 5, mb: 10, width: 500, height: 2 }} gutterBottom variant="h4" component="div">
                                            Informacion de Usuario
                                        </Typography>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 645, minheight: 100 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Datos</TableCell>
                                                        <TableCell align="right"></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {vendedor.map((row) => (
                                                    <TableBody>
                                                        <TableRow
                                                            key={row.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {'ID'}
                                                            </TableCell>
                                                            <TableCell align="right">{row.id}</TableCell>
                                                        </TableRow>

                                                        <TableRow
                                                            key={row.nombre}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {'Nombre'}
                                                            </TableCell>
                                                            <TableCell align="right">{row.nombre}</TableCell>
                                                        </TableRow>

                                                        <TableRow
                                                            key={row.apellido}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {'Apellido'}
                                                            </TableCell>
                                                            <TableCell align="right">{row.apellido}</TableCell>
                                                        </TableRow>

                                                        <TableRow
                                                            key={row.direccion}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {'Direccion'}
                                                            </TableCell>
                                                            <TableCell align="right">{row.direccion}</TableCell>
                                                        </TableRow>

                                                        <TableRow
                                                            key={row.usrname}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {'Usuario'}
                                                            </TableCell>
                                                            <TableCell align="right">{row.usuario}</TableCell>
                                                        </TableRow>


                                                    </TableBody>
                                                ))}
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>

                                <Grid>

                                    <Grid container sx={{ borderRadius: 2, width: 680, height: 300, mt: 5, ml: 5, backgroundColor: '#424444' }}>
                                        <Grid sx={{ ml: 2 }}>
                                            <Typography sx={{ ml: 20, mt: 5, mb: 7, width: 500, height: 2 }} gutterBottom variant="h4" component="div">
                                                Opciones de cuenta
                                            </Typography>
                                            <Grid container sx={{ alignItems: "center", justifyContent: 'center', }}>
                                                <Button sx={{ borderRadius: 2, height: 75, width: 500, mb: 1 }} variant='contained' color='warning' onClick={() => handleClick()}>
                                                    Modificar Perfil
                                                </Button>
                                                <Button sx={{ borderRadius: 2, height: 75, width: 500, mt: 1 }} variant='contained' color='warning' onClick={() => navigate(`/vendedor/${params.id}/cambioClave`)}>
                                                    Cambiar clave
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container sx={{ alignItems: "center", justifyContent: 'center', borderRadius: 2, width: 680, height: 190, mt: 1, ml: 5, backgroundColor: '#424444' }}>
                                        <Button sx={{ borderRadius: 2, height: 100, width: 500 }} variant='contained' color='error' onClick={() => navigate(`/`)}>
                                            Cerrar Sesion
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={modificar}
                            >
                                <Grid container wrap="nowrap" justifyContent="flex-end" sx={{ borderRadius: 2, height: '40%', width: '30%', backgroundColor: '#f0f0f0' }}>

                                    <Grid container wrap="nowrap" direction="column" justifyContent="center" spacing={5} sx={{ height: '90%', width: '90%', mt: 3, ml: '35%' }}>
                                        {vendedor.map((row) => (
                                            <Grid>
                                                <TextField
                                                    required
                                                    variant="filled"
                                                    placeholder="Nombre"
                                                    label="Nombre"
                                                    defaultValue={row?.nombre}
                                                    sx={{
                                                        display: "block",
                                                        margin: ".10rem 0",
                                                    }}
                                                    name="nombre"
                                                    onChange={modificarVendedor}
                                                    inputProps={{ style: { color: "black" } }}
                                                    InputLabelProps={{ style: { color: "back" } }}

                                                />

                                                <TextField
                                                    required
                                                    variant="filled"
                                                    placeholder="Apellidos"
                                                    label="Apellidos"
                                                    defaultValue={row?.apellido}
                                                    sx={{
                                                        display: "block",
                                                        margin: ".10rem 0",
                                                    }}
                                                    name="apellido"
                                                    onChange={modificarVendedor}
                                                    inputProps={{ style: { color: "black" } }}
                                                    InputLabelProps={{ style: { color: "back" } }}

                                                />

                                                <TextField
                                                    required
                                                    variant="filled"
                                                    placeholder="Direccion"
                                                    label="Direccion"
                                                    defaultValue={row?.direccion}
                                                    sx={{
                                                        display: "block",
                                                        margin: ".10rem 0",
                                                    }}
                                                    name="direccion"
                                                    onChange={modificarVendedor}
                                                    inputProps={{ style: { color: "black" } }}
                                                    InputLabelProps={{ style: { color: "back" } }}

                                                />
                                            </Grid>
                                        ))}


                                        <Button
                                            onClick={enviarModificacion}
                                            variant="contained"
                                            color="error"
                                            type="submit"
                                            sx={{
                                                ml: 0,
                                                mt: 1,
                                                height: 50,
                                                width: 210
                                            }}
                                            disabled={
                                                !modificacion.nombre
                                            }
                                        >
                                            Guardar Cambios
                                        </Button>
                                    </Grid>
                                    <Grid sx={{ position: "flex", top: '50%', right: '50%', zIndex: 2000, height: 50, width: 50, mt: 3, mr: 3 }}>
                                        <Button onClick={handleClose} color='error' sx={{ height: 50, width: 50 }}>
                                            <CloseIcon sx={{ height: 50, width: 50 }} />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Backdrop>



                        </Grid>
                    </div>
                } />
                <Route path='/cambioClave' element={<CambioClave idUser={params.id} />} />
                <Route path='/inventario' element={<InventVendedor idUser={params.id} />} />
                <Route path='/venta' element={<VentaInventario idUser={params.id} />} />
                <Route path='/compra' element={<CompraInventario idUser={params.id} />} />
                <Route path='/redirect' element={<Redirect idUser={params.id} />} />
            </Routes>
        </Container>
    )

}