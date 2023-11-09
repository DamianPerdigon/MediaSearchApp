// Import required modules for creating the server and handling requests.
const express = require('express');
const fetch = require('node-fetch'); // Used for making HTTP requests.
const cors = require('cors'); // Middleware to enable CORS.
const path = require('path'); // Utilities for handling and transforming file paths.
const helmet = require('helmet'); // Middleware to help secure Express apps by setting various HTTP headers.
const app = express(); // Create an Express application.
const PORT = process.env.PORT || 5000; // Define port number with preference for environment's port.

// Use Helmet to add a layer of security by setting HTTP headers.
app.use(helmet());

// Enable CORS for all routes.
app.use(cors());

// Serve static files from the 'build' directory where the React app is built.
app.use(express.static(path.join(__dirname, 'build')));

// Route to handle search requests with async function.
app.get('/search', async (req, res) => {
    // Extract search term and media type from the query parameters.
    const searchTerm = req.query.term;
    const mediaType = req.query.media || 'all'; // Default to 'all' if no media type is specified.

    try {
        // Fetch data from the iTunes Search API using the search term and media type.
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=${mediaType}`);
        
        // Check if the response is ok (status code 200).
        if (response.ok) {
            // Parse the response body as JSON.
            const data = await response.json();
            // Send the data back to the client.
            res.send(data);
        } else {
            // If response is not ok, send back the status code and an error message.
            res.status(response.status).send('Error al realizar la consulta a la API de iTunes.');
        }
    } catch (error) {
        // Log and send server errors.
        console.error('Error en la solicitud a la API de iTunes:', error);
        res.status(500).send('Error en el servidor al procesar la solicitud.');
    }
});

// Route to serve the React application's index.html on all other routes not previously handled.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server and listen on the defined port.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
