# Interview Preparation Guide

> "Do. Or do not. There is no try."
> ―Yoda

Interviews are not only about technical capabilities - they're also a
demonstration of communication skills, problem-solving approach, and cultural
fit. In most jobs, candidates pass the technical test, but are filtered based on
their ability to collaborate and communicate effectively.

Remember: A good developer writes code for people, not just machines. Anyone can
create a working system - what matters is how that system is maintained over
time, considering all the people working on it and the business driving it.

## Before You Start Applying

### Portfolio Essentials

✅ **GitHub Profile:**

- Pin your best 3-6 projects
- Write clear README files for each project
- Include screenshots/GIFs demonstrating functionality
- Show commit history (regular, meaningful commits)

✅ **Live Demos:**

- Deploy at least 2-3 projects
- Ensure they work on mobile
- Test them before sending to employers

✅ **Personal Website/Portfolio** (Optional but recommended):

- About section
- Projects showcase
- Contact information
- Blog (bonus points)

### Build Your Online Presence

- **LinkedIn** - Professional profile with projects and skills
- **Twitter/X** - Follow developers, share learnings (optional)
- **Dev.to or Medium** - Write about what you're learning (optional)

## 3 step interview process

Usually the interview consists into 3 main parts: HR call, technical section and
manager interview(s). Each of those parts can be split into multiple
interviews. Sometimes there are also special sections like 'cultural fit'
interview, which are not covered in this document.

1. HR screening
You will get general information about the company and the role. You may or
may not discuss salary and conditions. There may be work experience
questions and overview of the CV.
Here is important just to lead a normal conversation and not give off any
red flags. Show motivation and willingness to work.

2. Technical interview/task
This could feature any of the following:

   - Algorithmic task
   - Small task(eg. todo app)
   - JS language related questions
   - Computer Science related questions
     - program architecture
     - databases
     - patterns
     - testing

3. Manager interview
Finally you will speak with someone from management, who will probably be your
boss. Usually it is a conversation, where it will be decided if you will be a
good fit for the team and the project. There may be some technical conversation
depending on the background of the interviewer.

One of the most important aspects of this stage is salary
negotiation. **Always** ask for the high price of a range you have decided
upon. Asking for less out of fear of losing the job will show lack of confidence
and actually says that you are not skilled enough, since you undervalue
yourself.

## CV (Resume)

### Key Rules

- **Maximum 1 page** (2 pages only if 10+ years experience)
- **Single column** layout for better readability
- **No generic templates** - Avoid Europass or standard Word templates
- **ATS-friendly** - Use standard fonts, clear sections, avoid images/tables
- **Tailored** - Customize for each application

### Structure

1. **Header**
   - Name, location (city), email, phone
   - GitHub, LinkedIn, Portfolio links

2. **Summary** (2-3 sentences)
   - "Full-stack developer specializing in React and Node.js with experience
     building scalable web applications..."

3. **Skills**
   - **Frontend:** React, TypeScript, CSS, HTML
   - **Backend:** Node.js, Express, RESTful APIs
   - **Database:** PostgreSQL, MySQL, MongoDB
   - **Tools:** Git, Jest, Docker, VS Code

4. **Projects** (Most important for juniors!)
   - 3-4 projects with bullet points:
     - What it does
     - Technologies used
     - Key achievement/metric
   - Example: "Built a full-stack e-commerce app with React and Node.js,
     featuring user authentication and payment processing"

5. **Experience** (If any)
   - Focus on responsibilities and achievements
   - Use action verbs: built, implemented, designed, improved

6. **Education**
   - Degree, institution, year (if relevant)
   - Online courses/bootcamps

### Resources

