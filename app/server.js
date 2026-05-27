const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname)));

app.get('/', (_req, res) => {
  res.redirect('/login.html');
});

app.listen(port, () => {
  console.log(`Demo login app is running at http://127.0.0.1:${port}`);
});
