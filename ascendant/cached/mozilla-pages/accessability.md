
[Source](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility "Permalink to Accessibility in React - Learn web development | MDN")

# Accessibility in React - Learn web development | MDN

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

# Accessibility in React

1. [See Learn web development][13]
2. [See Tools and testing][25]
3. [See Understanding client-side JavaScript frameworks][26]
4. [Accessibility in React][27]

English▼

* [Add a translation][28]

## On this Page

Jump to section

* [Including keyboard users][29]
* [Exploring the keyboard usability problem][30]
* [Focusing between templates][31]
* [More robust focus management][32]
* [Focusing when the user deletes a task][33]
* [Finished!][34]
* [In this module][35]
* [Related topics][36]

[__ Previous ][37][__ Overview: Client-side JavaScript frameworks][26][ Next __][38]

In our final tutorial article, we'll focus on (pun intended) accessibility, including focus management in React, which can improve usability and reduce confusion for both keyboard-only and screenreader users.

| ----- |
|  Prerequisites: |

Familiarity with the core [HTML][39], [CSS][40], and [JavaScript][41] languages, knowledge of the [terminal/command line][42].

 |
|  Objective: |  To learn about implementing keyboard accessibility in React. |

## Including keyboard users

At this point, we've accomplished all of the features we set out to implement. A user can add a new task, check and uncheck tasks, delete tasks, or edit task names. And they can filter their task list by all, active, or completed tasks.

Or, at least: they can do all of these things with a mouse. Unfortunately, these features are not very accessible to keyboard-only users. Let's explore this now.

## Exploring the keyboard usability problem

Start by clicking on the input at the top of our app, as if you're going to add a new task. You'll see a thick, dashed outline around that input. This outline is your visual indicator that the browser is currently focused on this element. Press the Tab key, and you will see the outline appear around the "Add" button beneath the input. This shows you that the browser's focus has moved.

Press Tab a few more times, and you will see this dashed focus indicator move between each of the filter buttons. Keep going until the focus indicator is around the first "Edit" button. Press Enter.

The `` component will switch templates, as we designed, and you'll see a form that lets us edit the name of the task.

But where did our focus indicator go?

When we switch between templates in our `` component, we completely remove the elements that were there before to replace them with something else. That means the element that we were focused on vanishes, and nothing is in focus at all. This could confuse a wide variety of users — particularly users who rely on the keyboard, or users who use a screen reader.

To improve the experience for keyboard and screen-reader users, we should manage the browser's focus ourselves.

## Focusing between templates

When a user toggles a `` template from viewing to editing, we should focus on the `
` used to rename it; when they toggle back from editing to viewing, we should move focus back to the "Edit" button.

### Targeting our elements

In order to focus on an element in our DOM, we need to tell React which element we want to focus on and how to find it. React's [`useRef][43]` hook creates an object with a single property: `current`. This property can be a reference to anything we want and look that reference up later. It's particularly useful for referring to DOM elements.

Change the `import` statement at the top of `Todo.js` so that it includes `useRef`:


    import React, { useRef, useState } from "react";

Then, create two new constants beneath the hooks in your `Todo()` function. Each should be a ref – one for the "Edit" button in the view template and one for the edit field in the editing template.


    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

These refs have a default value of `null` because they will not have value until we attach them to their respective elements. To do that, we'll add an attribute of `ref` to each element, and set their values to the appropriately named `ref` objects.

The textbox `
` in your editing template should be updated like this:



{newName}


The "Edit" button in your view template should read like this:


     setEditing(true)}
      ref={editButtonRef}
    >
      Edit {props.name}


### Focusing on our refs with useEffect

