# UnitTestCalculator #

## Démarrer ##

```bash
$ npm i
$ jest
```

## Sujet ##

Dans le cadre du cours de Tests Unitaires en 3AL de l'ESGI 2021-2022,
premier projet de tests d'une calculatrice.

La classe de calculatrice doit contenir les méthodes :
- add(a, b) : additionne deux nombres
- sub(a, b) : soustrait deux nombres
- mul(a, b) : multiplie deux nombres
- div(a, b) : divise deux nombres
- avg(tab) : fait la moyenne d'un tableau de nombres

## Implémentation ##

Cette calculatrice est faite en [TypeScript](https://www.typescriptlang.org/) avec le framework de test
[Jest](https://jestjs.io/).

Cas limites:

- On ne peut pas diviser par zéro.
- La moyenne d'un tableau vide vaut 0.