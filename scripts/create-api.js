import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function createApiTemplate(name) {
  return `import { z } from 'zod';

export const ${name}Schema = z.object({
  id: z.string(),
  // Add more fields as needed
});

export type ${name}Type = z.infer<typeof ${name}Schema>;

export async function get${name}(id: string): Promise<${name}Type> {
  const response = await fetch(\`/api/${name.toLowerCase()}/\${id}\`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch ${name}');
  }

  const data = await response.json();
  return ${name}Schema.parse(data);
}

export async function create${name}(data: Omit<${name}Type, 'id'>): Promise<${name}Type> {
  const response = await fetch(\`/api/${name.toLowerCase()}\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create ${name}');
  }

  const responseData = await response.json();
  return ${name}Schema.parse(responseData);
}

export async function update${name}(id: string, data: Partial<Omit<${name}Type, 'id'>>): Promise<${name}Type> {
  const response = await fetch(\`/api/${name.toLowerCase()}/\${id}\`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update ${name}');
  }

  const responseData = await response.json();
  return ${name}Schema.parse(responseData);
}

export async function delete${name}(id: string): Promise<void> {
  const response = await fetch(\`/api/${name.toLowerCase()}/\${id}\`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete ${name}');
  }
}
`;
}

function createTestTemplate(name) {
  return `import { describe, it, expect, vi } from 'vitest';
import { get${name}, create${name}, update${name}, delete${name} } from './${name}';

describe('${name} API', () => {
  const mockData = {
    id: '1',
    // Add mock data fields
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch ${name}', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await get${name}('1');
    expect(result).toEqual(mockData);
  });

  it('should create ${name}', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await create${name}({ ...mockData, id: undefined });
    expect(result).toEqual(mockData);
  });

  it('should update ${name}', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await update${name}('1', { ...mockData, id: undefined });
    expect(result).toEqual(mockData);
  });

  it('should delete ${name}', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    await expect(delete${name}('1')).resolves.not.toThrow();
  });
});
`;
}

function createIndexTemplate(name) {
  return `export * from './${name}';
`;
}

function createApi(name) {
  const apiDir = resolve(__dirname, '../src/api', name.toLowerCase());
  
  if (existsSync(apiDir)) {
    console.error(`API ${name} already exists!`);
    process.exit(1);
  }

  try {
    // Create API directory
    mkdirSync(apiDir, { recursive: true });

    // Create API file
    writeFileSync(
      resolve(apiDir, `${name}.ts`),
      createApiTemplate(name)
    );

    // Create test file
    writeFileSync(
      resolve(apiDir, `${name}.test.ts`),
      createTestTemplate(name)
    );

    // Create index file
    writeFileSync(
      resolve(apiDir, 'index.ts'),
      createIndexTemplate(name)
    );

    console.log(`✅ API ${name} created successfully!`);
  } catch (error) {
    console.error('Error creating API:', error);
    process.exit(1);
  }
}

// Get API name from command line
const apiName = process.argv[2];

if (!apiName) {
  console.error('Please provide an API name!');
  process.exit(1);
}

// Validate API name
if (!/^[A-Z][A-Za-z0-9]*$/.test(apiName)) {
  console.error('API name must be in PascalCase!');
  process.exit(1);
}

createApi(apiName); 