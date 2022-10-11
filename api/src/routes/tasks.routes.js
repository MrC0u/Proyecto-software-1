const { Router } = require('express');
const { getVendedores, create, deleteVendedor, login, userLevel, getId, cambioClave } = require('../controllers/tasks.controller');

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

module.exports = router;