// Llamamos a la funcion para podernos conectar a la base de datos
const sqlite = require('sqlite3').verbose()

// Guardamos la coneccion en una variable para poder usarla
const db = new sqlite.Database("./Users.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err){
        return console.error(err)
    }else{
        console.log('Conectado a la base de datos')
    }

});

// Exportamos la variable para poder usarlo en cualquir parte del codigo
module.exports=db


