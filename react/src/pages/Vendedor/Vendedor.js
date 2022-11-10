import React from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './Components/Navbar';
import { CambioClave } from './Components/CambioClave';
import { InventVendedor } from "./Components/InvenVendedor";
import { VentaInventario } from "./Components/VentaInventario";

export const Vendedor = () => {

    const params = useParams();

    return(
            <Container>
                <Navbar idUser={params.id} />
                <Routes>
                    <Route path='/' element={<div><h1>Soy Vendedor</h1></div>}/>
                    <Route path='/cambioClave'element={<CambioClave idUser = {params.id} />}/>
                    <Route path='/inventario' element={<InventVendedor idUser ={params.id}/>}/>
                    <Route path='/venta' element={<VentaInventario idUser ={params.id}/>}/>
                </Routes>
            </Container>
    )

}