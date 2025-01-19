import cors from 'cors';

export const corsMiddleware = cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST'],
    credentials: true,
});
