// Function: Fichier principal de l'application WritoPhony
// Author: NPone29
// Date: 18/11/2026
// Version: 1.0

const express = require('express');
const nunjucks = require('nunjucks');
const isLoggedIn = require('./Functions/isLoggedIn');

const app = express();
const port = 3000;

// Configuration de Nunjucks (permet de pouvoir utiliser des templates HTML)
nunjucks.configure('Views', {
    autoescape: true,
    express: app,
    watch: true
})

// Route principale 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/base.html');
});

// Route pour le login (vérifie si l'utilisateur est déjà connecté)
app.get('/login', (req, res) => {
    if (isLoggedIn()) {
        res.redirect('/');
        return;
    }
    res.send('Login page');
});

// Route pour s'inscrire (vérifie si l'utilisateur est déjà connecté)
app.get('/register', (req, res) => {
    if (isLoggedIn()) {
        res.redirect('/');
        return;
    }
    res.send('Register page');
});

// Route pour se déconnecter (vérifie si l'utilisateur n'est pas connecté)
app.get('/logout', (req, res) => {
    if(!isLoggedIn()) {
        res.redirect('/login');
        return;
    }

    res.send('Logout page');
});

// Routes pour les profils et les parties
app.use('/profiles', require('./Routes/profils'));
app.use('/games', require('./Routes/games'));


//
app.use(express.static(__dirname + '/public'));


// Démarrage du serveur
app.listen(port, () => {
  console.log(`[WritoPhony] Server is running on http://localhost:${port}`);
});