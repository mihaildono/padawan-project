# Introduction
Interviews contrary to popular belief are not only about the technical capabilities
of the interviewee, but also it is a demonstration of social prowess. In most jobs
in the market almost everyone will pass the technical test, which means that
candidates are usually filtered based on their likability by the employer. So it is very
important that the student of this program, also develop his social skills in
order to secure his place in his dream job. A popular saying in the dev
community is that a good developer write codes for people, and not just
machines. Anyone can create a working system - what is important is how this
system is being managed in time, considering all the people working on it and
the business that drives it.

## 3 step interview process
Usually the interview consists into 3 main parts: HR call, technical section and
manager interview(s). Each of those parts can be split into multiple
interviews. Sometimes there are also special sections like 'cultural fit'
interview, which are not covered in this document.

1. HR screening
You will get general information about the company and the role. You may or
may not discuss salary and conditions. There may be work experience
questions and overview of the CV.
Here is important just to lead a normal conversation and not give off any
red flags. Show motivation and willingness to work.

2. Technical interview/task
This could feature any of the following:
   - Algorithmic task
   - Small task(eg. todo app)
   - JS language related questions
   - Computer Science related questions
     * program architecture
     * databases
     * patterns
     * testing

3. Manager interview
Finally you will speak with someone from management, who will probably be your
boss. Usually it is a conversation, where it will be decided if you will be a
good fit for the team and the project. There may be some technical conversation
depending on the background of the interviewer.

One of the most important aspects of this stage is salary
negotiation. **Always** ask for the high price of a range you have decided
upon. Asking for less out of fear of losing the job will show lack of confidence
and actually says that you are not skilled enough, since you undervalue
yourself.

## CV
A good CV must not exceed 1 page, and preferably be single column.
Never use standard European format or similar, because it looks unattractive.
Use sample CV template sites like [EnchanCV][enchancv] or
[VisualCV][visualcv]. There are also example CVs there, which can serve as a
reference.

## [STAR Technique][star]

## Here are some example language specific questions
What are the differences between var, let and const?

What is closure?

What is prototype?

What is hoisting?

What are high order functions?

What is the difference between callbacks, promises and async await

What happens if you assign a variable without a keyword? `x = 1`

What will be the output and why of the two statements:

console.log(1 + +"2");
console.log("1" +  2);

## Design patterns
As software development progressed in time, design patterns emerged, that
solved common problems. Here is a small subset of them:
    * Factory - Creates objects without depending on the implementation of the class
    * Observer - when one object changes state, all its dependents are notified
    * Adapter - allows incompatible classes to work together by converting the
interface of one class into another.

## Programming Principles
In order for us to write clean code, the community must agree upon and follow
commong programming principles. Here is a small subset of them:
    * KISS(Keep it simple stupid)
    * DRY(Don't repeat yourself)
    * YAGNI(You Aren’t Gonna Need It - don’t implement something until it is necessary
    * SOLID
      - Single Responsibility Principle: a class should have only one reason to change
      - Open/Closed Principle: software entities (classes, modules, functions, etc.)
      should be open for extension, but closed for modification
      - Liskov’s Substitution Principle - derived or child classes must be
      substitutable for their base or parent classes
      - Dependency Inversion Principle: High-level modules/classes should not
      depend on low-level modules/classes. Both should depend upon abstractions.
      Abstractions should not depend upon details. Details should depend upon abstractions.
    * Separation of Concerns (SoC)

## Git development
* Trunk-based
  All developers work on a single branch with open access to it
* Git flow
  One main development branch with strict access to it. Developers work on feature
  branches, that are merged at certain points in time

## Data Structures
* Array
* Stack
* Queue
* Graph
* Tree
* Hash table

## Web
* HTTP Verbs
  - POST
  - GET
  - PUT
  - PATCH
  - DELETE
* Protocols
  - TCP
  - UDP
  - HTTP

## JS [Cheatsheet][cheatsheet]

[enchancv]: https://enhancv.com/
[visualcv]: https://www.visualcv.com/
[cheatsheet]: https://www.cyanhall.com/posts/notes/8.javascript-cheatsheet/
[star]: https://en.wikipedia.org/wiki/Situation,_task,_action,_result
