const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const DB_FILE = path.join(__dirname, 'posts.json');
let posts = [];

if (fs.existsSync(DB_FILE)) {
  posts = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function save() {
  fs.writeFileSync(DB_FILE, JSON.stringify(posts, null, 2));
}

app.get('/posts', (req, res) => res.json(posts));

app.post('/posts', (req, res) => {
  const { username, content, bgColor } = req.body;
  const post = {
    id: Date.now(),
    username,
    content,
    bgColor: bgColor || '#ffffff',
    reactions: 0
  };
  posts.unshift(post);
  save();
  res.status(201).json(post);
});

app.post('/posts/:id/react', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) { post.reactions++; save(); }
  res.json({ success: true });
});

app.listen(3000, '0.0.0.0', () => console.log('BLOGUS Backend prêt → http://backend:3000'));
