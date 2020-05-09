1. Virtual DOM
- collection of js object that map out the real DOM

2. JSX
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

3. Lifecycle of a component:
Mount -> initialize state
CheckProps -> check if props exist
render -> display data
Update -> modify state
Unmount -> close component -> remove timers

4. Babel/Webpack

5. Explain Redux
