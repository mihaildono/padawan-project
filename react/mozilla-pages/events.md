
[Source](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state "Permalink to React interactivity: Events and state - Learn web development | MDN")

# React interactivity: Events and state - Learn web development | MDN

');

* [Skip to main content][1]
* [Select language][2]
* [Skip to search][3]
* Technologies
    * [Technologies Overview][4]
    * [HTML][5]
    * [CSS][6]
    * [JavaScript][7]
    * [Graphics][8]
    * [HTTP][9]
    * [APIs / DOM][10]
    * [Browser Extensions][11]
    * [MathML][12]
* References & Guides
    * [Learn web development][13]
    * [Tutorials][14]
    * [References][15]
    * [Developer Guides][16]
    * [Accessibility][17]
    * [Game development][18]
    * [...more docs][4]
* Feedback
    * [Send Feedback][19]
    * [Get Firefox help 🌐][20]
    * [Get web development help 🌐][21]
    * [Join the MDN community][22]
    * [Report a content problem 🌐][23]
    * [Report an issue 🌐][24]

Search MDNOpen search

# React interactivity: Events and state

1. [See Learn web development][13]
2. [See Tools and testing][25]
3. [See Understanding client-side JavaScript frameworks][26]
4. [React interactivity: Events and state][27]

English▼

* [Add a translation][28]

## On this Page

Jump to section

* [Handling events][29]
* [Callback props][30]
* [State and the `useState` hook][31]
* [Putting it all together: Adding a task][32]
* [Detour: counting tasks][33]
* [Completing a task][34]
* [Deleting a task][35]
* [Deleting tasks from state and UI][36]
* [Summary][37]
* [In this module][38]
* [Related topics][39]

[__ Previous ][40][__ Overview: Client-side JavaScript frameworks][26][ Next __][41]

With our component plan worked out, it's now time to start updating our app from a completely static UI to one that actually allows us to interact and change things. In this article we'll do this, digging into events and state along the way, and ending up with an app in which we can successfully add and delete tasks, and toggle tasks as completed.

| ----- |
|  Prerequisites: |

Familiarity with the core [HTML][42], [CSS][43], and [JavaScript][44] languages, knowledge of the [terminal/command line][45].

 |
|  Objective: |  To learn about handling events and state in React, and use those to start making the case study app interactive. |

## Handling events

If you've only written vanilla JavaScript before now, you might be used to having a separate JavaScript file, where you query for some DOM nodes and attach listeners to them. For example:


    const btn = document.querySelector('button');

    btn.addEventListener('click', () => {
      alert("hi!");
    });

In React, we write event handlers directly on the elements in our JSX, like this:


     alert("hi!")}
    >
      Say hi!


**Note**: This may seem counter-intuitive regarding best-practice advice that tends to advise against use of inline event handlers on HTML, but remember that JSX is actually part of your JavaScript.

In the above example, we're adding an `onClick` attribute to the `` element. The value of that attribute is a function that triggers a simple alert.

The `onClick` attribute has special meaning here: it tells React to run a given function when the user clicks on the button. There are a couple of other things to note:

