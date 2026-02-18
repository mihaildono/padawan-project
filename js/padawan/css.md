# CSS

> "Do. Or do not. There is no try."
> ―Yoda

Previously we learned how to create some kind of simple logical behavior, now
we will learn how to visually create static webpages.

Creating good reusable and responsive layouts is going to be
one of the main tasks, that a front-end developer will be performing.

## Helpful links

- [How to Think in CSS][css]
- [MDN CSS Basics][mdn-css]
- [Flexbox Guide][flexbox-guide]

## Prerequisites

- Complete HTML Part 1 & 2
- Complete Basic JavaScript Part 1 & 2

## What is CSS?

CSS (Cascading Style Sheets) controls how HTML elements look on screen. HTML defines
*what* is on the page, CSS defines *how* it looks.

CSS rules have two parts - a **selector** (what to style) and **declarations** (how to style it):

```css
selector {
    property: value;
}
```

## Selectors

There are three main ways to target elements:

```css
/* Tag selector - targets ALL paragraphs */
p {
    color: blue;
}

/* Class selector - targets elements with class="highlight" */
.highlight {
    background-color: yellow;
}

/* ID selector - targets the ONE element with id="header" */
#header {
    font-size: 24px;
}
```

## General advice

At this stage to style an element use classes. We will use ids and global tag
stylings in the next chapter.

**Bad:**

```css
p {
    font-size: 8px;
}

#header {
    color: red;
}
```

**Good:**

```css
.header {
    font-size: 8px;
    color: red;
}
```

## The Box Model

Every HTML element is a rectangular box. The box model defines the space an element takes:

```text
+---------------------------+
|         margin            |
|  +---------------------+ |
|  |      border          | |
|  |  +-----------------+ | |
|  |  |    padding       | | |
|  |  |  +-----------+  | | |
|  |  |  |  content  |  | | |
|  |  |  +-----------+  | | |
|  |  +-----------------+ | |
|  +---------------------+ |
+---------------------------+
```

```css
.box {
    width: 200px;
    padding: 10px;    /* space inside the border */
    border: 1px solid black;
    margin: 20px;     /* space outside the border */
}
```

## Flexbox

Flexbox is the modern way to create layouts. It makes aligning and distributing
space between items simple.

```css
.container {
    display: flex;
    justify-content: center;  /* horizontal alignment */
    align-items: center;      /* vertical alignment */
    gap: 10px;                /* space between items */
}
```

Key properties to explore:

- `flex-direction` - row or column layout
- `justify-content` - alignment along the main axis
- `align-items` - alignment along the cross axis
- `flex-wrap` - whether items wrap to next line
- `gap` - spacing between flex items

Read this [CSS guide][css] for a simple overview of how to approach creating layouts.

## Developer tools

The user sees a web page and thinks nothing more. From this lesson
onward you are granted the power to see through 'simple' images of a page and
to shape them as you see fit. Head over to `https://google.com` and press
`F12`. This opens the developer tools, where you can see and interact with
relevant information. In the `elements` section you can see the whole layout and
styles of each element. You can freely modify anything as you see fit!

## Trial: Clone the Google Landing Page

Clone the Google landing page, along with the profile dropdown.
The student must work his way around how to create an HTML page and how to
include CSS in it. To create the layout use `flexbox`.

The following attributes will be learned and should be used:

1. flexbox
2. :after/:before
3. :hover
4. transitions

Complete this trial and earn the badge **"Handsome Jack"**

### Bonus

Find a page with an ad that blocks the view and remove it, to see the
contents. You will earn the badge **"Tinkerer"**

When finished with the trial, head over to the [react][react] section for
creating your first full-fledged front-end applications.

[css]: https://piratefsh.github.io/how-to/2016/01/27/how-to-think-in-css.html
[mdn-css]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps
[flexbox-guide]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[react]: https://github.com/mihaildono/padawan-project/blob/master/js/padawan/react.md
