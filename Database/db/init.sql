CREATE TABLE Empleados(Id SERIAL, Nombre VARCHAR(200), Apellido VARCHAR(200), Direccion VARCHAR(200), Usuario VARCHAR(20), Clave VARCHAR(20), Codigo int);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Marcos' , 'Valderrama Carrasco' , 'Casa1' , 'marcos', '12345', 0);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Sury' , 'apellido' , 'Casa2' , 'sury', '12345', 0);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Seba' , 'Gonza' , 'Casa3' , 'seba', '12345', 1);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Dayana' , 'apellido' , 'Casa4' ,'dayana', '12345', 0);

CREATE TABLE Inventario(Id SERIAL, Nombre VARCHAR(200),PrecioVenta int, Categoria VARCHAR(200), Distribuidor VARCHAR(200), Stock int, PrecioCompra int, Detalle VARCHAR(200), Imagen VARCHAR(1000));
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Coca-Cola', 1000, 'Bebidas', 'Coca-Cola Company', 13, 900, 'bebida','https://www.sushitown.cl/images/cocacola%20lata%20350.png');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Pepsi', 1100, 'Bebidas', 'CCU', 9, 900, 'bebida','https://www.camelchile.cl/wp-content/uploads/2022/06/BEBIDA_LATA_PEPSI_350CC-1.png');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Escudo', 1900, 'Cervezas', 'CCU', 10, 500, 'cerveza excelente','https://cdnx.jumpseller.com/mgdrinks/image/10544337/thumb/540/540?1650570633');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Papas Lays', 1000, 'Snacks', 'EverCrisp', 15, 700, 'comida' ,'https://cugat.cl/wp-content/uploads/2021/04/7802000014703-2.jpg');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Ramitas', 1000, 'Snacks', 'EverCrisp', 15, 1200, 'comida','https://santaisabel.vtexassets.com/arquivos/ids/171980/1841892-02_87070.jpg?v=637569545859600000');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Cristal', 1900, 'Cervezas', 'CCU', 5, 400, 'cerveza','https://mercadosaavedra.cl/wp-content/uploads/2021/02/CRISTAL.png');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Kunstmann', 1900, 'Cervezas', 'CCU', 15, 800, 'cerveza excelente','https://tofuu.getjusto.com/orioneat-prod/8zEhKCZM55B73me2A-kunstmann-lat.png');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle, Imagen) VALUES (default, 'Becker', 1900, 'Cervezas', 'CCU', 10, 500, 'cerveza excelente','https://santaisabel.vtexassets.com/arquivos/ids/191612/Pack-6-un-Cerveza-lata-45%C2%B0-473-cc.jpg?v=637831200653400000');

CREATE TABLE Ventas(Id SERIAL, Id_Producto int,Nombre VARCHAR(200),Cantidad int, Id_Empleado int);
INSERT INTO Ventas(Id, Id_Producto, Nombre, Cantidad, Id_Empleado) VALUES (default, 1, 'Coca-Cola', 0, 1);

