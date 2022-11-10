const { Router } = require('express');
const { getVendedores, create, deleteVendedor, login, userLevel, getId, cambioClave, createProducto, getProductos, addImages } = require('../controllers/tasks.controller');

const router = Router();

const pool = require('../db');

router.get('/', (req, res) => {
    
    res.send('Test');

});

router.post('/create', create);

router.get('/vendedores', getVendedores);

router.delete('/delete/:id', deleteVendedor);

router.get('/login/:user', login);

router.get('/userLevel/:user', userLevel);

router.get('/getId/:user', getId);

router.put('/cambioClave/:id', cambioClave);

router.post('/createProducto',createProducto);

router.get('/Productos',getProductos);

router.post('/images/post',addImages)

module.exports = router;