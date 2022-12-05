import React from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import VendorForm from './Components/VendorForm';
import VendorList from "./Components/VendorList";
import Navbar from "./Components/Navbar";
import { Container } from '@mui/material';
import { InventAdmin } from "./Components/InventAdmin";
import {ProductoForm} from "./Components/ProductoForm";
import {VentaInventario} from "./Components/VentaInventario";
import {ModificarInventarioAdm} from "./Components/ModificarInventarioAdm";
import {Redirect} from "./Components/Redirect";


export const Admin = () => {

    const params = useParams()

    return(
        <Container maxWidth={false}>
            <Navbar idUser={params.id}/>
                <Routes>
                    <Route path='/' element={<div><h1>Soy Admin</h1></div>}/>
                    <Route path='/listVendedores' element={<VendorList idUser = {params.id}/>} />
                    <Route path='/addVendedores' element={<VendorForm idUser = {params.id}/>} />
                    <Route path='/inventario' element={<InventAdmin idUser = {params.id}/>}/>
                    <Route path='/addProducto' element={<ProductoForm idUser = {params.id}/>}/>   
                    <Route path='/venta' element={<VentaInventario idUser = {params.id}/>}/>
                    <Route path='/redirect' element={<Redirect idUser = {params.id}/>}/>
                    <Route path='/ModificarProducto' element={<ModificarInventarioAdm idUser = {params.id}/>}/>                
                </Routes>
        </Container>
    )

}