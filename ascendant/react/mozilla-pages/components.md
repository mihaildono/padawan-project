[Source](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components "Permalink to Componentizing our React app - Learn web development | MDN")

# Componentizing our React app - Learn web development | MDN

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

# Componentizing our React app

1. [See Learn web development][13]
2. [See Tools and testing][25]
3. [See Understanding client-side JavaScript frameworks][26]
4. [Componentizing our React app][27]

English▼

* [Add a translation][28]

## On this Page

Jump to section

* [Defining our first component][29]
* [Make a ``][30]
* [Make a unique ``][30]
* [So far, so good?][31]
* [Tasks as data][32]
* [Rendering with iteration][33]
* [Unique keys][34]
* [Componentizing the rest of the app][35]
* [Importing all our components][36]
* [Summary][37]
* [In this module][38]
* [Related topics][39]

[__ Previous ][40][__ Overview: Client-side JavaScript frameworks][26][ Next __][41]

At this point, our app is a monolith. Before we can make it do things, we need to break it apart into manageable, descriptive components. React doesn't have any hard rules for what is and isn't a component – that's up to you! In this article we will show you a sensible way to break our app up into components.

| ----- |
|  Prerequisites: |

Familiarity with the core [HTML][42], [CSS][43], and [JavaScript][44] languages, knowledge of the [terminal/command line][45].

 |
|  Objective: |  To show a sensible way of breaking our todo list app into components. |

## Defining our first component

Defining a component can seem tricky until you have some practice, but the gist is:

* If it represents an obvious "chunk" of your app, it's probably a component
* If it gets reused often, it's probably a component.

That second bullet is especially valuable: making a component out of common UI elements allows you to change your code in one place and see those changes everywhere that component is used. You don't have to break everything out into components right away, either. Let's take the second bullet point as inspiration and make a component out of the most reused, most important piece of the UI: a todo list item.

## Make a ``

Before we can make a component, we should create a new file for it. In fact, we should make a directory just for our components. The following commands make a `components` directory and then, within that, a file called `Todo.js`. Make sure you're in the root of your app before you run these!


    mkdir src/components
    touch src/components/Todo.js

Our new `Todo.js` file is currently empty! Open it up and give it its first line:


    import React from "react";

Since we're going to make a component called `Todo`, you can start adding the code for that to `Todo.js` too, as follows. In this code, we define the function and export it on the same line:


    export default function Todo() {
      return (

      );
    }

This is OK so far, but our component has to return something! Go back to `src/App.js`, copy the first `<[li>][46]` from inside the unordered list, and paste it into `Todo.js` so that it reads like this:


    export default function Todo() {
      return (






              Eat






              Edit Eat


              Delete Eat





      );
    }

**Note**: Components must always return something. If at any point in the future you try to render a component that does not return anything, React will display an error in your browser.

Our `Todo` component is complete, at least for now; now we can use it. In `App.js`, add the following line near the top of the file to import `Todo`:


    import Todo from "./components/Todo";

With this component imported, you can replace all of the `
` elements in `App.js` with `` component calls. Your `
` should read like this:










When you look back at your browser, you'll notice something unfortunate: your list now repeats the first task three times!

![Our todo list app, with todo components repeating because the label is hardcoded into the component][47]

We don't only want to eat; we have other things to — well — to do. Next we'll look at how we can make different component calls render unique content.

## Make a _unique_ ``

Components are powerful because they let us re-use pieces of our UI, and refer to one place for the source of that UI. The problem is, we don't typically want to reuse all of each component; we want to reuse most parts, and change small pieces. This is where props come in.

### What's in a `name`?

In order to track the names of tasks we want to complete, we should ensure that each `` component renders a unique name.

In `App.js`, give each `` a name prop. Let's use the names of our tasks that we had before:






When your browser refreshes, you will see… the exact same thing as before. We gave our `` some props, but we aren't using them yet. Let's go back to `Todo.js` and remedy that.

First modify your `Todo()` function definition so that it takes `props` as a parameter. You can `console.log()` your `props` as we did before, if you'd like to check that they are being received by the component correctly.

Once you're confident that your component is getting its `props`, you can replace every occurrence of `Eat` with your `name` prop. Remember: when you're in the middle of a JSX expression, you use curly braces to inject the value of a variable.

Putting all that together, your `Todo()` function should read like this:


    export default function Todo(props) {
      return (






              {props.name}






              Edit {props.name}


              Delete {props.name}





      );
    }

_Now_ your browser should show three unique tasks. Another problem remains though: they're all still checked by default.

