# Plan

To put an object onto a plane, it needs coordinates. With this in mind we are
going to design the interactions between the individual elements. In a snake
game we have at the most basic implementation 3 elements - Board, Snake, Apple.
Each has one of them has coordinates or dimensions. From a functional stand
point, we need the snake to move around, eat apples. The board needs to display
itself, check for collisions, spawn apples and begin/end a game.

```js
const POINTS_PER_APPLE

class Board
- attrs:
  - snake
  - apple
  - score
-methods
    - hasCollision
    - print
    - spawnApple
      - hasCollision
    - isGameOver
      -hasCollision
    - gameStart
Class Apple
- attrs:
  - position
Class Snake
- attrs:
  - position
-methods:
  - move
  - grow
```
