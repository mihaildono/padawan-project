# React

> "The Force will be with you. Always."
> ―Obi-Wan Kenobi

Previously, we learned about the `individual` elements that make a
web page. Time to bring them together. Now we will learn about
`React`. `React` is a library, that makes building SPAs(Single Page
Application) very easy.

## Helpful links

- [React Official Tutorial][tutorial]
- [React Documentation](https://react.dev/)
- [Reconciliation Algorithm][reconciliation]

## Prerequisites

- Complete CSS section
- Comfortable with JavaScript fundamentals (functions, arrays, objects)

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

```js
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

```bash
npx create-react-app my-first-padawan-app
```

### Props

The idea behind components is that they are reusable. Props (short for "properties")
are how we pass data from a parent component to a child component. Think of them
as function arguments but for components.

```js
const Greeting = (props) => {
  return <h1>Hello, {props.name}!</h1>
}

// Usage
<Greeting name="Luke" />
<Greeting name="Leia" />
```

Props are **read-only** - a component should never modify its own props.

### Interaction

React uses **synthetic events** to handle user interactions. They work like
regular HTML events but are consistent across all browsers.

```js
const Button = () => {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return <button onClick={handleClick}>Click me</button>
}
```

Note: In JSX, event names use camelCase (`onClick`, `onChange`, `onSubmit`)
instead of lowercase.

### State

State is data that changes over time within a component. Unlike props, state is
managed *inside* the component.

```js
import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

Key rules: never modify state directly, always use the setter function.

### Lifecycle

Components go through a lifecycle: mounting (appearing), updating (changing),
and unmounting (disappearing). The `useEffect` hook lets you run code at
specific points in this lifecycle.

```js
import { useEffect } from 'react'

useEffect(() => {
  // Runs after component mounts
  console.log('Component loaded!')

  return () => {
    // Runs before component unmounts (cleanup)
    console.log('Component removed!')
  }
}, []) // Empty array = run only once
```

Explore the [official docs](https://react.dev/reference/react/useEffect) for
deeper understanding of when and how effects run.

### JS in JSX

You can use JavaScript expressions inside JSX with curly braces:

```js
// Inline conditional
{isLoggedIn && <p>Welcome back!</p>}

// Ternary
{isAdmin ? <AdminPanel /> : <UserPanel />}

// Rendering lists (always provide a key!)
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

### Lifting State Up

When two components need to share state, move it to their closest common parent
and pass it down via props. This is a core React pattern - read about it in the
[React docs](https://react.dev/learn/sharing-state-between-components).

### Composition

Build complex UIs by combining small, focused components. Prefer composition
over large monolithic components. The `children` prop lets you nest components
naturally:

```js
const Card = ({ children, title }) => (
  <div className="card">
    <h2>{title}</h2>
    {children}
  </div>
)
```

### Thinking in React

When building a React app, follow this process:

1. Start with mock data
2. Break UI into a component hierarchy
3. Build a static version first (no state)
4. Identify the minimal state needed
5. Decide where state should live

Read the official [Thinking in React](https://react.dev/learn/thinking-in-react)
guide - it is excellent.

### It is time to do some work on your own

If a person strives to be good at his job, he is expected to continuously
learn new things and expand his knowledge. That being said, one should learn
to look at a lot of documentation, tutorials and posts and as quickly as
possible to absorb the needed knowledge for the task.

Complete the following [tutorial][tutorial].

## Trial: React Applications

### 1: TODO list

List all of the created todos in a list.
You should be able to add, remove and update a task.
Todos can be reordered. To achieve this use a library of your liking.
Split the JSX code into 2 subfunctions - TaskList and Task.

**Bonus:** Create your own drag-n-drop reorder to earn the badge **"Showoff"**

### 2: Employee list

List first 10 employees from this api:
`http://dummy.restapiexample.com/api/v1/employees`
Create a function that sorts by random employee attribute(salary, name...) every
10 seconds.

### 3: Routing

Combine Todo and Employee in new app with Home as a landing page - use
ReactRouter.

## Final Trial

Implement the snake game with canvas and React!

Continuing the previous project, we will use the same JS engine from the
previous chapter and finally build the front-end.

Complete this section to earn the badge **"Reactive"**

When finished with the trial, head over to the [Node.js][node] section for
introduction to backend development with Express.

[node]: https://github.com/mihaildono/padawan-project/blob/master/js/padawan/node.md
[tutorial]: https://reactjs.org/docs/hello-world.html
[reconciliation]: https://reactjs.org/docs/reconciliation.html
