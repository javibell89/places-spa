import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <div data-testid='child'>Test Content</div>
      </Card>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies custom className correctly', () => {
    render(
      <Card className='custom-class'>
        <div>Content</div>
      </Card>
    );

    const cardElement = screen.getByText('Content').parentElement;
    expect(cardElement).toHaveClass('card', 'custom-class');
  });

  test('applies custom styles correctly', () => {
    const customStyle = { backgroundColor: 'red', padding: '20px' };

    render(
      <Card style={customStyle}>
        <div>Content</div>
      </Card>
    );

    const cardElement = screen.getByText('Content').parentElement;
    expect(cardElement).toHaveStyle(customStyle);
  });

  test('renders without props', () => {
    render(<Card />);

    const cardElement = document.querySelector('.card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('card');
  });
});
