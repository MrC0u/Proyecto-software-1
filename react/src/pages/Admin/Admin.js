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


export const Admin = () => {

    const params = useParams()

    return(
        <Container maxWidth={false}>
            <Navbar/>
                <Routes>
                    <Route path='/' element={<div><h1>Soy Admin</h1></div>}/>
                    <Route path='listVendedores' element={<VendorList />} />
                    <Route path='addVendedores' element={<VendorForm />} />
                    <Route path='inventario' element={<InventAdmin/>}/>
                    <Route path='addProducto' element={<ProductoForm/>}/>   
                    <Route path='venta' element={<VentaInventario/>}/>
                    <Route path='ModificarProducto' element={<ModificarInventarioAdm idProducto={params.id}/>}/>                
                </Routes>
        </Container>
    )

}