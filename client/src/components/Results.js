// Import React and the CSS for styling the Results component.
import React from 'react';
import './Results.css';

// Define the Results component that accepts 'items' as a prop.
const Results = ({ items }) => {
    // Return a JSX element representing the list of items.
    return (
        // Use the <ul> element to define an unordered list.
        <ul>
            {/* Map over the items array passed as a prop to create list items. */}
            {items.map(item => (
                // Each list item has a unique 'key' prop (required in lists for React's reconciliation process).
                // Display the track name and artist name for each item.
                <li key={item.trackId}>{item.trackName} - {item.artistName}</li>
            ))}
        </ul>
    );
};

// Export the Results component as the default export of this module.
export default Results;
