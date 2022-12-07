const pool = require('../db');

const getVendedores = async (req, res) => {

    const result = await pool.query('SELECT * FROM empleados where codigo = 0')
    console.log(result.rows)
    res.json(result.rows)

}

const login = async (req, res) => {
    console.log('a')
    const { user } = req.params;

    const result = await pool.query('SELECT clave FROM empleados WHERE usuario = $1', [user]);
    if (result.rowCount === 0)
        return res.json({
            message: "null"
        });

    return res.json(result.rows)

}

const userLevel = async (req, res) => {

    const { user } = req.params;

    const result = await pool.query('SELECT codigo FROM empleados WHERE usuario = $1', [user]);
    return res.json(result.rows)

}

const getId = async (req, res) => {

    const { user } = req.params;

    const result = await pool.query('SELECT id FROM empleados WHERE usuario = $1', [user]);
    return res.json(result.rows)

}

const cambioClave = async (req, res) => {

    const { id } = req.params;
    const { clave } = req.body;

    const result = await pool.query('UPDATE empleados SET clave = $1 WHERE id = $2', [clave, id]);

    if (result.rowCount === 0)
        return res.json({
            message: "null"
        });

    return res.json(result.rows)

}

const deleteVendedor = async (req, res) => {

    const { id } = req.params;

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
        const result = await pool.query("INSERT INTO empleados (id, nombre, apellido, direccion, usuario, clave, codigo) VALUES (default , $1, $2, $3, $4, $5, 0)", [
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

const createProducto = async (req, res, next) => {
    const { nombre, precioVenta, categoria, distribuidor, stock, precioCompra, detalle, imagen } = req.body
    const precioVenta1 = parseInt(precioVenta)
    const stock1 = parseInt(stock)
    const precioCompra1 = parseInt(precioCompra)
    try {
        const result = await pool.query("INSERT INTO inventario (id, nombre, precioVenta, categoria, distribuidor, stock, precioCompra, detalle, imagen) VALUES (default , $1, $2, $3, $4, $5, $6, $7, $8)", [
            nombre[0],
            precioVenta1,
            categoria[0],
            distribuidor[0],
            stock1,
            precioCompra1,
            detalle[0],
            imagen[0]
        ])
        console.log('Añadido nuevo Producto: ', nombre[0]);
        res.json(result.rows);

    } catch (error) {
        next(error)
    }
}

const modifyProduct = async (req, res, next) => {
    try {
        const { nombre, precioventa, categoria, distribuidor, stock, preciocompra, detalle, id } = req.body
        const precioVenta1 = parseInt(precioventa)
        const stock1 = parseInt(stock)
        const precioCompra1 = parseInt(preciocompra)
        console.log(req.body)
        const result = await pool.query("UPDATE inventario SET nombre = $1, PrecioVenta = $2, categoria = $3, distribuidor = $4, stock = $5, PrecioCompra = $6 , detalle = $7 WHERE id = $8", [
            nombre,
            precioVenta1,
            categoria,
            distribuidor,
            stock1,
            precioCompra1,
            detalle,
            id
        ])
        console.log(result);
        res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getProductos = async (req, res) => {


    const result = await pool.query('SELECT * FROM inventario order by id')
    //console.log(result.rows)
    res.json(result.rows)

}

const getProducto = async (req, res) => {

    const result = await pool.query("SELECT * FROM inventario where id = $1 limit 1", [req.body.id])
    console.log(result.rows)
    res.json(result.rows)

}

const getCategorias = async (req, res) => {


    const result = await pool.query('SELECT DISTINCT categoria FROM inventario')
    console.log(result.rows)
    res.json(result.rows)

}

const addImages = async (req, res) => {
    console.log('a')
}

const getMasVendido = async (req, res) => {
    const result = await pool.query('select nombre, sum(cantidad) from ventas group by nombre having sum(cantidad) = ( select sum(cantidad) from ventas group by nombre order by sum(cantidad) desc limit 1 )');
    console.log(result.rows)
    res.json(result.rows)
}

const getVendedor = async (req, res) => {
    console.log(req.body)
    const result = await pool.query('select id,usuario,nombre,apellido,direccion from empleados where id = $1',[req.body.id]);
    console.log(result.rows)
    res.json(result.rows)
}




const deleteProducto = async (req, res) => {
    const { id } = req.params;
    console.log("aaaa ", req.params)
    const result = await pool.query('DELETE FROM inventario where id = $1', [id])

    if (result.rowCount === 0)
        return res.status(404).json({
            message: "Producto not found"
        });


    return res.sendStatus(204);
}


const addVenta = async (req, res) => {


    var name,cantidad,id_producto,stock,aux;
    let empleado = req.body[0][1]

    var result = await pool.query('SELECT Id FROM Ventas ORDER BY Id DESC LIMIT 1')
    var id = parseInt(result.rows[0].id) + 1

    console.log('\n===================')
    console.log('Empleado: ', empleado)
    console.log('Id_Venta: ', id)
    for (var i in req.body) {
        if(i == 0){
            continue;
        }
        name = req.body[i][0]
        cantidad = req.body[i][1]
        id_producto = req.body[i][2]

        stock = await pool.query("SELECT stock FROM inventario where id = $1;",[id_producto]);
        stock = parseInt(stock.rows[0].stock)

        aux = stock - cantidad

        console.log('Iteracion :', i, '   - Nombre: ' , name , '  - Cantidad:', cantidad, '  - ID_Prod:', id_producto,'  - Stock:', stock)

        try {
            result = await pool.query("INSERT INTO Ventas(Id, Id_Producto, Nombre, Cantidad, Id_Empleado) VALUES ($1, $2, $3, $4, $5);", [
                id,
                id_producto,
                name,
                cantidad,
                empleado
            ])

            result = await pool.query('UPDATE inventario SET stock = $1 WHERE id = $2', [aux, id_producto]);
    


        } catch (error) {
            console.log(error)
        }
        
        
    }
    res.json({"success": true})
    //console.log(req.body)
}


const addCompra = async (req, res) => {


    var name,cantidad,id_producto,stock,aux;
    let empleado = req.body[0][1]

    var result = await pool.query('SELECT Id FROM Ventas ORDER BY Id DESC LIMIT 1')
    var id = parseInt(result.rows[0].id) + 1

    console.log('\n===================')
    console.log('Empleado: ', empleado)
    console.log('Id_compra: ', id)
    for (var i in req.body) {
        if(i == 0){
            continue;
        }
        name = req.body[i][0]
        cantidad = req.body[i][1]
        id_producto = req.body[i][2]

        stock = await pool.query("SELECT stock FROM inventario where id = $1;",[id_producto]);
        console.log(stock.rows)
        stock = parseInt(stock.rows[0].stock)

        aux = stock + cantidad

        console.log('Iteracion :', i, '   - Nombre: ' , name , '  - Cantidad:', cantidad, '  - ID_Prod:', id_producto,'  - Stock:', stock)

        try {
            result = await pool.query("INSERT INTO Compras(Id, Id_Producto, Nombre, Cantidad, Id_Empleado) VALUES ($1, $2, $3, $4, $5);", [
                id,
                id_producto,
                name,
                cantidad,
                empleado
            ])

            result = await pool.query('UPDATE inventario SET stock = $1 WHERE id = $2', [aux, id_producto]);
    


        } catch (error) {
            console.log(error)
        }
        
        
    }
    res.json({"success": true})
    //console.log(req.body)
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
    getProducto,
    getCategorias,
    addImages,
    deleteProducto,
    modifyProduct,
    addVenta,
    getMasVendido,
    getVendedor,
    addCompra
}