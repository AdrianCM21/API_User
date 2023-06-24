const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database("./Users.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
});

const sql = "CREATE TABLE Users( nombre TEXT, apellido TEXT, direccion TEXT )"

db.run(sql)
