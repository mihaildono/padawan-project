
[Source](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering "Permalink to React interactivity: Editing, filtering, conditional rendering - Learn web development | MDN")

# React interactivity: Editing, filtering, conditional rendering - Learn web development | MDN

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

# React interactivity: Editing, filtering, conditional rendering

1. [See Learn web development][13]
2. [See Tools and testing][25]
3. [See Understanding client-side JavaScript frameworks][26]
4. [React interactivity: Editing, filtering, conditional rendering][27]

English▼

* [Add a translation][28]

## On this Page

Jump to section

* [Editing the name of a task][29]
* [A UI for editing][30]
* [Conditional rendering][31]
* [Toggling the `` templates][32]
* [Editing from the UI][33]
* [Back to the filter buttons][34]
* [Summary][35]
* [In this module][36]
* [Related topics][37]

[__ Previous ][38][__ Overview: Client-side JavaScript frameworks][26][ Next __][39]

As we near the end of our React journey (for now at least), we'll add the finishing touches to the main areas of functionality in our Todo list app. This includes allowing you to edit existing tasks, and filtering the list of tasks between all, completed, and incomplete tasks. We'll look at conditional UI rendering along the way.

| ----- |
|  Prerequisites: |

Familiarity with the core [HTML][40], [CSS][41], and [JavaScript][42] languages, knowledge of the [terminal/command line][43].

 |
|  Objective: |  To learn about conditional rendering in React, and implementing list filtering and an editing UI in our app. |

## Editing the name of a task

We don't have a user interface for editing the name of a task yet. We'll get to that in a moment. To start with, we can at least implement an `editTask()` function in `App.js`. It'll be similar to `deleteTask()` because it'll take an `id` to find its target object, but it'll also take a `newName` property containing the name to update the task to. We'll use [`Array.prototype.map()][44]` instead of [`Array.prototype.filter()][45]` because we want to return a new array with some changes, instead of deleting something from the array.

Add the `editTask()` function inside your App component, in the same place as the other functions:


    function editTask(id, newName) {
      const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
        if (id === task.id) {
          //
          return {...task, name: newName}
        }
        return task;
      });
      setTasks(editedTaskList);
    }

Pass `editTask` into our `` components as a prop in the same way we did with `deleteTask`:


    const taskList = tasks.map(task => (

    ));

Now open `Todo.js`. We're going to do some refactoring.

## A UI for editing

In order to allow users to edit a task, we have to provide a user interface for them to do so. First, import `useState` into the `Todo` component like we did before with the `App` component, by updating the first import statement to this:


    import React, { useState } from "react";

We'll now use this to set an `isEditing` state, the default state of which should be `false`. Add the following line just inside the top of your `Todo(props) { … }` component definition:


    const [isEditing, setEditing] = useState(false);

Next, we're going to rethink the `` component — from now on, we want it to display one of two possible "templates", rather than the single template it's used so far:

* The "view" template, when we are just viewing a todo; this is what we've used in rest of the tutorial so far.
* The "editing" template, when we are editing a todo. We're about to create this.

Copy this block of code into the `Todo()` function, beneath your `useState()` hook but above the `return` statement:


    const editingTemplate = (





            New name for {props.name}








            Cancel
            renaming {props.name}


            Save
            new name for {props.name}





    );
    const viewTemplate = (




             props.toggleTaskCompleted(props.id)}
            />

              {props.name}






              Edit {props.name}

             props.deleteTask(props.id)}
            >
              Delete {props.name}





    );

We've now got the two different template structures — "edit" and "view" — defined inside two separate constants. This means that the `return` statement of `` is now repetitious — it also contains a definition of the "view" template. We can clean this up by using **conditional rendering** to determine which template the component returns, and is therefore rendered in the UI.

## Conditional rendering

In JSX, we can use a condition to change what is rendered by the browser. To write a condition in JSX, we can use a [ternary operator][46].

