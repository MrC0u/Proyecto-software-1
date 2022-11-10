const pool = require('../db');

const getVendedores = async (req, res) => {
    
    const result = await pool.query('SELECT * FROM empleados where codigo = 0')
    console.log(result.rows)
    res.json(result.rows)

}

const login = async (req, res) => {
    console.log('a')
    const {user} = req.params;
    
    const result = await pool.query('SELECT clave FROM empleados WHERE usuario = $1', [user]);
    if (result.rowCount === 0)
        return res.json({
            message: "null"
        });
    
    return res.json(result.rows)

}

const userLevel = async (req, res) => {

    const {user} = req.params;
    
    const result = await pool.query('SELECT codigo FROM empleados WHERE usuario = $1', [user]);    
    return res.json(result.rows)

}

const getId = async (req, res) => {

    const {user} = req.params;
    
    const result = await pool.query('SELECT id FROM empleados WHERE usuario = $1', [user]);    
    return res.json(result.rows)

}

const cambioClave = async (req, res) => {

    const {id} = req.params;
    const {clave} = req.body;

    const result = await pool.query('UPDATE empleados SET clave = $1 WHERE id = $2', [clave, id]);    
    
    if (result.rowCount === 0)
        return res.json({
            message: "null"
        });
    
    return res.json(result.rows)

}

const deleteVendedor = async (req, res) => {
    
    const {id} = req.params;

    const result = await pool.query('DELETE FROM empleados where id = $1', [id]);
    if (result.rowCount === 0)
        return res.status(404).json({
            message: "Empleado not found"
        });

    return res.sendStatus(204);
}

const create = async (req, res, next) => {
    
    const { nombre, apellido, direccion, usuario, clave } = req.body;
    
    try {
        const result = await pool.query("INSERT INTO empleados (id, nombre, apellido, direccion, usuario, clave, codigo) VALUES (default , $1, $2, $3, $4, $5, 0)",[
            nombre, 
            apellido, 
            direccion, 
            usuario,
            clave
        ]);
        console.log(result);
        res.json(results.rows);

    } catch (error) {
        next(error)
    }
}

const createProducto = async (req, res, next) =>{
    const {nombre, precioVenta, categoria, distribuidor, stock, precioCompra, detalle} = req.body
    const precioVenta1 = parseInt(precioVenta)
    const stock1 = parseInt(stock)
    const precioCompra1 = parseInt(precioCompra)
    try {
        const result = await pool.query("INSERT INTO inventario (id, nombre, precioVenta, categoria, distribuidor, stock, precioCompra, detalle) VALUES (default , $1, $2, $3, $4, $5, $6, $7)",[
            nombre[0],
            precioVenta1, 
            categoria[0], 
            distribuidor[0], 
            stock1, 
            precioCompra1,
            detalle[0]
        ])
        console.log(result);
        res.json(result.rows);

    } catch (error) {
        next(error)
    }
}

const getProductos = async (req, res) => {
    

    const result = await pool.query('SELECT * FROM inventario')
    console.log(result.rows)
    res.json(result.rows)

}

const addImages = async (req,res) => {
    console.log(req.body)
}

module.exports = {
    getVendedores,
    create,
    deleteVendedor,
    login,
    userLevel,
    getId,
    cambioClave,
    createProducto,
    getProductos,
    addImages
}