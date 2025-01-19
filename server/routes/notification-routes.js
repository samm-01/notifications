import express from 'express';

const router = express.Router();
const notifications = []; // Temporary in-memory storage

// Fetch notifications
router.get('/notifications', (req, res) => {
    console.log('Fetching notifications...');
    res.json({ success: true, notifications });
});

// Add a new notification
router.post('/notify', (req, res) => {
    console.log('Notification request received:', req.body);
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const notification = { message };
    notifications.push(notification); // Save to in-memory storage

    req.io.emit('newNotification', notification); // Emit notification to all connected clients
    res.status(200).json({ success: true, message: 'Notification sent' });
});

export default router;