![Our todo list, with different todo labels now they are passed into the components as props][48]

### Is it `completed`?

In our original static list, only `Eat` was checked. Once again, we want to reuse _most_ of the UI that makes up a ``  component, but change one thing. That's a good job for another prop!  Give each `` call in `App.js` a new prop of `completed`. The first (`Eat`) should have a value of `true`; the rest should be `false`:






As before, we must go back to `Todo.js` to actually use these props. Change the `defaultChecked` attribute on the `
` so that its value is equal to the `completed` prop. Once you're done, the Todo component's `
` element will read like this:




And your browser should update to show only `Eat` being checked:

![Our todo list app, now with differing checked states - some checkboxes are checked, others not][49]

If you change each `` component's `completed` prop, your browser will check or uncheck the equivalent rendered checkboxes accordingly.

### Gimme some `id`, please

Right now, our `` component gives every task an `id` attribute of `todo-0`. This is bad HTML because [`id` attributes][50] must be unique (they are used as unique identifiers for document fragments, by CSS, JavaScript, etc.). This means we should give our component an `id` prop that takes a unique value for each `Todo`.

To follow the same pattern we had initially, let's give each instance of the `` component an ID in the format of `todo-i`, where `i` gets larger by one every time:






Now go back to `Todo.js` and make use of the `id` prop. It needs to replace the value of the `id` attribute of the `
` element, as well as the value of its label's `htmlFor` attribute:






        {props.name}




## So far, so good?

We're making good use of React so far, but we could do better! Our code is repetitive. The three lines that render our `` component are almost identical, with only one difference: the value of each prop.

We can clean up our code with one of JavaScript's core abilities: iteration. To use iteration, we should first re-think our tasks.

## Tasks as data

Each of our tasks currently contains three pieces of information: its name, whether it has been checked, and its unique ID. This data translates nicely to an object. Since we have more than one task, an array of objects would work well in representing this data.

In `src/index.js`, make a new `const` beneath the final import, but above `ReactDOM.render()`:


    const DATA = [
      { id: "todo-0", name: "Eat", completed: true },
      { id: "todo-1", name: "Sleep", completed: false },
      { id: "todo-2", name: "Repeat", completed: false }
    ];

Next, we'll pass `DATA` to `` as a prop, called `tasks`. The final line of `src/index.js` should read like this:


    ReactDOM.render(, document.getElementById("root"));

This array is now available to the App component as `props.tasks`. You can `console.log()` it to check, if you'd like.

**Note**: `ALL_CAPS` constant names have no special meaning in JavaScript; they're a convention that tells other developers "this data will never change after being defined here".

## Rendering with iteration

