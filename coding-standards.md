# Code Standards Guidelines

## General Guidelines
- Prefer declarative, functional style throughout the codebase.
- Use arrow functions.
- Prefer `const` and `let`.
- Keep variable and method names consistent and relevant to their purpose.
- Avoid unnecessary coercion.
- Keep data immutable.
- Prefer spread operators.
- Prefer native JavaScript methods, avoid adding packages such as lodash.
- View layer files, stylesheets, and tests centered around a single feature are kept together in named component folders.
- Controller layer files are kept together by type such as actions and reducers, as are other files such as visual assets, global styles, and application-wide utilities.

---

## Component Guidelines

- Each component has an `index.js` that exports the container component.
- Each component folder contains the container, components, stylesheets, and tests for that component.

---

## Stateless Component

### Structure

- Imports
  - React
  - react-router-dom
  - other required packages
  - required components
  - stylesheets
- Package setups
  - Font Awesome
- Export named component class or const

## Notes on style

- Test IDs should be applied as needed.
- Stateless components are named exports.

Forms
- Use InputField when possible.
- Labels require htmlFor and should not enclose InputField.
- Selects use onBlur.

Attribute order
- href
- data-testid
- name
- id
- type
- role
- list
- datalist
- placeholder
- value
- disabled
- classname
- aria label
- onChange/onBlur/onClick

---

## Container Component

### Structure

- Imports
  - React
  - Redux
  - Action creators
  - Stateless component
- Class
  - State
  - Other data
  - Form handlers
  - Other custom methods
  - Lifecycle methods
  - Render
  - mapStateToProps
  - mapDispatchToProps
  - Export connected component
  - Export unconnected component for testing

### Notes on style

- Handlers start with `handle`.
- The class is exported as default at the bottom of the file.
- Keep the order of props passed to a component the same as state or passed in props. They don't have to be alphbetical, just consistent.
- If mapDispatchToProps has only one function name, the object should be inside `connect`, otherwise set it as a `const` above the export.

Component props order
- Data props
- Handlers

---

## Actions

### Structure

- Exported action
- Helper functions
- All actions object
- Export all actions object

### Notes on style

- Each action is a named export arrow function
- API calls occur as part of the actions
- Actions are added to a default action object and exported for testing purposes.

---

## Reducers

### Structure
- Initial state
- Exported reducer

### Notes on style

- All Reducers have an `initialState` variable unless the initial state is a single value.
- Reducers are exported as the default without a separate export statement.
- Prefer anonymous, declared functions, not named arrow functions.
- Use switch/case statements.
- Always include a `default` case that returns the current state.

---

## Testing Guidelines

- Test data and utilities are stored in the `test` folder.
- Use fixtures for data unless it is a small amount (less than 20 lines) of single-use data.
- Prefer reusable test data and utilities.
- Tests exist alongside the elements they are testing.

## Tests

### Structure

- Imports
  - React
  - React Testing Library
  - Other required packages & libraries
  - testUtils
  - routerTestUtils
  - data fixtures
  - connected container component
  - unconnected container component
- Constants
- Mock Functions
- Variables for beforeEach
- Describe blocks
  - test
    - variables (including spies)
    - store.dispatch
    - fireEvent
    - expect

### Notes on style

- Data fixtures are not aliased to variables unless needed for mocking purposes.
- First describe block is the basic render of the component with the connected store or a test that the function or object being tests exists.
- Second describe block is basic interactions.
- All other tests come after the first two.
- Multiple expects are acceptable in a single test as long as they are all related to the same functionality and relevant to the test.