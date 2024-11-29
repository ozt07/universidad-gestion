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

export function getById(cod_e: number, arg1: (err: Error, result: any) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error('Function not implemented.');
}
export function update(updatedEstudiante: Estudiante, arg1: (err: Error, result: any) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error('Function not implemented.');
}

export function remove(cod_e: number, arg1: (err: Error, result: any) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error('Function not implemented.');
}

