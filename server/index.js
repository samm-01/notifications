import express from 'express';
import { corsMiddleware } from './middlewares/cors-middleware.js';
import notificationRoutes from './routes/notification-routes.js';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket/socket-handler.js';
import { PORT } from './config/dotenv-config.js';
import { fileURLToPath } from 'url';
import path from 'path'; // Import the 'path' module
import { dirname, join } from 'path'; // Importing 'join' method


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Serve uploaded files
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));


// Middleware
app.use(corsMiddleware);
app.use(express.json());

// API routes
app.use('/api', (req, res, next) => {
    req.io = global.io; // Pass `io` instance to routes
    next();
}, notificationRoutes);

const httpServer = createServer(app);
global.io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'], // Replace with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Setup Socket.IO
setupSocket(global.io);

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
