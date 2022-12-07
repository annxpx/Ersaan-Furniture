# Proyecto final: Sistemas de Información, PAC III 2022

En este repositorio se estaran subiendo las actualizaciones del proyecto de la clase
### Integrantes del equipo:
-Sary Noguera 

-Andrea Alvarado
## Configuracion de Insonmia
De esta forma se desarrollaran las peticiones en Imsomnia
### Peticion 1:

signUp: http://localhost:3000/api/signup

TIPO: **POST**

**descripcion:** peticion donde se envian los datos necesarios para crear un nuevo usuario. En el body el formato tipo Json que debe enviar debe ser de la siguiente manera:

{

		"username": "Juan Perez",
		"email": "juanperez@gmail.com",
		"password": "miPassword",
		"id_branches": 2

}

### Peticion 2:

logIn: http://localhost:3000/api/login

TIPO: **POST**

**descripcion**: peticion donde se envian el email y password en formato JSON. si existe un usuario con esos datos en la base de datos se respondera con un token para poder acceder al resto de rutas protegidas. El formato a enviar debe ser de la siguiente forma:

{

	"email": "juanperez@gmail.com",
	"password": "miPassword"
}

Se les regresara una respuesta con el token para que lo puedan copiar, y usarlo para hacer uso del resto de las peticiones, sin este token no se podra hacer ninguna de las otras.

### Peticion de uso practico:
users: http://localhost:3000/api/users

TIPO: **GET**

ACCESO SOLO CON **JWT**

EN los Headers incluir una variable llamada 'x-access-token' y alli ingresar el token que recibio con el login

**descripcion:** se consigue una lista de todos los usuarios creados. 

### Peticion para Obtener el Listado de Productos
Products: http://localhost:3000/api/products

TIPO: **GET**

ACCESO SOLO CON **JWT**

**descripcion:** Se muestra la lista de productos que existen

### Peticion para obtener un producto

One Product: http://localhost:3000/api/product/:id

TIPO:**GET**

ACCESO SOLO CON **JWT**

**descripcion:** Se mostrara el producto que solicito de acuerdo al id enviado por la url

### Peticion para Agregar un producto

Add Product: http://localhost:3000/api/addProduct

TIPO: **POST**

ACCESO SOLO CON **JWT**

**descripcion:** Se ingresaran los datos de un producto determinado para poder agregarlo a la base de datos, el formato es el siguiente:

{

	"productName": "silla",
	"price": 1000,
	"brand": "carpinterix",
	"status": "nuevo",
	"width": 5,
	"length": 8,
	"height": 10,
	"color": "negro",
	"material": "madera",
	"quantity": 2,
	"pieces": 6,
	"id_branches": 2
}

### Peticion Modificar Producto

Mod Product: http://localhost:3000/api/modProduct/:id

TIPO: **PATCH**

ACCESO SOLO CON **JWT**

**descripcion:** se agregaran los datos del producto que desea editar, asi como el id del producto, el formato es el mismo que para agregar el producto

### Peticion cambiar contraseña

Change Password: http://localhost:3000/api/changepass

TIPO: **PATCH**

ACCESO SOLO CON **JWT**

**descripcion:** esta peticion cambiara la contraseña del usuario basandose en el token que se mando, por lo que solo debe mandar el token y la nueva contraseña, el formato es el siguente:

{

	"password": "newPassword"
}

### Peticion para Cambiar el rol

Change Rol: http://localhost:3001/api/rol/:id

TIPO: **PATCH**

ACCESO SOLO CON **JWT**

**descripcion:** Dentro de los usuarios existe una columna de type sonde se determina el rol que tiene el usuario, si es 0 es un usuario normal mientras que si es 1 tiene rol de administrador, solo un administrador puede cambiar el rol de otro usuario o modificar los productos. En esta peticion se debe de proporcionar el token de un usuario que tenga rol de administrador y e id del usuario que desea cambiar el rol. El formato es el siguiente:

{

	"type": 1
}