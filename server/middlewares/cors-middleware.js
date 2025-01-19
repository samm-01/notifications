export const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from the frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow GET and POST methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow content type header

    // For preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Send a successful response for OPTIONS requests
    }

    next();
};
