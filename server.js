
// se incica las variables de entorno que tenemos configurada en la raiz
require('dotenv').config() 

// Llamamos express para que sea la base de nuestro servidor 
const express = require('express');
const app = express();


//Esta dependencia la utilizaremos para permitir que otros dominios puedan haser peticiones Ejemplo: Este servidor corre en el puerto 8000 y mi front-end en el 5000, sin habilitar los cor no se puede hacer peticiones
const cors = require('cors') 
app.use(cors({credentials: true, origin: 'http://localhost:3000', exposedHeaders:['usertoken']}));

// Esta dependencia es llamda para poder utizar la cookie del navegador, es importante sindo que implemente una validacion de usuario, donde guardo el token en una cokie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Llamo las configuraciones de la base de datos para conectarme a esta, en este caso sqlite
require('./config/Sqlite.config');


// Configuracines de express
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Llamo las configuracines de las rutas que se encuentran en su apartado
require('./routes/Admin.routes')(app);
// Inico el servidor de mi api. con una variable de entorno y por defecto en el puerto 8000
app.listen(process.env.PORT || 8000,()=>{
    console.log('Conectado exitosa mente')
})

