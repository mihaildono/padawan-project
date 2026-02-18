# HTML Part 1

> "In my experience there is no such thing as luck."
> ―Obi-Wan Kenobi

HTML (HyperText Markup Language) is the foundation of all web pages. It defines the structure and content of a webpage using elements and tags.

## Helpful links

- [MDN HTML Basics][mdn-html]
- [HTML Elements Reference][html-elements]
- [W3Schools HTML Tutorial][w3-html]

## Prerequisites

- Have a text editor installed (VS Code is recommended)
- Create a folder for your HTML projects
- Open your project folder in your text editor

## What is HTML?

- **HTML** stands for HyperText Markup Language
- It's not a programming language - it's a **markup language**
- HTML uses **tags** to describe the structure of a page
- Browsers read HTML and display it as a webpage

## Basic Structure

Every HTML page has a basic structure. Here's the simplest HTML page:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

Let's break this down:

- `<!DOCTYPE html>` - tells the browser this is an HTML5 document
- `<html>` - the root element that contains all other elements
- `<head>` - contains metadata about the page (not visible on the page)
- `<title>` - sets the title that appears in the browser tab
- `<body>` - contains all the visible content of the page

### Exercise

Create your first HTML page that says "Welcome to my page"

```html
  <!DOCTYPE html>
  <html>
  <head>
      <title>Welcome</title>
  </head>
  <body>
      <h1>Welcome to my page</h1>
  </body>
  </html>
  ```

## HTML Tags

HTML elements are defined by **tags**. Most tags come in pairs:

- **Opening tag**: `<tagname>`
- **Closing tag**: `</tagname>`

```html
<p>This is a paragraph</p>
```

Some tags are **self-closing** and don't need a closing tag:

```html
<img src="picture.jpg">
<br>
<hr>
```

## Common HTML Elements

### Headings

There are 6 levels of headings, from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Smaller Heading</h3>
```

### Paragraphs

Use `<p>` for paragraphs of text:

```html
<p>This is a paragraph of text.</p>
<p>This is another paragraph.</p>
```

### Links

Use `<a>` (anchor) to create links:

```html
<a href="https://google.com">Go to Google</a>
```

The `href` attribute specifies where the link goes.

### Images

Use `<img>` to display images:

```html
<img src="cat.jpg" alt="A cute cat">
```

Attributes:

- `src` - the path to the image file
- `alt` - alternative text (shown if image can't load, and used by screen readers)

### Lists

**Unordered list** (bullet points):

```html
<ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Oranges</li>
</ul>
```

**Ordered list** (numbered):

```html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>
```

### Divisions and Spans

- `<div>` - a container for grouping block-level content
- `<span>` - a container for grouping inline content

```html
<div>
    <h2>Section Title</h2>
    <p>Some text with <span>highlighted words</span>.</p>
</div>
```

## HTML Attributes

Attributes provide additional information about elements. They are written inside the opening tag:

```html
<tag attribute="value">content</tag>
```

Common attributes:

- `id` - unique identifier for an element
- `class` - one or more class names (for CSS styling)
- `style` - inline CSS styling
- `href` - URL for links
- `src` - source file for images/media
- `alt` - alternative text for images

```html
<p id="intro" class="highlight">This paragraph has an ID and a class.</p>
<a href="page.html" class="nav-link">Click here</a>
```

## Text Formatting

HTML provides tags for formatting text:

```html
<strong>Bold text</strong>
<em>Italic text</em>
<u>Underlined text</u>
<br> <!-- Line break -->
<hr> <!-- Horizontal line -->
```

## Comments

You can add comments in HTML that won't be displayed:

```html
<!-- This is a comment -->
<p>This is visible</p>
<!--
    This is a
    multi-line comment
-->
```

## Trial: Create Your First Webpage

Create a personal introduction page with the following:

1. A main heading with your name
2. A paragraph about yourself
3. An unordered list of your hobbies
4. An ordered list of your favorite foods
5. At least one image
6. At least one link to a website you like

The page should be properly structured with `<!DOCTYPE>`, `<html>`, `<head>`, and `<body>` tags.

Complete this trial and earn the badge **"Page Builder"**

### Bonus

Add a section with 3 different heading levels (h1, h2, h3) and use comments to organize your code. You will earn the badge **"Organized Padawan"**

When finished with the trial, continue to [Basic JS pt. 1][js-intro] to learn programming logic.

[mdn-html]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started
[html-elements]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
[w3-html]: https://www.w3schools.com/html/
[js-intro]: https://github.com/mihaildono/padawan-project/blob/master/js/youngling/introduction.md
