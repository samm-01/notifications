import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path'; // Import the 'path' module
import { dirname, join } from 'path'; // Importing 'join' method
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const notifications = []; // Temporary in-memory storage

// Ensure 'uploads' directory exists
const uploadDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Create 'uploads' directory if it doesn't exist
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = join(__dirname, 'uploads');  // Use 'join' correctly here
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    },
});
const upload = multer({ storage });

// Fetch notifications
router.get('/notifications', (req, res) => {
    console.log('Fetching notifications...');
    res.json({ success: true, notifications });
});

// Add a new notification
router.post('/notify', upload.single('document'), (req, res) => {
    console.log('Notification request received:', req.body);
    const { message, username, profileImage, source } = req.body;
    const document = req.file ? `/uploads/${req.file.filename}` : null;
    const timestamp = new Date().toISOString(); // Add timestamp to the notification

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const notification = {
        message,
        username,
        profileImage,
        source,
        timestamp,
        document,
    };

    notifications.push(notification); // Save to in-memory storage

    req.io.emit('newNotification', notification); // Emit notification to all connected clients
    res.status(200).json({
        success: true, message: 'Notification sent',
        notification, // Include the full notification object in the response
    });
});

export default router;
