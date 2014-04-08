[![Build Status](https://travis-ci.org/wfortin/UBeat.svg?branch=master)](https://travis-ci.org/wfortin/UBeat)
[![Dependency Status](https://david-dm.org/wfortin/ubeat.svg)](https://david-dm.org/wfortin/ubeat)

#UBeat

Music Library API



## UBeat hébergé

UBeat est disponible en version hébergée sur [ubeat.herokuapp.com](http://ubeat.herokuapp.com/).

##Exécuter UBeat localement

Vous aurez besoin de [NodeJS](http://nodejs.org/download/) et [git](http://www.git-scm.com/book/en/Getting-Started-Installing-Git) pour installer UBeat.

Une fois git et Node installés, ouvrez une CLI en mode administrateur et naviguer vers un dossier dans lequel vous voulez installer UBeat. Installer avec les commande suivante :

```
git clone https://github.com/wfortin/UBeat.git
cd UBeat
npm install
```

UBeat utilise l'outil de compilation [gulp](http://gulpjs.com/).
Pour compiler l'application et la lancer, exécutez :

```
gulp
```

Le serveur sera relancé à tous changement de code serveur. Les fichiers `less` seront compilés en `css` à chaque modification dans le dossier `public/stylesheets/`.

## Documentation de l'API

À venir
