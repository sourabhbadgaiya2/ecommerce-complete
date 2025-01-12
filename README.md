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

# Product API Documentation

## Create Product

**Purpose**: Create a new product with image upload support.

### POST /api/product/create

Requires authentication and admin privileges.

#### Request Body (multipart/form-data)

| Field       | Type    | Validation Rules                      |
| ----------- | ------- | ------------------------------------- |
| name        | string  | Required, max length: 32 characters   |
| price       | number  | Required                              |
| description | string  | Required, max length: 2000 characters |
| category    | string  | Required (Category ObjectId)          |
| stock       | number  | Required                              |
| shipping    | boolean | Optional                              |
| images      | file    | Required                              |

#### Example Request

```bash
curl -X POST \
  'http://your-api/api/product/create' \
  -H 'Authorization: Bearer your-token' \
  -F 'name=Product Name' \
  -F 'price=99.99' \
  -F 'description=Product description' \
  -F 'category=categoryId' \
  -F 'stock=100' \
  -F 'shipping=true' \
  -F 'images=@/path/to/image.jpg'
```

#### Success Response (200 OK)

```json
{
  "message": "Form data and image uploaded successfully",
  "product": {
    "_id": "product_id",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "category": "categoryId",
    "stock": 100,
    "shipping": true,
    "images": {
      "data": "binary_data",
      "contentType": "image/jpeg"
    },
    "sold": 0,
    "createdAt": "2023-12-25T10:00:00.000Z",
    "updatedAt": "2023-12-25T10:00:00.000Z"
  }
}
```

#### Error Responses

**400 Bad Request**

```json
{
  "message": "Error parsing the form"
}
```

**400 Bad Request - Missing Image**

```json
{
  "message": "No image uploaded or invalid file path"
}
```

**401 Unauthorized**

```json
{
  "message": "Access denied. No token provided."
}
```

**403 Forbidden**

```json
{
  "message": "Admin resource! Access denied."
}
```

#### Notes

- Request must be sent as `multipart/form-data`
- Authentication token must be included in the request header
- Only admin users can create products
- Supported image formats: JPEG, PNG
- All fields except shipping are required

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
  // ...existing code...

## Get Product By ID

**Purpose**: Retrieve detailed information about a specific product.

### GET /api/product/:id

Requires authentication.

#### URL Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| id        | string | MongoDB ObjectId of product |

#### Example Request

```bash
curl -X GET \
  'http://your-api/api/product/60c72b2f9b1d8c001c8e4b8e' \
  -H 'Authorization: Bearer your-token'
```

#### Success Response (200 OK)

```json
{
  "message": "Product retrieved successfully.",
  "product": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "category": "categoryId",
    "stock": 100,
    "shipping": true,
    "images": {
      "data": "binary_data",
      "contentType": "image/jpeg"
    },
    "sold": 0,
    "createdAt": "2023-12-25T10:00:00.000Z",
    "updatedAt": "2023-12-25T10:00:00.000Z"
  }
}
```

#### Error Responses

**404 Not Found**

```json
{
  "message": "Product not found. Please check the product ID and try again."
}
```

**401 Unauthorized**

```json
{
  "message": "Access denied. No token provided."
}
```

#### Notes

- Authentication token must be included in the request header
- The product ID must be a valid MongoDB ObjectId
- The response includes complete product details including image data

// ...existing code...

## Update Product

**Purpose**: Update an existing product's information and/or image.

### PUT /api/product/:id

Requires authentication and admin privileges.

#### URL Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| id        | string | MongoDB ObjectId of product |

#### Request Body (multipart/form-data)

| Field       | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| name        | string  | Optional, max length: 32 characters   |
| price       | number  | Optional                              |
| description | string  | Optional, max length: 2000 characters |
| category    | string  | Optional (Category ObjectId)          |
| stock       | number  | Optional                              |
| shipping    | boolean | Optional                              |
| images      | file    | Optional                              |

#### Example Request

```bash
curl -X PUT \
  'http://your-api/api/product/60c72b2f9b1d8c001c8e4b8e' \
  -H 'Authorization: Bearer your-token' \
  -F 'price=199.99' \
  -F 'stock=50'
```

#### Success Response (200 OK)

```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "name": "Product Name",
    "price": 199.99,
    "stock": 50,
    "description": "Product description",
    "category": "categoryId",
    "shipping": true,
    "images": {
      "data": "binary_data",
      "contentType": "image/jpeg"
    },
    "sold": 0,
    "updatedAt": "2023-12-25T11:00:00.000Z"
  }
}
```

## Delete Product

**Purpose**: Remove a product from the database.

### DELETE /api/product/:id

Requires authentication and admin privileges.

#### URL Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| id        | string | MongoDB ObjectId of product |

#### Example Request

```bash
curl -X DELETE \
  'http://your-api/api/product/60c72b2f9b1d8c001c8e4b8e' \
  -H 'Authorization: Bearer your-token'
```

#### Success Response (200 OK)

```json
{
  "message": "Product Deleted successfully."
}
```

#### Error Responses (for both Update and Delete)

**404 Not Found**

```json
{
  "message": "Product not found. Please check the product ID and try again."
}
```

**401 Unauthorized**

```json
{
  "message": "Access denied. No token provided."
}
```

**403 Forbidden**

```json
{
  "message": "Admin resource! Access denied."
}
```

**500 Internal Server Error**

```json
{
  "message": "Server error"
}
```

#### Notes

- Only admin users can update or delete products
- For updates, only include fields that need to be changed
- Image update is optional during product update
- All delete operations are permanent and cannot be undone
