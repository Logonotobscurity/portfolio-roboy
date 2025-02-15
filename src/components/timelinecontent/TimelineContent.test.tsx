import { render, screen } from '@testing-library/react';
import { TimelineContent } from './TimelineContent';

describe('TimelineContent', () => {
  it('renders children correctly', () => {
    render(<TimelineContent>Test Content</TimelineContent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TimelineContent className="test-class">Content</TimelineContent>);
    expect(screen.getByText('Content')).toHaveClass('test-class');
  });
});
