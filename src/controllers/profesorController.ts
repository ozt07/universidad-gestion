import { Profesor } from '../models/profesorModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// Crear un nuevo profesor
export const create = (profesor: Profesor, callback: Function) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
     
    db.query(
        queryString,
        [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion],
        (err) => {
            if (err) { callback(err); }
            
            callback(null, {
                statusCode: 201,
                message: 'Profesor creado exitosamente',
                data: {
                    id_p: profesor.id_p
                }
            });
        }
    );
};

// Obtener todos los profesores
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM profesores';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const profesores: Profesor[] = [];
        rows.forEach(row => {
            const profesor: Profesor = {
                id_p: row.id_p,
                nom_p: row.nom_p,
                dir_p: row.dir_p,
                tel_p: row.tel_p,
                profesion: row.profesion
            };
            profesores.push(profesor);
        });
        callback(null, {
            statusCode: 200,
            message: 'Profesores obtenidos exitosamente',
            data: profesores
        });
    });
};

// Obtener un profesor por su id
export const getById = (id_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
 
    db.query(queryString, [id_p], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const profesor: Profesor = {
                id_p: row.id_p,
                nom_p: row.nom_p,
                dir_p: row.dir_p,
                tel_p: row.tel_p,
                profesion: row.profesion
            };
            callback(null, {
                statusCode: 200,
                message: 'Profesor obtenido exitosamente',
                data: profesor
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Profesor no encontrado'
            });
        }
    });
};

// Actualizar un profesor
export const update = (profesor: Profesor, callback: Function) => {
    console.log('Actualizando profesor:', profesor);  // Para ver los datos que se están enviando
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';

    db.query(
        queryString,
        [profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion, profesor.id_p],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 200,
                message: 'Profesor actualizado exitosamente',
                data: { id_p: profesor.id_p }
            });
        }
    );
};

// Eliminar un profesor
export const remove = (id_p: number, callback: Function) => {
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
 
    db.query(queryString, [id_p], (err) => {
        if (err) { callback(err); }

        callback(null, {
            statusCode: 200,
            message: 'Profesor eliminado exitosamente'
        });
    });
};
