import { render, screen } from '@testing-library/react';
import { PatternOverlay } from './PatternOverlay';

describe('PatternOverlay', () => {
  it('renders children correctly', () => {
    render(<PatternOverlay>Test Content</PatternOverlay>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PatternOverlay className="test-class">Content</PatternOverlay>);
    expect(screen.getByText('Content')).toHaveClass('test-class');
  });
});
