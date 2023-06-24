// Configuraciones de autentifiaciones, esta es una funcion que se ejecuta antes de la funciones de consulta para poder asegurar la integridad de los datos 

// Llamamos la dependencia de jwt, cuando un usuario solicita iniciar secion esta dependencia genera un token y en el momento que este pide acceso a alguna de las consultas ya sea borrado, actualizacion o obtener todos los datos lee el token deser correcto otorga el permiso 
const jwt = require("jsonwebtoken");

// Cada token es creado con una clave secreta y si la clave no coincide no se otorga el acceso, si cambias la claves todas las seciones en curso se cerraran al no tener la misma clave, esta esta alojada en las varibles de entorno
const secret = process.env.MI_CLAVESECRETA;


module.exports.autentificacion = (req, res, next) => {
  // Se realiza la verificacion 
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    // En caso de dar error directo devuelve un error 401 Credenciales no  validas 
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      // De ser correcta las credenciales agregamos la informacion del usuario que viene en el payload para su uso adentro de la consulta 
        req.usuarios=payload;
        // Pasa a la siguinte funcion del path
        next();
    }
  });
}