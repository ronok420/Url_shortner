const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieparser = require('cookie-parser');
const UrlRoutes = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoutes = require('./routes/user');
const { connectToDatabase } = require('./dbConnect/connection');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');


const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieparser()); // Parse cookies

connectToDatabase(); // Connect to MongoDB
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.resolve("./views")); // Set the views directory

// Basic route
app.use('/api/urls', restrictToLoggedInUserOnly, UrlRoutes);
app.use('/',checkAuth, staticRoute);
app.use('/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});