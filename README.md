# UnitTests3AL2021 #

![test pcr](img/test_pcr.jpg)

## Démarrer ##

```bash
$ npm i
$ npm run test
```

## Sujet ##

Dans le cadre du cours de Tests Unitaires en 3AL de l'ESGI 2021-2022, 
mini exercices ayant pour but de créer des situations dans lesquelles nous
devons implémenter des tests.

Seule la façon de tester est prise en compte ici, les choix d'implementation 
des différentes fonctionnalités ne nous intéressent pas.

### Calculatrice ###

Le premier projet de tests est une suite de tests d'une calculatrice.

La classe Calculator doit contenir les méthodes :
- add(a, b) : additionne deux nombres
- sub(a, b) : soustrait deux nombres
- mul(a, b) : multiplie deux nombres
- div(a, b) : divise deux nombres
- avg(tab) : fait la moyenne d'un tableau de nombres

Cas limites:

- On ne peut pas diviser par zéro.
- La moyenne d'un tableau vide vaut 0.

### Utilisateur ###

Le deuxième projet de tests est une suite de tests d'un utilisateur.

La classe User doit contenir la méthode :
- isValid() : vérifie l'email, le nom de famille et le prénom de l'utilisateur. Ainsi qu'il ai bien plus de 13 ans.

Pour cela j'ai choisi de créer les différentes méthodes :
- isEmailValid() : vérifie si l'email renseigné est un bon email
- isLastnameValid() : vérifie que le nom de famille est renseigné
- isFirstnameValid() : vérifie que le prénom est renseigné
- isBirthdateValid() : vérifie que l'utilisateur a plus de 13 ans

Cas limites:

- Le nom, prénom et email ne doivent pas être vide (white spaces inclus)
- Un utilisateur qui vient d'avoir 13 ans est valide
- Un utilisateur qui aura 13 ans demain n'est pas valide

## Langage ##

Cette calculatrice est faite en [TypeScript](https://www.typescriptlang.org/) avec le framework de test
[Jest](https://jestjs.io/).