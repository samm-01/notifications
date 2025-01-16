const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { log } = require('console');

const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

app.use(express.json());

io.on('connection', (socket) => {
    console.log('Client connected', socket.id);
    // console.log('message', message);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
})

app.post('/send', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Message is required');
    }
    io.emit('pushNotification', { message });
    console.log('Notification sent:', message);

    res.status(200).send('Message sent');


});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
