const express = require('express');
const profilsRouter = express.Router();
const isLoggedIn = require('../Functions/isLoggedIn');

profilsRouter.get('/', (req, res) => {
    if (!isLoggedIn()) {
        res.redirect('/login');
        return;
    }

    res.send('Your own profils page');
});

profilsRouter.get('/:id', (req, res) => {
    const userId = req.params.id;

    res.send(`Profils page for user with ID: ${userId}`);
})

module.exports = profilsRouter;