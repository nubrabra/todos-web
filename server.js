const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Proxy ไปยัง DummyJSON API
app.use('/api/todos', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://dummyjson.com/todos${req.url}`,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(5000, () => {
  console.log('Proxy Server running on http://localhost:5000');
});
