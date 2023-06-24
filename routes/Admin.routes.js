// Importamos los modulos de consulta y autentificacion 
const ControlUser = require('../controllers/User.controller');
// Solo como ejemplo utilizo una sola vez
const Autentificacion = require('../config/Jwt.config')

module.exports = (app)=>{
    // Direccion de crear, iniciar y cerrar secion 
    app.post("/api/login",ControlUser.login);
    app.get("/api/cerrar",ControlUser.cerrar);
    app.post("/api/user",ControlUser.createUser);
    // En esta consulta se nesecita Iniciar secion para poder acceder a los datos 
    app.get("/api/user_autenti",Autentificacion.autentificacion,ControlUser.allSelect);
    // Lo mismo que el anterior pero le quite el requerimiento de estar autenticado
    app.get("/api/user",ControlUser.allSelect);
    // Direccon de odtener un solo usuario
    app.get("/api/user/:id",ControlUser.oneSelect);
    // Direccion de actualizacion 
    app.put('/api/actualizacion/:id',ControlUser.update);
    // Direccion de eliminado
    app.delete('/api/borrado/:id',ControlUser.delete);
}

