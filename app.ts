import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { estudianteRouter } from './src/routes/estudianteRouter';
import { profesorRouter } from './src/routes/profesorRouter';
import { asignaturaRouter } from './src/routes/asignaturaRouter';
import { db } from './db';
import cors from 'cors';

const app = express();
dotenv.config();


import path from 'path';
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (Req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/asignaturas', asignaturaRouter);

db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database connection');
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not found', message: 'URL not found' });
});

app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});