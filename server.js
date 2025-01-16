import express from 'express';

import controllerRouting from './routes/index';

const app = express();

app.use(express.json());

controllerRouting(app);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