* The camel-cased nature of `onClick` is important — JSX will not recognize `onclick` (again, it is already used in JavaScript for a specific purpose, which is related but different — standard [`onclick][46]` handler properties).
* All browser events follow this format in JSX – `on`, followed by the name of the event.

Let's apply this to our app, starting in the `Form.js` component.

### Handling form submission

At the top of the `Form()` component function, create a function named `handleSubmit()`. This function should [prevent the default behavior of the `submit` event][47]. After that, it should trigger an `alert()`, which can say whatever you'd like. It should end up looking something like this:


    function handleSubmit(e) {
      e.preventDefault();
      alert('Hello, world!');
    }

To use this function, add an `onSubmit` attribute to the `<[form>][48]` element, and set its value to the `handleSubmit` function:





Now if you head back to your browser and click on the "Add" button, your browser will show you an alert dialog with the words "Hello, world!" — or whatever you chose to write there.

## Callback props

In React applications, interactivity is rarely confined to just one component: events that happen in one component will affect other parts of the app. When we start giving ourselves the power to make new tasks, things that happen in the `` component will affect the list rendered in ``.

We want our `handleSubmit()` function to ultimately help us create a new task, so we need a way to pass information from `` to ``. We can't pass data from child to parent in the same way as we pass data from parent to child using standard props. Instead, we can write a function in `` that will expect some data from our form as an input, then pass that function to `` as a prop. This function-as-a-prop is called a callback prop. Once we have our callback prop, we can call it inside `` to send the right data to ``.

### Handling form submission via callbacks

Inside the top of our `App()` component function, create a function named `addTask()` which has a single parameter of `name`:


    function addTask(name) {
      alert(name);
    }

Next, we'll pass `addTask()` into `` as a prop. The prop can have whatever name you want, but pick a name you'll understand later. Something like `addTask` works, because it matches the name of the function as well as what the function will do. Your `` component call should be updated as follows:




Finally, you can use this prop inside the `handleSubmit()` function in your `` component! Update it as follows:


    function handleSubmit(e) {
      e.preventDefault();
      props.addTask("Say hello!");
    }

Clicking on the "Add" button in your browser will prove that the `addTask()` callback function works, but it'd be nice if we could get the alert to show us what we're typing in our input field! This is what we'll do next.

**Note**: We decided to name our callback prop `addTask` to make it easy to understand what the prop will do. Another common convention you may well come across in React code is to prefix callback prop names with the word `on`, followed by the name of the event that will cause them to be run. For instance, we could have given our form a prop of `onSubmit` with the value of `addTask`.

## State and the `useState` hook

So far, we've used props to pass data through our components and this has served us just fine. Now that we're dealing with user input and data updates, however, we need something more.

For one thing, props come from the parent of a component. Our `` will not be inheriting a new name for our task; our `
`  element lives directly inside of ``, so `` will be directly responsible for creating that new name. We can't ask `` to spontaneously create its own props, but we _can_ ask it to track some of its own data for us. Data such as this, which a component itself owns, is called **state**. State is another powerful tool for React because components not only _own_ state, but can _update_ it later. It's not possible to update the props a component receives; only to read them.

React provides a variety of special functions that allow us to provide new capabilities to components, like state. These functions are called **hooks**, and the `useState` hook, as its name implies, is precisely the one we need in order to give our component some state.

To use a React hook, we need to import it from the react module. In `Form.js`, change your very first line so that it reads like this:


    import React, { useState } from "react";

This allows us to import the `useState()` function by itself, and utilize it anywhere in this file.

`useState()` creates a piece of state for a component, and its only parameter determines the _initial value_ of that state. It returns two things: the state, and a function that can be used to update the state later.

This is a lot to take in at once, so let's try it out. We're going to make ourselves a `name` state, and a function for updating the `name` state.

Write the following above your `handleSubmit()` function, inside `Form()`:


    const [name, setName] = useState('Use hooks!');

What's going on in this line of code?

* We are setting the initial `name` value as "Use hooks!".
* We are defining a function whose job is to modify `name`, called `setName()`.
* `useState()` returns these two things, so we are using [array destructuring][49] to capture them both in separate variables.

### Reading state

You can see the `name` state in action right away. Add a `value` attribute to the form's input, and set its value to `name`. Your browser will render "Use hooks!" inside the input.



{name}


Change "Use hooks!" to an empty string once you're done; this is what we want for our initial state.


    const [name, setName] = useState('');

### Reading user input

Before we can change the value of `name`, we need to capture a user's input as they type. For this, we can listen to the `onChange` event. Let's write a `handleChange()` function, and listen for it on the `
` tag.


    // near the top of the `Form` component
    function handleChange(e) {
      console.log("Typing!");
    }

    // Down in the return statement

{name}


Currently, your input's value will not change as you type, but your browser will log the word "Typing!" to the JavaScript console, so we know our event listener is attached to the input. In order to change the input's value, we have to use our `handleChange()` function to update our `name` state.

To read the contents of the input field as they change, you can access the input's `value` property. We can do this inside `handleChange()` by reading `e.target.value`. `e.target` represents the element that fired the `change` event — that's our input. So, `value` is the text inside it.

You can `console.log()` this value to see it in your browser's console.


    function handleChange(e) {
      console.log(e.target.value);
    }

### Updating state

Logging isn't enough — we want to actually store the updated state of the name as the input value changes! Change the `console.log()` to `setName()`, as shown below:


    function handleChange(e) {
      setName(e.target.value);
    }


Now we need to change our `handleSubmit()` function so that it calls `props.addTask` with name as an argument — remember our callback prop? This will serve to send the task back to the `App` component, so we can add it to our list of tasks at some later date. As a matter of good practice, you should clear the input after your form submits, so we'll call `setName()` again with an empty string to do so:


    function handleSubmit(e) {
      e.preventDefault();
      props.addTask(name);
      setName("");
    }

At last, you can type something into the input field in your browser and click _Add_ — whatever you typed will appear in an alert dialog.

Your `Form.js` file should now read like this:


    import React, { useState } from "react";

    function Form(props) {
      const [name, setName] = useState("");

      function handleChange(e) {
        setName(e.target.value);
      }

      function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
      }
      return (




              What needs to be done?




{name}



            Add


      );
    }

    export default Form;

## Putting it all together: Adding a task

Now that we've practiced with events, callback props, and hooks we're ready to write functionality that will allow a user to add a new task from their browser.

