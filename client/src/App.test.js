// Import React and testing utilities.
import React from 'react';
import { render } from '@testing-library/react';
import App from './App'; // Import the App component to be tested.

// Mock the global fetch method to return a promise resolving to an empty array.
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([]) // Simulate a successful API call with an empty result.
    })
);

// Describe block defines a test suite for the App component.
describe('App component', () => {
    // Test case to check if the App component renders correctly and matches the saved snapshot.
    it('renders correctly and matches snapshot', () => {
        // Render the App component.
        const { asFragment } = render(<App />);
        // Take a snapshot of the rendered component and compare it to the previous snapshot.
        expect(asFragment()).toMatchSnapshot();
    });

    // Additional test cases for the App component could be added here.
});

// afterEach is a Jest lifecycle method that runs after each test case in this suite.
afterEach(() => {
  jest.restoreAllMocks(); // Restore mocks to their original state to avoid leakage between tests.
});
