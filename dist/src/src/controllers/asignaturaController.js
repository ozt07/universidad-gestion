"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Crear una nueva asignatura
const create = (asignatura, callback) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Asignatura creada exitosamente',
            data: {
                cod_a: asignatura.cod_a
            }
        });
    });
};
exports.create = create;
// Obtener todas las asignaturas
const getAll = (callback) => {
    const queryString = 'SELECT * FROM asignaturas';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const asignaturas = [];
        rows.forEach(row => {
            const asignatura = {
                cod_a: row.cod_a,
                nom_a: row.nom_a,
                int_h: row.int_h,
                creditos: row.creditos
            };
            asignaturas.push(asignatura);
        });
        callback(null, {
            statusCode: 200,
            message: 'Asignaturas obtenidas exitosamente',
            data: asignaturas
        });
    });
};
exports.getAll = getAll;
// Obtener una asignatura por su código
const getById = (cod_a, callback) => {
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [cod_a], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const asignatura = {
                cod_a: row.cod_a,
                nom_a: row.nom_a,
                int_h: row.int_h,
                creditos: row.creditos
            };
            callback(null, {
                statusCode: 200,
                message: 'Asignatura obtenida exitosamente',
                data: asignatura
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Asignatura no encontrada'
            });
        }
    });
};
exports.getById = getById;
// Actualizar una asignatura
const update = (asignatura, callback) => {
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
    db_1.db.query(queryString, [asignatura.nom_a, asignatura.int_h, asignatura.creditos, asignatura.cod_a], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura actualizada exitosamente',
            data: { cod_a: asignatura.cod_a }
        });
    });
};
exports.update = update;
// Eliminar una asignatura
const remove = (cod_a, callback) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [cod_a], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente'
        });
    });
};
exports.remove = remove;
