# Proyecto final: Sistemas de Información, PAC III 2022

En este repositorio se estaran subiendo las actualizaciones del proyecto de la clase

## Configuracion de Insonmia:
### Peticion 1:

signUp: http://localhost:3000/api/signup

TIPO: **POST**

**descripcion:** peticion donde se envian los datos necesarios para crear un nuevo usuario

### Peticion 2:

logIn: http://localhost:3000/api/login

TIPO: **POST**

**descripcion**: peticion donde se envian el email y password en formato JSON. si existe un usuario con esos datos en la base de datos se respondera con un token para poder acceder al resto de rutas protegidas
### JWT (JSON WEB TOKEN )

### Peticion de uso practico:
users: http://localhost:3000/api/users

TIPO: **GET**

ACCESO SOLO CON **JWT**

**descripcion:** se consigue una lista de todos los usuarios creados. 
