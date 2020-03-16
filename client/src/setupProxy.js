// Create proxy for development purposes
const { createProxyMiddleware } = require('http-proxy-middleware');

// Export a function that takes express app as an argument
// and creates a proxy
module.exports = app => {
  app.use(
    createProxyMiddleware('/auth/google', { target: 'http://localhost:5000' })
  );
  app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:5000' }));
};
