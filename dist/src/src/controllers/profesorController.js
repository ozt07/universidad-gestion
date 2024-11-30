"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Crear un nuevo profesor
const create = (profesor, callback) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Profesor creado exitosamente',
            data: {
                id_p: profesor.id_p
            }
        });
    });
};
exports.create = create;
// Obtener todos los profesores
const getAll = (callback) => {
    const queryString = 'SELECT * FROM profesores';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const profesores = [];
        rows.forEach(row => {
            const profesor = {
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
exports.getAll = getAll;
// Obtener un profesor por su id
const getById = (id_p, callback) => {
    const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
    db_1.db.query(queryString, [id_p], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const profesor = {
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
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Profesor no encontrado'
            });
        }
    });
};
exports.getById = getById;
// Actualizar un profesor
const update = (profesor, callback) => {
    console.log('Actualizando profesor:', profesor); // Para ver los datos que se están enviando
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
    db_1.db.query(queryString, [profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion, profesor.id_p], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Profesor actualizado exitosamente',
            data: { id_p: profesor.id_p }
        });
    });
};
exports.update = update;
// Eliminar un profesor
const remove = (id_p, callback) => {
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
    db_1.db.query(queryString, [id_p], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Profesor eliminado exitosamente'
        });
    });
};
exports.remove = remove;
