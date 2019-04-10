const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors);

const http = require('http').Server(app)
const socketIo = require('socket.io')(server);

socketIo.on('connection', socket => {
    socket.on('connectionRoom', box => {
        socket.join(box);
    })
})

mongoose.connect(`mongodb+srv://emmanuel:emmanuel@pessoas-e2ext.mongodb.net/rocket?retryWrites=true`, {
    useNewUrlParser: true
});

app.use((request, respose, next) => {
    request.io = socketIo
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))
app.use(require('./routes'));

http.listen(3000);