In the case of our `` component, our condition is "Is this task being edited?" Change the `return` statement inside `Todo()` so that it reads like so:


    return
{isEditing ? editingTemplate : viewTemplate}
;

Your browser should render all your tasks just like before. To see the editing template, you will have to change the default `isEditing` state from `false` to `true` in your code for now; we will look at making the edit button toggle this in the next section!

## Toggling the `` templates

At long last, we are ready to make our final core feature interactive. To start with, we want to call `setEditing()` with a value of `true` when a user presses the "Edit" button in our `viewTemplate`, so that we can switch templates.

Update the "Edit" button in the `viewTemplate` like so:


     setEditing(true)}>
      Edit {props.name}


Now we'll add the same `onClick` handler to the "Cancel" button in the `editingTemplate`, but this time we'll set `isEditing` to `false` so that it switches us back to the view template.

Update the "Cancel" button in the `editTemplate` like so:


     setEditing(false)}
    >
      Cancel
      renaming {props.name}


With this code in place, you should be able to press the "Edit" and "Cancel" buttons in your todo items to toggle between templates.

![The eat todo item showing the view template, with edit and delete buttons available][47]

![The eat todo item showing the edit template, with an input field to enter a new name, and cancel and save buttons available][48]

The next step is to actually make the editing functionality work.

## Editing from the UI

Much of what we're about to do will mirror the work we did in `Form.js`: as the user types in our new input field, we need to track the text they enter; once they submit the form, we need to use a callback prop to update our state with the new name of the task.

We'll start by making a new hook for storing and setting the new name. Still in `Todo.js`, put the following underneath the existing hook:


    const [newName, setNewName] = useState('');

Next, create a `handleChange()` function that will set the new name; put this underneath the hooks but before the templates:


    function handleChange(e) {
      setNewName(e.target.value);
    }

Now we'll update our `editingTemplate`'s `
` field, setting a `value` attribute of `newName`, and binding our `handleChange()` function to its `onChange` event. Update it as follows:



{newName}


Finally, we need to create a function to handle the edit form's `onSubmit` event; add the following just below the previous function you added:


    function handleSubmit(e) {
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }

Remember that our `editTask()` callback prop needs the ID of the task we're editing as well as its new name.

Bind this function to the form's `submit` event by adding the following `onSubmit` handler to the `editingTemplate`'s `
`:




You should now be able to edit a task in your browser!

## Back to the filter buttons

Now that our main features are complete, we can think about our filter buttons. Currently, they repeat the "All" label, and they have no functionality! We will be reapplying some skills we used in our `` component to:

* Create a hook for storing the active filter.
* Render an array of `` elements that allow users to change the active filter between all, completed, and incomplete.

### Adding a filter hook

Add a new hook to your `App()` function that reads and sets a filter. We want the default filter to be `All` because all of our tasks should be shown initially:


    const [filter, setFilter] = useState('All');

### Defining our filters

Our goal right now is two-fold:

* Each filter should have a unique name.
* Each filter should have a unique behavior.

A JavaScript object would be a great way to relate names to behaviors: each key is the name of a filter; each property is the behavior associated with that name.

At the top of `App.js`, beneath our imports but above our `App()` function, let's add an object called `FILTER_MAP`:


    const FILTER_MAP = {
      All: () => true,
      Active: task => !task.completed,
      Completed: task => task.completed
    };

The values of `FILTER_MAP` are functions that we will use to filter the `tasks` data array:

* The `All` filter shows all tasks, so we return `true` for all tasks.
* The `Active` filter shows tasks whose `completed` prop is `false`.
* The `Completed` filter shows tasks whose `completed` prop is `true`.

