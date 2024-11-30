"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (imparte, callback) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Relación de impartición creada exitosamente',
            data: {
                id_p: imparte.id_p,
                cod_a: imparte.cod_a
            }
        });
    });
};
exports.create = create;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM imparte';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const impartes = [];
        rows.forEach(row => {
            const imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                horario: row.horario
            };
            impartes.push(imparte);
        });
        callback(null, {
            statusCode: 200,
            message: 'Relaciones de impartición obtenidas exitosamente',
            data: impartes
        });
    });
};
exports.getAll = getAll;
const getById = (id_p, cod_a, callback) => {
    const queryString = 'SELECT * FROM imparte WHERE id_p = ? AND cod_a = ?';
    db_1.db.query(queryString, [id_p, cod_a], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                horario: row.horario
            };
            callback(null, {
                statusCode: 200,
                message: 'Relación de impartición obtenida exitosamente',
                data: imparte
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Relación de impartición no encontrada'
            });
        }
    });
};
exports.getById = getById;
const update = (imparte, callback) => {
    const queryString = 'UPDATE imparte SET grupo = ?, horario = ? WHERE id_p = ? AND cod_a = ?';
    db_1.db.query(queryString, [imparte.grupo, imparte.horario, imparte.id_p, imparte.cod_a], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Relación de impartición actualizada exitosamente',
            data: {
                id_p: imparte.id_p,
                cod_a: imparte.cod_a
            }
        });
    });
};
exports.update = update;
const remove = (id_p, cod_a, callback) => {
    const queryString = 'DELETE FROM imparte WHERE id_p = ? AND cod_a = ?';
    db_1.db.query(queryString, [id_p, cod_a], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Relación de impartición eliminada exitosamente'
        });
    });
};
exports.remove = remove;
