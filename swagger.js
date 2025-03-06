import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Spotify Clone API',
      version: '1.0.0',
      description: 'API для клона Spotify',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Локальный сервер разработки',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./index.js', './control/*.js'], // Пути к файлам с JSDoc комментариями
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
}; 