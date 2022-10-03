const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProTeam CRM Assist Express API with Swagger',
      version: '1.0.0',
      description:
        'This is the documentation of the API endpoint for ProTeam CRM Assist',
      contact: {
        name: 'ProTeam',
        url: 'https://proteam.de',
        email: 'info@proteam.de',
      },
    },
    components: {
      securitySchemes: {
        // This security definition for JWT token required endpoints
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['src/api/swagger/**/*.{yml,yaml}'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
