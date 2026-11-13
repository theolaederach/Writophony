const express = require('express');
const gamesRouter = express.Router();
const isLoggedIn = require('../Functions/isLoggedIn');

gamesRouter.get('/', (req, res) => {
    if (!isLoggedIn()) {
        res.redirect('/login');
        return;
    }

    res.send('Redirect to the games page');
});

gamesRouter.get('/join/:id', (req, res) => {
    const userId = req.params.id;

    res.send(`Join game page for user with ID: ${userId}`);
})

module.exports = gamesRouter;