To render our array of objects, we have to turn each one into a `` component. JavaScript gives us an array method for transforming data into something else: [`Array.prototype.map()][51]`.

Above the return statement of `App()`, make a new `const` called `taskList` and use `map()` to transform it. Let's start by turning our `tasks` array into something simple: the `name` of each task:


    const taskList = props.tasks.map(task => task.name);

Let's try replacing all the children of the `
` with `taskList`:




      {taskList}



This gets us some of the way towards showing all the components again, but we've got more work to do: the browser currently renders each task's name as unstructured text. We're missing our HTML structure — the `
` and its checkboxes and buttons!

![Our todo list app with the todo item labels just shown bunched up on one line][52]

To fix this, we need to return a `` component from our `map()` function — remember that JSX allows us to mix up JavaScript and markup structures! Let's try the following instead of what we have already:


     const taskList = props.tasks.map(task => );

Look again at your app; now our tasks look more like they used to, but they're missing the names of the tasks themselves.  Remember that each task we map over has the `id`, `name`, and `checked` properties we want to pass into our `` component. If we put that knowledge together, we get code like this:


    const taskList = props.tasks.map(task => (

    ));

Now the app looks like it did before, and our code is less repetitive.

## Unique keys

Now that React is rendering our tasks out of an array, it has to keep track of which one is which in order to render them properly. React tries to do its own guesswork to keep track of things, but we can help it out by passing a `key` prop to our `` components. `key` is a special prop that's managed by React – you cannot use the word `key` for any other purpose.

Because keys should be unique, we're going to re-use the `id` of each task object as its key. Update your `taskList` constant like so:


    const taskList = props.tasks.map(task => (

      )
    );

**You should always pass a unique key to anything you render with iteration.** Nothing obvious will change in your browser, but if you do not use unique keys, React will log warnings to your console and your app may behave strangely!

## Componentizing the rest of the app

Now that we've got our most important component sorted out, we can turn the rest of our app into components. Remembering that components are either obvious pieces of UI, or reused pieces of UI, or both, we can make two more components:

* `
`
* ``

Since we know we need both, we can batch some of the file creation work together with a terminal command. Run this command in your terminal, taking care that you're in the root directory of your app:


    touch src/components/Form.js src/components/FilterButton.js

### The ``

Open `components/Form.js` and do the following:

* Import `React` at the top of the file, like we did in `Todo.js`.
* Make yourself a new `Form()` component with the same basic structure as `Todo()`, and export that component.
* Copy the `` tags and everything between them from inside `App.js`, and paste them inside `Form()`'s `return` statement.
* Export `Form` at the end of the file.

Your `Form.js` file should read like this:


    import React from "react";

    function Form(props) {
      return (




              What needs to be done?






            Add


      );
    }

    export default Form;

### The

Do the same things you did to create `Form.js` inside `FilterButton.js`, but call the component `FilterButton()` and copy the HTML for the first button inside the `
` element with the `class` of `filters` from `App.js` into the `return` statement.

The file should read like this:


    import React from "react";

    function FilterButton(props) {
      return (

          Show
          all
           tasks

      );
    }

    export default FilterButton;

**Note**: You might notice that we are making the same mistake here as we first made for the `` component, in that each button will be the same. That's fine! We're going to fix up this component later on, in [Back to the filter buttons][53].

## Importing all our components

Let's make use of our new components.

Add some more `import` statements to the top of `App.js`, to import them.

Then, update the `return` statement of `App()` so that it renders our components. When you're done, `App.js` will read like this:


    import React from "react";
    import Form from "./components/Form";
    import FilterButton from "./components/FilterButton";
    import Todo from "./components/Todo";

    function App(props) {
      const taskList = props.tasks.map(task => (

        )
      );
      return (











3 tasks remaining



            {taskList}




      );
    }

    export default App;

With this in place, we're _almost_ ready to tackle some interactivity in our React app!

## Summary

And that's it for this article — we've gone into some depth on how to break up your app nicely into components, end render them efficiently. Now we'll go on to look at how we handle events in React, and start adding some interactivity.

[__ Previous ][40][__ Overview: Client-side JavaScript frameworks][26][ Next __][41]

## In this module

* [Introduction to client-side frameworks][54]
* [Framework main features][55]
* React
    * [Getting started with React][56]
    * [Beginning our React todo list][40]
    * [Componentizing our React app][27]
    * [React interactivity: Events and state][41]
    * [React interactivity: Editing, filtering, conditional rendering][57]
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

* **Last modified:** Jun 13, 2020, [by MDN contributors][75]

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
    2. [Beginning our React todo list][40]
    3. [Componentizing our React app][27]
    4. [React interactivity: Events and state][41]
    5. [React interactivity: Editing, filtering, conditional rendering][57]
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
[23]: https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
[24]: https://github.com/mdn/kuma/issues/new/choose
[25]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing
[26]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks
[27]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
[28]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components$locales
[29]: https://developer.mozilla.org#Defining_our_first_component
[30]:
[31]: https://developer.mozilla.org#So_far_so_good
[32]: https://developer.mozilla.org#Tasks_as_data
[33]: https://developer.mozilla.org#Rendering_with_iteration
[34]: https://developer.mozilla.org#Unique_keys
[35]: https://developer.mozilla.org#Componentizing_the_rest_of_the_app
[36]: https://developer.mozilla.org#Importing_all_our_components
[37]: https://developer.mozilla.org#Summary
[38]: https://developer.mozilla.org#In_this_module
[39]: https://developer.mozilla.org#sidebar-quicklinks
[40]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
[41]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
[42]: https://developer.mozilla.org/en-US/docs/Learn/HTML
[43]: https://developer.mozilla.org/en-US/docs/Learn/CSS
[44]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript
[45]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line
[46]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[47]: https://mdn.mozillademos.org/files/17255/todo-list-repeating-todos.png
[48]: https://mdn.mozillademos.org/files/17256/todo-list-unique-todos.png
[49]: https://mdn.mozillademos.org/files/17254/todo-list-differing-checked-states.png
[50]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
[51]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[52]: https://mdn.mozillademos.org/files/17257/todo-list-unstructured-names.png
[53]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering#Back_to_the_filter_buttons
[54]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction
[55]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Main_features
[56]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
[57]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering
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
[75]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components$history
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
[279]: /users/github/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_components
[280]: /users/google/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_components
