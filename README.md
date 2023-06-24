# API_User
Esta api fue diseñada para poder agregar, borrar, modificar y extraer datos tambien puede iniciar y quitar seciones de usuario 

## Instalación

Para instalar el proyecto en tu máquina local, primero clona el repositorio:
```bash
git clone https://github.com/AdrianCM21/API_User
```
y luego abrir una terminar y posisionarse en la direccion del achivo descargado y ejecuta el comando ```npm i ```

para poder iniciar el servidor ejecutar el comando  ```npm start ``` en la misma direccion de la carpeta descargada
## Dependencias
- node ^18.16
- cookie-parser ^1.4.6
- cors ^2.8.5,
- dotenv ^16.0.3,
- express ^4.18.2,
- jsonwebtoken ^9.0.0,
- nodemon ^2.0.20,
- sqlite3 ^5.1.6

## Modo de uso
Una vez instalado e iniciado el servidor 
Recomiendo postman para probar completamente la api
- Para Cargar datos: Inicie postman colocando la direcion ```http:/localhost:8000/api/user``` en modo de envio post, los datos enviados tienen que ser en formato
json con la siguiente extructura
```
{
      nombre:'tu nombre',
      apellido:'tu apellido',
      direccion:'tu direccion',
}
```
Envie la peticion al servido  y ya estara cargado el dato 

- Para Actualizar datos: Inicie postman colocando la direcion ```http:/localhost:8000/api/actualizar/<id>``` en modo de envio put, la estructura de dato es identica al anterior
lo que se modifica cambiara en la base de datos
```
{
      nombre:'tu nombre',
      apellido:'tu apellido',
      direccion:'tu direccion',
}
```

- Para Para eliminar datos: Inicie postman colocando la direcion ```http:/localhost:8000/api/borrar/<id>``` en modo de envio delete,  solo con esos datos eliminaras completamente
los datos

- Para extrar todos los datos: Inicie postman colocando la direcion ```http:/localhost:8000/api/user``` en modo de envio get, al hacer eso resivira todo los datos de usuarios de la base de datos

- Para extrar todos los datos 2.0: Inicie postman colocando la direcion ```http:/localhost:8000/api/user_autenti``` en modo de envio get, a diferencia del anterior este requerira uniciar secion previamente
para dar acceso a los datos, fue hecho a modo de prueba

- Para Iniciar secion: Inicie postman colocando la direcion ```http:/localhost:8000/api/login``` en modo de envio post, Se devera enviar un nombre en formato json para
comprobar si su usuario se encuentra en la base de datos la estructura es la siguiente
```
{
   nombre:'tu nombre'     
}
```


