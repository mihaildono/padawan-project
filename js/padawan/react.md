# Introduction
Previously, we learned about the `individual` elements that make a
web page. Time to bring them together. Now we will learn about
`React`. `React` is a library, that makes building SPAs(Single Page
Application) very easy.

### Hello World
```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

What we see here is attaching HTML code to an element of an HTML page.
But how are we able to use HTML inside JS?

### JSX
This is an example React code rendering a shopping list:
```js
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

Using HTML inside JS is called JSX. This code will get *transpiled* via Babel into this:

```js
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

We can put JSX in vars as well:
```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
which will turn into this:
```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
which will end up as a simple JS object:
```
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

We can also use interpolation and all of JS's functionality in JSX:

```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

JSX is a tool, which supports one of the core ideas of React - the Virtual DOM.

The Virtual DOM is a 1:1 representation of the HTML DOM via JS objects. Imagine
we have a page that is updating a simple value(eg. a counter) every second.
We wouldn't want to re-render everything on the page, because we would want
to have *fast* and *pleasant* UX. So what React is doing via the [reconciliation][reconciliation]
algorithm, is picking just the nodes that are updated and smartly couples changes
together and updates the HTML DOM in a *smart* manner.

### Setup
Now lets create our own application!
```js
npx create-react-app my-first-padawan-app
```

### Props
The idea behind components is that they are reusable.

### Interaction
Synthetic events
Clicking on counter

### State

### Lifecycle


### JS in JSX
- inline if
- loops(keys)

### Lifting state up

### Composition

### Thinking in React
0. Start with mock data
1. Break UI in component hierarchy
2. Build Static Version
3. Identify Minimal state
4. Where should state live

### Pitfalls

### It is time to do some work on your own

If a person strives to be good at his job, he is expected to continuously
learn new things and expand his knowledge. That being said, one should learn
to look at a lot of documentation, tutorials and posts and as quickly as
possible to absorb the needed knowledge for the task.

Complete the following [tutorial][tutorial].

## Trial
1. TODO list
List all of the created todos in a list.
You should be able to add, remove and update a task.
Todos can be reordered. To achieve this use a library of your liking.
Split the jsx code into 2 subfunctions - TaskList and Task.

BONUS: create your own drag-n-drop reorder to earn the badge "Showoff"

2. Employee list
List first 10 employees from this api:
`http://dummy.restapiexample.com/api/v1/employees`
Create a function that sorts by random employee attribute(salary, name...) every
10 seconds

3. Routing
Combine Todo and Employee in new app with Home as a landing page - use
ReactRouter

## Final Trial
Implement the snake game with canvas and react!

Continuing the previous project, we will use the same js engine from the
previous chapter and finally build the front-end.

Complete this section to earn the badge "Reactive"

When finished with the trial, head over to the [mern][mern] section for
introduction to backend and the MERN stack.

[mern]: https://github.com/mihaildono/padawan-project/blob/master/padawan/mern.md
[tutorial]: https://reactjs.org/docs/hello-world.html
[reconciliation]: https://reactjs.org/docs/reconciliation.html
