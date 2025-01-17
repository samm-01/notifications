const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import cors middleware

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST'], // Allow these HTTP methods
    },
});

// Enable CORS for REST API routes
app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.post('/send-notification', (req, res) => {
    const notification = req.body;

    if (!notification.message || !notification.options) {
        return res.status(400).send('Invalid notification format.');
    }

    io.emit('notification', notification);
    res.send('Notification sent successfully.');
});

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});