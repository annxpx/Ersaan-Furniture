# Proyecto final: Sistemas de Información, PAC III 2022

En este repositorio se estaran subiendo las actualizaciones del proyecto de la clase

## Configuracion de Insonmia:
### Peticion 1:
getFurniture: http://localhost:3000/api/furniture

**descripcion:** solicitar lista de todos lo muebles en la base de datos

### Peticion 2:
getOneFurniture: http://localhost:3000/api/furniture/1

**descripcion:** solicitar un mueble de la base de datos, el argumento es el ID del producto

### Peticion 3:
getUsers: http://localhost:3000/api/users

**descripcion:** Solicitar lista de todos los usuarios registrados. Esto es con fines meramente practicos para evaluar el p rograma.

### Peticion 4:
createUser: http://localhost:3000/api/createUser

**descripcion:** peticion para crear usuarios, debe contener en formato JSON los siguientes datos: name, email, password; el indice de usuario se crea automaticamente.

### Peticion 5:
LogIn: http://localhost:3000/api/logIn

**descripcion:** peticion para poder iniciar secion en la aplicacion proporcionando un correo electronico y una contraseña, si estos datos no estan en la base de datos significa que no esta registrado

### Peticion 6:
LogIn: http://localhost:3000/api/changePassword

**descripcion:** peticion para cambiar la contraseña del usuario con el cual se haya iniciado sesion. Es necesario primero iniciar sesion.

