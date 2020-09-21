# Introduction
Single functions are meant to be reused though a ecosystem which servers a
specific business case. No better way to start a long journey of development,
than with the classic game of snake! When approaching a big task(the snake game in
this case), the first thing to do is create a plan and sub-tasks to
complete. There are several approaches that we can take when developing a
program - Test Driven Development(TDD) is one of them! The idea behind it, is to
write acceptance tests for the functionality that you are developing and only
after that to start writing code. After the game engine is created, and
everything is working properly and we have the initial smoke tests. We can take
care of edge cases and write additional tests.

## Testing
For this exercise, we are going to use [jest][jest] for testing. Look through
the documentation and test previous exercises to earn the badge "Check 1 2".

## Git
When working on big projects, there will usually be several contributors working
simultaneously as well as creating different version of the project. This is
where version control systems come into play. Head over to [github][github] and
explore what it is like to work with version control systems. There are
different views and practices on how to use it properly and in due time you will
understand more and more of it. For now read through the best
[practices][practices] and how to write good [commit][commit] messages.

## Classes and Objects
In programming, there is a pattern of grouping common code and creating
instances of it, that share common methods, but can have different
attributes. This is called Object Oriented Programming(OOP). There are several more principles to it, but this should suffice. In
the future, we will actually try to stick to a more `functional` style of
programming. To create the "schema" of a an object, we use the `class`
keyword. Attributes are declared in the `constructor` method. And to finally to
create a new instance we use the `new` keyword. Let's create a sample "schema"
for a human:

```js
class Human {
    constructor(gender, name, height) {
        this.gender = gender
        this.name = name
        this.height = height
    }
}

const femalePerson = new Human('female', 'Elizabeth', '160')
// Human { gender: 'female', name: 'Elizabeth', height: 160 }

const malePerson = new Human('male', 'Tom', '180')
// Human { gender: 'male', name: 'Tom', height: 180 }

```

As you can see, there is also something new in the `constructor` as well -
`this`. `this` is a special object that when attaching data via the dot `.`
notation, this data can later be accessed though it. At this point take it as it
is, as you will learn more about it in the future.

* A method is a function that is "attached" to an object


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
Complete all tasks to earn the badge "Sneko"

[github]: https://github.com/
[practices]: https://deepsource.io/blog/git-best-practices/
[commit]: https://chris.beams.io/posts/git-commit/
[jest]: https://jestjs.io/
