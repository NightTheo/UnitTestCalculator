# UnitTests3AL2021 #


![test pcr](img/test_pcr.jpg)

## Démarrer ##

```bash
$ npm i
$ npm run test
```

Coverage
```bash
$ jest --coverage
```

## Sujet ##

Dans le cadre du cours de Tests Unitaires en 3AL de l'ESGI 2021-2022, 
mini exercice ayant pour but de créer une Todo List.

Seule la façon de tester est prise en compte ici, les choix d'implementation 
des différentes fonctionnalités ne nous intéressent pas.

### Utilisateur ###

La classe User doit contenir la méthode 
- `isValid()` : vérifie l'email, le mot de passe, le nom de famille et le prénom de l'utilisateur.
Ainsi qu'il ai plus de 13 ans.

Nous avons choisi de créer les différentes méthodes :
- emailIsValid() : vérifie si l'email renseigné est un bon email
- lastnameIsValid() : vérifie que le nom de famille est renseigné
- firstnameIsValid() : vérifie que le prénom est renseigné
- isOldEnough() : vérifie que l'utilisateur a plus de 13 ans
- passwordIsValid() : vérifie que le mot de passe a bien une longueur comprise entre 8 et 40

- createNewToDoList()

Cas limites:

- Le nom, prénom et email ne doivent pas être vide (white spaces inclus)
- Un utilisateur qui vient d'avoir 13 ans est valide
- Un utilisateur qui aura 13 ans demain n'est pas valide

- Un utilisateur doit être valide pour créer une Todo List
- Un utilisateur peut nʼavoir quʼune seule ToDoList

### Todo List ###
- Elle peut contenir de 0 à 10 items
- Un item contient un name (unique dans la Todo), un content(maximum 1000 caractères), une date de création
- Il faut obligatoirement respecter une période de 30 min entre l'ajout de 2 items dans une même liste
- À lʼajout du 8ème item, envoyer un mail au User (via une classe EmailSenderService) 
pour lui indiquer quʼil ne lui reste que 2 items de disponible.


La classe ToDoList doit contenir la méthode :
- `add(Item)`: ajoute un item dans la liste

Cas limites:
- Si la to do list est déjà pleine (10 items), un ajout lance une erreur

## Langage ##

Ces exercices sont codés en [TypeScript](https://www.typescriptlang.org/) avec le framework de test
[Jest](https://jestjs.io/).
