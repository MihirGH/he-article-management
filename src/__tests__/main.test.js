import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

jest.mock('../data', () => ({
  ARTICLES: jest.requireActual('../__mocks__/data').TEST_ARTICLES,
}));

describe('App', () => {
  it('1.', () => {
    render(<App />);

    expect(screen.getByText(`React (2)`)).toBeInTheDocument();
    expect(screen.getByText(`JavaScript (2)`)).toBeInTheDocument();
    expect(screen.getByText(`CSS (2)`)).toBeInTheDocument();
    expect(screen.getByText(`HTML (1)`)).toBeInTheDocument();

    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.getByText('CSS and JS')).toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });
});

describe('2.', () => {
  it('1.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`React (2)`));

    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(`React (2)`));

    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.getByText('CSS and JS')).toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });

  it('2.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`HTML (1)`));

    expect(screen.queryByText('JS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and React')).not.toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();

    fireEvent.click(screen.getByText(`HTML (1)`));

    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.getByText('CSS and JS')).toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });
});

describe('3.', () => {
  it('1.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`CSS (2)`));
    fireEvent.click(screen.getByText(`HTML (1)`));

    expect(screen.queryByText('JS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();
  });

  it('2.', () => {
    render(<App />);
    fireEvent.click(screen.getByText(`React (2)`));
    fireEvent.click(screen.getByText(`CSS (2)`));

    expect(screen.queryByText('JS and React')).not.toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(`CSS (2)`));

    expect(screen.getByText('JS and React')).toBeInTheDocument();
    expect(screen.queryByText('CSS and JS')).not.toBeInTheDocument();
    expect(screen.getByText('CSS and React')).toBeInTheDocument();
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();
  });
});

describe('4.', () => {
  it('1.', () => {
    render(<App />);

    expect(screen.getByText(`React (2)`)).toBeInTheDocument();
    expect(screen.getByText(`JavaScript (2)`)).toBeInTheDocument();

    const tagToRemove = `React \u2A09`;
    const remainingTag = `JavaScript \u2A09`;

    fireEvent.click(screen.getAllByText(tagToRemove)[0].closest('button'));

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

    fireEvent.click(screen.getAllByText(tagToRemove).at(-1).closest('button'));

    expect(
      screen.getAllByText(remainingTag).at(-1).closest('button')
    ).toBeDisabled();

    expect(screen.getByText(`React (1)`)).toBeInTheDocument();
    expect(screen.getByText(`CSS (2)`)).toBeInTheDocument();
  });
});
