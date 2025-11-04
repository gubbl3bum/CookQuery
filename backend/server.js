const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CookQuery API',
      version: '1.0.0',
      description: 'REST API for culinary recipe portal with SFWP functionality',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const recipesRoutes = require('./routes/recipes');
app.use('/api/recipes', recipesRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to CookQuery API',
    documentation: 'http://localhost:3000/api-docs'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});