Beneath our previous addition, add the following — here we are using the [`Object.keys()][49]` method to collect an array of `FILTER_NAMES`:


    const FILTER_NAMES = Object.keys(FILTER_MAP);

**Note**: We are defining these constants outside our `App()` function because if they were defined inside it, they would be recalculated every time the `` component re-renders, and we don't want that. This information will never change no matter what our application does.

### Rendering the filters

Now that we have the `FILTER_NAMES` array, we can use it to render all three of our filters. Inside the `App()` function we can create a constant called `filterList`, which we will use to map over our array of names and return a `` component. Remember, we need keys here, too.

Add the following underneath your `taskList` constant declaration:


    const filterList = FILTER_NAMES.map(name => (

    ));

Now we'll replace the three repeated ``s in `App.js` with this `filterList`. Replace the following:






With this:


    {filterList}

This won't work yet. We've got a bit more work to do first.

### Interactive filters

To make our filter buttons interactive, we should consider what props they need to utilize.

* We know that the `` should report whether it is currently pressed, and it should be pressed if its name matches the current value of our filter state.
* We know that the `` needs a callback to set the active filter. We can make direct use of our `setFilter` hook.

Update your `filterList` constant as follows:


    const filterList = FILTER_NAMES.map(name => (

    ));

In the same way as we did earlier with our `` component, we now have to update `FilterButton.js` to utilize the props we have given it. Do each of the following, and remember to use curly braces to read these variables!

* Replace `all` with `{props.name}`.
* Set the value of `aria-pressed` to `{props.isPressed}`.
* Add an `onClick` handler that calls `props.setFilter()` with the filter's name.

With all of that done, your `Filter()` function should read like this:


    function FilterButton(props) {
      return (
         props.setFilter(props.name)}
        >
          Show
          {props.name}
           tasks

      );
    }

Visit your browser again. You should see that the different buttons have been given their respective names. When you press a filter button, you should see its text take on a new outline — this tells you it has been selected. And if you look at your DevTool's Page Inspector while clicking the buttons, you'll see the `aria-pressed` attribute values change accordingly.

![The three filter buttons of the app - all, active, and completed - with a focus highlight around completed][50]

However, our buttons still don't actually filter the todos in the UI! Let's finish this off.

### Filtering tasks in the UI

