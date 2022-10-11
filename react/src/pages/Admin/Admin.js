import React from "react";
import { Route, Routes } from 'react-router-dom';
import VendorForm from './Components/VendorForm';
import VendorList from "./Components/VendorList";
import Navbar from "./Components/Navbar";
import { Container } from '@mui/material';


export const Admin = () => {
    return(
        <div>
            <Container>
                <Navbar/>
                    <Routes>
                        <Route path='/' element={<div><h1>Soy Admin</h1></div>}/>
                        <Route path='listVendedores' element={<VendorList />} />
                        <Route path='addVendedores' element={<VendorForm />} />
                    </Routes>
            </Container>
        </div>
    )

}