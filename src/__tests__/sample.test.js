import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

describe('1.', () => {
  it('1.', () => {
    render(<App />);

    expect(screen.getByText(`history (2)`)).toBeInTheDocument();
    expect(screen.getByText(`english (2)`)).toBeInTheDocument();
    expect(screen.getByText(`french (3)`)).toBeInTheDocument();
    expect(screen.getByText(`fiction (1)`)).toBeInTheDocument();
    expect(screen.getByText(`mystery (1)`)).toBeInTheDocument();
    expect(screen.getByText(`love (1)`)).toBeInTheDocument();
  });
});

describe('2.', () => {
  it('1.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`history (2)`));

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

  it('2.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`french (3)`));
    fireEvent.click(screen.getByText(`love (1)`));

    expect(
      screen.getByText('Hopes and dreams were dashed that day.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Dave watched as the forest burned up on the hill.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('He was an expert but not in a discipline')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(`love (1)`));

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

describe('3.', () => {
  it('1.', () => {
    render(<App />);

    expect(screen.getByText(`history (2)`)).toBeInTheDocument();

    const tagToRemove = `history \u2A09`;
    const remainingTag = `english \u2A09`;

    fireEvent.click(screen.getAllByText(tagToRemove)[0].closest('button'));

    expect(
      screen.getAllByText(remainingTag)[0].closest('button')
    ).toBeDisabled();

    expect(screen.getByText(`history (1)`)).toBeInTheDocument();
    expect(screen.getByText(`english (2)`)).toBeInTheDocument();
  });
});
