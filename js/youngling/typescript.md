# TypeScript Basics

> "Always pass on what you have learned."
> ―Yoda

TypeScript is a strongly typed programming language that builds on JavaScript,
giving you better tooling at any scale. It catches errors before runtime and
makes your code more maintainable.

## Helpful links

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

## Prerequisites

- Basic JavaScript knowledge
- Understanding of variables, functions, and objects

## Why TypeScript?

JavaScript is dynamically typed - you can pass any value to any function. This
flexibility is powerful but error-prone:

```js
function add(a, b) {
  return a + b
}

add(1, 2)        // 3
add("1", "2")    // "12" - probably not what you wanted!
```

TypeScript adds types to prevent these issues:

```ts
function add(a: number, b: number): number {
  return a + b
}

add(1, 2)        // 3
add("1", "2")    // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

## Basic Types

### Primitives

```ts
let name: string = "Luke"
let age: number = 23
let isJedi: boolean = true
let nothing: null = null
let notDefined: undefined = undefined
```

TypeScript can often infer types automatically:

```ts
let name = "Luke" // TypeScript knows this is a string
```

### Arrays

```ts
let numbers: number[] = [1, 2, 3]
let names: Array<string> = ["Luke", "Leia"]
```

### Objects

```ts
let user: { name: string; age: number } = {
  name: "Luke",
  age: 23
}
```

### Functions

```ts
function greet(name: string): string {
  return `Hello, ${name}`
}

const add = (a: number, b: number): number => a + b

// Void for functions that don't return anything
function log(message: string): void {
  console.log(message)
}
```

## Interfaces and Types

### Interfaces

Interfaces define the shape of objects:

```ts
interface User {
  id: number
  name: string
  email?: string // Optional property (?)
  readonly createdAt: Date // Cannot be changed after creation
}

const user: User = {
  id: 1,
  name: "Luke",
  createdAt: new Date()
}

// user.createdAt = new Date() // Error: Cannot assign to 'createdAt' because it is a read-only property
```

### Type Aliases

Type aliases create custom types:

```ts
type ID = string | number // Union type - can be string OR number

type Status = "pending" | "active" | "inactive" // Literal types

type Point = {
  x: number
  y: number
}

const userId: ID = 123
const status: Status = "active"
```

### When to Use Interface vs Type?

- Use **interface** for object shapes, especially when defining public APIs
- Use **type** for unions, primitives, and complex types
- Both can be extended, so the choice often comes down to preference

## Generics

Generics let you write reusable code that works with multiple types:

```ts
function identity<T>(value: T): T {
  return value
}

identity<string>("Luke")  // Returns string
identity<number>(42)      // Returns number
identity("Leia")          // TypeScript infers the type

// Generic interfaces
interface Box<T> {
  value: T
}

const stringBox: Box<string> = { value: "lightsaber" }
const numberBox: Box<number> = { value: 42 }
```

## Setting Up TypeScript

Install TypeScript:

```bash
npm install --save-dev typescript
```

Initialize a TypeScript configuration:

```bash
npx tsc --init
```

This creates `tsconfig.json`. Important settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

Compile TypeScript to JavaScript:

```bash
npx tsc
```

## Testing with TypeScript

Install types for Jest:

```bash
npm install --save-dev @types/jest typescript ts-jest
```

Configure Jest for TypeScript in `jest.config.js`:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
}
```

Write typed tests:

```ts
// math.ts
export const sum = (a: number, b: number): number => a + b

// math.test.ts
import { sum } from './math'

test('adds numbers', () => {
  expect(sum(1, 2)).toBe(3)
})
```

TypeScript catches type errors at compile time, before tests even run!

## Trial

Build a typed task manager. Create the following:

1. Define a `Task` interface with:
   - `id` (number)
   - `title` (string)
   - `completed` (boolean)
   - `priority` (union type: "low" | "medium" | "high")

2. Create functions with proper types:
   - `createTask(title: string, priority: Priority): Task` - generates a new task
   - `toggleTask(task: Task): Task` - toggles completed status
   - `filterByPriority(tasks: Task[], priority: Priority): Task[]` - filters tasks

3. Write tests for these functions using TypeScript

4. Compile and run your code without type errors

**Badge**: Type Master

[Next: Testing →](testing.md)

[← Back to Introduction](introduction.md)
