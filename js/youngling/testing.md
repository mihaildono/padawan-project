# Testing

> "In a dark place we find ourselves, and a little more knowledge lights our way."
> ―Yoda

Testing is one of the core pillars of software development. It is the only way to
guarantee that functionality fits the requirements and the application is stable.

## Helpful links

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Trophy - Kent C. Dodds][testing-trophy]
- [How to Know What to Test][what-to-test]

## Testing Pyramid

There are several layers related to testing:

There are 2 sides to the testing pyramid:

1. Technical value
2. Business value

**Technical value** increases as you go down the pyramid (unit tests are fast,
cheap, and catch bugs early). **Business value** increases as you go up
(end-to-end tests verify what the user actually experiences).

## Unit Tests

Unit tests are responsible for testing individual units of code.
They are isolated and requirement specific.

```js
function sum(a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

Start with a simple general case test. Afterwards write edge-case tests:

```js
test('adds negative numbers', () => {
  expect(sum(-1, -2)).toBe(-3)
})

test('adds zero', () => {
  expect(sum(5, 0)).toBe(5)
})
```

## Integration Tests

Integration tests verify that groups of functionality work together as a whole.

Example: Test that a user can log in — this involves the form component, validation
logic, and API call all working together.

```js
test('user can log in successfully', () => {
  render(<LoginForm />)

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'luke@jedi.org' }
  })
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'usetheforce' }
  })
  fireEvent.click(screen.getByText('Log In'))

  expect(screen.getByText('Welcome, Luke!')).toBeInTheDocument()
})
```

## End-to-End Tests

End-to-end (E2E) testing verifies the complete system flow, from back-end to
front-end.

Example: Add a note in a todo app and verify there is a change in the database.

E2E tests are the most expensive to write and maintain but provide the highest
confidence that the system works. Tools like [Cypress](https://www.cypress.io/)
and [Playwright](https://playwright.dev/) are commonly used.

## Setting Up Jest

Jest is the most popular testing framework for JavaScript.

```bash
npm install --save-dev jest
```

Add a test script to your `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Create a test file (files ending in `.test.js` are automatically picked up):

```js
// math.js
const sum = (a, b) => a + b
module.exports = { sum }

// math.test.js
const { sum } = require('./math')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

Run tests:

```bash
npm test
```

## Jest Assertions

Assertions are how you verify that values meet expectations. Jest provides many
matchers:

```js
// Exact equality
expect(2 + 2).toBe(4)

// Object equality (deep comparison)
expect({ name: 'Luke' }).toEqual({ name: 'Luke' })

// Truthiness
expect(true).toBeTruthy()
expect(null).toBeFalsy()
expect(undefined).toBeUndefined()

// Numbers
expect(10).toBeGreaterThan(5)
expect(0.1 + 0.2).toBeCloseTo(0.3)

// Strings
expect('Skywalker').toMatch(/walk/)

// Arrays
expect(['Luke', 'Leia']).toContain('Leia')

// Exceptions
expect(() => { throw new Error('fail') }).toThrow('fail')
```

## Organizing Tests

### describe Blocks

Group related tests together:

```js
describe('sum', () => {
  test('adds positive numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('adds negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3)
  })
})
```

### Setup and Teardown

Extract common setup logic:

```js
describe('UserService', () => {
  let users

  beforeEach(() => {
    // Runs before each test - fresh data every time
    users = [
      { id: 1, name: 'Luke' },
      { id: 2, name: 'Leia' }
    ]
  })

  afterEach(() => {
    // Runs after each test - cleanup
  })

  test('finds user by id', () => {
    const user = users.find(u => u.id === 1)
    expect(user.name).toBe('Luke')
  })
})
```

## Mocking

Mocking lets you replace real implementations with controlled substitutes. This
is essential for isolating the code you're testing.

### Mock Functions

```js
const mockCallback = jest.fn(x => x + 1)

mockCallback(5)

expect(mockCallback).toHaveBeenCalledWith(5)
expect(mockCallback).toHaveBeenCalledTimes(1)
expect(mockCallback.mock.results[0].value).toBe(6)
```

### Mocking API Calls

When testing code that makes HTTP requests, you don't want to hit the real API:

```js
// userService.js
const fetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// userService.test.js
global.fetch = jest.fn()

test('fetches user successfully', async () => {
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'Luke' })
  })

  const user = await fetchUser(1)

  expect(user.name).toBe('Luke')
  expect(fetch).toHaveBeenCalledWith('/api/users/1')
})

test('handles fetch error', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  await expect(fetchUser(1)).rejects.toThrow('Network error')
})
```

Note: `mockResolvedValueOnce` only returns that value for the first call. Use
`mockResolvedValue` for all calls. Read
[Stop Mocking Fetch][stop-mocking-fetch] for deeper patterns.

### Mocking Modules

```js
jest.mock('./database', () => ({
  getUser: jest.fn().mockResolvedValue({ id: 1, name: 'Luke' })
}))
```

## Snapshot Testing

Snapshots capture the output of a component or function and compare it against
future runs. Useful for detecting unintended changes:

```js
test('renders correctly', () => {
  const tree = renderer.create(<Button label="Click me" />).toJSON()
  expect(tree).toMatchSnapshot()
})
```

On the first run, Jest creates a snapshot file. On subsequent runs, it compares
the output. If the change is intentional, update the snapshot with:

```bash
npm test -- --updateSnapshot
```

## What to Test

Not everything needs a test. Focus on:

- **Business logic** - functions that make decisions
- **User interactions** - what happens when a user clicks, types, submits
- **Edge cases** - empty inputs, large numbers, special characters
- **Error handling** - what happens when things go wrong

Don't test:

- Implementation details (test behavior, not how it's coded)
- Third-party libraries (they have their own tests)
- Trivial code (simple getters/setters)

Read [How to Know What to Test][what-to-test] for a thorough guide.

## Testing Best Practices

- **Write tests first** (TDD) or immediately after writing code
- **Each test should be independent** - don't rely on test execution order
- **Test behavior, not implementation** - tests shouldn't break when you refactor
- **Keep tests simple** - if a test is hard to understand, it's a bad test
- **Use descriptive names** - `test('returns error when email is empty')` not `test('test 1')`

[testing-trophy]: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
[what-to-test]: https://kentcdodds.com/blog/how-to-know-what-to-test
[stop-mocking-fetch]: https://kentcdodds.com/blog/stop-mocking-fetch
