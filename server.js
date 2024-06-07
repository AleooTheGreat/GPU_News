const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission (POST)
app.post('/submit', (req, res) => {
  const article = req.body;
  console.log('Article received:', article);
  res.status(200).json({ message: 'Article received', article });
});

// Route to fetch articles (GET)
app.get('/articles', (req, res) => {
  // Dummy data, replace with actual data retrieval logic
  const articles = [
    { title: 'Article 1', description: 'Description 1', link: '#' },
    { title: 'Article 2', description: 'Description 2', link: '#' },
  ];
  res.status(200).json(articles);
});

// 404 error page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
