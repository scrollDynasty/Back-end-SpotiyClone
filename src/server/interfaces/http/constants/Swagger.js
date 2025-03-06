const description = `
Swagger documentation for this API

Extras:

1. Time in unix format. UTC time zone, in milliseconds
2. In a dev environment timestamp and signature are not needed 
`;

export const swaggerOptions = {
  openapi: {
    info: {
      title: 'API',
      description,
      version: '0.0.2',
    },
    tags: [
      { name: 'auth', description: 'Auth related end-points' },
      { name: 'user', description: 'User related end-points' },
    ],
  },
};
