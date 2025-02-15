import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function createHookTemplate(name) {
  return `import { useState, useCallback } from 'react';

export function ${name}() {
  const [state, setState] = useState<boolean>(false);

  const handler = useCallback(() => {
    setState(prev => !prev);
  }, []);

  return {
    state,
    handler
  };
}
`;
}

function createTestTemplate(name) {
  return `import { renderHook, act } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => ${name}());
    expect(result.current.state).toBe(false);
  });

  it('should toggle state when handler is called', () => {
    const { result } = renderHook(() => ${name}());
    
    act(() => {
      result.current.handler();
    });
    
    expect(result.current.state).toBe(true);
  });
});
`;
}

function createIndexTemplate(name) {
  return `export { ${name} } from './${name}';
`;
}

function createHook(name) {
  const hookDir = resolve(__dirname, '../src/hooks', name.toLowerCase());
  
  if (existsSync(hookDir)) {
    console.error(`Hook ${name} already exists!`);
    process.exit(1);
  }

  try {
    // Create hook directory
    mkdirSync(hookDir, { recursive: true });

    // Create hook file
    writeFileSync(
      resolve(hookDir, `${name}.ts`),
      createHookTemplate(name)
    );

    // Create test file
    writeFileSync(
      resolve(hookDir, `${name}.test.ts`),
      createTestTemplate(name)
    );

    // Create index file
    writeFileSync(
      resolve(hookDir, 'index.ts'),
      createIndexTemplate(name)
    );

    console.log(`✅ Hook ${name} created successfully!`);
  } catch (error) {
    console.error('Error creating hook:', error);
    process.exit(1);
  }
}

// Get hook name from command line
const hookName = process.argv[2];

if (!hookName) {
  console.error('Please provide a hook name!');
  process.exit(1);
}

// Validate hook name
if (!/^use[A-Z][A-Za-z0-9]*$/.test(hookName)) {
  console.error('Hook name must start with "use" and be in PascalCase!');
  process.exit(1);
}

createHook(hookName); 