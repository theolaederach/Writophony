// Function: Fichier de routes pour les parties
// Author: NPone29
// Date: 18/11/2026
// Version: 1.0

const express = require('express');
const gamesRouter = express.Router();
const isLoggedIn = require('../Functions/isLoggedIn');

// Route pour afficher la page des parties
gamesRouter.get('/', (req, res) => {
    // Vérifie si l'utilisateur est connecté. A changer ?
    if (!isLoggedIn()) {
        res.redirect('/login');
        return;
    }

    res.send('Redirect to the games page');
});

// Route pour rejoindre une partie spécifique (id générer automatiquement par le serveur)
gamesRouter.get('/join/:id', (req, res) => {
    const userId = req.params.id;

    res.send(`Join game page for user with ID: ${userId}`);
})

module.exports = gamesRouter;