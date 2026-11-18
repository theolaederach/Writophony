// Function: Fichier de routes pour les profils d'utilisateurs
// Author: NPone29
// Date: 18/11/2026
// Version: 1.0

const express = require('express');
const profilsRouter = express.Router();
const isLoggedIn = require('../Functions/isLoggedIn');

// Route pour afficher la page profil de l'utilisateur connecté
profilsRouter.get('/', (req, res) => {
    if (!isLoggedIn()) {
        res.redirect('/login');
        return;
    }

    res.send('Your own profils page');
});

// Route pour afficher la page profil d'un utilisateur spécifique
profilsRouter.get('/:id', (req, res) => {
    const userId = req.params.id;

    res.send(`Profils page for user with ID: ${userId}`);
})

module.exports = profilsRouter;