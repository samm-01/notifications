import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'], // Replace with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from the frontend
    methods: ['GET', 'POST'],
    credentials: true,
})); app.use(express.json());

// Temporary in-memory notification storage
const notifications = [];

// API to fetch notifications
app.get('/api/notifications', (req, res) => {
    console.log('Fetching notifications...');
    res.json({ success: true, notifications });
});

app.post('/api/notify', (req, res) => {
    console.log('Notification request received:', req.body);
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const notification = { message };
    notifications.push(notification); // Save to in-memory storage
    io.emit('newNotification', notification); // Emit notification to all connected clients

    res.status(200).json({ success: true, message: 'Notification sent' });
});


// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Broadcast a new notification to all connected clients
    socket.on('sendNotification', (data) => {
        notifications.push(data); // Add notification to storage
        io.emit('newNotification', data); // Emit to all clients
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
