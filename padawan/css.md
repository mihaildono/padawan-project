# Introduction
Previously we learned how create some kind simple of logical behavior, now
we will learn how to visually create static webpages.

Creating good reusable and responsive layouts is going to be
one of the main tasks, that a front-end developer will be performing.

For a simple overview of how to approach creating beautiful pages, read this
[css][css] guide.

## General advice
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

## Developer tools
The user sees a web page and thinks nothing more. From this lesson
onward you are granted the power to see through 'simple' images of a page and
to shape them as you see fit. Head over to `https://google.com` and press
`F12`. This opens the developer tools, where you can see and interact with
relevant information. In the `elements` section you can see the whole layout and
styles of each element. You can freely modify anything as you see fit!

## CSS Trial
Clone google landing page, along with the profile dropdown.
The student must work his way around how to create a html page and how to
include css in it. To create the layout use `flexbox`.

The following attributes will be learned and should be used:
1. flexbox
2. :after/:before
3. :hover
4. transitions

Complete this trial you and earn the badge "handsome Jack"

### Bonus
Find a page with an ad that blocks the view and remove it, to see the
contents. You will earn the badge "Tinkerer"

[css]: https://piratefsh.github.io/how-to/2016/01/27/how-to-think-in-css.html
