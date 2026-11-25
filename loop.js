// Function: Fichier de boucle pour le jeu
// Author: NPone29
// Date: 20/11/2026
// Version: 1.0

const fs = require('fs');
const path = require('path');

// Chemin vers le fichier game.json et lecture du contenu du fichier
const filePath = path.join(__dirname, 'Test', 'game.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fonction pour attendre un certain temps
const timeWait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fonction principale de la boucle du jeu
const gameLoop = async () => {
    while (true) {
        // attendre 1 seconde
        await timeWait(1000)

        // Boucle pour chaque partie en cours
        for (const game of data) {
            // Enlever 1 seconde du temps restant
            game.time_remaining -= 1;

            // Vérifier si le temps restant est supérieur à 0
            if (game.time_remaining > 0) {
                console.log(`Game ${game.game_id} has ${game.time_remaining} seconds remaining.`);
            } else if (game.time_remaining <= 0) {

                console.log(`Game ${game.game_id} has ended.`);
                // A ajouter: logique de l'enregistrement des phrases de chaque joueur
                game.current_round += 1;

                // Vérifier si le jeu est terminé
                if(game.current_round > game.rounds_count) {
                    // A ajouter: logique du jeu pour afficher l'histoire du jeu et les scores finaux
                    console.log(`Game ${game.game_id} has ended.`);
                    return
                } else {
                    // Si le jeu n'est pas terminé, réinitialiser le temps restant pour le prochain tour
                    game.time_remaining = game.time_per_round;
                }
            }

            // Sauvegarder les nouvelles data dans le fichier game.json
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

        }
    }
}

gameLoop();