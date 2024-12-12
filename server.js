const express = require('express');

const app = express();
const routes = require('./routes/index');

// Use routes
app.use(routes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
