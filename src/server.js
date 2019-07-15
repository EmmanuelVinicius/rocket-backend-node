const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

try {
    const app = express();
    app.use(cors);

    // const http = require('http').Server(app)
    // const socketIo = require('socket.io')(http);

    // socketIo.on('connection', socket => {
    //     socket.on('connectionRoom', box => {
    //         socket.join(box);
    //     })
    // })

    mongoose.connect(`mongodb+srv://emmanuel:emmanuel@pessoas-e2ext.mongodb.net/rocket?retryWrites=true`, {
        useNewUrlParser: true
    });
    // isConected = async () => {
    //     const STATUS = {
    //         0: 'Desconectado',
    //         1: 'Conectado',
    //         2: 'Conectando',
    //         3: 'Desconectando',
    //     }
    //     const state = STATUS[mongoose.connection.readyState];
    //     if (state === 'Conectado') return state;

    //     if (state !== 'Conectando') return state;
    //     await new Promise(resolve => setTimeout(resolve, 1000))

    //     return STATUS[mongoose.connection.readyState];
    // }
    // isConected()
    //     .then((status) => console.log('yes', status));

    app.use((request, respose, next) => {
        request.io = socketIo

        return next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))
    app.use(require('./routes'));

    app.listen(process.env.PORT || 3000);
} catch (error) {
    console.error('Erro', error);

}