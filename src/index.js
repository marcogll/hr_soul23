const express = require('express');

const app = express();
const PORT = process.env.PORT || 3011;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
