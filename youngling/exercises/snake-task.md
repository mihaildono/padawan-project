# Introduction
Single functions are meant to be reused though a ecosystem which servers a
specific business case. No better way to start a long journey of development,
than with the classic game of snake!

## Prerequisites
We are going to need a linux environment that runs javascript with an editor:
* Install a linux distribution
* [Install][node] NodeJS
  - This is the environment that allows you to execute your javascript code
* [Install][vscode] VisualStudio Code
  - This is your editor, which will assist you in writing code.

## Git
When working on big projects, there will usually be several contributors working
simultaneously as well as creating different version of the project. This is
where version control systems come into play. Head over to [github][github] and
explore what it is like to work with version control systems. There are
different views and practices on how to use it properly and in due time you will
understand more and more of it. For now read through the best
[practices][practices] and how to write good [commit][commit] messages.

## Testing
From now on we are going to use [jest][jest] for testing, as well as Test Driven Development(TDD) process.
The idea behind it is to write acceptance tests for the functionality that you we
are developing and only after that to start writing code.

###### Exercises
Write tests for all the problems so far and upload them to github.

## Task management
When we have a large work load, we need to manage all the tasks for a project.
We are going to use a simple task management system called [trello][trello].

## Plan
To put an object onto a plane, it needs coordinates. With this in mind we are
going to design the interactions between the individual elements. In a snake
game we have at the most basic implementation 3 elements - Board, Snake, Apple.
Each has one of them has coordinates or dimensions. From a functional stand
point, we need the snake to move around, eat apples. The board needs to display
itself, check for collisions, spawn apples and begin/end a game.

```js
// example project speicification

const POINTS_PER_APPLE

class Board
- attrs:
  * snake
  * apple
  * score
-methods
    * hasCollision
    * print
    * spawnApple
      - hasCollision
    * isGameOver
      -hasCollision
    * gameStart
Class Apple
- attrs:
  * position
Class Snake
- attrs:
  * position
-methods:
  * move
  * grow
```

[github]: https://github.com/
[practices]: https://deepsource.io/blog/git-best-practices/
[commit]: https://chris.beams.io/posts/git-commit/
[jest]: https://jestjs.io/
[trello]: https://trello.com/
[node]: https://nodejs.org/en/
[vscode]: https://code.visualstudio.com/
