# Simple User Authentication API

A TypeScript Express API with comprehensive testing using Vitest/supertest/jest, focusing on user authentication endpoints with Zod validation and Prisma ORM.

## 🧪 Testing-First Approach

This project is built with a testing-first mindset, featuring:

- **Vitest** for fast unit testing
- **Supertest** for HTTP endpoint testing
- **Mock database** for isolated tests
- **Zod validation** testing for input sanitization

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run tests (this is the primary way to verify functionality)
npm test

# Build the project
npm run build

# Start development server
npm run dev
```

## 🧪 Test Coverage

### Signup Endpoint Tests

- **Valid signup**: Tests successful user creation with valid data
- **Invalid input**: Tests Zod validation failure with invalid data types
- **Database mocking**: Uses mocked Prisma client for isolated testing

### Test Files

- `src/test/index.test.ts`: Main test suite covering all endpoints
- `src/__mock__/db.ts`: Mock database setup for testing

## 📋 API Endpoints

### POST /signup

**Tested behavior:**

- ✅ Creates user with valid name/password (3-20 chars, 8-20 chars)
- ✅ Returns success message with username
- ✅ Validates input with Zod schema
- ❌ Rejects invalid input with 400 status

**Request:**

```json
{
  "name": "John",
  "password": "123456789"
}
```

**Response (200):**

```json
{
  "message": "User John signed up successfully!"
}
```

**Response (400):**

```json
{
  "message": "Invalid Request"
}
```

### POST /login

**Current behavior:** Identical to signup (creates user instead of authenticating)

**Request:**

```json
{
  "name": "John",
  "password": "123456789"
}
```

**Response (200):**

```json
{
  "message": "User John logged in successfully!"
}
```

## 🏗️ Architecture

### Validation Schema

```typescript
const signupSchema = z.object({
  name: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});
```

### Database Schema

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  password String
}
```

### Test Setup

- **Mocking**: Prisma client is mocked using `vi.mock()`
- **Isolation**: Each test runs with fresh mock data
- **Assertions**: Tests verify both HTTP responses and database calls

## 🔄 Development Workflow

1. **Write tests first** in `src/test/index.test.ts`
2. **Implement features** to make tests pass
3. **Run tests**: `npm test`
4. **Build**: `npm run build`

## 📝 Notes

- **Current limitation**: Login endpoint creates users instead of authenticating (evident from test structure)
- **Database**: Uses PostgreSQL with Prisma ORM
- **Validation**: Strict Zod schema validation on all inputs
- **Testing**: Comprehensive test suite with mocked database layer

## 🐛 Known Issues

- Login endpoint currently behaves like signup (creates users)
- No actual authentication logic implemented
- Passwords stored as plain text (security concern)
