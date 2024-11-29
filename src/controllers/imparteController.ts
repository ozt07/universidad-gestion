import { Imparte } from '../models/imparteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a,  imparte.grupo, imparte.horario],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 201,
                message: 'Imparte creada exitosamente',
                data: {
                    id_p: imparte.id_p
                }
            });
        }
    );
};
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM imparte';

    db.query(queryString, (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket[]>result;
        const imparte:  Imparte[] = [];
        rows.forEach(row => {
            const   imparte:   Imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                horario: row.horario
            };
            imparte.push(imparte);
        });
        callback(null, {
            statusCode: 200,
            message: '  Imparte obtenidas exitosamente',
            data: imparte
        });
    });
};
export function getById(cod_e: number, arg1: (err: Error, result: any) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error('Function not implemented.');
}

export function update(updatedImparte: Imparte, arg1: (err: Error, result: any) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error('Function not implemented.');
}

export function remove(cod_e: number, arg1: (err: Error, result: any) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error('Function not implemented.');
}

