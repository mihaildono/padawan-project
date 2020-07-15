In the previous chapter, we learned about the `individual` elements that make a
web page. Time to bring them together. In this chapter we will learn about
`React`. `React` is a library, that makes building SPAs(Single Page
Application) very easy.

1. Virtual DOM

2. JSX
onClick -> listener for events
<CustomElement onClick={onClickFunction}>hello</CustomElement> => {
    name: 'Custom Element', type: react-element, children: {
        type: string, value: 'hello'
        }
    }

3. Lifecycle of a component:
Mount -> initialize state
CheckProps -> check if props exist
render -> display data
Update -> modify state
Unmount -> close component -> remove timers
