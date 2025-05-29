const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const dbUri =  'mongodb://127.0.0.1:27017/short-url';
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports= {
    connectToDatabase
}