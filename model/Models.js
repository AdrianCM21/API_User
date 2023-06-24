// Son las consultas sql que exporto en un objeto para poder usarlo a lo largo del codigo 
 const consultas={
    INSERT:"INSERT INTO Users('nombre','apellido','direccion') VALUES(?,?,?)",
    ONE_SELEC:"SELECT nombre FROM  Users WHERE nombre = ?",
    ONE_SELEC_ID:"SELECT nombre FROM  Users WHERE oid = ?",
    ALL_SELEC:"SELECT nombre FROM  Users ",
    ACTUALIZACION:"UPDATE Users  SET nombre = ?,apellido=?,direccion =? WHERE oid = ?",
    BORRADO:"DELETE FROM Users WHERE oid = ?"

}

module.exports=consultas