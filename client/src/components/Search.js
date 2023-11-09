// Import React hooks and Search component CSS.
import React, { useState, useEffect } from 'react';
import "./Search.css";

// Search component definition.
function Search() {
    // State variables for search term, media type, items list, favorites, organized favorites, loading, and error message.
    const [searchTerm, setSearchTerm] = useState('');
    const [mediaType, setMediaType] = useState('all');
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    // Organized favorites state to categorize media types.
    const [organizedFavorites, setOrganizedFavorites] = useState({
        music: [],
        movie: [],
        podcast: [],
        audiobook: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Effect hook to load favorites from local storage on component mount.
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // Effect hook to save favorites to local storage when favorites state changes.
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Effect hook to organize favorites into categories based on media type.
    useEffect(() => {
        setOrganizedFavorites(organizeFavorites(favorites));
    }, [favorites]);

    // Function to categorize favorites into their respective media types.
    function organizeFavorites(favs) {
        return favs.reduce((acc, favorite) => {
            const { kind, wrapperType } = favorite;
            // Categorization logic based on media type.
            if (kind === 'song' || kind === 'music-track') {
                acc.music.push(favorite);
            } else if (kind === 'feature-movie') {
                acc.movie.push(favorite);
            } else if (kind === 'podcast') {
                acc.podcast.push(favorite);
            } else if (wrapperType === 'audiobook') {
                acc.audiobook.push(favorite);
            }
            return acc;
        }, { music: [], movie: [], podcast: [], audiobook: [] });
    }

    // Async function to fetch items based on search term and media type.
    async function fetchItems() {
        // Prevent fetch on empty search term.
        if (!searchTerm.trim()) return;

        // Set loading state and clear error state.
        setLoading(true);
        setError('');

        try {
            // Perform fetch request and process response.
            const response = await fetch(`/search?term=${encodeURIComponent(searchTerm)}&media=${mediaType}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setItems(data.results || []);
        } catch (e) {
            // Set error state and log the error.
            setError('There was a problem fetching data.');
            console.error(e);
        } finally {
            // Reset loading state.
            setLoading(false);
        }
    }

    // Function to add an item to the favorites list.
    function addToFavorites(item) {
        setFavorites(favs => (!favs.some(f => f.trackId === item.trackId) ? [...favs, item] : favs));
    }

    // Function to remove an item from the favorites list.
    function removeFromFavorites(trackId) {
        setFavorites(favs => favs.filter(f => f.trackId !== trackId));
    }

    // Handler for search term changes with a debounce effect.
    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
        debounce(fetchItems, 500)();
    }

    // Render the Search component UI.
    return (
        <div>
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
            {/* Search input and media type selector */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search for content"
            />
            <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
                <option value="all">All</option>
                <option value="music">Music</option>
                <option value="movie">Movies</option>
                <option value="podcast">Podcasts</option>
                <option value="audiobook">Audiobooks</option>
            </select>
            <button onClick={fetchItems}>Search</button>
            {/* List of items resulting from the search */}
            <ul>
                {items.map(item => (
                    <li key={item.trackId}>
                        {item.trackName} - {item.artistName}
                        <button onClick={() => addToFavorites(item)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>
            {/* Display of organized favorites */}
            <h2>Favorites</h2>
            {Object.entries(organizedFavorites).map(([key, value]) => (
                <div key={key}>
                    <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                    <ul>
                        {value.map(favorite => (
                            <li key={favorite.trackId}>
                                {favorite.trackName || favorite.collectionName} - {favorite.artistName}
                                <button onClick={() => removeFromFavorites(favorite.trackId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

// Export the Search component as the default export of this module.
export default Search;

// debounce function to limit the frequency of function execution.
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
