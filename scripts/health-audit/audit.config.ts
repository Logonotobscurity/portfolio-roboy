const { z } = require('zod');

const AuditConfig = z.object({
  environment: z.object({
    nodeVersion: z.string(),
    requiredDependencies: z.array(z.string()),
    dockerImage: z.string().default('node:20-bullseye'),
  }),
  
  typeSystem: z.object({
    strict: z.boolean().default(true),
    additionalChecks: z.array(z.string()).default([
      'noUncheckedIndexedAccess',
      'noImplicitAny',
      'strictNullChecks',
    ]),
  }),
  
  security: z.object({
    auditLevel: z.enum(['low', 'moderate', 'high', 'critical']).default('high'),
    excludePaths: z.array(z.string()).default([
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
    ]),
  }),
  
  performance: z.object({
    bundleSizeThreshold: z.number().default(1024 * 1024), // 1MB
    chunkSizeThreshold: z.number().default(244 * 1024), // 244KB
  }),
  
  testing: z.object({
    coverageThreshold: z.number().default(80),
    mutationThreshold: z.number().default(60),
  }),
});

const defaultConfig = {
  environment: {
    nodeVersion: process.version,
    requiredDependencies: [
      '@types/react',
      'framer-motion',
      'zod',
      'react-query',
    ],
    dockerImage: 'node:20-bullseye',
  },
  typeSystem: {
    strict: true,
    additionalChecks: [
      'noUncheckedIndexedAccess',
      'noImplicitAny',
      'strictNullChecks',
    ],
  },
  security: {
    auditLevel: 'high',
    excludePaths: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
    ],
  },
  performance: {
    bundleSizeThreshold: 1024 * 1024,
    chunkSizeThreshold: 244 * 1024,
  },
  testing: {
    coverageThreshold: 80,
    mutationThreshold: 60,
  },
};

module.exports = {
  AuditConfig,
  defaultConfig
}; 