### Tasks as state

Import `useState` into App.js, so that we can store our tasks in state — update your `React` import line to the following:


    import React, { useState } from "react";

We want to pass `props.tasks` into the `useState()` hook – this will preserve its initial state. Add the following right at the top of your App() function definition:


    const [tasks, setTasks] = useState(props.tasks);

Now, we can change our `taskList` mapping so that it is the result of mapping `tasks`, instead of `props.tasks`. Your `taskList` constant declaration should now look like so:


    const taskList = tasks.map(task => (

        )
      );

### Adding a task

We've now got a `setTasks` hook that we can use in our `addTask()` function to update our list of tasks. There's one problem however: we can't just pass the `name` argument of `addTask()` into `setTasks`, because `tasks` is an array of objects and `name` is a string. If we tried to do this, the array would be replaced with the string.

First of all, we need to put name into an object that has the same structure as our existing tasks. Inside of the `addTask()` function, we will make a `newTask` object to add to the array.

We then need to make a new array with this new task added to it and then update the state of the tasks data to this new state. To do this, we can use spread syntax to [copy the existing array][50], and add our object at the end. We then pass this array into `setTasks()` to update the state.

Putting that all together, your `addTask()` function should read like so:


    function addTask(name) {
      const newTask = { id: "id", name: name, completed: false };
      setTasks([...tasks, newTask]);
    }

Now you can use the browser to add a task to our data! Type anything into the form and click "Add" (or press the Enter key) and you'll see your new todo item appear in the UI!

**However, we have another problem**: our `addTask()` function is giving each task the same `id`. This is bad for accessibility, and makes it impossible for React to tell future tasks apart with the `key` prop. In fact, React will give you a warning in your DevTools console — "Warning: Encountered two children with the same key..."

We need to fix this. Making unique identifiers is a hard problem – one for which the JavaScript community has written some helpful libraries. We'll use [nanoid][51] because it's tiny, and it works.

Make sure you're in the root directory of your application and run the following terminal command:


    npm install nanoid

**Note**: If you're using yarn, you'll need the following instead: `yarn add nanoid`

Now we can import `nanoid` into the top of `App.js` so we can use it to create unique IDs for our new tasks. First of all, include the following import line at the top of `App.js`:


    import { nanoid } from "nanoid";

Now let's update `addTask()` so that each task ID becomes a prefix todo- plus a unique string generated by nanoid. Update your `newTask` constant declaration to this:


    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };

Save everything, and try your app again — now you can add tasks without getting that warning about duplicate IDs.

## Detour: counting tasks

Now that we can add new tasks, you may notice a problem: our heading reads 3 tasks remaining, no matter how many tasks we have! We can fix this by counting the length of `taskList` and changing the text of our heading accordingly.

Add this inside your `App()` definition, before the return statement:


    const headingText = `${taskList.length} tasks remaining`;

Hrm. This is almost right, except that if our list ever contains a single task, the heading will still use the word "tasks". We can make this a variable, too. Update the code you just added as follows:


    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

