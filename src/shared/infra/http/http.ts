import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import routes from './routes';
import AppError from '../../errors/AppError';

import '../typeorm';
import '../../container';

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', '..', '..', 'public')));
app.set('views', path.join(__dirname, '..', '..', '..', '..', 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
    return response.render('html/client.html');
});

app.get('/pages/admin', (request, response) => {
    return response.render('html/admin.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
    console.log('Se conectou', socket.id);
});

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

export { http, io };
