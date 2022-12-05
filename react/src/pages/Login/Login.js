import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


import {
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

export const Login = () => {

    const [datos, setDatos] = useState({
        usuario: '',
        clave: '',
    })

    const handleChange = e => {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/login/${datos.usuario}`, {
                method: 'GET',
            });
            const data = await response.json();

            if (datos.clave === data[0].clave) {

                const response = await fetch(`http://${process.env.REACT_APP_IP}:4000/userLevel/${datos.usuario}`, {
                    method: 'GET',
                });
                const data = await response.json();

                var usr_id_response = await fetch(`http://${process.env.REACT_APP_IP}:4000/getId/${datos.usuario}`, {
                        method: 'GET',
                    });
                const usr_id = await usr_id_response.json();

                if (data[0].codigo === 1) {
                    Navigate(`/admin/${usr_id[0].id}`);
                } else {

                    Navigate(`/vendedor/${usr_id[0].id}`);
                }

            } else {
                console.log(datos)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-container" >


            <Grid container direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '75vh' }}>
                <Grid item xs={3}>
                    <Card sx={{ mt: 5 }} style={{
                        backgroundColor: "#1e272e",
                        padding: "2rem",
                    }}>
                        <Typography variant='h5' textAlign='center' color='white'>
                            Inicio de Sesión
                        </Typography>
                        <Box textAlign='center'>
                            <CardContent >
                                <form onSubmit={handleSubmit}>

                                    <TextField
                                        variant='outlined'
                                        label='Usuario '
                                        sx={{
                                            display: 'block',
                                            margin: '1rem 0'
                                        }}

                                        name='usuario'
                                        onChange={handleChange}
                                        inputProps={{ style: { color: "white" } }}
                                        InputLabelProps={{ style: { color: "white" } }}
                                    />

                                    <TextField
                                        variant='outlined'
                                        label='Clave '
                                        type="password"
                                        sx={{
                                            display: 'block',
                                            margin: '1rem 0'
                                        }}

                                        name='clave'
                                        onChange={handleChange}
                                        inputProps={{ style: { color: "white" } }}
                                        InputLabelProps={{ style: { color: "white" } }}
                                    />

                                    <Button variant='contained' color='primary' type='submit'>
                                        Ingresar
                                    </Button>

                                </form>
                            </CardContent>
                        </Box>
                    </Card>

                </Grid>
            </Grid>

        </div>
    )
}
