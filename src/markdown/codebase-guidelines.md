# Codebase Guidelines

## Project Structure

The application follows a feature-based structure within the Next.js app router pattern:

## General

- Use the `src` directory for all source code.
- Use the `public` directory for all static assets.

## Project Structure

The application follows a feature-based structure within the Next.js app router pattern.

Example for a simple user management feature:
```
src/app/(admin-sample)/
├── users/                      # User management feature
│   ├── actions/                # Server actions
│   │   └── user.actions.ts     # User CRUD operations
│   ├── [id]/                   # Edit user page
│   │   ├── EditUser.tsx        # Edit user component
│   │   ├── use-edit-user.tsx   # Edit user logic hook
│   │   └── page.tsx            # Edit user page component
│   ├── create/                 # Create user page
│   │   ├── CreateUser.tsx      # Create user component
│   │   ├── use-create-user.tsx # Create user logic hook
│   │   └── page.tsx            # Create user page component
│   ├── UserTable.tsx           # User table component
│   ├── use-users.tsx           # Users context and hook
│   ├── users.helper.ts         # User validation schemas
│   └── page.tsx                # Users list page
└── components/                 # Shared admin components
    └── PageTitle/              # Page title component
```

## Key Technologies

- Next.js: App Router for server and client components
- React: Client-side UI components
- Prisma: Database ORM for user management
- TanStack Table: Data table management
- React Hook Form: Form handling
- Zod: Schema validation
- NextAuth: Authentication

## Data Flow

- Server components fetch data using server actions
- Data is passed to client components via context providers
- Client components use custom hooks to manage state and UI logic
- Form submissions trigger server actions to update data

## Component Architecture

- Context Pattern

The application uses a custom context pattern for state management:

```
// Example from use-users.tsx
const [useUsers, UsersProvider] = createAppContext(useHook);
```

This pattern allows:

- Separation of data fetching and UI rendering
- Sharing state between components
- Type-safe context usage

## Page Structure

Each page follows a consistent pattern:

- Server component fetches data
- Data is passed to a provider component
- Client components consume the provider data

Example:
```
// From users/page.tsx
return (
  <UsersProvider usersData={users}>
    <PageTitle title={"Users"} breadcrumbs={[{ label: "Users", active: true }]} />
    <div className="mt-5">
      <UserTable />
    </div>
  </UsersProvider>
);
```

## Form Handling

Forms use React Hook Form with Zod validation:

1. Define zod schemas inside a `.helper.ts` file
2. Generate typescript types from the schemas
3. Use schemas in form hooks
4. Handle form submission with server actions

## Table Management

Tables use TanStack Table with these features:

- Pagination
- Sorting
- Row selection
- Filtering/search

## Server Actions

Server actions handle data operations:

- every server action is protected by the `useIsAuthenticated` hook
- example requests for user actions:
  * getUsers(): Fetch all users
  * getUser(id): Fetch a single user
  * createUser(user): Create a new user

All server actions return a standardized Response type:
```
{
  status: "success" | "error",
  data: T | undefined,
  code: number,
  errors: string | undefined
}
```

## UI Components

The application uses shadcn/ui library. Form components are pre configures:

- form-input.tsx
- form-select.tsx
- form-switch.tsx
- form-checkbox.tsx
- form-password.tsx
- form-radio.tsx
- form-textarea.tsx
- form-combobox.tsx

## Development Guidelines

### State Management:

- Use the context pattern for shared state
- Keep form state in React Hook Form
- Use local state for UI-specific concerns

### Data Fetching:

- Use server actions for data operations
- Handle loading and error states
- Revalidate paths after mutations

### Form Validation:

- Define schemas in helper files
- Use Zod for validation
- Provide clear error messages

### Component Design:

- Keep components focused on a single responsibility
- Separate business logic from UI with custom hooks
- Use TypeScript for type safety

### Routing:

- Follow Next.js App Router conventions
- Use dynamic routes for entity pages
- Define routes in a central location
- ever page is protected by adding it to the `middleware.ts` file matcher config

### Adding New Features:

- Create appropriate server actions
- Define validation schemas if needed
- Create page components with proper data fetching
- Implement UI components with proper hooks
- Add routing and navigation links
