import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

describe('App', () => {
  it('renders tags correctly', () => {
    render(<App />);

    // Tags
    expect(screen.getByText(`history (2)`)).toBeInTheDocument();
    expect(screen.getByText(`english (2)`)).toBeInTheDocument();
    expect(screen.getByText(`french (3)`)).toBeInTheDocument();
    expect(screen.getByText(`fiction (1)`)).toBeInTheDocument();
    expect(screen.getByText(`mystery (1)`)).toBeInTheDocument();
    expect(screen.getByText(`love (1)`)).toBeInTheDocument();
  });
});

describe('Filtering', () => {
  it('filters correctly based on single tag', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`history (2)`)); // Click to select the tag

    // Articles
    expect(
      screen.getByText('His mother had always taught him')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Dave watched as the forest burned up on the hill.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('He was an expert but not in a discipline')
    ).not.toBeInTheDocument();
  });

  it('filters correctly based on multiple tags', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`french (3)`)); // Click to select the tag
    fireEvent.click(screen.getByText(`love (1)`)); // Click to select the tag

    // Articles
    expect(
      screen.getByText('Hopes and dreams were dashed that day.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Dave watched as the forest burned up on the hill.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('He was an expert but not in a discipline')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(`love (1)`)); // Click to deselect the tag

    // Articles
    expect(
      screen.getByText('Hopes and dreams were dashed that day.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Dave watched as the forest burned up on the hill.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('He was an expert but not in a discipline')
    ).toBeInTheDocument();
  });
});

describe('Removing tag from the article', () => {
  it('disables last tag from being removed and updates the count', () => {
    render(<App />);

    expect(screen.getByText(`history (2)`)).toBeInTheDocument();

    const tagToRemove = `history \u2A09`;
    const remainingTag = `english \u2A09`;

    // Click the first React tag
    fireEvent.click(screen.getAllByText(tagToRemove)[0].closest('button'));

    // Removing the last tag i.e., JavaScript on the first article
    // should not be possible and thus it should be disabled
    expect(
      screen.getAllByText(remainingTag)[0].closest('button')
    ).toBeDisabled();

    expect(screen.getByText(`history (1)`)).toBeInTheDocument();
    expect(screen.getByText(`english (2)`)).toBeInTheDocument();
  });
});
