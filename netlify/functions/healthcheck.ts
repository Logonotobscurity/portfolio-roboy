import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    // Add any critical service checks here
    const health = {
      status: 'ok',
      timestamp: Date.now(),
      environment: process.env.NODE_ENV,
      region: context.clientContext?.custom?.netlify?.site_url || 'unknown',
      version: process.env.npm_package_version,
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify(health),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      }),
    };
  }
}; 