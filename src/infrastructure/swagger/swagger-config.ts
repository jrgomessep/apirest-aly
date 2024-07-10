import express, { type Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'APIREST-ALY Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for the APIREST-ALY project. The API provides several endpoints to manage and access store data, including information on location, owners, year of establishment, and number of employees.'
    },
    servers: [
      {
        url: '/',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/infrastructure/swagger/*.yaml']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export const setupSwagger = (app: Express): void => {
  app.use('/public', express.static('public'))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: '/public/swagger-custom.css' }))
}
