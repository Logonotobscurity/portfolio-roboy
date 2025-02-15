import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoryCard } from './StoryCard';

describe('StoryCard', () => {
  const mockProps = {
    title: 'Test Story',
    description: 'Test Description',
    image: '/test-image.jpg',
    date: '2024-02-25',
    content: 'This is the story content'
  };

  it('renders story card with correct content', () => {
    render(<StoryCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProps.image);
    expect(screen.getByText(mockProps.date)).toBeInTheDocument();
    expect(screen.getByText(mockProps.content)).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<StoryCard {...mockProps} />);
    
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).toHaveClass('shadow-lg');
  });
}); 