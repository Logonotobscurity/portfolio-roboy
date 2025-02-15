import { render, screen } from '@testing-library/react';
import { Marquee } from './Marquee';

describe('Marquee', () => {
  it('renders children correctly', () => {
    render(<Marquee>Test Content</Marquee>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Marquee className="test-class">Content</Marquee>);
    expect(screen.getByText('Content')).toHaveClass('test-class');
  });
});
