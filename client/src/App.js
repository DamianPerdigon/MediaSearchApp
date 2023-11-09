// Import React, useState hook, child components, and styles.
import React, { useState } from 'react';
import Search from './components/Search'; // Import the Search component.
import Results from './components/Results'; // Import the Results component.
import './App.css'; // Import the CSS for styling the App component.

// Define the main App component.
const App = () => {
    // results state to store the search results.
    const [results, setResults] = useState([]);

    // handleSearch function to perform a search and update the results.
    const handleSearch = (searchTerm) => {
        // Use fetch API to perform a search with the searchTerm.
        fetch(`/search?query=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json()) // Parse the JSON response.
            .then(data => {
                setResults(data); // Update the results state with the fetched data.
            })
            .catch(error => console.error("Error al buscar datos:", error)); // Log errors to the console.
    };
    
    // Render the App component.
    return (
        <div>
            <h1>Buscador de Medios</h1> {/* Main heading */}
            <Search onSearch={handleSearch} /> {/* Search component with onSearch prop */}
            <Results items={results} /> {/* Results component with items prop */}
        </div>
    );
};

// Export the App component as the default export of this module.
export default App;
