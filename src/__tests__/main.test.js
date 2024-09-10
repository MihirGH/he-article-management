import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

jest.mock('../data', () => ({
  ARTICLES: jest.requireActual('../__mocks__/data').TEST_ARTICLES,
}));

describe('App', () => {
  it('renders everything correctly', () => {
    render(<App />);

    // Tags
    expect(screen.getByText(`React (2)`)).toBeInTheDocument();
    expect(screen.getByText(`JavaScript (2)`)).toBeInTheDocument();
    expect(screen.getByText(`CSS (2)`)).toBeInTheDocument();
    expect(screen.getByText(`HTML (1)`)).toBeInTheDocument();

    // Articles
    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.getByText('CSS and JS')).toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });
});

describe('Filtering based on individual tags', () => {
  it('renders correctly after selecting a tag and then deselecting it', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`React (2)`)); // Click to select the tag

    // Articles
    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(`React (2)`)); // Click to deselect the tag

    // Articles
    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.getByText('CSS and JS')).toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });

  it('2.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`HTML (1)`)); // Click to select the tag

    // Articles
    expect(screen.queryByText('JS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and React')).not.toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();

    fireEvent.click(screen.getByText(`HTML (1)`)); // Click to deselect the tag

    // Articles
    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.getByText('CSS and JS')).toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });
});

describe('Filtering based on multiple tags', () => {
  it('renders correctly after selecting multiple tags and then deselecting some', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`CSS (2)`)); // Click to select the tag
    fireEvent.click(screen.getByText(`HTML (1)`)); // Click to select the tag

    // Articles
    expect(screen.queryByText('JS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();
  });

  it('2.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`React (2)`)); // Click to select the tag
    fireEvent.click(screen.getByText(`CSS (2)`)); // Click to select the tag

    // Articles
    expect(screen.queryByText('JS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(`CSS (2)`)); // Click to deselect the tag

    // Articles
    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();
  });
});

describe('Removing tag from the article', () => {
  it('disables last tag from being removed and updates the count', () => {
    render(<App />);

    expect(screen.getByText(`React (2)`)).toBeInTheDocument();
    expect(screen.getByText(`JavaScript (2)`)).toBeInTheDocument();

    const tagToRemove = `React \u2A09`;
    const remainingTag = `JavaScript \u2A09`;

    // Click the first React tag
    fireEvent.click(screen.getAllByText(tagToRemove)[0].closest('button'));

    // Removing the last tag i.e., JavaScript on the first article
    // should not be possible and thus it should be disabled
    expect(
      screen.getAllByText(remainingTag)[0].closest('button')
    ).toBeDisabled();

    expect(screen.getByText(`React (1)`)).toBeInTheDocument();
    expect(screen.getByText(`JavaScript (2)`)).toBeInTheDocument();
  });

  it('2.', () => {
    render(<App />);

    expect(screen.getByText(`React (2)`)).toBeInTheDocument();
    expect(screen.getByText(`CSS (2)`)).toBeInTheDocument();

    const tagToRemove = `React \u2A09`;
    const remainingTag = `CSS \u2A09`;

    // Click the first React tag
    fireEvent.click(screen.getAllByText(tagToRemove).at(-1).closest('button'));

    // Removing the last tag i.e., JavaScript on the first article
    // should not be possible and thus it should be disabled
    expect(
      screen.getAllByText(remainingTag).at(-1).closest('button')
    ).toBeDisabled();

    expect(screen.getByText(`React (1)`)).toBeInTheDocument();
    expect(screen.getByText(`CSS (2)`)).toBeInTheDocument();
  });
});