Now you can replace the list heading's text content with the `headingText` variable. Update your `
` like so:



{headingText}


## Completing a task

You might notice that, when you click on a checkbox, it checks and unchecks appropriately. As a feature of HTML, the browser knows how to remember which checkbox inputs are checked or unchecked without our help. This feature hides a problem, however: toggling a checkbox doesn't change the state in our React application. This means that the browser and our app are now out-of-sync. We have to write our own code to put the browser back in sync with our app.

### Proving the bug

Before we fix the problem, let's observe it happening.

We'll start by writing a `toggleTaskCompleted()` function in our `App()` component. This function will have an `id` parameter, but we're not going to use it yet. For now, we'll log the first task in the array to the console – we're going to inspect what happens when we check or uncheck it in our browser:

Add this just above your `taskList` constant declaration:


    function toggleTaskCompleted(id) {
      console.log(tasks[0])
    }

Next, we'll add `toggleTaskCompleted` to the props of each `` component rendered inside our `taskList`; update it like so:


    const taskList = tasks.map(task => (

    ));

Next, go over to your `Todo.js` component and add an `onChange` handler to your `
` element, which should use an anonymous function to call `props.toggleTaskCompleted()` with a parameter of `props.id`. The `
` should now look like this:


     props.toggleTaskCompleted(props.id)}
    />

Save everything and return to your browser and notice that our first task, Eat, is checked. Open your JavaScript console, then click on the checkbox next to Eat. It unchecks, as we expect. Your JavaScript console, however, will log something like this:


    Object { id: "task-0", name: "Eat", completed: true }

The checkbox unchecks in the browser, but our console tells us that Eat is still completed. We will fix that next!

### Synchronizing the browser with our data

Let's revisit our `toggleTaskCompleted()` function in `App.js`. We want it to change the `completed` property of only the task that was toggled, and leave all the others alone. To do this, we'll `map()` over the task list and just change the one we completed.

Update your `toggleTaskCompleted()` function to the following:


    function toggleTaskCompleted(id) {
      const updatedTasks = tasks.map(task => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // use object spread to make a new object
          // whose `completed` prop has been inverted
          return {...task, completed: !task.completed}
        }
        return task;
      });
      setTasks(updatedTasks);
    }

Here, we define an `updatedTasks` constant that maps over the original `tasks` array.  If the task's `id` property matches the `id` provided to the function, we use [object spread syntax][52]  to create a new object, and toggle the `checked` property of that object before returning it. If it doesn't match, we return the original object.

Then we call `setTasks()` with this new array in order to update our state.

## Deleting a task

Deleting a task will follow a similar pattern to toggling its completed state: We need to define a function for updating our state, then pass that function into `` as a prop and call it when the right event happens.

### The `deleteTask` callback prop

Here we'll start by writing a `deleteTask()` function in your `App` component. Like `toggleTaskCompleted()`, this function will take an `id` parameter, and we will log that `id` to the console to start with. Add the following below `toggleTaskCompleted()`:


    function deleteTask(id) {
      console.log(id)
    }

Next, add another callback prop to our array of `` components:


    const taskList = tasks.map(task => (

    ));

In `Todo.js`, we want to call `props.deleteTask()` when the "Delete" button is pressed. `deleteTask()` needs to know the ID of the task that called it, so it can delete the correct task from the state

Update the "Delete" button inside Todo.js, like so:


     props.deleteTask(props.id)}
    >
      Delete {props.name}


Now when you click on any of the "Delete" buttons in the app, your browser console should log the ID of the related task.

## Deleting tasks from state and UI

Now that we know `deleteTask()` is invoked correctly, we can call our `setTasks()` hook in `deleteTask()` to actually delete that task from the app's state as well as visually in the app UI. Since `setTasks()` expects an array as an argument, we should provide it with a new array that copies the existing tasks, _excluding_ the task whose ID matches the one passed into `deleteTask()`.

This is a perfect opportunity to use [`Array.prototype.filter()][53]`. We can test each task, and exclude a task from the new array if its `id` prop matches the `id` parameter passed into `deleteTask()`.

Update the `deleteTask()` function inside your `App.js` file as follows:


    function deleteTask(id) {
      const remainingTasks = tasks.filter(task => id !== task.id);
      setTasks(remainingTasks);
    }

Try your app out again. Now you should be able to delete a task from your app!

## Summary

That's enough for one article. Here we've given you the lowdown on how React deals with events and handles state, and implemented functionality to add tasks, delete tasks, and toggle tasks as completed. We are nearly there. In the next article we'll implement functionality to edit existing tasks and filter the list of tasks between all, completed, and incomplete tasks. We'll look at conditional UI rendering along the way.

[__ Previous ][40][__ Overview: Client-side JavaScript frameworks][26][ Next __][41]

## In this module

* [Introduction to client-side frameworks][54]
* [Framework main features][55]
* React
    * [Getting started with React][56]
    * [Beginning our React todo list][57]
    * [Componentizing our React app][40]
    * [React interactivity: Events and state][27]
    * [React interactivity: Editing, filtering, conditional rendering][41]
    * [Accessibility in React][58]
    * [React resources][59]
* Ember
    * [Getting started with Ember][60]
    * [Ember app structure and componentization][61]
    * [Ember interactivity: Events, classes and state][62]
    * [Ember Interactivity: Footer functionality, conditional rendering][63]
    * [Routing in Ember][64]
    * [Ember resources and troubleshooting][65]
* Vue
    * [Getting started with Vue][66]
    * [Creating our first Vue component][67]
    * [Rendering a list of Vue components][68]
    * [Adding a new todo form: Vue events, methods, and models][69]
    * [Styling Vue components with CSS][70]
    * [Using Vue computed properties][71]
    * [Vue conditional rendering: editing existing todos][72]
    * [Focus management with Vue refs][73]
    * [Vue resources][74]

#### Metadata

* **Last modified:** Jul 7, 2020, [by MDN contributors][75]

Related Topics

1. [**Complete beginners start here!**][76]
2. Getting started with the Web
    1. [Getting started with the Web overview][76]
    2. [Installing basic software][77]
    3. [What will your website look like?][78]
    4. [Dealing with files][79]
    5. [HTML basics][80]
    6. [CSS basics][81]
    7. [JavaScript basics][82]
    8. [Publishing your website][83]
    9. [How the Web works][84]
3. [**HTML — Structuring the Web**][42]
4. Introduction to HTML
    1. [Introduction to HTML overview][85]
    2. [Getting started with HTML][86]
    3. [What's in the head? Metadata in HTML][87]
    4. [HTML text fundamentals][88]
    5. [Creating hyperlinks][89]
    6. [Advanced text formatting][90]
    7. [Document and website structure][91]
    8. [Debugging HTML][92]
    9. [Assessment: Marking up a letter][93]
    10. [Assessment: Structuring a page of content][94]
5. Multimedia and embedding
    1. [Multimedia and embedding overview][95]
    2. [Images in HTML][96]
    3. [Video and audio content][97]
    4. [From object to iframe — other embedding technologies][98]
    5. [Adding vector graphics to the Web][99]
    6. [Responsive images][100]
    7. [Assessment: Mozilla splash page][101]
6. HTML tables
    1. [HTML tables overview][102]
    2. [HTML table basics][103]
    3. [HTML Table advanced features and accessibility][104]
    4. [Assessment: Structuring planet data][105]
7. [**CSS — Styling the Web**][43]
8. CSS first steps
    1. [CSS first steps overview][106]
    2. [What is CSS?][107]
    3. [Getting started with CSS][108]
    4. [How CSS is structured][109]
    5. [How CSS works][110]
    6. [Using your new knowledge][111]
9. CSS building blocks
    1. [CSS building blocks overview][112]
    2. [Cascade and inheritance][113]
    3. [CSS selectors][114]
    4. [The box model][115]
    5. [Backgrounds and borders][116]
    6. [Handling different text directions][117]
    7. [Overflowing content][118]
    8. [Values and units][119]
    9. [Sizing items in CSS][120]
    10. [Images, media, and form elements][121]
    11. [Styling tables][122]
    12. [Debugging CSS][123]
    13. [Organizing your CSS][124]
10. Styling text
    1. [Styling text overview][125]
    2. [Fundamental text and font styling][126]
    3. [Styling lists][127]
    4. [Styling links][128]
    5. [Web fonts][129]
    6. [Assessment: Typesetting a community school homepage][130]
11. CSS layout
    1. [CSS layout overview][131]
    2. [Introduction][132]
    3. [Normal Flow][133]
    4. [Flexbox][134]
    5. [Grids][135]
    6. [Floats][136]
    7. [Positioning][137]
    8. [Multiple-column Layout][138]
    9. [Responsive design][139]
    10. [Beginner's guide to media queries][140]
    11. [Legacy Layout Methods][141]
    12. [Supporting Older Browsers][142]
    13. [Fundamental Layout Comprehension][143]
12. [**JavaScript — Dynamic client-side scripting**][44]
13. JavaScript first steps
    1. [JavaScript first steps overview][144]
    2. [What is JavaScript?][145]
    3. [A first splash into JavaScript][146]
    4. [What went wrong? Troubleshooting JavaScript][147]
    5. [Storing the information you need — Variables][148]
    6. [Basic math in JavaScript — Numbers and operators][149]
    7. [Handling text — Strings in JavaScript][150]
    8. [Useful string methods][151]
    9. [Arrays][152]
    10. [Assessment: Silly story generator][153]
14. JavaScript building blocks
    1. [JavaScript building blocks overview][154]
    2. [Making decisions in your code — Conditionals][155]
    3. [Looping code][156]
    4. [Functions — Reusable blocks of code][157]
    5. [Build your own function][158]
    6. [Function return values][159]
    7. [Introduction to events][160]
    8. [Assessment: Image gallery][161]
15. Introducing JavaScript objects
    1. [Introducing JavaScript objects overview][162]
    2. [Object basics][163]
    3. [Object-oriented JavaScript for beginners][164]
    4. [Object prototypes][165]
    5. [Inheritance in JavaScript][166]
    6. [Working with JSON data][167]
    7. [Object building practice][168]
    8. [Assessment: Adding features to our bouncing balls demo][169]
16. Asynchronous JavaScript
    1. [Asynchronous JavaScript overview][170]
    2. [General asynchronous programming concepts][171]
    3. [Introducing asynchronous JavaScript][172]
    4. [Cooperative asynchronous Java​Script: Timeouts and intervals][173]
    5. [Graceful asynchronous programming with Promises][174]
    6. [Making asynchronous programming easier with async and await][175]
    7. [Choosing the right approach][176]
17. Client-side web APIs
    1. [Client-side web APIs][177]
    2. [Introduction to web APIs][178]
    3. [Manipulating documents][179]
    4. [Fetching data from the server][180]
    5. [Third party APIs][181]
    6. [Drawing graphics][182]
    7. [Video and audio APIs][183]
    8. [Client-side storage][184]
18. [**Web forms — Working with user data**][185]
19. Core forms learning pathway
    1. [Web forms overview][185]
    2. [Your first form][186]
    3. [How to structure a web form][187]
    4. [Basic native form controls][188]
    5. [The HTML5 input types][189]
    6. [Other form controls][190]
    7. [Styling web forms][191]
    8. [Advanced form styling][192]
    9. [UI pseudo-classes][193]
    10. [Client-side form validation][194]
    11. [Sending form data][195]
20. Advanced forms articles
    1. [How to build custom form controls][196]
    2. [Sending forms through JavaScript][197]
    3. [CSS property compatibility table for form controls][198]
21. [**Accessibility — Make the web usable by everyone**][199]
22. Accessibility guides
    1. [Accessibility overview][199]
    2. [What is accessibility?][200]
    3. [HTML: A good basis for accessibility][201]
    4. [CSS and JavaScript accessibility best practices][202]
    5. [WAI-ARIA basics][203]
    6. [Accessible multimedia][204]
    7. [Mobile accessibility][205]
23. Accessibility assessment
    1. [Assessment: Accessibility troubleshooting][206]
24. [**Tools and testing**][25]
25. Client-side web development tools
    1. [Client-side web development tools index][207]
    2. [Client-side tooling overview][208]
    3. [Command line crash course][45]
    4. [Package management basics][209]
    5. [Introducing a complete toolchain][210]
    6. [Deploying our app][211]
26. Introduction to client-side frameworks
    1. [Client-side frameworks overview][54]
    2. [Framework main features][55]
27. React
    1. [Getting started with React][56]
    2. [Beginning our React todo list][57]
    3. [Componentizing our React app][40]
    4. [React interactivity: Events and state][27]
    5. [React interactivity: Editing, filtering, conditional rendering][41]
    6. [Accessibility in React][58]
    7. [React resources][59]
28. Ember
    1. [Getting started with Ember][60]
    2. [Ember app structure and componentization][61]
    3. [Ember interactivity: Events, classes and state][62]
    4. [Ember Interactivity: Footer functionality, conditional rendering][63]
    5. [Routing in Ember][64]
    6. [Ember resources and troubleshooting][65]
29. Vue
    1. [Getting started with Vue][66]
    2. [Creating our first Vue component][67]
    3. [Rendering a list of Vue components][68]
    4. [Adding a new todo form: Vue events, methods, and models][69]
    5. [Styling Vue components with CSS][70]
    6. [Using Vue computed properties][71]
    7. [Vue conditional rendering: editing existing todos][212]
    8. [Focus management with Vue refs][73]
    9. [Vue resources][74]
30. Git and GitHub
    1. [Git and GitHub overview][213]
    2. [Hello World][214]
    3. [Git Handbook][215]
    4. [Forking Projects][216]
    5. [About pull requests][217]
    6. [Mastering Issues][218]
31. Cross browser testing
    1. [Cross browser testing overview][219]
    2. [Introduction to cross browser testing][220]
    3. [Strategies for carrying out testing][221]
    4. [Handling common HTML and CSS problems][222]
    5. [Handling common JavaScript problems][223]
    6. [Handling common accessibility problems][224]
    7. [Implementing feature detection][225]
    8. [Introduction to automated testing][226]
    9. [Setting up your own test automation environment][227]
32. [**Server-side website programming**][228]
33. First steps
    1. [First steps overview][229]
    2. [Introduction to the server-side][230]
    3. [Client-Server overview][231]
    4. [Server-side web frameworks][232]
    5. [Website security][233]
34. Django web framework (Python)
    1. [Django web framework (Python) overview][234]
    2. [Introduction][235]
    3. [Setting up a development environment][236]
    4. [Tutorial: The Local Library website][237]
    5. [Tutorial Part 2: Creating a skeleton website][238]
    6. [Tutorial Part 3: Using models][239]
    7. [Tutorial Part 4: Django admin site][240]
    8. [Tutorial Part 5: Creating our home page][241]
    9. [Tutorial Part 6: Generic list and detail views][242]
    10. [Tutorial Part 7: Sessions framework][243]
    11. [Tutorial Part 8: User authentication and permissions][244]
    12. [Tutorial Part 9: Working with forms][245]
    13. [Tutorial Part 10: Testing a Django web application][246]
    14. [Tutorial Part 11: Deploying Django to production][247]
    15. [Web application security][248]
    16. [Assessment: DIY mini blog][249]
35. Express Web Framework (node.js/JavaScript)
    1. [Express Web Framework (Node.js/JavaScript) overview][250]
    2. [Express/Node introduction][251]
    3. [Setting up a Node (Express) development environment][252]
    4. [Express tutorial: The Local Library website][253]
    5. [Express Tutorial Part 2: Creating a skeleton website][254]
    6. [Express Tutorial Part 3: Using a database (with Mongoose)][255]
    7. [Express Tutorial Part 4: Routes and controllers][256]
    8. [Express Tutorial Part 5: Displaying library data][257]
    9. [Express Tutorial Part 6: Working with forms][258]
    10. [Express Tutorial Part 7: Deploying to production][259]
36. [**Further resources**][260]
37. Common questions
    1. [HTML questions][261]
    2. [CSS questions][262]
    3. [JavaScript questions][263]
    4. [How the Web works][264]
    5. [Tools and setup][265]
    6. [Design and accessibility][266]
38. [How to contribute][267]

## Learn the best of web development

Get the latest and greatest from MDN delivered straight to your inbox.

The newsletter is offered in English only at the moment.

E-mail

I'm okay with Mozilla handling my info as explained in this [Privacy Policy][268].

Sign up now

Hide Newsletter Sign-up

[MDN Web Docs][269]

* [Web Technologies][4]
* [Learn Web Development][13]
* [About MDN][270]
* [Feedback][19]
* [About][271]
* [MDN Web Docs Store][272]
* [Contact Us][273]
* [Firefox][274]

#### MDN

* * #### Mozilla
* * © 2005-2020 Mozilla and individual contributors. Content is available under [these licenses][275].
* [Terms][276]
* [Privacy][277]
* [Cookies][278]

## Sign In

Sign in to enjoy the benefits of an MDN account. If you haven't already created an account, you will be prompted to do so after signing in.

[ Sign in with Github ][279] [ Sign in with Google ][280]

Close modal

[1]: https://developer.mozilla.org#content
[2]: https://developer.mozilla.org#language
[3]: https://developer.mozilla.org#main-q
[4]: https://developer.mozilla.org/en-US/docs/Web
[5]: https://developer.mozilla.org/en-US/docs/Web/HTML
[6]: https://developer.mozilla.org/en-US/docs/Web/CSS
[7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[8]: https://developer.mozilla.org/en-US/docs/Web/Guide/Graphics
[9]: https://developer.mozilla.org/en-US/docs/Web/HTTP
[10]: https://developer.mozilla.org/en-US/docs/Web/API
[11]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
[12]: https://developer.mozilla.org/en-US/docs/Web/MathML
[13]: https://developer.mozilla.org/en-US/docs/Learn
[14]: https://developer.mozilla.org/en-US/docs/Web/Tutorials
[15]: https://developer.mozilla.org/en-US/docs/Web/Reference
[16]: https://developer.mozilla.org/en-US/docs/Web/Guide
[17]: https://developer.mozilla.org/en-US/docs/Web/Accessibility
[18]: https://developer.mozilla.org/en-US/docs/Games
[19]: https://developer.mozilla.org/en-US/docs/MDN/Feedback
[20]: https://support.mozilla.org/
[21]: https://stackoverflow.com/
[22]: https://developer.mozilla.org/en-US/docs/MDN/Community
[23]: https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
[24]: https://github.com/mdn/kuma/issues/new/choose
[25]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing
[26]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks
[27]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
[28]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state$locales
[29]: https://developer.mozilla.org#Handling_events
[30]: https://developer.mozilla.org#Callback_props
[31]: https://developer.mozilla.org#State_and_the_useState_hook
[32]: https://developer.mozilla.org#Putting_it_all_together_Adding_a_task
[33]: https://developer.mozilla.org#Detour_counting_tasks
[34]: https://developer.mozilla.org#Completing_a_task
[35]: https://developer.mozilla.org#Deleting_a_task
[36]: https://developer.mozilla.org#Deleting_tasks_from_state_and_UI
[37]: https://developer.mozilla.org#Summary
[38]: https://developer.mozilla.org#In_this_module
[39]: https://developer.mozilla.org#sidebar-quicklinks
[40]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
[41]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering
[42]: https://developer.mozilla.org/en-US/docs/Learn/HTML
[43]: https://developer.mozilla.org/en-US/docs/Learn/CSS
[44]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript
[45]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line
[46]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
[47]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Preventing_default_behavior
[48]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
[49]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[50]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Copy_an_array
[51]: https://github.com/ai/nanoid
[52]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[53]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[54]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction
[55]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Main_features
[56]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
[57]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
[58]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
[59]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_resources
[60]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_getting_started
[61]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_structure_componentization
[62]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_interactivity_events_state
[63]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_conditional_footer
[64]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_routing
[65]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_resources
[66]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started
[67]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_first_component
[68]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_rendering_lists
[69]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_methods_events_models
[70]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_styling
[71]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_computed_properties
[72]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[73]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management
[74]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_resources
[75]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state$history
[76]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[77]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software
[78]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/What_will_your_website_look_like
[79]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
[80]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
[81]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
[82]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
[83]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website
[84]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
[85]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
[86]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
[87]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
[88]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
[89]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
[90]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting
[91]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
[92]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML
[93]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter
[94]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content
[95]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding
[96]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML
[97]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content
[98]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies
[99]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web
[100]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[101]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page
[102]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables
[103]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics
[104]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced
[105]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Structuring_planet_data
[106]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps
[107]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS
[108]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
[109]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured
[110]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works
[111]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Using_your_new_knowledge
[112]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks
[113]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance
[114]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors
[115]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model
[116]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders
[117]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Handling_different_text_directions
[118]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content
[119]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
[120]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS
[121]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Images_media_form_elements
[122]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables
[123]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Debugging_CSS
[124]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing
[125]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text
[126]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals
[127]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
[128]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links
[129]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts
[130]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Typesetting_a_homepage
[131]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout
[132]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction
[133]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow
[134]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
[135]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[136]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats
[137]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
[138]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout
[139]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
[140]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries
[141]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Legacy_Layout_Methods
[142]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Supporting_Older_Browsers
[143]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Fundamental_Layout_Comprehension
[144]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps
[145]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[146]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
[147]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
[148]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
[149]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
[150]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings
[151]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods
[152]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
[153]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Silly_story_generator
[154]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks
[155]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
[156]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
[157]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
[158]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function
[159]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values
[160]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
[161]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery
[162]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
[163]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
[164]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
[165]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
[166]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
[167]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
[168]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
[169]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features
[170]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
[171]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts
[172]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
[173]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
[174]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
[175]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
[176]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing_the_right_approach
[177]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs
[178]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction
[179]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
[180]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
[181]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
[182]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
[183]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs
[184]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
[185]: https://developer.mozilla.org/en-US/docs/Learn/Forms
[186]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form
[187]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form
[188]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls
[189]: https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
[190]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls
[191]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms
[192]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
[193]: https://developer.mozilla.org/en-US/docs/Learn/Forms/UI_pseudo-classes
[194]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
[195]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data
[196]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_build_custom_form_controls
[197]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
[198]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Property_compatibility_table_for_form_controls
[199]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility
[200]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility
[201]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML
[202]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript
[203]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics
[204]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Multimedia
[205]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Mobile
[206]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting
[207]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools
[208]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview
[209]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management
[210]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Introducing_complete_toolchain
[211]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Deployment
[212]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[213]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub
[214]: https://guides.github.com/activities/hello-world/
[215]: https://guides.github.com/introduction/git-handbook/
[216]: https://guides.github.com/activities/forking/
[217]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[218]: https://guides.github.com/features/issues/
[219]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing
[220]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction
[221]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Testing_strategies
[222]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/HTML_and_CSS
[223]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript
[224]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility
[225]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
[226]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Automated_testing
[227]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment
[228]: https://developer.mozilla.org/en-US/docs/Learn/Server-side
[229]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps
[230]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction
[231]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview
[232]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks
[233]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security
[234]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django
[235]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Introduction
[236]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/development_environment
[237]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Tutorial_local_library_website
[238]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/skeleton_website
[239]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Models
[240]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site
[241]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Home_page
[242]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Generic_views
[243]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Sessions
[244]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication
[245]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Forms
[246]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing
[247]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment
[248]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/web_application_security
[249]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/django_assessment_blog
[250]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
[251]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
[252]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
[253]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website
[254]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
[255]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
[256]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
[257]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
[258]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
[259]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
[260]: https://developer.mozilla.org#
[261]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto
[262]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto
[263]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Howto
[264]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#How_the_Web_works
[265]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#Tools_and_setup
[266]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#Design_and_accessibility
[267]: https://developer.mozilla.org/en-US/docs/Learn/How_to_contribute
[268]: https://www.mozilla.org/privacy/
[269]: https://developer.mozilla.org/en-US/
[270]: https://developer.mozilla.org/en-US/docs/MDN/About
[271]: https://www.mozilla.org/about/
[272]: https://shop.spreadshirt.com/mdn-store/
[273]: https://www.mozilla.org/contact/
[274]: https://www.mozilla.org/firefox/?utm_source=developer.mozilla.org&utm_campaign=footer&utm_medium=referral
[275]: https://developer.mozilla.org/docs/MDN/About#Copyrights_and_licenses
[276]: https://www.mozilla.org/about/legal/terms/mozilla
[277]: https://www.mozilla.org/privacy/websites/
[278]: https://www.mozilla.org/privacy/websites/#cookies
[279]: /users/github/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_interactivity_events_state
[280]: /users/google/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_interactivity_events_state
