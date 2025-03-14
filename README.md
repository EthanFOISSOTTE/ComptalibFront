# Pokédex - Comptalib

Bienvenue dans ce dépôt qui accueille mon projet de Pokédex développé avec **NuxtJS**. Ce projet fait partie du test technique de développeur front-end pour **Comptalib**.

## Objectif

Développer une application permettant d'afficher et de gérer une liste de Pokémon en utilisant l’API **[PokéAPI](https://pokeapi.co/)**. NuxtJS a été choisi pour sa capacité à offrir un rendu optimisé côté serveur tout en offrant une expérience de développement rapide avec VueJS.

## Fonctionnalités prévues

### Fonctionnalités principales :
- Une page listant au moins **100 Pokémon** avec leur **nom** et leur **sprite**.
- Un **moteur de recherche** permettant de trouver un Pokémon par son nom.
- Une page **détails** pour chaque Pokémon, affichant plus d’informations.
- Une fonctionnalité permettant **d’ajouter des Pokémon à une équipe**.
- Une **vue persistante de l’équipe** (ex : bandeau horizontal, modale...).

### Fonctionnalités optionnelles :
- **Lazy loading** des Pokémon dans la liste pour améliorer les performances.
- **Gestion avancée de l’équipe** :
    - Suppression d’un Pokémon de l’équipe.
    - Repositionnement des Pokémon dans l’équipe.
    - Possibilité d’avoir plusieurs fois le même Pokémon.
    - Persistance de l’équipe même après fermeture du navigateur.

## Technologies prévues :

- **NuxtJS** v3.16.0
- **VueJS** v3.5.13
- **PokéAPI** (API pour les données Pokémon)
- **NuxtJS UI**
- **Pinia** (gestion d’état)
- **Stockage local** *(LocalStorage)*

## Plan de développement :

1. **Mise en place du projet NuxtJS** et configuration de l’API.
2. **Création de la page de liste** des Pokémon avec un premier appel API.
3. **Ajout de la fonction de recherche**.
4. **Création des pages de détails** pour chaque Pokémon.
5. **Fonction d’ajout à l’équipe** et de l’affichage de celle-ci.
6. **Ajout des fonctionnalités avancées et optimisation**.
7. **Tests et corrections** avant finalisation.

## Déploiement du projet :

- Vous pouvez voir la version déployée de l'application ici : [pokedex-comptalib.netlify.app](https://pokedex-comptalib.netlify.app).

## Installer et exécuter localement

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/ton-utilisateur/pokedex-comptalib.git

2. Installer les dépendances :
    ```bash
   npm install

3. Lancer le projet :
    ```bash
       npm run dev