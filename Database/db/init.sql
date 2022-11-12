CREATE TABLE Empleados(Id SERIAL, Nombre VARCHAR(200), Apellido VARCHAR(200), Direccion VARCHAR(200), Usuario VARCHAR(20), Clave VARCHAR(20), Codigo int);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Marcos' , 'Valderrama Carrasco' , 'Casa1' , 'marcos', '12345', 0);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Sury' , 'apellido' , 'Casa2' , 'sury', '12345', 0);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Seba' , 'Gonza' , 'Casa3' , 'seba', '12345', 1);
INSERT INTO empleados(Id, Nombre, Apellido, Direccion, Usuario, Clave, Codigo) VALUES ( default , 'Dayana' , 'apellido' , 'Casa4' ,'dayana', '12345', 0);

CREATE TABLE Inventario(Id SERIAL, Nombre VARCHAR(200),PrecioVenta int, Categoria VARCHAR(200), Distribuidor VARCHAR(200), Stock int, PrecioCompra int, Detalle VARCHAR(200));
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle) VALUES (default, 'Coca-Cola', 1000, 'Bebidas', 'Coca-Cola Company', 13, 900, 'bebida');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle) VALUES (default, 'Pepsi', 1100, 'Bebidas', 'CCU', 9, 900, 'bebida');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle) VALUES (default, 'Escudo', 1900, 'Cervezas', 'CCU', 10, 500, 'cerveza excelente');
INSERT INTO inventario(Id, Nombre, PrecioVenta, Categoria, Distribuidor, Stock, PrecioCompra, Detalle) VALUES (default, 'Papas Lays', 1000, 'Snacks', 'EverCrisp', 15, 700, 'bebida');