Right now, our `taskList` constant in `App()` maps over the tasks state and returns a new `` component for all of them. This is not what we want! A task should only render if it is included in the results of applying the selected filter. Before we map over the tasks state, we should filter it (with [`Array.prototype.filter()][45]`) to eliminate objects we don't want to render.

Update your `taskList` like so:


    const taskList = tasks
      .filter(FILTER_MAP[filter])
      .map(task => (

      ));

In order to decide which callback function to use in `Array.prototype.filter()`, we access the value in `FILTER_MAP` that corresponds to the key of our filter state. When filter is `All`, for example, `FILTER_MAP[filter]` will evaluate to `() => true`.

Choosing a filter in your browser will now remove the tasks that do not meet its criteria. The count in the heading above the list will also change to reflect the list!

![The app with the filter buttons in place. Active is highlighted, so only the active todo items are being shown.][51]

## Summary

So that's it — our app is now functionally complete. However, now that we've implemented all of our features, we can make a few improvements to ensure that a wider range of users can use our app. Our next article rounds things off for our React tutorials by looking at including focus management in React, which can improve usability and reduce confusion for both keyboard-only and screenreader users.

[__ Previous ][38][__ Overview: Client-side JavaScript frameworks][26][ Next __][39]

## In this module

* [Introduction to client-side frameworks][52]
* [Framework main features][53]
* React
    * [Getting started with React][54]
    * [Beginning our React todo list][55]
    * [Componentizing our React app][56]
    * [React interactivity: Events and state][38]
    * [React interactivity: Editing, filtering, conditional rendering][27]
    * [Accessibility in React][39]
    * [React resources][57]
* Ember
    * [Getting started with Ember][58]
    * [Ember app structure and componentization][59]
    * [Ember interactivity: Events, classes and state][60]
    * [Ember Interactivity: Footer functionality, conditional rendering][61]
    * [Routing in Ember][62]
    * [Ember resources and troubleshooting][63]
* Vue
    * [Getting started with Vue][64]
    * [Creating our first Vue component][65]
    * [Rendering a list of Vue components][66]
    * [Adding a new todo form: Vue events, methods, and models][67]
    * [Styling Vue components with CSS][68]
    * [Using Vue computed properties][69]
    * [Vue conditional rendering: editing existing todos][70]
    * [Focus management with Vue refs][71]
    * [Vue resources][72]

#### Metadata

* **Last modified:** Jun 26, 2020, [by MDN contributors][73]

Related Topics

1. [**Complete beginners start here!**][74]
2. Getting started with the Web
    1. [Getting started with the Web overview][74]
    2. [Installing basic software][75]
    3. [What will your website look like?][76]
    4. [Dealing with files][77]
    5. [HTML basics][78]
    6. [CSS basics][79]
    7. [JavaScript basics][80]
    8. [Publishing your website][81]
    9. [How the Web works][82]
3. [**HTML — Structuring the Web**][40]
4. Introduction to HTML
    1. [Introduction to HTML overview][83]
    2. [Getting started with HTML][84]
    3. [What's in the head? Metadata in HTML][85]
    4. [HTML text fundamentals][86]
    5. [Creating hyperlinks][87]
    6. [Advanced text formatting][88]
    7. [Document and website structure][89]
    8. [Debugging HTML][90]
    9. [Assessment: Marking up a letter][91]
    10. [Assessment: Structuring a page of content][92]
5. Multimedia and embedding
    1. [Multimedia and embedding overview][93]
    2. [Images in HTML][94]
    3. [Video and audio content][95]
    4. [From object to iframe — other embedding technologies][96]
    5. [Adding vector graphics to the Web][97]
    6. [Responsive images][98]
    7. [Assessment: Mozilla splash page][99]
6. HTML tables
    1. [HTML tables overview][100]
    2. [HTML table basics][101]
    3. [HTML Table advanced features and accessibility][102]
    4. [Assessment: Structuring planet data][103]
7. [**CSS — Styling the Web**][41]
8. CSS first steps
    1. [CSS first steps overview][104]
    2. [What is CSS?][105]
    3. [Getting started with CSS][106]
    4. [How CSS is structured][107]
    5. [How CSS works][108]
    6. [Using your new knowledge][109]
9. CSS building blocks
    1. [CSS building blocks overview][110]
    2. [Cascade and inheritance][111]
    3. [CSS selectors][112]
    4. [The box model][113]
    5. [Backgrounds and borders][114]
    6. [Handling different text directions][115]
    7. [Overflowing content][116]
    8. [Values and units][117]
    9. [Sizing items in CSS][118]
    10. [Images, media, and form elements][119]
    11. [Styling tables][120]
    12. [Debugging CSS][121]
    13. [Organizing your CSS][122]
10. Styling text
    1. [Styling text overview][123]
    2. [Fundamental text and font styling][124]
    3. [Styling lists][125]
    4. [Styling links][126]
    5. [Web fonts][127]
    6. [Assessment: Typesetting a community school homepage][128]
11. CSS layout
    1. [CSS layout overview][129]
    2. [Introduction][130]
    3. [Normal Flow][131]
    4. [Flexbox][132]
    5. [Grids][133]
    6. [Floats][134]
    7. [Positioning][135]
    8. [Multiple-column Layout][136]
    9. [Responsive design][137]
    10. [Beginner's guide to media queries][138]
    11. [Legacy Layout Methods][139]
    12. [Supporting Older Browsers][140]
    13. [Fundamental Layout Comprehension][141]
12. [**JavaScript — Dynamic client-side scripting**][42]
13. JavaScript first steps
    1. [JavaScript first steps overview][142]
    2. [What is JavaScript?][143]
    3. [A first splash into JavaScript][144]
    4. [What went wrong? Troubleshooting JavaScript][145]
    5. [Storing the information you need — Variables][146]
    6. [Basic math in JavaScript — Numbers and operators][147]
    7. [Handling text — Strings in JavaScript][148]
    8. [Useful string methods][149]
    9. [Arrays][150]
    10. [Assessment: Silly story generator][151]
14. JavaScript building blocks
    1. [JavaScript building blocks overview][152]
    2. [Making decisions in your code — Conditionals][153]
    3. [Looping code][154]
    4. [Functions — Reusable blocks of code][155]
    5. [Build your own function][156]
    6. [Function return values][157]
    7. [Introduction to events][158]
    8. [Assessment: Image gallery][159]
15. Introducing JavaScript objects
    1. [Introducing JavaScript objects overview][160]
    2. [Object basics][161]
    3. [Object-oriented JavaScript for beginners][162]
    4. [Object prototypes][163]
    5. [Inheritance in JavaScript][164]
    6. [Working with JSON data][165]
    7. [Object building practice][166]
    8. [Assessment: Adding features to our bouncing balls demo][167]
16. Asynchronous JavaScript
    1. [Asynchronous JavaScript overview][168]
    2. [General asynchronous programming concepts][169]
    3. [Introducing asynchronous JavaScript][170]
    4. [Cooperative asynchronous Java​Script: Timeouts and intervals][171]
    5. [Graceful asynchronous programming with Promises][172]
    6. [Making asynchronous programming easier with async and await][173]
    7. [Choosing the right approach][174]
17. Client-side web APIs
    1. [Client-side web APIs][175]
    2. [Introduction to web APIs][176]
    3. [Manipulating documents][177]
    4. [Fetching data from the server][178]
    5. [Third party APIs][179]
    6. [Drawing graphics][180]
    7. [Video and audio APIs][181]
    8. [Client-side storage][182]
18. [**Web forms — Working with user data**][183]
19. Core forms learning pathway
    1. [Web forms overview][183]
    2. [Your first form][184]
    3. [How to structure a web form][185]
    4. [Basic native form controls][186]
    5. [The HTML5 input types][187]
    6. [Other form controls][188]
    7. [Styling web forms][189]
    8. [Advanced form styling][190]
    9. [UI pseudo-classes][191]
    10. [Client-side form validation][192]
    11. [Sending form data][193]
20. Advanced forms articles
    1. [How to build custom form controls][194]
    2. [Sending forms through JavaScript][195]
    3. [CSS property compatibility table for form controls][196]
21. [**Accessibility — Make the web usable by everyone**][197]
22. Accessibility guides
    1. [Accessibility overview][197]
    2. [What is accessibility?][198]
    3. [HTML: A good basis for accessibility][199]
    4. [CSS and JavaScript accessibility best practices][200]
    5. [WAI-ARIA basics][201]
    6. [Accessible multimedia][202]
    7. [Mobile accessibility][203]
23. Accessibility assessment
    1. [Assessment: Accessibility troubleshooting][204]
24. [**Tools and testing**][25]
25. Client-side web development tools
    1. [Client-side web development tools index][205]
    2. [Client-side tooling overview][206]
    3. [Command line crash course][43]
    4. [Package management basics][207]
    5. [Introducing a complete toolchain][208]
    6. [Deploying our app][209]
26. Introduction to client-side frameworks
    1. [Client-side frameworks overview][52]
    2. [Framework main features][53]
27. React
    1. [Getting started with React][54]
    2. [Beginning our React todo list][55]
    3. [Componentizing our React app][56]
    4. [React interactivity: Events and state][38]
    5. [React interactivity: Editing, filtering, conditional rendering][27]
    6. [Accessibility in React][39]
    7. [React resources][57]
28. Ember
    1. [Getting started with Ember][58]
    2. [Ember app structure and componentization][59]
    3. [Ember interactivity: Events, classes and state][60]
    4. [Ember Interactivity: Footer functionality, conditional rendering][61]
    5. [Routing in Ember][62]
    6. [Ember resources and troubleshooting][63]
29. Vue
    1. [Getting started with Vue][64]
    2. [Creating our first Vue component][65]
    3. [Rendering a list of Vue components][66]
    4. [Adding a new todo form: Vue events, methods, and models][67]
    5. [Styling Vue components with CSS][68]
    6. [Using Vue computed properties][69]
    7. [Vue conditional rendering: editing existing todos][210]
    8. [Focus management with Vue refs][71]
    9. [Vue resources][72]
30. Git and GitHub
    1. [Git and GitHub overview][211]
    2. [Hello World][212]
    3. [Git Handbook][213]
    4. [Forking Projects][214]
    5. [About pull requests][215]
    6. [Mastering Issues][216]
31. Cross browser testing
    1. [Cross browser testing overview][217]
    2. [Introduction to cross browser testing][218]
    3. [Strategies for carrying out testing][219]
    4. [Handling common HTML and CSS problems][220]
    5. [Handling common JavaScript problems][221]
    6. [Handling common accessibility problems][222]
    7. [Implementing feature detection][223]
    8. [Introduction to automated testing][224]
    9. [Setting up your own test automation environment][225]
32. [**Server-side website programming**][226]
33. First steps
    1. [First steps overview][227]
    2. [Introduction to the server-side][228]
    3. [Client-Server overview][229]
    4. [Server-side web frameworks][230]
    5. [Website security][231]
34. Django web framework (Python)
    1. [Django web framework (Python) overview][232]
    2. [Introduction][233]
    3. [Setting up a development environment][234]
    4. [Tutorial: The Local Library website][235]
    5. [Tutorial Part 2: Creating a skeleton website][236]
    6. [Tutorial Part 3: Using models][237]
    7. [Tutorial Part 4: Django admin site][238]
    8. [Tutorial Part 5: Creating our home page][239]
    9. [Tutorial Part 6: Generic list and detail views][240]
    10. [Tutorial Part 7: Sessions framework][241]
    11. [Tutorial Part 8: User authentication and permissions][242]
    12. [Tutorial Part 9: Working with forms][243]
    13. [Tutorial Part 10: Testing a Django web application][244]
    14. [Tutorial Part 11: Deploying Django to production][245]
    15. [Web application security][246]
    16. [Assessment: DIY mini blog][247]
35. Express Web Framework (node.js/JavaScript)
    1. [Express Web Framework (Node.js/JavaScript) overview][248]
    2. [Express/Node introduction][249]
    3. [Setting up a Node (Express) development environment][250]
    4. [Express tutorial: The Local Library website][251]
    5. [Express Tutorial Part 2: Creating a skeleton website][252]
    6. [Express Tutorial Part 3: Using a database (with Mongoose)][253]
    7. [Express Tutorial Part 4: Routes and controllers][254]
    8. [Express Tutorial Part 5: Displaying library data][255]
    9. [Express Tutorial Part 6: Working with forms][256]
    10. [Express Tutorial Part 7: Deploying to production][257]
36. **[Further resources**][258]
37. Common questions
    1. [HTML questions][259]
    2. [CSS questions][260]
    3. [JavaScript questions][261]
    4. [How the Web works][262]
    5. [Tools and setup][263]
    6. [Design and accessibility][264]
38. [How to contribute][265]

## Learn the best of web development

Get the latest and greatest from MDN delivered straight to your inbox.

The newsletter is offered in English only at the moment.

E-mail

I'm okay with Mozilla handling my info as explained in this [Privacy Policy][266].

Sign up now

Hide Newsletter Sign-up

[MDN Web Docs][267]

* [Web Technologies][4]
* [Learn Web Development][13]
* [About MDN][268]
* [Feedback][19]
* [About][269]
* [MDN Web Docs Store][270]
* [Contact Us][271]
* [Firefox][272]

#### MDN

* * #### Mozilla
* * © 2005-2020 Mozilla and individual contributors. Content is available under [these licenses][273].
* [Terms][274]
* [Privacy][275]
* [Cookies][276]

## Sign In

Sign in to enjoy the benefits of an MDN account. If you haven't already created an account, you will be prompted to do so after signing in.

[ Sign in with Github ][277] [ Sign in with Google ][278]

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
[23]: https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering
[24]: https://github.com/mdn/kuma/issues/new/choose
[25]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing
[26]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks
[27]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering
[28]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering$locales
[29]: https://developer.mozilla.org#Editing_the_name_of_a_task
[30]: https://developer.mozilla.org#A_UI_for_editing
[31]: https://developer.mozilla.org#Conditional_rendering
[32]:
[33]: https://developer.mozilla.org#Editing_from_the_UI
[34]: https://developer.mozilla.org#Back_to_the_filter_buttons
[35]: https://developer.mozilla.org#Summary
[36]: https://developer.mozilla.org#In_this_module
[37]: https://developer.mozilla.org#sidebar-quicklinks
[38]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
[39]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
[40]: https://developer.mozilla.org/en-US/docs/Learn/HTML
[41]: https://developer.mozilla.org/en-US/docs/Learn/CSS
[42]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript
[43]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line
[44]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[45]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[46]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
[47]: https://mdn.mozillademos.org/files/17206/view.png
[48]: https://mdn.mozillademos.org/files/17207/edit.png
[49]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
[50]: https://mdn.mozillademos.org/files/17208/filter-buttons.png
[51]: https://mdn.mozillademos.org/files/17209/filtered-todo-list.png
[52]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction
[53]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Main_features
[54]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
[55]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
[56]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
[57]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_resources
[58]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_getting_started
[59]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_structure_componentization
[60]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_interactivity_events_state
[61]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_conditional_footer
[62]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_routing
[63]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_resources
[64]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started
[65]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_first_component
[66]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_rendering_lists
[67]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_methods_events_models
[68]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_styling
[69]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_computed_properties
[70]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[71]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management
[72]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_resources
[73]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering$history
[74]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[75]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software
[76]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/What_will_your_website_look_like
[77]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
[78]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
[79]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
[80]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
[81]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website
[82]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
[83]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
[84]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
[85]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
[86]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
[87]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
[88]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting
[89]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
[90]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML
[91]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter
[92]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content
[93]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding
[94]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML
[95]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content
[96]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies
[97]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web
[98]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[99]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page
[100]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables
[101]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics
[102]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced
[103]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Structuring_planet_data
[104]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps
[105]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS
[106]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
[107]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured
[108]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works
[109]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Using_your_new_knowledge
[110]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks
[111]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance
[112]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors
[113]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model
[114]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders
[115]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Handling_different_text_directions
[116]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content
[117]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
[118]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS
[119]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Images_media_form_elements
[120]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables
[121]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Debugging_CSS
[122]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing
[123]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text
[124]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals
[125]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
[126]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links
[127]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts
[128]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Typesetting_a_homepage
[129]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout
[130]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction
[131]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow
[132]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
[133]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[134]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats
[135]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
[136]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout
[137]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
[138]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries
[139]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Legacy_Layout_Methods
[140]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Supporting_Older_Browsers
[141]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Fundamental_Layout_Comprehension
[142]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps
[143]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[144]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
[145]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
[146]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
[147]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
[148]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings
[149]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods
[150]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
[151]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Silly_story_generator
[152]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks
[153]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
[154]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
[155]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
[156]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function
[157]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values
[158]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
[159]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery
[160]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
[161]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
[162]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
[163]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
[164]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
[165]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
[166]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
[167]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features
[168]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
[169]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts
[170]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
[171]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
[172]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
[173]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
[174]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing_the_right_approach
[175]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs
[176]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction
[177]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
[178]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
[179]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
[180]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
[181]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs
[182]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
[183]: https://developer.mozilla.org/en-US/docs/Learn/Forms
[184]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form
[185]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form
[186]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls
[187]: https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
[188]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls
[189]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms
[190]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
[191]: https://developer.mozilla.org/en-US/docs/L
