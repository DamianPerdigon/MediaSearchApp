// Import React and testing utilities from the @testing-library/react package.
import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './Results'; // Import the Results component to be tested.

// Group tests for the Results component using the describe function.
describe('Results component', () => {
  // First test to check if the Results component renders without crashing.
  test('renders without crashing', () => {
    render(<Results items={[]} />); // Renders the Results component with empty items prop.
    expect(screen.getByRole('list')).toBeInTheDocument(); // Asserts that a list is rendered.
  });

  // Second test to check if the Results component renders a list of items correctly.
  test('renders list of items', () => {
    // Define mock items to simulate props passed to the Results component.
    const items = [
      { trackId: 1, trackName: 'Song One', artistName: 'Artist One' },
      { trackId: 2, trackName: 'Song Two', artistName: 'Artist Two' },
      { trackId: 3, trackName: 'Song Three', artistName: 'Artist Three' }
    ];

    render(<Results items={items} />); // Renders the Results component with the mock items.

    // Loop over each item and assert that the text for each item is rendered.
    items.forEach(item => {
      expect(screen.getByText(`${item.trackName} - ${item.artistName}`)).toBeInTheDocument();
    });
  });
});
