# Projet de session - UBeat

Le projet de session consiste à développer une application permettant de créer des listes de lectures musicales et de les partager entre amis.

Le projet doit être fait en équipe de 4 à 6 étudiants. L’équipe doit utiliser les dépôts GitHub fournis par les enseignants. L'application doit être réalisée en *anglais*.

Voir dates de remise sur le portail des cours.

**Pour chaque livrable**

Fournir un ZIP comprenant: 

* Document design au format PDF

    * Expliquer comment lancer l’application

        * Doit être **très** simple (1 ou 2 étapes maximum)

    * Votre numéro d’équipe

    * Le membres de votre équipe

        * Noms, IDULs et Matricules

* Dossier qui comprend les fichiers html, css et js 

* **ATTENTION** Votre application 

    * doit fonctionner sans aucune manipulation du correcteur

    * doit fonctionner **sans erreurs ni exceptions** dans la console de Chrome (la correction sera fait dans Chrome, pas de Firefox ou d'Edge). Si l’application n’est pas fonctionnelle et que le correcteur n’est pas en mesure de corriger, vous **risquez la note de zéro.**


## Livrable 1

* Afficher un menu comprenant les items suivants:

    * Champ de recherche

    * Lien vers la page d'accueil

    * Lien vers les listes de lectures

    * Afficher l’utilisateur courant

    * Lien pour se déconnecter

    * Lien vers les paramètres utilisateurs

    * La barre doit être responsive

        * Supporter 3 formats d’écrans

        * Mobile : Le menu peut être masqué/affichée avec du JavaScript et est masqué par défault

        * Tablette : Le menu est plus petit et laisse plus de place aux pages artiste et album

        * Standard : Le menu est visible par default et plus gros

* Afficher la page d’un artiste (artist.html)

    * La page d’artiste doit comprendre le

        * nom d’artiste

        * lien vers la page itunes avec logo: [https://www.apple.com/ca/itunes/link/](https://www.apple.com/ca/itunes/link/)

        * genre

        * liste des ses albums

    * La page doit être statique (les informations de l’artiste doivent être *hardcodées*), comprendre seulement du HTML et du CSS

    * La page doit être responsive

        * Supporter 3 formats d’écrans (*mobile*, *tablet* et *desktop*)

            * Les images doivent s’adapter au 3 tailles d’écran

            * La listes d’albums doit être flexible et s’adapter à la largeur de l’écran

* Afficher la page d’un album (album.html)

    * La page d’album doit comprendre

        * nom d’artiste

        * lien pour achat sur itunes avec logo: [https://www.apple.com/ca/itunes/link/](https://www.apple.com/ca/itunes/link/)

        * nom de l’album

        * date de sortie

        * nombre de pistes

        * genre

        * couverture

        * liste des pistes incluant (nom, durée, numéro, bouton *play*)

            * Le bouton play ne doit pas jouer la musique au livrable 1

    * La page doit être statique (les informations de l’artiste doivent être *hardcodées*), comprendre seulement du HTML et du CSS ou JavaScript de présentation.

    * La page doit être responsive

        * Supporter 3 formats d’écrans (*mobile*, *tablet* et *desktop*)

            * Les images doivent s’adapter au 3 tailles d’écran

            * La liste des pistes doit être flexible et s’adapter à la largeur de l’écran

* Page d'accueil de l'application

    * La page d'accueil doit représenter le point d'entrée de votre application. Elle ne demande pas de fonctionnalité particulière, à vous d'être créatif!
    
    * Elle doit permettre d'accéder aux pages d'artiste, d'album et au menu.
    
    * La page doit etre responsive (Supporter 3 formats d'écrans).

* Document design

    * Expliquer comment lancer l’application

        * Ça ne devrait pas être plus compliqué que de donner le chemin de vos fichiers html...

## Livrable 2

* La barre de menu doit être un *template* ou une *vue*

* Afficher la page des listes de lectures de l’utilisateur 

    * La page doit être dynamique (les informations de l’artiste doivent *provenir de l’API via une requête AJAX*)

    * Permet de créer une nouvelle liste vide et de lui donner un nom.

    * La page montre les listes de lectures de l’utilisateur.

    * Permet de modifier une liste de lecture

        * Changer le nom de la liste de lecture

        * Ajouter/Retirer des chansons d’une liste de lecture

        * Supprimer une liste de lecture.

    * Permet de voir les chansons dans une liste de lecture (dans la même page **OU** dans une page différente)

    * La page doit intégrer les concepts MVC

* Afficher la page d’un artiste

    * La page doit être dynamique (les informations de l’artiste doivent *provenir de l’API via une requête AJAX*)

    * La page doit intégrer les concepts MVC

* Afficher la page d’un album 

    * La page doit être dynamique (les informations de l’artiste doivent *provenir de l’API via une requête AJAX*)

    * La page doit contenir un bouton pour ajouter une chanson de l’album à une liste de lecture existante

    * La page doit contenir un bouton pour ajouter toutes les chansons de l’album à une liste de lecture existante

    * La page permet d’écouter des extraits mp3 des chansons

        * La lecture se fait directement dans le navigateur sans téléchargement

    * La page doit intégrer les concepts MVC

* Tous les formulaires doivent être validés via JavaScript **avant** d’être soumis au serveur

* Document design

    * Expliquer comment lancer l’application

    * Donner des détails sur comment voir chacune des pages

        * urls

        * boutons à cliquer

        * facilitez la vie du correcteur !

## Livrable 3

* Afficher la page d’enregistrement (*sign up*)

    * L’utilisateur doit pouvoir s’enregistrer en entrant son nom, courriel, et mot de passe

* Afficher la page d’authentification (*login*)

    * L’utilisateur doit pouvoir se connecter avec son courriel et mot de passe

    * L’application doit enregistrer le token d’authentification dans un cookie et envoyer ce token comme en-tête Authorization à chaques requêtes AJAX

        * Un fois le token enregistré, on peut fermer le navigateur et retourner sans avoir à entrer son mot de passe

    * L’application doit rediriger l’utilisateur à la page de login si son token est expiré, ou absent.

    * Afficher un message d’erreur clair en cas de mauvaise combinaison courriel et mot de passe

* Permettre la recherche

    * Recherche globale

    * Recherche par

        * Artiste

        * Album

        * Chanson

        * Utilisateur

    * La recherche doit mener à une page de résultat

* Page de résultats (recherche globale)

    * Afficher un icône pour différencier les résultats (artiste, album, chanson, utilisateur) **OU** grouper les résulats par type

    * Les résultats doivent avoir des boutons pour ajouter à une liste de lecture ou, dans le cas d’un utilisateur, un bouton pour suivre celui-ci.

    * Lien vers le résultat plus en détails (page album, page artiste, page utilisateur)

* Page de résultats (recherche spécifique)

    * Afficher un icône pour montrer le type de résultat (artiste, album, chanson, utilisateur)

    * Afficher la couverture de la pochette d’album pour les résultats d’une recherche par album

* Afficher la page d’un utilisateur

    * Sois l’utilisateur courant ou un utilisateur d’un résultat de recherche

    * Afficher le nom et le courriel de l’utilisateur

    * Afficher une liste des listes de lectures de cet utilisateur

    * Offrir un bouton suivre et arrêter de suivre pour ajouter ou supprimer cet utilisateur de votre liste d’amis.

    * Afficher les amis de l’utilisiteur

* Validation et sécurité

    * L’application doit afficher des messages d’erreurs clairs lorsqu’un erreur serveur survient.

    * Tous les formulaires doivent être validés via JavaScript **avant** d’être soumis au serveur

* Fonctionnalités avancées (**choisir 2 parmis les propositions suivantes**)

    * La barre de recherche offre l’autocomplétion des résultats pendant que l’utilisateur tappe au clavier

    * Afficher une photo de l’utilisateur avec gravatar

    * Afficher un histogramme de la chanson en cours (animation qui suit la musique)

    * Obtenir d’avantages d’informations sur un artiste

        * Afficher une image pour l’artiste/groupe

        * Afficher la biographie de l’artiste

    * Obtenir des suggestions d’artistes similaire à un artiste ou de chansons similaires à une chanson

    * La page d’album permet de trouver l’album à meilleur prix sur des sites d’achat en ligne (Amazon, Archambault, iTunes, etc)

    * Une fonctionalité de votre choix

        * Cette fonctionalité doit être approuvée par les 2 enseignants du cours.

* Document design

    * Expliquer comment lancer l’application

    * Donner des détails sur comment voir chacune des pages

        * urls

        * boutons à cliquer

        * facilitez la vie du correcteur !

    * Expliquer vos 2 fonctionalités avancées et comment les voir en action

