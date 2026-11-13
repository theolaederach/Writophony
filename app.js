const express = require('express');
const app = express();
const port = 3000;
const isLoggedIn = require('./Functions/isLoggedIn');

// utile pour la suite : // res.sendFile(__dirname + '/index.html');

app.get('/', (req, res) => {

  res.send('Hello World!');
});

app.get('/login', (req, res) => {
    if (isLoggedIn()) {
        res.redirect('/');
        return;
    }
    res.send('Login page');
});

app.get('/register', (req, res) => {
    if (isLoggedIn()) {
        res.redirect('/');
        return;
    }
    res.send('Register page');
});

app.get('/logout', (req, res) => {
    res.send('Logout page');
});

app.use('/profiles', require('./Routes/profils'));
app.use('/games', require('./Routes/games'));

app.listen(port, () => {
  console.log(`[WritoPhony] Server is running on http://localhost:${port}`);
});