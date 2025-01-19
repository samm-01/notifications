export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('sendNotification', (data) => {
            console.log('Notification received via socket:', data);
            io.emit('newNotification', data);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
