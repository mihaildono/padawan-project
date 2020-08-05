# Introduction
Often overlooked by developers, creating good reusable and responsive layouts is going to be
one of the main tasks, that a front-end developer will be performing.

For a simple overview of how to approach creating beautiful pages, open howto-css.md.

At this state to style an element use classes. We will use ids and global tag
stylings in the next chapter.

`bad`

```css
p {
    font-size: 8px;
}

#header {
    color: red;
}
```

`good`

```css
.header {
    font-size: 8px;
    color: red;
}
```

## Task

The student must work his way around how to create an html page and how to
include css in it. To create the layout use flexbox.

The following attributes will be learner and should be used:
1. flexbox
2. :after/:before
3. :hover
4. transitions

1. Clone google landing page with profile dropdown

The user sees a web page thinks nothing more. Sometimes he curses at annoying
ads or some intrusive headers and moves on with his life. From this lesson
onward you are granted the power to see through `simple` images of a page, but
to shape them as you see fit. Head over to `google.com` and press `F12`. In the
`elements` section you can see the whole layout and styles of each element. You
can freely modify anything as you see fit!

### Bonus
Find a page with an ad that blocks the view and remove it, to see the contents.

[css]: https://piratefsh.github.io/how-to/2016/01/27/how-to-think-in-css.html
