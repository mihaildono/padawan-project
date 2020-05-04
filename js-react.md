1. Virtual DOM
- collection of js object that map out the real DOM

JSX
onClick -> listener for events
<CustomElement onClick={onClickFunction}>hello</CustomElement> => {
    name: 'Custom Element', type: react-element, children: {
        type: string, value: 'hello'
        }
    }

alternative:
element.findById('custom')
element.addListener(onClickFunction) or smt

Used for SPA applicaitons as ajax abstraction

Lifecycle of a component:
Mount -> initialize state
CheckProps -> check if props exist
render -> display data
Update -> modify state
Unmount -> close component -> remove timers

Babel/Webpack
