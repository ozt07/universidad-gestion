import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/imparteModel';
const imparteRouter = express.Router();
 
imparteRouter.post('/', async (req: Request, res: Response) => {
    const newimparte: Imparte = req.body;
    imparteController.create(newimparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
imparteRouter.get('/', async (req: Request, res: Response) => {
    imparteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
//MÉTODOS GET, UPDATE Y DELETE PARA EL ROUTER DE imparte:
 
imparteRouter.get('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    imparteController.getById(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Imparte no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
imparteRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    /*
    ... operador de propagación (spread operator) en JavaScript y TypeScript.
    Este operador permite expandir un objeto o un array en sus elementos individuales
    */
    const updatedImparte: Imparte = { ...req.body, cod_e };
 
    imparteController.update(updatedImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
imparteRouter.delete('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
 
    imparteController.remove(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
export {imparteRouter};

