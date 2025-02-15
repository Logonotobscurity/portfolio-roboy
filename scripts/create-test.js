import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function createTestTemplate(name, type) {
  switch (type) {
    case 'component':
      return `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ${name} } from '@/components/${name.toLowerCase()}';

describe('${name}', () => {
  it('renders correctly', () => {
    render(<${name} />);
    // Add your test assertions here
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<${name} />);
    // Add your interaction tests here
  });
});
`;

    case 'hook':
      return `import { renderHook, act } from '@testing-library/react';
import { ${name} } from '@/hooks/${name.toLowerCase()}';

describe('${name}', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => ${name}());
    // Add your test assertions here
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => ${name}());
    act(() => {
      // Add your state update tests here
    });
  });
});
`;

    case 'util':
      return `import { describe, it, expect } from 'vitest';
import { ${name} } from '@/utils/${name.toLowerCase()}';

describe('${name}', () => {
  it('works correctly', () => {
    // Add your test assertions here
  });

  it('handles edge cases', () => {
    // Add your edge case tests here
  });
});
`;

    default:
      throw new Error('Invalid test type');
  }
}

function createTest(name, type) {
  const baseDir = resolve(__dirname, '../src');
  let testPath;

  switch (type) {
    case 'component':
      testPath = resolve(baseDir, 'components', name.toLowerCase(), `${name}.test.tsx`);
      break;
    case 'hook':
      testPath = resolve(baseDir, 'hooks', name.toLowerCase(), `${name}.test.ts`);
      break;
    case 'util':
      testPath = resolve(baseDir, 'utils', `${name}.test.ts`);
      break;
    default:
      throw new Error('Invalid test type');
  }

  if (existsSync(testPath)) {
    console.error(`Test file for ${name} already exists!`);
    process.exit(1);
  }

  try {
    writeFileSync(testPath, createTestTemplate(name, type));
    console.log(`✅ Test file for ${name} created successfully!`);
  } catch (error) {
    console.error('Error creating test file:', error);
    process.exit(1);
  }
}

// Get test info from command line
const [name, type] = process.argv.slice(2);

if (!name || !type) {
  console.error('Please provide both a name and type (component/hook/util)!');
  process.exit(1);
}

// Validate name
if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error('Name must be in PascalCase!');
  process.exit(1);
}

// Validate type
const validTypes = ['component', 'hook', 'util'];
if (!validTypes.includes(type)) {
  console.error('Type must be one of:', validTypes.join(', '));
  process.exit(1);
}

createTest(name, type); 