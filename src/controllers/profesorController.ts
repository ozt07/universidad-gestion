import { Profesor } from '../models/profesorModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';


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
