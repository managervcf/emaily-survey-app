const express = require('express');
require('./services/passport');

const app = express();

// Require authRoutes and execute with app as an argument
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;
app.listen(port);
