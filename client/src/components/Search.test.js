// Import necessary React module and testing utility.
import React from 'react';
import { render } from '@testing-library/react';
import Search from './Search'; // Import the Search component to be tested.

// Define a mock localStorage implementation.
const localStorageMock = (function () {
    let store = {}; // Create a simple store to keep key-value pairs in memory.
    return {
        getItem: function (key) { // Mock for the getItem method of localStorage.
            return store[key] || null;
        },
        setItem: function (key, value) { // Mock for the setItem method of localStorage.
            store[key] = value.toString(); // Ensure that all values are stored as strings.
        },
        clear: function () { // Mock for the clear method of localStorage.
            store = {}; // Reset the store to an empty object.
        }
    };
})();

// Define the mock localStorage on the window object.
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock // Assign the mock localStorage as the implementation on window.
});

// Mock the global fetch API.
global.fetch = jest.fn(() =>
    Promise.resolve({ // Return a resolved promise to simulate a successful fetch request.
        ok: true, // Indicate that the fetch request was successful.
        json: () => Promise.resolve({ // Mock the json method of the response.
            results: [] // Return an empty array to simulate an empty fetch response.
        }),
    })
);

// Describe block defines a test suite for the Search component.
describe('Search component', () => {
    it('renders correctly and matches snapshot', () => {
        // Render the Search component and take a snapshot.
        const { asFragment } = render(<Search />);
        // Assert that the rendered output matches the saved snapshot.
        expect(asFragment()).toMatchSnapshot();
    });


});
