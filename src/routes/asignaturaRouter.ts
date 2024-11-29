import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturaController';
import { Asignatura } from '../models/asignaturaModel';
const asignaturaRouter = express.Router();
 
asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body;
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
asignaturaRouter.get('/', async (req: Request, res: Response) => {
    asignaturaController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
//MÉTODOS GET, UPDATE Y DELETE PARA EL ROUTER DE asignatura:
 
asignaturaRouter.get('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    asignaturaController.getById(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Asignatura no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
asignaturaRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    /*
    ... operador de propagación (spread operator) en JavaScript y TypeScript.
    Este operador permite expandir un objeto o un array en sus elementos individuales
    */
    const updatedAsignatura: Asignatura = { ...req.body, cod_e };
 
    asignaturaController.update(updatedAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
asignaturaRouter.delete('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
 
    asignaturaController.remove(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
export {asignaturaRouter};
