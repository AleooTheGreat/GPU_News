const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

let articles = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const article = req.body;
  articles.push(article);
  console.log('Article received:', article);
  res.status(200).json({ message: 'Article received', article });
});

app.post('/delete', (req, res) => {
  const { title, description, link } = req.body;
  articles = articles.filter(article => article.title !== title || article.description !== description || article.link !== link);
  console.log('Article deleted:', req.body);
  res.status(200).json({ message: 'Article deleted' });
});

app.get('/articles', (req, res) => {
  res.status(200).json(articles);
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
