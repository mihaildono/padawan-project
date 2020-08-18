
[Source](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning "Permalink to Beginning our React todo list - Learn web development | MDN")

# Beginning our React todo list - Learn web development | MDN

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

# Beginning our React todo list

1. [See Learn web development][13]
2. [See Tools and testing][25]
3. [See Understanding client-side JavaScript frameworks][26]
4. [Beginning our React todo list][27]

English▼

* [日本語][28]
* [Add a translation][29]

## On this Page

Jump to section

* [Our app's user stories][30]
* [Pre-project housekeeping][31]
* [Project starter code][32]
* [Summary][33]
* [In this module][34]
* [Related topics][35]

[__ Previous ][36][__ Overview: Client-side JavaScript frameworks][26][ Next __][37]

Let's say that we've been tasked with creating a proof-of-concept in React – an app that allows users to add, edit, and delete tasks they want to work on, and also mark tasks as complete without deleting them. This article will walk you through putting the basic `App` component structure and styling in place, ready for individual component definition and interactivity, which we'll add later.

**Note**: If you need to check your code against our version, you can find a finished version of the sample React app code in our [todo-react repository][38]. For a running live version, see .

| ----- |
|  Prerequisites: |

Familiarity with the core [HTML][39], [CSS][40], and [JavaScript][41] languages, knowledge of the [terminal/command line][42].

 |
|  Objective: |  To introduce our todo list case study, and get the basic `App` structure and styling in place. |

## Our app's user stories

In software development, a user story is an actionable goal from the perspective of the user. Defining user stories before we begin our work will help us focus our work. Our app should fulfill the following stories:

As a user, I can

* read a list of tasks.
* add a task using the mouse or keyboard.
* mark any task as completed, using the mouse or keyboard.
* delete any task, using the mouse or keyboard.
* edit any task, using the mouse or keyboard.
* view a specific subset of tasks: All tasks, only the active task, or only the completed tasks.

We'll tackle these stories one-by-one.

## Pre-project housekeeping

create-react-app has made a few files we won't be using at all for our project.

* We're not going to write per-component stylesheets, so first delete the `App.css` import from the top of `App.js`.
* We are also not going to be using the `logo.svg` file, so remove that import too.

Then, copy and paste the following commands into your terminal to delete some unneeded files. Make sure you're starting in the app's root directory!


    # Move into the src directory of your project
    cd src
    # Delete a few files
    rm -- App.test.js App.css logo.svg serviceWorker.js setupTests.js
    # Move back up to the root of the project
    cd ..

Notes:

* Two of the files we're deleting are for testing the application. We will not cover testing here.
* If you stopped your server to do the terminal tasks mentioned above, you'll have to start it again using `npm start`.

## Project starter code

As a starting point for this project, we're going to provide two things: An `App()` function to replace the one you have now, and some CSS to style your app.

### The JSX

Copy the following snippet to your clipboard, then paste it into `App.js` so that it replaces the existing `App()` function:


    function App(props) {
      return (



TodoMatic






                What needs to be done?






              Add






              Show
              all
               tasks


              Show
              Active
               tasks


              Show
              Completed
               tasks





            3 tasks remaining










                  Eat






                  Edit Eat


                  Delete Eat











                  Sleep






                  Edit Sleep


                  Delete Sleep











                  Repeat






                  Edit Repeat


                  Delete Repeat









      );
    }

Now open `public/index.html` and change the `<[title>][43]` element's text to `TodoMatic`. This way, it will match the `<[h1>][44]` at the top of our app.




When your browser refreshes, you should see something like this:

![todo-matic app, unstyled, showing a jumbled mess of labels, inputs, and buttons][45]

It's ugly, and doesn't function yet, but that's okay — we'll style it in a moment. First, consider the JSX we have, and how it corresponds to our user stories:

* We have a `<[form>][46]` element, with an `<[input type="text">][47]` for writing out a new task, and a button to submit the form.
* We have an array of buttons that will be used to filter our tasks.
* We have a heading that tells us how many tasks remain.
* We have our 3 tasks, arranged in an un-ordered list. Each task is a list item (`<[li>][48]`), and has buttons to edit and delete it and a checkbox to check it off as done.

The form will allow us to _make_ tasks; the buttons will let us _filter_ them; the heading and list are our way to _read_ them. The UI for _editing_ a task is conspicuously absent for now. That's okay – we'll write that later.

### Accessibility features

You may notice some unusual attributes here. For example:



      Show
      all
       tasks


Here, `aria-pressed` tells assistive technology (like screen readers) that the button can be in one of two states: `pressed` or `unpressed`. Think of these as analogs for `on` and `off`. Setting a value of `true` means that the button is pressed by default.

The class `visually-hidden` has no effect yet, because we have not included any CSS. Once we have put our styles in place, though, any element with this class will be hidden from sighted users and still available to screen reader users — this is because these words are not needed by sighted users; they are there to provide more information about what the button does for screenreader users that do not have the extra visual context to help them.

Further down, you can find our `<[ul>][49]` element:





The `role` attribute helps assistive technology explain what kind of element a tag represents. A `
` is treated like a list by default, but the styles we're about to add will break that functionality. This role will restore the "list" meaning to the `
`  element. If you want to learn more about why this is necessary, you can check out [Scott O'Hara's article, "Fixing Lists"][50].

The `aria-labelledby` attribute tells assistive technologies that we're treating our list heading as the label that describes the purpose of the list beneath it. Making this association gives the list a more informative context, which could help screen reader users better understand the purpose of it.

Finally, the labels and inputs in our list items have some attributes unique to JSX:




      Eat


The `defaultChecked` attribute in the `
`  tag tells React to check this checkbox initially. If we were to use `checked`, as we would in regular HTML, React would log some warnings into our browser console relating to handling events on the checkbox, which we want to avoid. Don't worry too much about this for now — we will cover this later on when we get to using events.

The `htmlFor` attribute corresponds to the `for` attribute used in HTML. We cannot use `for` as an attribute in JSX because `for` is a reserved word, so  React uses `htmlFor` instead.

Notes:

* To use boolean values (`true` and `false`) in JSX attributes, you must enclose them in curly braces. If you write `defaultChecked="true"`, the value of `defaultChecked` will be `"true"` — a string literal. Remember — this is actually JavaScript, not HTML!
* The `aria-pressed` attribute used in our earlier code snippet has a value of `true` because `aria-pressed` is not a true boolean attribute in the way `checked` is.

### Implementing our styles

Paste the following CSS code into `src/index.css` so that it replaces what's currently there:


    /* RESETS */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    *:focus {
      outline: 3px dashed #228bec;
      outline-offset: 0;
    }
    html {
      font: 62.5% / 1.15 sans-serif;
    }
    h1,
    h2 {
      margin-bottom: 0;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    button {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;
    }
    button::-moz-focus-inner {
      border: 0;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
    }
    button,
    input {
      overflow: visible;
    }
    input[type="text"] {
      border-radius: 0;
    }
    body {
      width: 100%;
      max-width: 68rem;
      margin: 0 auto;
      font: 1.6rem/1.25 Arial, sans-serif;
      background-color: #f5f5f5;
      color: #4d4d4d;
    }
    @media screen and (min-width: 620px) {
      body {
        font-size: 1.9rem;
        line-height: 1.31579;
      }
    }
    /*END RESETS*/
    /* GLOBAL STYLES */
    .form-group > input[type="text"] {
      display: inline-block;
      margin-top: 0.4rem;
    }
    .btn {
      padding: 0.8rem 1rem 0.7rem;
      border: 0.2rem solid #4d4d4d;
      cursor: pointer;
      text-transform: capitalize;
    }
    .btn.toggle-btn {
      border-width: 1px;
      border-color: #d3d3d3;
    }
    .btn.toggle-btn[aria-pressed="true"] {
      text-decoration: underline;
      border-color: #4d4d4d;
    }
    .btn__danger {
      color: #fff;
      background-color: #ca3c3c;
      border-color: #bd2130;
    }
    .btn__filter {
      border-color: lightgrey;
    }
    .btn__primary {
      color: #fff;
      background-color: #000;
    }
    .btn-group {
      display: flex;
      justify-content: space-between;
    }
    .btn-group > * {
      flex: 1 1 49%;
    }
    .btn-group > * + * {
      margin-left: 0.8rem;
    }
    .label-wrapper {
      margin: 0;
      flex: 0 0 100%;
      text-align: center;
    }
    .visually-hidden {
      position: absolute !important;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap;
    }
    [class*="stack"] > * {
      margin-top: 0;
      margin-bottom: 0;
    }
    .stack-small > * + * {
      margin-top: 1.25rem;
    }
    .stack-large > * + * {
      margin-top: 2.5rem;
    }
    @media screen and (min-width: 550px) {
      .stack-small > * + * {
        margin-top: 1.4rem;
      }
      .stack-large > * + * {
        margin-top: 2.8rem;
      }
    }
    .stack-exception {
      margin-top: 1.2rem;
    }
    /* END GLOBAL STYLES */
    .todoapp {
      background: #fff;
      margin: 2rem 0 4rem 0;
      padding: 1rem;
      position: relative;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
    }
    @media screen and (min-width: 550px) {
      .todoapp {
        padding: 4rem;
      }
    }
    .todoapp > * {
      max-width: 50rem;
      margin-left: auto;
      margin-right: auto;
    }
    .todoapp > form {
      max-width: 100%;
    }
    .todoapp > h1 {
      display: block;
      max-width: 100%;
      text-align: center;
      margin: 0;
      margin-bottom: 1rem;
    }
    .label__lg {
      line-height: 1.01567;
      font-weight: 300;
      padding: 0.8rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    .input__lg {
      padding: 2rem;
      border: 2px solid #000;
    }
    .input__lg:focus {
      border-color: #4d4d4d;
      box-shadow: inset 0 0 0 2px;
    }
    [class*="__lg"] {
      display: inline-block;
      width: 100%;
      font-size: 1.9rem;
    }
    [class*="__lg"]:not(:last-child) {
      margin-bottom: 1rem;
    }
    @media screen and (min-width: 620px) {
      [class*="__lg"] {
        font-size: 2.4rem;
      }
    }
    .filters {
      width: 100%;
      margin: unset auto;
    }
    /* Todo item styles */
    .todo {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .todo > * {
      flex: 0 0 100%;
    }
    .todo-text {
      width: 100%;
      min-height: 4.4rem;
      padding: 0.4rem 0.8rem;
      border: 2px solid #565656;
    }
    .todo-text:focus {
      box-shadow: inset 0 0 0 2px;
    }
    /* CHECKBOX STYLES */
    .c-cb {
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 1.25;
      display: block;
      position: relative;
      min-height: 44px;
      padding-left: 40px;
      clear: left;
    }
    .c-cb > label::before,
    .c-cb > input[type="checkbox"] {
      box-sizing: border-box;
      top: -2px;
      left: -2px;
      width: 44px;
      height: 44px;
    }
    .c-cb > input[type="checkbox"] {
      -webkit-font-smoothing: antialiased;
      cursor: pointer;
      position: absolute;
      z-index: 1;
      margin: 0;
      opacity: 0;
    }
    .c-cb > label {
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
      display: inline-block;
      margin-bottom: 0;
      padding: 8px 15px 5px;
      cursor: pointer;
      touch-action: manipulation;
    }
    .c-cb > label::before {
      content: "";
      position: absolute;
      border: 2px solid currentColor;
      background: transparent;
    }
    .c-cb > input[type="checkbox"]:focus + label::before {
      border-width: 4px;
      outline: 3px dashed #228bec;
    }
    .c-cb > label::after {
      box-sizing: content-box;
      content: "";
      position: absolute;
      top: 11px;
      left: 9px;
      width: 18px;
      height: 7px;
      transform: rotate(-45deg);
      border: solid;
      border-width: 0 0 5px 5px;
      border-top-color: transparent;
      opacity: 0;
      background: transparent;
    }
    .c-cb > input[type="checkbox"]:checked + label::after {
      opacity: 1;
    }

Save and look back at your browser, and your app should now have reasonable styling.

## Summary

Now our todo list app actually looks a bit more like a real app! The problem is: it doesn't actually do anything. We'll start fixing that in the next chapter!

[__ Previous ][36][__ Overview: Client-side JavaScript frameworks][26][ Next __][37]

## In this module

* [Introduction to client-side frameworks][51]
* [Framework main features][52]
* React
    * [Getting started with React][36]
    * [Beginning our React todo list][27]
    * [Componentizing our React app][37]
    * [React interactivity: Events and state][53]
    * [React interactivity: Editing, filtering, conditional rendering][54]
    * [Accessibility in React][55]
    * [React resources][56]
* Ember
    * [Getting started with Ember][57]
    * [Ember app structure and componentization][58]
    * [Ember interactivity: Events, classes and state][59]
    * [Ember Interactivity: Footer functionality, conditional rendering][60]
    * [Routing in Ember][61]
    * [Ember resources and troubleshooting][62]
* Vue
    * [Getting started with Vue][63]
    * [Creating our first Vue component][64]
    * [Rendering a list of Vue components][65]
    * [Adding a new todo form: Vue events, methods, and models][66]
    * [Styling Vue components with CSS][67]
    * [Using Vue computed properties][68]
    * [Vue conditional rendering: editing existing todos][69]
    * [Focus management with Vue refs][70]
    * [Vue resources][71]

#### Metadata

* **Last modified:** Jun 8, 2020, [by MDN contributors][72]

Related Topics

1. [**Complete beginners start here!**][73]
2. Getting started with the Web
    1. [Getting started with the Web overview][73]
    2. [Installing basic software][74]
    3. [What will your website look like?][75]
    4. [Dealing with files][76]
    5. [HTML basics][77]
    6. [CSS basics][78]
    7. [JavaScript basics][79]
    8. [Publishing your website][80]
    9. [How the Web works][81]
3. [**HTML — Structuring the Web**][39]
4. Introduction to HTML
    1. [Introduction to HTML overview][82]
    2. [Getting started with HTML][83]
    3. [What's in the head? Metadata in HTML][84]
    4. [HTML text fundamentals][85]
    5. [Creating hyperlinks][86]
    6. [Advanced text formatting][87]
    7. [Document and website structure][88]
    8. [Debugging HTML][89]
    9. [Assessment: Marking up a letter][90]
    10. [Assessment: Structuring a page of content][91]
5. Multimedia and embedding
    1. [Multimedia and embedding overview][92]
    2. [Images in HTML][93]
    3. [Video and audio content][94]
    4. [From object to iframe — other embedding technologies][95]
    5. [Adding vector graphics to the Web][96]
    6. [Responsive images][97]
    7. [Assessment: Mozilla splash page][98]
6. HTML tables
    1. [HTML tables overview][99]
    2. [HTML table basics][100]
    3. [HTML Table advanced features and accessibility][101]
    4. [Assessment: Structuring planet data][102]
7. [**CSS — Styling the Web**][40]
8. CSS first steps
    1. [CSS first steps overview][103]
    2. [What is CSS?][104]
    3. [Getting started with CSS][105]
    4. [How CSS is structured][106]
    5. [How CSS works][107]
    6. [Using your new knowledge][108]
9. CSS building blocks
    1. [CSS building blocks overview][109]
    2. [Cascade and inheritance][110]
    3. [CSS selectors][111]
    4. [The box model][112]
    5. [Backgrounds and borders][113]
    6. [Handling different text directions][114]
    7. [Overflowing content][115]
    8. [Values and units][116]
    9. [Sizing items in CSS][117]
    10. [Images, media, and form elements][118]
    11. [Styling tables][119]
    12. [Debugging CSS][120]
    13. [Organizing your CSS][121]
10. Styling text
    1. [Styling text overview][122]
    2. [Fundamental text and font styling][123]
    3. [Styling lists][124]
    4. [Styling links][125]
    5. [Web fonts][126]
    6. [Assessment: Typesetting a community school homepage][127]
11. CSS layout
    1. [CSS layout overview][128]
    2. [Introduction][129]
    3. [Normal Flow][130]
    4. [Flexbox][131]
    5. [Grids][132]
    6. [Floats][133]
    7. [Positioning][134]
    8. [Multiple-column Layout][135]
    9. [Responsive design][136]
    10. [Beginner's guide to media queries][137]
    11. [Legacy Layout Methods][138]
    12. [Supporting Older Browsers][139]
    13. [Fundamental Layout Comprehension][140]
12. [**JavaScript — Dynamic client-side scripting**][41]
13. JavaScript first steps
    1. [JavaScript first steps overview][141]
    2. [What is JavaScript?][142]
    3. [A first splash into JavaScript][143]
    4. [What went wrong? Troubleshooting JavaScript][144]
    5. [Storing the information you need — Variables][145]
    6. [Basic math in JavaScript — Numbers and operators][146]
    7. [Handling text — Strings in JavaScript][147]
    8. [Useful string methods][148]
    9. [Arrays][149]
    10. [Assessment: Silly story generator][150]
14. JavaScript building blocks
    1. [JavaScript building blocks overview][151]
    2. [Making decisions in your code — Conditionals][152]
    3. [Looping code][153]
    4. [Functions — Reusable blocks of code][154]
    5. [Build your own function][155]
    6. [Function return values][156]
    7. [Introduction to events][157]
    8. [Assessment: Image gallery][158]
15. Introducing JavaScript objects
    1. [Introducing JavaScript objects overview][159]
    2. [Object basics][160]
    3. [Object-oriented JavaScript for beginners][161]
    4. [Object prototypes][162]
    5. [Inheritance in JavaScript][163]
    6. [Working with JSON data][164]
    7. [Object building practice][165]
    8. [Assessment: Adding features to our bouncing balls demo][166]
16. Asynchronous JavaScript
    1. [Asynchronous JavaScript overview][167]
    2. [General asynchronous programming concepts][168]
    3. [Introducing asynchronous JavaScript][169]
    4. [Cooperative asynchronous Java​Script: Timeouts and intervals][170]
    5. [Graceful asynchronous programming with Promises][171]
    6. [Making asynchronous programming easier with async and await][172]
    7. [Choosing the right approach][173]
17. Client-side web APIs
    1. [Client-side web APIs][174]
    2. [Introduction to web APIs][175]
    3. [Manipulating documents][176]
    4. [Fetching data from the server][177]
    5. [Third party APIs][178]
    6. [Drawing graphics][179]
    7. [Video and audio APIs][180]
    8. [Client-side storage][181]
18. [**Web forms — Working with user data**][182]
19. Core forms learning pathway
    1. [Web forms overview][182]
    2. [Your first form][183]
    3. [How to structure a web form][184]
    4. [Basic native form controls][185]
    5. [The HTML5 input types][186]
    6. [Other form controls][187]
    7. [Styling web forms][188]
    8. [Advanced form styling][189]
    9. [UI pseudo-classes][190]
    10. [Client-side form validation][191]
    11. [Sending form data][192]
20. Advanced forms articles
    1. [How to build custom form controls][193]
    2. [Sending forms through JavaScript][194]
    3. [CSS property compatibility table for form controls][195]
21. [**Accessibility — Make the web usable by everyone**][196]
22. Accessibility guides
    1. [Accessibility overview][196]
    2. [What is accessibility?][197]
    3. [HTML: A good basis for accessibility][198]
    4. [CSS and JavaScript accessibility best practices][199]
    5. [WAI-ARIA basics][200]
    6. [Accessible multimedia][201]
    7. [Mobile accessibility][202]
23. Accessibility assessment
    1. [Assessment: Accessibility troubleshooting][203]
24. [**Tools and testing**][25]
25. Client-side web development tools
    1. [Client-side web development tools index][204]
    2. [Client-side tooling overview][205]
    3. [Command line crash course][42]
    4. [Package management basics][206]
    5. [Introducing a complete toolchain][207]
    6. [Deploying our app][208]
26. Introduction to client-side frameworks
    1. [Client-side frameworks overview][51]
    2. [Framework main features][52]
27. React
    1. [Getting started with React][36]
    2. [Beginning our React todo list][27]
    3. [Componentizing our React app][37]
    4. [React interactivity: Events and state][53]
    5. [React interactivity: Editing, filtering, conditional rendering][54]
    6. [Accessibility in React][55]
    7. [React resources][56]
28. Ember
    1. [Getting started with Ember][57]
    2. [Ember app structure and componentization][58]
    3. [Ember interactivity: Events, classes and state][59]
    4. [Ember Interactivity: Footer functionality, conditional rendering][60]
    5. [Routing in Ember][61]
    6. [Ember resources and troubleshooting][62]
29. Vue
    1. [Getting started with Vue][63]
    2. [Creating our first Vue component][64]
    3. [Rendering a list of Vue components][65]
    4. [Adding a new todo form: Vue events, methods, and models][66]
    5. [Styling Vue components with CSS][67]
    6. [Using Vue computed properties][68]
    7. [Vue conditional rendering: editing existing todos][209]
    8. [Focus management with Vue refs][70]
    9. [Vue resources][71]
30. Git and GitHub
    1. [Git and GitHub overview][210]
    2. [Hello World][211]
    3. [Git Handbook][212]
    4. [Forking Projects][213]
    5. [About pull requests][214]
    6. [Mastering Issues][215]
31. Cross browser testing
    1. [Cross browser testing overview][216]
    2. [Introduction to cross browser testing][217]
    3. [Strategies for carrying out testing][218]
    4. [Handling common HTML and CSS problems][219]
    5. [Handling common JavaScript problems][220]
    6. [Handling common accessibility problems][221]
    7. [Implementing feature detection][222]
    8. [Introduction to automated testing][223]
    9. [Setting up your own test automation environment][224]
32. [**Server-side website programming**][225]
33. First steps
    1. [First steps overview][226]
    2. [Introduction to the server-side][227]
    3. [Client-Server overview][228]
    4. [Server-side web frameworks][229]
    5. [Website security][230]
34. Django web framework (Python)
    1. [Django web framework (Python) overview][231]
    2. [Introduction][232]
    3. [Setting up a development environment][233]
    4. [Tutorial: The Local Library website][234]
    5. [Tutorial Part 2: Creating a skeleton website][235]
    6. [Tutorial Part 3: Using models][236]
    7. [Tutorial Part 4: Django admin site][237]
    8. [Tutorial Part 5: Creating our home page][238]
    9. [Tutorial Part 6: Generic list and detail views][239]
    10. [Tutorial Part 7: Sessions framework][240]
    11. [Tutorial Part 8: User authentication and permissions][241]
    12. [Tutorial Part 9: Working with forms][242]
    13. [Tutorial Part 10: Testing a Django web application][243]
    14. [Tutorial Part 11: Deploying Django to production][244]
    15. [Web application security][245]
    16. [Assessment: DIY mini blog][246]
35. Express Web Framework (node.js/JavaScript)
    1. [Express Web Framework (Node.js/JavaScript) overview][247]
    2. [Express/Node introduction][248]
    3. [Setting up a Node (Express) development environment][249]
    4. [Express tutorial: The Local Library website][250]
    5. [Express Tutorial Part 2: Creating a skeleton website][251]
    6. [Express Tutorial Part 3: Using a database (with Mongoose)][252]
    7. [Express Tutorial Part 4: Routes and controllers][253]
    8. [Express Tutorial Part 5: Displaying library data][254]
    9. [Express Tutorial Part 6: Working with forms][255]
    10. [Express Tutorial Part 7: Deploying to production][256]
36. [**Further resources**][257]
37. Common questions
    1. [HTML questions][258]
    2. [CSS questions][259]
    3. [JavaScript questions][260]
    4. [How the Web works][261]
    5. [Tools and setup][262]
    6. [Design and accessibility][263]
38. [How to contribute][264]

## Learn the best of web development

Get the latest and greatest from MDN delivered straight to your inbox.

The newsletter is offered in English only at the moment.

E-mail

I'm okay with Mozilla handling my info as explained in this [Privacy Policy][265].

Sign up now

Hide Newsletter Sign-up

[MDN Web Docs][266]

* [Web Technologies][4]
* [Learn Web Development][13]
* [About MDN][267]
* [Feedback][19]
* [About][268]
* [MDN Web Docs Store][269]
* [Contact Us][270]
* [Firefox][271]

#### MDN

* * #### Mozilla
* * © 2005-2020 Mozilla and individual contributors. Content is available under [these licenses][272].
* [Terms][273]
* [Privacy][274]
* [Cookies][275]

## Sign In

Sign in to enjoy the benefits of an MDN account. If you haven't already created an account, you will be prompted to do so after signing in.

[ Sign in with Github ][276] [ Sign in with Google ][277]

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
[23]: https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
[24]: https://github.com/mdn/kuma/issues/new/choose
[25]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing
[26]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks
[27]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
[28]: https://developer.mozilla.org/ja/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning "Japanese"
[29]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning$locales
[30]: https://developer.mozilla.org#Our_apps_user_stories
[31]: https://developer.mozilla.org#Pre-project_housekeeping
[32]: https://developer.mozilla.org#Project_starter_code
[33]: https://developer.mozilla.org#Summary
[34]: https://developer.mozilla.org#In_this_module
[35]: https://developer.mozilla.org#sidebar-quicklinks
[36]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
[37]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
[38]: https://github.com/mdn/todo-react
[39]: https://developer.mozilla.org/en-US/docs/Learn/HTML
[40]: https://developer.mozilla.org/en-US/docs/Learn/CSS
[41]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript
[42]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line
[43]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
[44]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
[45]: https://mdn.mozillademos.org/files/17253/unstyled-app.png
[46]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
[47]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
[48]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[49]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
[50]: https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
[51]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction
[52]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Main_features
[53]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
[54]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering
[55]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
[56]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_resources
[57]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_getting_started
[58]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_structure_componentization
[59]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_interactivity_events_state
[60]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_conditional_footer
[61]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_routing
[62]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_resources
[63]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started
[64]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_first_component
[65]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_rendering_lists
[66]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_methods_events_models
[67]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_styling
[68]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_computed_properties
[69]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[70]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management
[71]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_resources
[72]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning$history
[73]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[74]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software
[75]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/What_will_your_website_look_like
[76]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
[77]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
[78]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
[79]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
[80]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website
[81]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
[82]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
[83]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
[84]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
[85]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
[86]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
[87]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting
[88]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
[89]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML
[90]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter
[91]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content
[92]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding
[93]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML
[94]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content
[95]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies
[96]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web
[97]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[98]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page
[99]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables
[100]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics
[101]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced
[102]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Structuring_planet_data
[103]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps
[104]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS
[105]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
[106]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured
[107]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works
[108]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Using_your_new_knowledge
[109]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks
[110]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance
[111]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors
[112]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model
[113]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders
[114]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Handling_different_text_directions
[115]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content
[116]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
[117]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS
[118]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Images_media_form_elements
[119]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables
[120]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Debugging_CSS
[121]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing
[122]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text
[123]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals
[124]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
[125]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links
[126]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts
[127]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Typesetting_a_homepage
[128]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout
[129]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction
[130]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow
[131]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
[132]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[133]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats
[134]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
[135]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout
[136]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
[137]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries
[138]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Legacy_Layout_Methods
[139]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Supporting_Older_Browsers
[140]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Fundamental_Layout_Comprehension
[141]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps
[142]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[143]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
[144]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
[145]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
[146]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
[147]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings
[148]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods
[149]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
[150]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Silly_story_generator
[151]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks
[152]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
[153]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
[154]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
[155]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function
[156]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values
[157]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
[158]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery
[159]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
[160]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
[161]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
[162]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
[163]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
[164]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
[165]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
[166]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features
[167]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
[168]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts
[169]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
[170]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
[171]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
[172]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
[173]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing_the_right_approach
[174]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs
[175]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction
[176]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
[177]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
[178]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
[179]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
[180]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs
[181]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
[182]: https://developer.mozilla.org/en-US/docs/Learn/Forms
[183]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form
[184]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form
[185]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls
[186]: https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
[187]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls
[188]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms
[189]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
[190]: https://developer.mozilla.org/en-US/docs/Learn/Forms/UI_pseudo-classes
[191]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
[192]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data
[193]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_build_custom_form_controls
[194]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
[195]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Property_compatibility_table_for_form_controls
[196]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility
[197]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility
[198]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML
[199]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript
[200]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics
[201]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Multimedia
[202]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Mobile
[203]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting
[204]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools
[205]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview
[206]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management
[207]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Introducing_complete_toolchain
[208]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Deployment
[209]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[210]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub
[211]: https://guides.github.com/activities/hello-world/
[212]: https://guides.github.com/introduction/git-handbook/
[213]: https://guides.github.com/activities/forking/
[214]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[215]: https://guides.github.com/features/issues/
[216]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing
[217]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction
[218]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Testing_strategies
[219]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/HTML_and_CSS
[220]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript
[221]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility
[222]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
[223]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Automated_testing
[224]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment
[225]: https://developer.mozilla.org/en-US/docs/Learn/Server-side
[226]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps
[227]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction
[228]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview
[229]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks
[230]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security
[231]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django
[232]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Introduction
[233]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/development_environment
[234]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Tutorial_local_library_website
[235]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/skeleton_website
[236]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Models
[237]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site
[238]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Home_page
[239]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Generic_views
[240]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Sessions
[241]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication
[242]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Forms
[243]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing
[244]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment
[245]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/web_application_security
[246]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/django_assessment_blog
[247]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
[248]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
[249]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
[250]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website
[251]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
[252]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
[253]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
[254]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
[255]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
[256]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
[257]: https://developer.mozilla.org#
[258]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto
[259]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto
[260]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Howto
[261]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#How_the_Web_works
[262]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#Tools_and_setup
[263]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#Design_and_accessibility
[264]: https://developer.mozilla.org/en-US/docs/Learn/How_to_contribute
[265]: https://www.mozilla.org/privacy/
[266]: https://developer.mozilla.org/en-US/
[267]: https://developer.mozilla.org/en-US/docs/MDN/About
[268]: https://www.mozilla.org/about/
[269]: https://shop.spreadshirt.com/mdn-store/
[270]: https://www.mozilla.org/contact/
[271]: https://www.mozilla.org/firefox/?utm_source=developer.mozilla.org&utm_campaign=footer&utm_medium=referral
[272]: https://developer.mozilla.org/docs/MDN/About#Copyrights_and_licenses
[273]: https://www.mozilla.org/about/legal/terms/mozilla
[274]: https://www.mozilla.org/privacy/websites/
[275]: https://www.mozilla.org/privacy/websites/#cookies
[276]: /users/github/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_todo_list_beginning
[277]: /users/google/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_todo_list_beginning
