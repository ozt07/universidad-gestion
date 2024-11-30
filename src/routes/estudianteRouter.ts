import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiante } from '../models/estudianteModel';
const estudianteRouter = express.Router();

// Ruta para crear un nuevo estudiante (POST)
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body;
    estudianteController.create(newEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});



// Ruta para obtener todos los estudiantes (GET)
estudianteRouter.get('/', async (req: Request, res: Response) => {
    estudianteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

// Ruta para actualizar un estudiante (PUT)
//MÉTODOS GET, UPDATE Y DELETE PARA EL ROUTER DE ESTUDIANTE:

 
estudianteRouter.get('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    estudianteController.getById(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Estudiante no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
estudianteRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    /*
    ... operador de propagación (spread operator) en JavaScript y TypeScript.
    Este operador permite expandir un objeto o un array en sus elementos individuales
    */
    const updatedEstudiante: Estudiante = { ...req.body, cod_e };
 
    estudianteController.update(updatedEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
estudianteRouter.delete('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
 
    estudianteController.remove(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
export {estudianteRouter};
