# Authentication API Documentation

## User Registration

**Purpose**: Register a new user in the system with name, email, and password.

### POST /api/auth/signup

#### Request Body

| Field    | Type   | Validation Rules                                  |
| -------- | ------ | ------------------------------------------------- |
| name     | string | Required, non-empty                               |
| email    | string | Required, valid email, length: 4-32 characters    |
| password | string | Required, min 6 characters, must contain a number |

#### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Success Response (201 Created)

```json
{
  "message": "User created successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": 0,
    "history": [],
    "createdAt": "2023-12-25T10:00:00.000Z",
    "updatedAt": "2023-12-25T10:00:00.000Z"
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Email already exists"
}
```

## User Login

**Purpose**: Authenticate a user and provide a JWT token.

### POST /api/auth/signin

#### Request Body

| Field    | Type   | Validation Rules                                  |
| -------- | ------ | ------------------------------------------------- |
| email    | string | Required, valid email, length: 4-32 characters    |
| password | string | Required, min 6 characters, must contain a number |

#### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Success Response (200 OK)

```json
{
  "message": "User Logged in successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Email and password don't match"
}
```

## User Logout

**Purpose**: Invalidate user's token and end the session.

### POST /api/auth/signout

Requires authentication token in cookie.

#### Success Response (200 OK)

```json
{
  "message": "Logout successful!"
}
```

#### Error Response (400 Bad Request)

```json
{
  "message": "Token not found!"
}
```

## Status Codes

| Code | Description                                           |
| ---- | ----------------------------------------------------- |
| 200  | Operation successful                                  |
| 201  | Resource created successfully                         |
| 400  | Bad request (validation error or invalid credentials) |
| 500  | Internal server error                                 |

## Authentication Notes

- Successful login sets a JWT token in cookies
- Token expiration: 24 hours
- Logout blacklists the token using Redis
- All protected routes require a valid JWT token