- [EnchanCV][enchancv] - Modern CV templates
- [VisualCV][visualcv] - Professional templates
- [Resume.io](https://resume.io) - ATS-friendly templates
- [Standard Resume](https://standardresume.co) - Simple, clean design

## STAR Technique for Behavioral Questions

Use [STAR][star] to structure answers to behavioral questions:

- **Situation** - Set the context
- **Task** - Describe your responsibility
- **Action** - Explain what you did
- **Result** - Share the outcome

### Example Question: "Tell me about a challenging bug you fixed."

❌ **Bad answer:** "I had a bug once and I fixed it using console.log."

✅ **Good answer:**

**Situation:** While building my final project, users reported that the
leaderboard wasn't updating in real-time.

**Task:** I needed to identify why the WebSocket connection was dropping and fix
it without affecting other features.

**Action:** I added logging to track connection states, discovered the server
was timing out idle connections after 60 seconds. I implemented a heartbeat
ping/pong mechanism to keep connections alive.

**Result:** The connection now stays stable indefinitely, and the leaderboard
updates in real-time. I also added this to my documentation as a lesson learned.

## Common Interview Questions

### Behavioral Questions

Prepare stories for these common questions:

- "Tell me about yourself" (2-minute elevator pitch)
- "Why do you want to work here?" (Research the company!)
- "Describe a challenging project you worked on"
- "How do you handle disagreement with a team member?"
- "What's your biggest weakness?" (Be honest but show self-awareness)
- "Where do you see yourself in 5 years?"

### Technical Questions - JavaScript

**Q: What are the differences between var, let and const?**

A: `var` is function-scoped and hoisted, `let` and `const` are block-scoped.
`const` cannot be reassigned but objects/arrays can be mutated.

**Q: What is closure?**

A: A closure is when a function remembers variables from its outer scope even
after that scope has finished executing.

```js
function outer() {
  const name = 'Luke'
  return function inner() {
    console.log(name) // Closure - inner remembers 'name'
  }
}
```

**Q: What is hoisting?**

A: JavaScript moves variable and function declarations to the top of their scope
during compilation. `var` declarations are hoisted and initialized to
`undefined`, `let`/`const` are hoisted but not initialized (temporal dead zone).

**Q: What are higher-order functions?**

A: Functions that take other functions as arguments or return functions.
Examples: `map`, `filter`, `reduce`.

**Q: Callbacks vs Promises vs Async/Await?**

A:
- **Callbacks:** Functions passed to handle async results (can lead to callback hell)
- **Promises:** Objects representing eventual completion/failure of async operation
- **Async/Await:** Syntactic sugar over promises, makes async code look synchronous

**Q: What happens if you assign without `var`/`let`/`const`?**

A: `x = 1` creates a global variable (in non-strict mode), which is bad practice.
In strict mode, it throws a ReferenceError.

**Q: What's the output?**

```js
console.log(1 + +"2");  // 3 (unary + converts "2" to number)
console.log("1" + 2);   // "12" (number coerced to string)
```

### Technical Questions - React

- "What's the difference between state and props?"
- "What are React hooks? Name a few."
- "How does virtual DOM work?"
- "What's the useEffect hook used for?"
- "What's the difference between controlled and uncontrolled components?"

### Technical Questions - General Web

- "What's the difference between HTTP and HTTPS?"
- "Explain the difference between GET and POST requests"
- "What's CORS and why does it exist?"
- "What's the difference between authentication and authorization?"
- "How would you optimize a slow-loading webpage?"

## Design patterns

As software development progressed in time, design patterns emerged, that
solved common problems. Here is a small subset of them:

- Factory - Creates objects without depending on the implementation of the class
- Observer - when one object changes state, all its dependents are notified
- Adapter - allows incompatible classes to work together by converting the
  interface of one class into another.

## Programming Principles
In order for us to write clean code, the community must agree upon and follow
commong programming principles. Here is a small subset of them:
    * KISS(Keep it simple stupid)
    * DRY(Don't repeat yourself)
    * YAGNI(You Aren’t Gonna Need It - don’t implement something until it is necessary
    * SOLID
      - Single Responsibility Principle: a class should have only one reason to change
      - Open/Closed Principle: software entities (classes, modules, functions, etc.)
      should be open for extension, but closed for modification
      - Liskov’s Substitution Principle - derived or child classes must be
      substitutable for their base or parent classes
      - Dependency Inversion Principle: High-level modules/classes should not
      depend on low-level modules/classes. Both should depend upon abstractions.
      Abstractions should not depend upon details. Details should depend upon abstractions.
    * Separation of Concerns (SoC)

## Git development

- Trunk-based
  All developers work on a single branch with open access to it
- Git flow
  One main development branch with strict access to it. Developers work on feature
  branches, that are merged at certain points in time

## Data Structures

- Array
- Stack
- Queue
- Graph
- Tree
- Hash table

## Web

- HTTP Verbs
  - POST
  - GET
  - PUT
  - PATCH
  - DELETE
- Protocols
  - TCP
  - UDP
  - HTTP

## JS [Cheatsheet][cheatsheet]

[enchancv]: https://enhancv.com/
[visualcv]: https://www.visualcv.com/
[cheatsheet]: https://www.cyanhall.com/posts/notes/8.javascript-cheatsheet/
[star]: https://en.wikipedia.org/wiki/Situation,_task,_action,_result
