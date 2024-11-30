import { Estudiante } from '../models/estudianteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
 
export const create = (estudiante: Estudiante, callback: Function) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
     
    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
        (err) => {
            if (err) { callback(err); }
     
            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId);

            callback(null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
};



export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const estudiantes: Estudiante[] = [];
        rows.forEach(row => {
            const estudiante: Estudiante = {
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            estudiantes.push(estudiante);
        });
        callback(null, {
            statusCode: 200,
            message: 'Estudiantes obtenidos exitosamente',
            data: estudiantes
        });
    });
};


export const getById = (cod_e: number, callback: Function) => {  // Función para obtener un estudiante por su código.
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';  // Consulta SQL para obtener un estudiante por su código.
 
    db.query(queryString, [cod_e], (err, result) => {  // Ejecuta la consulta con el código proporcionado.
        if (err) { callback(err); }  // Si ocurre un error, lo pasa al callback.
 
        const row = (<RowDataPacket[]>result)[0];  // Obtiene la primera fila del resultado.
        if (row) {  // Si el estudiante existe.
            const estudiante: Estudiante = {  // Crea un objeto estudiante a partir de la fila.
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            callback(null, {  // Llama al callback con el resultado de la consulta.
                statusCode: 200,
                message: 'Estudiante obtenido exitosamente',
                data: estudiante  // Retorna los datos del estudiante.
            });
        } else {  // Si no se encuentra el estudiante.
            callback(null, {  // Llama al callback con un mensaje de error.
                statusCode: 404,
                message: 'Estudiante no encontrado'
            });
        }
    });
};

export const update = (estudiante: Estudiante, callback: Function) => { 
    console.log('Actualizando estudiante:', estudiante);  // Para ver los datos que se están enviando
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';  

    db.query(
        queryString,  
        [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.cod_e],  
        (err) => {  
            if (err) { callback(err); }  

            callback(null, {  
                statusCode: 200,
                message: 'Estudiante actualizado exitosamente',
                data: { cod_e: estudiante.cod_e }
            });
        }
    );
};



export const remove = (cod_e: number, callback: Function) => {  // Función para eliminar un estudiante por su código.
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';  // Consulta SQL para eliminar un estudiante por su código.
 
    db.query(queryString, [cod_e], (err) => {  // Ejecuta la consulta con el código del estudiante.
        if (err) { callback(err); }  // Si ocurre un error, lo pasa al callback.
 
        callback(null, {  // Si la eliminación es exitosa, llama al callback con un mensaje de éxito.
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente'
        });
    });
};