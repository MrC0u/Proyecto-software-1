const { Router } = require('express');
const { getVendedores, create, deleteVendedor, login, userLevel, getId, 
    cambioClave, createProducto, getProductos, getCategorias, addImages, 
    deleteProducto, getProducto, modifyProduct, addVenta, getMasVendido,
    getVendedor } = require('../controllers/tasks.controller');

const router = Router();

const pool = require('../db');

router.get('/', (req, res) => {
    
    res.send('Test');

});

router.post('/create', create);

router.get('/vendedores', getVendedores);

router.post('/vendedor', getVendedor);

router.delete('/delete/:id', deleteVendedor);

router.get('/login/:user', login);

router.get('/userLevel/:user', userLevel);

router.get('/getId/:user', getId);

router.put('/cambioClave/:id', cambioClave);

router.post('/createProducto',createProducto);

router.get('/productos',getProductos);

router.get('/producto',getProducto);

router.post('/modificarProducto', modifyProduct);

router.get('/categorias',getCategorias);

router.post('/images/post',addImages);

router.post('/addVenta',addVenta);

router.delete('/deleteProducto/:id', deleteProducto);

router.get('/mostSold',getMasVendido);



module.exports = router;