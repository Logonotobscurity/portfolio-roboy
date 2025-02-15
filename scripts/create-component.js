import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function createComponentTemplate(name) {
  return `import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ${name}Props {
  children?: ReactNode;
  className?: string;
}

export function ${name}({ children, className }: ${name}Props) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
`;
}

function createTestTemplate(name) {
  return `import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders children correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${name} className="test-class">Content</${name}>);
    expect(screen.getByText('Content')).toHaveClass('test-class');
  });
});
`;
}

function createIndexTemplate(name) {
  return `export { ${name} } from './${name}';
`;
}

function createComponent(name) {
  const componentDir = resolve(__dirname, '../src/components', name.toLowerCase());
  
  if (existsSync(componentDir)) {
    console.error(`Component ${name} already exists!`);
    process.exit(1);
  }

  try {
    // Create component directory
    mkdirSync(componentDir, { recursive: true });

    // Create component file
    writeFileSync(
      resolve(componentDir, `${name}.tsx`),
      createComponentTemplate(name)
    );

    // Create test file
    writeFileSync(
      resolve(componentDir, `${name}.test.tsx`),
      createTestTemplate(name)
    );

    // Create index file
    writeFileSync(
      resolve(componentDir, 'index.ts'),
      createIndexTemplate(name)
    );

    console.log(`✅ Component ${name} created successfully!`);
  } catch (error) {
    console.error('Error creating component:', error);
    process.exit(1);
  }
}

// Get component name from command line
const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name!');
  process.exit(1);
}

// Validate component name
if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
  console.error('Component name must be in PascalCase!');
  process.exit(1);
}

createComponent(componentName); 