const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server, {pingTimeout: 25000})

// Static folder
app.use(express.static(__dirname + '/client'));

// Run when client connects
io.on('connection', socket => {
    // ### Test New user connection ### //
    //console.log('New Connection....');

    // Welcome Message
    socket.emit('message', 'Välkommen till Chatten!')

    // Broadcst when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnects', () =>{
        io.emit('message', 'A user has left the chat')
    });

    // Listen chat message
    socket.on('chat message', (msg) =>{
        io.emit('chat message', msg)
    })

});

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))