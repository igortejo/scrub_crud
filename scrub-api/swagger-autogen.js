const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; // Arquivo de saída da documentação
const endpointsFiles = ['./src/routes/*.js']; // Caminho para rotas

const doc = {
  info: {
    title: 'API do Scrub',
    version: '1.0.0',
    description: 'Documentação automática da API',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);