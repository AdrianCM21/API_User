// Exporto las consultas 
const consultas = require('../model/Models')

// Exporto la coneccion a la base de datos
const db = require('../config/Sqlite.config')


const jwt = require('jsonwebtoken');

// ------------------------------------------MODULO CREAR USUARIO------------------------------------------------
module.exports.createUser = async (request, response) => {
    try{ 
    // Obtenemos los datos enviados por el usuario 
    const {nombre,apellido,direccion}=request.body 
    // Lo insertamos en la base de datos y devolvemos la confirmacion de exito
    user = await db.run(consultas.INSERT,[nombre,apellido,direccion])  
    response.json({msg:'Exito'});

    } catch(err){
        // En caso de aver algun tipo de error lo reportamos con el codigo correspondiente 
        response.status(400);
        response.json(err);
        
     } ;
}


// ----------------------------------------MODULO OBTENER TODOS LOS USUARIOS-------------------------------
module.exports.allSelect= async (req, res) => {
    try {
        // Buscamos en la base de datos Todos los datos
        await db.all(consultas.ALL_SELEC,(err,rows)=>{
            // Nos aseguramos que no hubo ningun tipo de error 
            if(err){
                return res.status(400).json(err);
            }
            // De todo salir correcto Odtendras todos los datos 
            if (rows === null) {
                return res.status(403).json({ msg: "No encontrado" });
            }else{res.json(rows)}
        })
        
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
  };

  // ----------------------------------------MODULO OBTENER UN SOLO USUARIO-----------------------------------
module.exports.oneSelect= async (req, res) => {
    try {
        // Buscamos en la base de datos Todos los datos
        await db.all(consultas.ONE_SELEC_ID,[req.params.id],(err,rows)=>{
            // Nos aseguramos que no hubo ningun tipo de error 
            if(err){
                return res.status(400).json(err);
            }
            // De todo salir correcto Odtendras el usuario que buscas 
            if (rows === null) {
                return res.status(403).json({ msg: "No encontrado" });
            }else{
                res.json(rows)
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
  };


 // ----------------------------------------Actualizar datos-----------------------------------
 module.exports.update= async (req, res) => {
    try {
        // Extraemos los datos para actualizar
        const {nombre,apellido,direccion} = req.body
    
        // Buscamos en la base de datos Todos los datos
        await db.all(consultas.ACTUALIZACION,[nombre,apellido,direccion,req.params.id],(err,rows)=>{
            // Nos aseguramos que no hubo ningun tipo de error 
            if(err){
                console.log(err)
                return res.status(400).json(err);
            }
            if (rows === null) {
                return res.status(403).json({ msg: "No encontrado" });
            }else{
                res.json({msg:'Actualizacion exitosa'})
            }

            
        })
        
    }catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
  };



// ----------------------------------------BORRAR DATOS --------------------------------------------
module.exports.delete= async (req, res) => {
    try {
        // Extraemos los datos para actualizar
        
        // Buscamos en la base de datos El dato a eliminar por la id proporcionada
        await db.all(consultas.BORRADO,[req.params.id],(err,rows)=>{
            // Nos aseguramos que no hubo ningun tipo de error 
            if(err){
                console.log(err)
                return res.status(400).json(err);
            }
            if (rows === null) {
                return res.status(403).json({ msg: "No encontrado" });
            }else{
                res.json({msg:'Eliminado exitoso'})
            }

            
        })
        
    }catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
  };



//-----------------------------------------MODULO INICIO SECION--------------------------------------------
// En este caso para iniciar secion lo unico que nesecitas es que tu nombre se encuentre en la base de datos Ejemplo simple 
module.exports.login= async (req, res) => {
    try {
        // Extraemos el Nombre que nos enviaron 
        const {nombre} = req.body;
        // Buscamos en la base de datos el nombre recivido
        await db.all(consultas.ONE_SELEC,[nombre],(err,rows)=>{
            // Nos aseguramos que no hubo ningun tipo de error 
            if(err){
                return res.status(400).json(err);
            }
            // Lo guardamos en una variable los datos odtenidos 
            const user=rows
            // Comprobamos que El nombre ingresado se encuentra en nuestra base de datos de lo contrarior enviamos el mensaje de error correspondiente
            if (user.nombre === null) {
                return res.status(403).json({ msg: "Nombre No encontrado" });
            }else{
                // De encontrarse el nombre generamos el token con la dependencia jwt y le asignamos una clave unica que nos servira a la hora de comprovar datos
                const secret = process.env.MI_CLAVESECRETA || '12345';
                const newJWT = jwt.sign({
                nombre:user.nombre
             },secret)
            //  Enviamos el token en una cooki
            res.cookie("usertoken", newJWT, {
              httpOnly: true
            }).json({msg:'Inicio de secion exitosa'})
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json(error)
    }
  };




// -----------------------------------MODULO CERRAR SECION-----------------------------------------
// En caso de querer Salir de la secion solo borramos el token que le asignamos
  module.exports.cerrar=(req,res)=>{
    try {
        res.clearCookie("usertoken");
        res.json({msg:'Saliste Correctamente'})
    } catch (error) {
        res.json(error)
    }
  }
  