To use our refs for their intended purpose, we need to import another React hook: [`useEffect()][44]`. `useEffect()` is so named because it runs after React renders a given component, and will run any side-effects that we'd like to add to the render process, which we can't run inside the main function body. `useEffect()` is useful in the current situation because we cannot focus on an element until after the `` component renders and React knows where our refs are.

Change the import statement of `Todo.js` again to add `useEffect`:


    import React, { useEffect, useRef, useState } from "react";

`useEffect()` takes a function as an argument; this function is executed after the component renders. Let's see this in action; put the following `useEffect()` call just above the `return` statement in the body of `Todo()`, and pass into it a function that logs the words "side effect" to your console:


    useEffect(() => {
      console.log("side effect");
    });

To illustrate the difference between the main render process and code run inside `useEffect()`, add another log – put this one below the previous addition:


    console.log("main render");

Now, open the app in your browser. You should see both messages in your console, with each one repeating three times. Note how "main render" logged first, and "side effect" logged second, even though the "side effect" log appears first in the code.


    main render (3)                                     Todo.js:100
    side effect (3)                                     Todo.js:98

That's it for our experimentation for now. Delete `console.log("main render")` now, and lets move on to implementing our focus management.

### Focusing on our editing field

Now that we know our `useEffect()` hook works, we can manage focus with it. As a reminder, we want to focus on the editing field when we switch to the editing template.

Update your existing `useEffect()` hook so that it reads like this:


    useEffect(() => {
      if (isEditing) {
        editFieldRef.current.focus();
      }
    }, [isEditing]);

These changes make it so that, if `isEditing` is true, React reads the current value of the `editFieldRef` and moves browser focus to it. We also pass an array into `useEffect()` as a second argument. This array is a list of values `useEffect()` should depend on. With these values included, `useEffect()` will only run when one of those values changes. We only want to change focus when the value of `isEditing` changes.

Try it now, and you'll see that when you click an "Edit" button, focus moves to the corresponding edit `
`!

### Moving focus back to the edit button

At first glance, getting React to move focus back to our "Edit" button when the edit is saved or cancelled appears deceptively easy. Surely we could add a condition to our `useEffect` to focus on the edit button if `isEditing` is `false`? Let's try it now — update your `useEffect()` call like so:


    useEffect(() => {
      if (isEditing) {
        editFieldRef.current.focus();
      } else {
        editButtonRef.current.focus();
      }
    }, [isEditing]);

This kind of mostly works. Head back to your browser and you'll see that your focus moves between Edit `
` and "Edit" button as you start and end an edit. However, you may have noticed a new problem — the "Edit" button in the final `` component is focussed immediately on page load, before we even interact with the app!

Our `useEffect()` hook is behaving exactly as we designed it: it runs as soon as the component renders, sees that `isEditing` is `false`, and focuses the "Edit" button. Because there are three instances of ``, we see focus on the last "Edit" button.

We need to refactor our approach so that focus changes only when `isEditing` changes from one value to another.

## More robust focus management

In order to meet our refined criteria, we need to know not just the value of `isEditing`, but also _when that value has changed_. In order to do that, we need to be able to read the previous value of the `isEditing` constant. Using pseudocode, our logic should be something like this:


    if (wasNotEditingBefore && isEditingNow) {
      focusOnEditField()
    }
    if (wasEditingBefore && isNotEditingNow) {
      focusOnEditButton()
    }

The React team had discussed [ways to get a component's previous state][45], and has provided an example custom hook we can use for the job.

Paste the following code near the top of `Todo.js`, above your `Todo()` function.


    function usePrevious(value) {
      const ref = useRef();
      useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    }

Now we'll define a `wasEditing` constant beneath the hooks at the top of `Todo()`. We want this constant to track the previous value of `isEditing`, so we call `usePrevious` with `isEditing` as an argument:


    const wasEditing = usePrevious(isEditing);

With this constant, we can update our `useEffect()` hook to implement the pseudocode we discussed before — update it as follows:


    useEffect(() => {
      if (!wasEditing && isEditing) {
        editFieldRef.current.focus();
      }
      if (wasEditing && !isEditing) {
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]);


Note that the logic of `useEffect()` now depends on `wasEditing`, so we provide it in the array of dependencies.

Again try using the "Edit" and "Cancel" buttons to toggle between the templates of your `` component; you'll see the browser focus indicator move appropriately, without the problem we discussed at the start of this section.

## Focusing when the user deletes a task

There's one last keyboard experience gap: when a user deletes a task from the list, the focus vanishes. We're going to follow a pattern similar to our previous changes: we'll make a new ref, and utilize our `usePrevious()` hook, so that we can focus on the list heading whenever a user deletes a task.

### Why the list heading?

Sometimes, the place we want to send our focus to is obvious: when we toggled our `` templates, we had an origin point to "go back" to — the "Edit" button. In this case however, since we're completely removing elements from the DOM, we have no place to go back to. The next best thing is an intuitive location somewhere nearby. The list heading is our best choice because it's close to the list item the user will delete, and focusing on it will tell the user how many tasks are left.

### Creating our ref

Import the `useRef()` and `useEffect()` hooks into `App.js` — you'll need them both below:


    import React, { useState, useRef, useEffect } from "react";

Then declare a new ref inside the `App()` function. Just above the `return` statement is a good place:


    const listHeadingRef = useRef(null);

### Prepare the heading

Heading elements like our `
` are not usually focusable. This isn't a problem — we can make any element programmatically focusable by adding the attribute [`tabindex="-1"][46]` to it. This means _only focusable with JavaScript_. You can't press Tab to focus on an element with a tabindex of `-1` the same way you could do with a `<[button>][47]` or `<[a>][48]` element (this can be done using `tabindex="0"`, but that's not really appropriate in this case).

Let's add the `tabindex` attribute — written as `tabIndex` in JSX — to the heading above our list of tasks, along with our `headingRef`:




      {headingText}



**Note**: The `tabindex` attribute is great for accessibility edge-cases, but you should take **great care** to not overuse it. Only apply a `tabindex` to an element when you're absolutely sure that making it focusable will benefit your user in some way. In most cases, you should be utilizing elements that can naturally take focus, such as buttons, anchors, and inputs. Irresponsible usage of `tabindex` could have a profoundly negative impact on keyboard and screen-reader users!

### Getting previous state

We want to focus on the element associated with our ref (via the `ref` attribute) only when our user deletes a task from their list. That's going to require the `usePrevious()` hook we already used earlier on. Add it to the top of your `App.js` file, just below the imports:


    function usePrevious(value) {
      const ref = useRef();
      useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    }

Now add the following, above the `return` statement inside the `App()` function:


    const prevTaskLength = usePrevious(tasks.length);

Here we are invoking `usePrevious()` to track the length of the tasks state, like so:

**Note**: Since we're now utilizing `usePrevious()` in two files, a good efficiency refactor would be to move the `usePrevious()` function into its own file, export it from that file, and import it where you need it. Try doing this as an exercise once you've got to the end.

### Using `useEffect()` to control our heading focus

Now that we've stored how many tasks we previously had, we can set up a `useEffect()` hook to run when our number of tasks changes, which will focus the heading if the number of tasks we have now is less than with it previously was — i.e. we deleted a task!

Add the following into the body of your `App()` function, just below your previous additions:


    useEffect(() => {
      if (tasks.length - prevTaskLength === -1) {
        listHeadingRef.current.focus();
      }
    }, [tasks.length, prevTaskLength]);

We only try to focus on our list heading if we have fewer tasks now than we did before. The dependencies passed into this hook ensure it will only try to re-run when either of those values (the number of current tasks, or the number of previous tasks) changes.

Now, when you delete a task in your browser, you will see our dotted focus outline appear around the heading above the list.

## Finished!

You've just finished building a React app from the ground up! Congratulations! The skills you've learned here will be a great foundation to build on as you continue working with React.

Most of the time, you can be an effective contributor to a React project even if all you do is think carefully about components and their state and props. Remember to always write the best HTML you can.

`useRef()` and `useEffect()` are somewhat advanced features, and you should be proud of yourself for using them! Look out for opportunities to practice them more, because doing so will allow you to create inclusive experiences for users. Remember: our app would have been inaccessible to keyboard users without them!

**Note**: If you need to check your code against our version, you can find a finished version of the sample React app code in our [todo-react repository][49]. For a running live version, see .

In the very last article we'll present you with a list of React resources that you can use to go further in your learning.

[__ Previous ][37][__ Overview: Client-side JavaScript frameworks][26][ Next __][38]

## In this module

* [Introduction to client-side frameworks][50]
* [Framework main features][51]
* React
    * [Getting started with React][52]
    * [Beginning our React todo list][53]
    * [Componentizing our React app][54]
    * [React interactivity: Events and state][55]
    * [React interactivity: Editing, filtering, conditional rendering][37]
    * [Accessibility in React][27]
    * [React resources][38]
* Ember
    * [Getting started with Ember][56]
    * [Ember app structure and componentization][57]
    * [Ember interactivity: Events, classes and state][58]
    * [Ember Interactivity: Footer functionality, conditional rendering][59]
    * [Routing in Ember][60]
    * [Ember resources and troubleshooting][61]
* Vue
    * [Getting started with Vue][62]
    * [Creating our first Vue component][63]
    * [Rendering a list of Vue components][64]
    * [Adding a new todo form: Vue events, methods, and models][65]
    * [Styling Vue components with CSS][66]
    * [Using Vue computed properties][67]
    * [Vue conditional rendering: editing existing todos][68]
    * [Focus management with Vue refs][69]
    * [Vue resources][70]

#### Metadata

* **Last modified:** Jul 19, 2020, [by MDN contributors][71]

Related Topics

1. [**Complete beginners start here!**][72]
2. Getting started with the Web
    1. [Getting started with the Web overview][72]
    2. [Installing basic software][73]
    3. [What will your website look like?][74]
    4. [Dealing with files][75]
    5. [HTML basics][76]
    6. [CSS basics][77]
    7. [JavaScript basics][78]
    8. [Publishing your website][79]
    9. [How the Web works][80]
3. [**HTML — Structuring the Web**][39]
4. Introduction to HTML
    1. [Introduction to HTML overview][81]
    2. [Getting started with HTML][82]
    3. [What's in the head? Metadata in HTML][83]
    4. [HTML text fundamentals][84]
    5. [Creating hyperlinks][85]
    6. [Advanced text formatting][86]
    7. [Document and website structure][87]
    8. [Debugging HTML][88]
    9. [Assessment: Marking up a letter][89]
    10. [Assessment: Structuring a page of content][90]
5. Multimedia and embedding
    1. [Multimedia and embedding overview][91]
    2. [Images in HTML][92]
    3. [Video and audio content][93]
    4. [From object to iframe — other embedding technologies][94]
    5. [Adding vector graphics to the Web][95]
    6. [Responsive images][96]
    7. [Assessment: Mozilla splash page][97]
6. HTML tables
    1. [HTML tables overview][98]
    2. [HTML table basics][99]
    3. [HTML Table advanced features and accessibility][100]
    4. [Assessment: Structuring planet data][101]
7. [**CSS — Styling the Web**][40]
8. CSS first steps
    1. [CSS first steps overview][102]
    2. [What is CSS?][103]
    3. [Getting started with CSS][104]
    4. [How CSS is structured][105]
    5. [How CSS works][106]
    6. [Using your new knowledge][107]
9. CSS building blocks
    1. [CSS building blocks overview][108]
    2. [Cascade and inheritance][109]
    3. [CSS selectors][110]
    4. [The box model][111]
    5. [Backgrounds and borders][112]
    6. [Handling different text directions][113]
    7. [Overflowing content][114]
    8. [Values and units][115]
    9. [Sizing items in CSS][116]
    10. [Images, media, and form elements][117]
    11. [Styling tables][118]
    12. [Debugging CSS][119]
    13. [Organizing your CSS][120]
10. Styling text
    1. [Styling text overview][121]
    2. [Fundamental text and font styling][122]
    3. [Styling lists][123]
    4. [Styling links][124]
    5. [Web fonts][125]
    6. [Assessment: Typesetting a community school homepage][126]
11. CSS layout
    1. [CSS layout overview][127]
    2. [Introduction][128]
    3. [Normal Flow][129]
    4. [Flexbox][130]
    5. [Grids][131]
    6. [Floats][132]
    7. [Positioning][133]
    8. [Multiple-column Layout][134]
    9. [Responsive design][135]
    10. [Beginner's guide to media queries][136]
    11. [Legacy Layout Methods][137]
    12. [Supporting Older Browsers][138]
    13. [Fundamental Layout Comprehension][139]
12. [**JavaScript — Dynamic client-side scripting**][41]
13. JavaScript first steps
    1. [JavaScript first steps overview][140]
    2. [What is JavaScript?][141]
    3. [A first splash into JavaScript][142]
    4. [What went wrong? Troubleshooting JavaScript][143]
    5. [Storing the information you need — Variables][144]
    6. [Basic math in JavaScript — Numbers and operators][145]
    7. [Handling text — Strings in JavaScript][146]
    8. [Useful string methods][147]
    9. [Arrays][148]
    10. [Assessment: Silly story generator][149]
14. JavaScript building blocks
    1. [JavaScript building blocks overview][150]
    2. [Making decisions in your code — Conditionals][151]
    3. [Looping code][152]
    4. [Functions — Reusable blocks of code][153]
    5. [Build your own function][154]
    6. [Function return values][155]
    7. [Introduction to events][156]
    8. [Assessment: Image gallery][157]
15. Introducing JavaScript objects
    1. [Introducing JavaScript objects overview][158]
    2. [Object basics][159]
    3. [Object-oriented JavaScript for beginners][160]
    4. [Object prototypes][161]
    5. [Inheritance in JavaScript][162]
    6. [Working with JSON data][163]
    7. [Object building practice][164]
    8. [Assessment: Adding features to our bouncing balls demo][165]
16. Asynchronous JavaScript
    1. [Asynchronous JavaScript overview][166]
    2. [General asynchronous programming concepts][167]
    3. [Introducing asynchronous JavaScript][168]
    4. [Cooperative asynchronous Java​Script: Timeouts and intervals][169]
    5. [Graceful asynchronous programming with Promises][170]
    6. [Making asynchronous programming easier with async and await][171]
    7. [Choosing the right approach][172]
17. Client-side web APIs
    1. [Client-side web APIs][173]
    2. [Introduction to web APIs][174]
    3. [Manipulating documents][175]
    4. [Fetching data from the server][176]
    5. [Third party APIs][177]
    6. [Drawing graphics][178]
    7. [Video and audio APIs][179]
    8. [Client-side storage][180]
18. [**Web forms — Working with user data**][181]
19. Core forms learning pathway
    1. [Web forms overview][181]
    2. [Your first form][182]
    3. [How to structure a web form][183]
    4. [Basic native form controls][184]
    5. [The HTML5 input types][185]
    6. [Other form controls][186]
    7. [Styling web forms][187]
    8. [Advanced form styling][188]
    9. [UI pseudo-classes][189]
    10. [Client-side form validation][190]
    11. [Sending form data][191]
20. Advanced forms articles
    1. [How to build custom form controls][192]
    2. [Sending forms through JavaScript][193]
    3. [CSS property compatibility table for form controls][194]
21. [**Accessibility — Make the web usable by everyone**][195]
22. Accessibility guides
    1. [Accessibility overview][195]
    2. [What is accessibility?][196]
    3. [HTML: A good basis for accessibility][197]
    4. [CSS and JavaScript accessibility best practices][198]
    5. [WAI-ARIA basics][199]
    6. [Accessible multimedia][200]
    7. [Mobile accessibility][201]
23. Accessibility assessment
    1. [Assessment: Accessibility troubleshooting][202]
24. [**Tools and testing**][25]
25. Client-side web development tools
    1. [Client-side web development tools index][203]
    2. [Client-side tooling overview][204]
    3. [Command line crash course][42]
    4. [Package management basics][205]
    5. [Introducing a complete toolchain][206]
    6. [Deploying our app][207]
26. Introduction to client-side frameworks
    1. [Client-side frameworks overview][50]
    2. [Framework main features][51]
27. React
    1. [Getting started with React][52]
    2. [Beginning our React todo list][53]
    3. [Componentizing our React app][54]
    4. [React interactivity: Events and state][55]
    5. [React interactivity: Editing, filtering, conditional rendering][37]
    6. [Accessibility in React][27]
    7. [React resources][38]
28. Ember
    1. [Getting started with Ember][56]
    2. [Ember app structure and componentization][57]
    3. [Ember interactivity: Events, classes and state][58]
    4. [Ember Interactivity: Footer functionality, conditional rendering][59]
    5. [Routing in Ember][60]
    6. [Ember resources and troubleshooting][61]
29. Vue
    1. [Getting started with Vue][62]
    2. [Creating our first Vue component][63]
    3. [Rendering a list of Vue components][64]
    4. [Adding a new todo form: Vue events, methods, and models][65]
    5. [Styling Vue components with CSS][66]
    6. [Using Vue computed properties][67]
    7. [Vue conditional rendering: editing existing todos][208]
    8. [Focus management with Vue refs][69]
    9. [Vue resources][70]
30. Git and GitHub
    1. [Git and GitHub overview][209]
    2. [Hello World][210]
    3. [Git Handbook][211]
    4. [Forking Projects][212]
    5. [About pull requests][213]
    6. [Mastering Issues][214]
31. Cross browser testing
    1. [Cross browser testing overview][215]
    2. [Introduction to cross browser testing][216]
    3. [Strategies for carrying out testing][217]
    4. [Handling common HTML and CSS problems][218]
    5. [Handling common JavaScript problems][219]
    6. [Handling common accessibility problems][220]
    7. [Implementing feature detection][221]
    8. [Introduction to automated testing][222]
    9. [Setting up your own test automation environment][223]
32. [**Server-side website programming**][224]
33. First steps
    1. [First steps overview][225]
    2. [Introduction to the server-side][226]
    3. [Client-Server overview][227]
    4. [Server-side web frameworks][228]
    5. [Website security][229]
34. Django web framework (Python)
    1. [Django web framework (Python) overview][230]
    2. [Introduction][231]
    3. [Setting up a development environment][232]
    4. [Tutorial: The Local Library website][233]
    5. [Tutorial Part 2: Creating a skeleton website][234]
    6. [Tutorial Part 3: Using models][235]
    7. [Tutorial Part 4: Django admin site][236]
    8. [Tutorial Part 5: Creating our home page][237]
    9. [Tutorial Part 6: Generic list and detail views][238]
    10. [Tutorial Part 7: Sessions framework][239]
    11. [Tutorial Part 8: User authentication and permissions][240]
    12. [Tutorial Part 9: Working with forms][241]
    13. [Tutorial Part 10: Testing a Django web application][242]
    14. [Tutorial Part 11: Deploying Django to production][243]
    15. [Web application security][244]
    16. [Assessment: DIY mini blog][245]
35. Express Web Framework (node.js/JavaScript)
    1. [Express Web Framework (Node.js/JavaScript) overview][246]
    2. [Express/Node introduction][247]
    3. [Setting up a Node (Express) development environment][248]
    4. [Express tutorial: The Local Library website][249]
    5. [Express Tutorial Part 2: Creating a skeleton website][250]
    6. [Express Tutorial Part 3: Using a database (with Mongoose)][251]
    7. [Express Tutorial Part 4: Routes and controllers][252]
    8. [Express Tutorial Part 5: Displaying library data][253]
    9. [Express Tutorial Part 6: Working with forms][254]
    10. [Express Tutorial Part 7: Deploying to production][255]
36. [**Further resources**][256]
37. Common questions
    1. [HTML questions][257]
    2. [CSS questions][258]
    3. [JavaScript questions][259]
    4. [How the Web works][260]
    5. [Tools and setup][261]
    6. [Design and accessibility][262]
38. [How to contribute][263]

## Learn the best of web development

Get the latest and greatest from MDN delivered straight to your inbox.

The newsletter is offered in English only at the moment.

E-mail

I'm okay with Mozilla handling my info as explained in this [Privacy Policy][264].

Sign up now

Hide Newsletter Sign-up

[MDN Web Docs][265]

* [Web Technologies][4]
* [Learn Web Development][13]
* [About MDN][266]
* [Feedback][19]
* [About][267]
* [MDN Web Docs Store][268]
* [Contact Us][269]
* [Firefox][270]

#### MDN

* * #### Mozilla
* * © 2005-2020 Mozilla and individual contributors. Content is available under [these licenses][271].
* [Terms][272]
* [Privacy][273]
* [Cookies][274]

## Sign In

Sign in to enjoy the benefits of an MDN account. If you haven't already created an account, you will be prompted to do so after signing in.

[ Sign in with Github ][275] [ Sign in with Google ][276]

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
[23]: https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
[24]: https://github.com/mdn/kuma/issues/new/choose
[25]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing
[26]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks
[27]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
[28]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility$locales
[29]: https://developer.mozilla.org#Including_keyboard_users
[30]: https://developer.mozilla.org#Exploring_the_keyboard_usability_problem
[31]: https://developer.mozilla.org#Focusing_between_templates
[32]: https://developer.mozilla.org#More_robust_focus_management
[33]: https://developer.mozilla.org#Focusing_when_the_user_deletes_a_task
[34]: https://developer.mozilla.org#Finished%21
[35]: https://developer.mozilla.org#In_this_module
[36]: https://developer.mozilla.org#sidebar-quicklinks
[37]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_filtering_conditional_rendering
[38]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_resources
[39]: https://developer.mozilla.org/en-US/docs/Learn/HTML
[40]: https://developer.mozilla.org/en-US/docs/Learn/CSS
[41]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript
[42]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line
[43]: https://reactjs.org/docs/hooks-reference.html#useref
[44]: https://reactjs.org/docs/hooks-reference.html#useeffect
[45]: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
[46]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
[47]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[48]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[49]: https://github.com/mdn/todo-react
[50]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction
[51]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Main_features
[52]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
[53]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
[54]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
[55]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
[56]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_getting_started
[57]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_structure_componentization
[58]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_interactivity_events_state
[59]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_conditional_footer
[60]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_routing
[61]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Ember_resources
[62]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started
[63]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_first_component
[64]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_rendering_lists
[65]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_methods_events_models
[66]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_styling
[67]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_computed_properties
[68]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[69]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management
[70]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_resources
[71]: https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility$history
[72]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[73]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software
[74]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/What_will_your_website_look_like
[75]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
[76]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
[77]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
[78]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
[79]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website
[80]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
[81]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
[82]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
[83]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
[84]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
[85]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
[86]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting
[87]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
[88]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML
[89]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter
[90]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content
[91]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding
[92]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML
[93]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content
[94]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies
[95]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web
[96]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[97]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page
[98]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables
[99]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics
[100]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced
[101]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Structuring_planet_data
[102]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps
[103]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS
[104]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
[105]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured
[106]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works
[107]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Using_your_new_knowledge
[108]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks
[109]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance
[110]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors
[111]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model
[112]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders
[113]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Handling_different_text_directions
[114]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content
[115]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
[116]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS
[117]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Images_media_form_elements
[118]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables
[119]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Debugging_CSS
[120]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing
[121]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text
[122]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals
[123]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
[124]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links
[125]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts
[126]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Typesetting_a_homepage
[127]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout
[128]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction
[129]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow
[130]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
[131]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[132]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats
[133]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
[134]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout
[135]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
[136]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries
[137]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Legacy_Layout_Methods
[138]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Supporting_Older_Browsers
[139]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Fundamental_Layout_Comprehension
[140]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps
[141]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[142]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
[143]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
[144]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
[145]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
[146]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings
[147]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods
[148]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
[149]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Silly_story_generator
[150]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks
[151]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
[152]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
[153]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
[154]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function
[155]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values
[156]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
[157]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery
[158]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
[159]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
[160]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
[161]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
[162]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
[163]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
[164]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
[165]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features
[166]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
[167]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts
[168]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
[169]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
[170]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
[171]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
[172]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing_the_right_approach
[173]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs
[174]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction
[175]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
[176]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
[177]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
[178]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
[179]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs
[180]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
[181]: https://developer.mozilla.org/en-US/docs/Learn/Forms
[182]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form
[183]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form
[184]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls
[185]: https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
[186]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls
[187]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms
[188]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
[189]: https://developer.mozilla.org/en-US/docs/Learn/Forms/UI_pseudo-classes
[190]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
[191]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data
[192]: https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_build_custom_form_controls
[193]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
[194]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Property_compatibility_table_for_form_controls
[195]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility
[196]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility
[197]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML
[198]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript
[199]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics
[200]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Multimedia
[201]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Mobile
[202]: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting
[203]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools
[204]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview
[205]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management
[206]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Introducing_complete_toolchain
[207]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Deployment
[208]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering
[209]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub
[210]: https://guides.github.com/activities/hello-world/
[211]: https://guides.github.com/introduction/git-handbook/
[212]: https://guides.github.com/activities/forking/
[213]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[214]: https://guides.github.com/features/issues/
[215]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing
[216]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction
[217]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Testing_strategies
[218]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/HTML_and_CSS
[219]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript
[220]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility
[221]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
[222]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Automated_testing
[223]: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment
[224]: https://developer.mozilla.org/en-US/docs/Learn/Server-side
[225]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps
[226]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction
[227]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview
[228]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks
[229]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security
[230]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django
[231]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Introduction
[232]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/development_environment
[233]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Tutorial_local_library_website
[234]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/skeleton_website
[235]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Models
[236]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site
[237]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Home_page
[238]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Generic_views
[239]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Sessions
[240]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication
[241]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Forms
[242]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing
[243]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment
[244]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/web_application_security
[245]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/django_assessment_blog
[246]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
[247]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
[248]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
[249]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website
[250]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
[251]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
[252]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
[253]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
[254]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
[255]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
[256]: https://developer.mozilla.org#
[257]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto
[258]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto
[259]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Howto
[260]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#How_the_Web_works
[261]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#Tools_and_setup
[262]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions#Design_and_accessibility
[263]: https://developer.mozilla.org/en-US/docs/Learn/How_to_contribute
[264]: https://www.mozilla.org/privacy/
[265]: https://developer.mozilla.org/en-US/
[266]: https://developer.mozilla.org/en-US/docs/MDN/About
[267]: https://www.mozilla.org/about/
[268]: https://shop.spreadshirt.com/mdn-store/
[269]: https://www.mozilla.org/contact/
[270]: https://www.mozilla.org/firefox/?utm_source=developer.mozilla.org&utm_campaign=footer&utm_medium=referral
[271]: https://developer.mozilla.org/docs/MDN/About#Copyrights_and_licenses
[272]: https://www.mozilla.org/about/legal/terms/mozilla
[273]: https://www.mozilla.org/privacy/websites/
[274]: https://www.mozilla.org/privacy/websites/#cookies
[275]: /users/github/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_accessibility
[276]: /users/google/login/?next=%2Fen-US%2Fdocs%2FLearn%2FTools_and_testing%2FClient-side_JavaScript_frameworks%2FReact_accessibility
