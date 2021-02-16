# Introduction
So far we have used jsfiddle and the browser's console, and although they
are helpful tools, they are just a fraction of what a real developer uses.
In this section, we will setup our development environment and explore further
the development process.

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

###### Exercises
Create a repository on github and upload all your tasks so far.

## Testing
No code is working until there are tests to back it up! From now on we are going
to use [jest][jest] for testing. Head over to the website and learn how to write
unit tests.

###### Exercises
Write tests for all the problems so far and upload them to github.

## Task management
When we have a large work load, we need to manage all the tasks for a project.
We are going to use a simple task management system called [trello][trello].

## Styleguide
In the introduction document, we have a very basic styleguide on how to format
the code in a more eye-pleasing way, however from this point on, we are going to
enforce it. Setup your editor with a `popular` linter.

## npm and package.json
**npm** is a software registry. It is used to share software. You can upload your
package there or download someone else's  package and use it in your project.
Your current project's configuration is managed by a `package.json` file. It
contains information about the author and project's name, packages and their
dependencies.

To start a new project run: `npm init` and follow the steps.

###### Exercises
Check if all the code that you have submitted to github passes the styleguide you
have chosen. If not, beautify all your code :)

## Final trial
Pick a project and complete it to ascend to [padawan][padawan]!

[github]: https://github.com/
[practices]: https://deepsource.io/blog/git-best-practices/
[commit]: https://chris.beams.io/posts/git-commit/
[jest]: https://jestjs.io/
[trello]: https://trello.com/
[node]: https://nodejs.org/en/
[vscode]: https://code.visualstudio.com/
[padawan]: https://github.com/mihaildono/padawan-project/blob/master/padawan/introduction.md
