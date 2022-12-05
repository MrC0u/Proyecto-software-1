import {Card, CardContent, Grid, Typography, TextField, Button, CircularProgress} from '@mui/material';
import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const Redirect = ({idUser}) => {

    const navigate = useNavigate();

    const loadProducts = async () => {
        navigate('./../venta');
      }

    useEffect(() => {
        loadProducts();
      }, []
      )


}