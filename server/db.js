

let connectionStatus = 'Disconnected';
const URI = process.env.URI;

const mongoose = require('mongoose');

const startDatabase = async () => {
    try {
        await mongoose.connect(URI);
        connectionStatus = 'Connected';
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err); 
        connectionStatus = 'Failed';
    }
};

const getConnectionStatus = async () => {
    return JSON.stringify(connectionStatus);
}

module.exports = { getConnectionStatus,startDatabase };
