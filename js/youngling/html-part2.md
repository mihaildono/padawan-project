# HTML Part 2

> "Your focus determines your reality."
> ―Qui-Gon Jinn

Now that you understand HTML basics, it's time to learn about forms, semantic HTML, and how to make your pages interactive with events.

## Helpful links

- [MDN HTML Forms][mdn-forms]
- [Semantic HTML][semantic]
- [HTML Events][events]

## Prerequisites

- Complete HTML Part 1
- Have basic understanding of HTML structure and common tags

## HTML Forms

Forms allow users to input data that can be sent to a server. They are essential for login pages, search bars, contact forms, and more.

### Basic Form Structure

```html
<form>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">

    <button type="submit">Submit</button>
</form>
```

Elements:

- `<form>` - container for the form
- `<label>` - label for an input (the `for` attribute should match the input's `id`)
- `<input>` - field where user enters data
- `<button>` - button to submit the form

### Input Types

HTML provides many input types:

```html
<!-- Text input -->
<input type="text" placeholder="Enter your name">

<!-- Password (hides characters) -->
<input type="password" placeholder="Enter password">

<!-- Email (validates email format) -->
<input type="email" placeholder="your@email.com">

<!-- Number -->
<input type="number" min="0" max="100">

<!-- Checkbox -->
<input type="checkbox" id="agree">
<label for="agree">I agree to terms</label>

<!-- Radio buttons (only one can be selected) -->
<input type="radio" name="size" value="small"> Small
<input type="radio" name="size" value="large"> Large

<!-- Date picker -->
<input type="date">

<!-- File upload -->
<input type="file">
```

### Textarea and Select

Multi-line text input and dropdown menus:

```html
<!-- Multi-line text input -->
<textarea rows="4" cols="50" placeholder="Enter your message"></textarea>

<!-- Dropdown menu -->
<select name="country">
    <option value="usa">USA</option>
    <option value="uk">UK</option>
    <option value="canada">Canada</option>
</select>
```

### Complete Form Example

Example of a complete contact form:

```html
<form>
    <h2>Contact Form</h2>

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>

    <label for="subscribe">
        <input type="checkbox" id="subscribe" name="subscribe">
        Subscribe to newsletter
    </label>

    <button type="submit">Send Message</button>
</form>
```

The `required` attribute makes a field mandatory.

## Semantic HTML

Semantic HTML uses tags that clearly describe their meaning and purpose. This makes code more readable and improves accessibility.

### Why Use Semantic HTML?

- Makes code easier to read and maintain
- Helps search engines understand your content
- Improves accessibility for screen readers
- Better structure and organization

### Common Semantic Tags

Here's how to structure a page using semantic HTML:

```html
<!-- Page structure -->
<header>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
</header>

<main>
    <article>
        <h1>Article Title</h1>
        <p>Article content...</p>
    </article>

    <section>
        <h2>Section Heading</h2>
        <p>Section content...</p>
    </section>

    <aside>
        <p>Related information or sidebar content</p>
    </aside>
</main>

<footer>
    <p>&copy; 2026 My Website</p>
</footer>
```

Semantic elements:

- `<header>` - introductory content or navigation
- `<nav>` - navigation links
- `<main>` - main content of the page
- `<article>` - self-contained content (blog post, news article)
- `<section>` - thematic grouping of content
- `<aside>` - content related to main content (sidebar)
- `<footer>` - footer information
- `<figure>` - self-contained content like images
- `<figcaption>` - caption for a figure

### Non-Semantic vs Semantic

**Bad** (non-semantic):

```html
<div id="header">
    <div id="nav">
        <a href="#home">Home</a>
    </div>
</div>
<div id="content">
    <div class="post">...</div>
</div>
```

**Good** (semantic):

```html
<header>
    <nav>
        <a href="#home">Home</a>
    </nav>
</header>
<main>
    <article>...</article>
</main>
```

## Tables

Tables display data in rows and columns:

```html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>25</td>
            <td>New York</td>
        </tr>
        <tr>
            <td>Sarah</td>
            <td>30</td>
            <td>London</td>
        </tr>
    </tbody>
</table>
```

Table elements:

- `<table>` - the table container
- `<thead>` - table header
- `<tbody>` - table body
- `<tr>` - table row
- `<th>` - table header cell
- `<td>` - table data cell

## HTML Events

Events allow you to make your webpage interactive by responding to user actions. Events are connected to JavaScript.

Common events:

- `onclick` - when element is clicked
- `onmouseover` - when mouse hovers over element
- `onchange` - when input value changes
- `onsubmit` - when form is submitted
- `onload` - when page finishes loading

```html
<button onclick="alert('Button clicked!')">Click Me</button>

<input type="text" onchange="console.log('Value changed')">

<div onmouseover="this.style.color='red'">Hover over me</div>
```

*Note: You'll learn more about JavaScript and events in the next sections.*

## Meta Tags

Meta tags provide metadata about the HTML document. They go in the `<head>` section:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A description of your page">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta name="author" content="Your Name">
    <title>My Page</title>
</head>
```

Meta tag attributes:

- `charset` - character encoding (always use UTF-8)
- `viewport` - makes page responsive on mobile devices
- `description` - description shown in search results
- `keywords` - keywords for search engines
- `author` - page author

## Trial: Create an Interactive Form Page

Create a complete webpage with:

1. Proper semantic HTML structure (header, nav, main, footer)
2. A form with at least 5 different input types
3. A table displaying information (at least 3 columns and 3 rows)
4. Proper meta tags in the head
5. At least one button with an onclick event
6. Proper labels for all form inputs

The page should be well-structured and use semantic HTML where appropriate.

Complete this trial and earn the badge **"Form Master"**

### Bonus

Create a navigation menu in the header that links to different sections of the same page using anchor links (hint: use `href="#sectionId"`). Add a contact form that includes validation (required fields, email format). You will earn the badge **"Semantic Sensei"**

When finished with this trial, you're ready to dive deeper into [Basic JS pt. 2][js-intro] to continue building your programming skills!

[mdn-forms]: https://developer.mozilla.org/en-US/docs/Learn/Forms
[semantic]: https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html
[events]: https://developer.mozilla.org/en-US/docs/Web/Events
[js-intro]: https://github.com/mihaildono/padawan-project/blob/master/js/youngling/introduction.md
