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

## Create Products

**Purpose**: Create a new product with image upload support.

### POST /api/products/create

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
  'http://your-api/api/products/create' \
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

## Get All Products

**Purpose**: Retrieve a list of all products available in the system.

### GET /api/products/product

Requires authentication.

#### Example Request

```bash
curl -X GET \
  'http://your-api/api/products' \
  -H 'Authorization: Bearer your-token'
```

#### Success Response (200 OK)

```json
{
  "message": "Products list fetched successfully!",
  "products": [
    {
      "_id": "60c72b2f9b1d8c001c8e4b8e",
      "name": "Product Name",
      "price": 99.99,
      "description": "Product description",
      "category": {
        "_id": "categoryId",
        "name": "Category Name"
      },
      "stock": 100,
      "shipping": true,
      "sold": 0,
      "createdAt": "2023-12-25T10:00:00.000Z",
      "updatedAt": "2023-12-25T10:00:00.000Z"
    },
    {
      "_id": "60c72b2f9b1d8c001c8e4b8f",
      "name": "Another Product",
      "price": 49.99,
      "description": "Another product description",
      "category": {
        "_id": "categoryId2",
        "name": "Category 2"
      },
      "stock": 50,
      "shipping": false,
      "sold": 10,
      "createdAt": "2023-12-26T10:00:00.000Z",
      "updatedAt": "2023-12-26T10:00:00.000Z"
    }
  ]
}
```

#### Error Responses

**401 Unauthorized**

```json
{
  "message": "Access denied. No token provided."
}
```

**500 Internal Server Error**

```json
{
  "message": "An error occurred while fetching products."
}
```

#### Notes

- Authentication token must be included in the request header
- The response includes all products except for the images, as images are excluded with .select("-images").
- The response includes category details for each product through .populate("category").

// ...existing code...

## Get Product By ID

**Purpose**: Retrieve detailed information about a specific product.

### GET /api/products/get-by-id/:id

Requires authentication.

#### URL Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| id        | string | MongoDB ObjectId of product |

#### Example Request

```bash
curl -X GET \
  'http://your-api/api/products/60c72b2f9b1d8c001c8e4b8e' \
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

### PUT /api/products/update/:id

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
  'http://your-api/api/products/60c72b2f9b1d8c001c8e4b8e' \
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

**Purpose**: Remove a products from the database.

### DELETE /api/products/delete/:id

Requires authentication and admin privileges.

#### URL Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| id        | string | MongoDB ObjectId of product |

#### Example Request

```bash
curl -X DELETE \
  'http://your-api/api/products/60c72b2f9b1d8c001c8e4b8e' \
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

// ...existing code...

### Show Product Image

Get the image associated with a specific product.

**Endpoint:** `GET /api/products/images/:id`

**Authentication Required:** Yes

**Parameters:**

- `id`: Product ID (required)

**Response:**

- Success (200): Returns the image binary data with appropriate content type
- Error (404): Returns when product or image is not found
  ```json
  {
    "message": "Product not found."
  }
  ```
  or
  ```json
  {
    "message": "Photo not found."
  }
  ```
- Error (500): Returns when server error occurs

**Example Usage:**

```javascript
// Using fetch API
const response = await axios.get("http://your-api/api/products/images/12345", {
  headers: {
    Authorization: "Bearer your-auth-token",
  },
});

if (response.ok) {
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  // Use imageUrl in an img tag or as needed
}
```

// ...existing code...

# Categories API Documentation

## Create Category

**Purpose**: Create a new product category.

### POST /api/categories/create

Requires authentication and admin privileges.

#### Request Body

| Field | Type   | Validation Rules                 |
| ----- | ------ | -------------------------------- |
| name  | string | Required, unique, max length: 32 |

#### Example Request

```json
{
  "name": "Electronics"
}
```

#### Success Response (201 Created)

```json
{
  "message": "Category created successfully",
  "category": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "name": "Electronics",
    "createdAt": "2023-12-25T10:00:00.000Z",
    "updatedAt": "2023-12-25T10:00:00.000Z"
  }
}
```

## Get All Categories

**Purpose**: Retrieve a list of all product categories.

### GET /api/categories/category

Requires authentication.

#### Success Response (200 OK)

```json
{
  "message": "Category found",
  "categories": [
    {
      "_id": "60c72b2f9b1d8c001c8e4b8e",
      "name": "Electronics",
      "createdAt": "2023-12-25T10:00:00.000Z",
      "updatedAt": "2023-12-25T10:00:00.000Z"
    }
    // ... more categories
  ]
}
```

## Update Category

**Purpose**: Update an existing category's name.

### PUT /api/categories/update/:id

Requires authentication and admin privileges.

#### URL Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| id        | string | MongoDB ObjectId of category |

#### Request Body

```json
{
  "name": "Updated Category Name"
}
```

#### Success Response (200 OK)

```json
{
  "message": "Category updated successfully",
  "categories": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "name": "Updated Category Name",
    "updatedAt": "2023-12-25T11:00:00.000Z"
  }
}
```

## Delete Category

**Purpose**: Remove a category from the database.

### DELETE /api/categories/delete/:id

Requires authentication and admin privileges.

#### URL Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| id        | string | MongoDB ObjectId of category |

#### Success Response (200 OK)

```json
{
  "message": "Category deleted successfully"
}
```

#### Error Responses (Common to all Category endpoints)

**400 Bad Request**

```json
{
  "message": "Category not found"
}
```

or

```json
{
  "message": "Category already exists"
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

- All category operations require authentication
- Create, Update, and Delete operations require admin privileges
- Category names must be unique
- Maximum length for category name is 32 characters
- Category operations are important as they are referenced in products

# User API Documentation

## Get User by ID

Retrieve user information by their ID.

### Endpoint

```
GET /api/users/get-by-id/:id
```

### Authentication

- Requires valid JWT token in Authorization header
- Only authenticated users can access their own information

### Success Response

**Status:** 200 OK

```json
{
  "message": "User found",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Error Responses

**Status:** 400 Bad Request

```json
{
  "error": "User not found"
}
```

**Status:** 401 Unauthorized

```json
{
  "error": "Authentication required"
}
```

## Update User

Update user information.

### Endpoint

```
PUT /api/users/update/:id
```

### Authentication

- Requires valid JWT token in Authorization header
- Users can only update their own information

### Request Body

```json
{
  "name": "string",
  "email": "string"
}
```

### Success Response

**Status:** 200 OK

```json
{
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Error Responses

**Status:** 400 Bad Request

```json
{
  "error": "User not found"
}
```

**Status:** 401 Unauthorized

```json
{
  "error": "Authentication required"
}
```

### Status Codes

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request or user not found
- `401 Unauthorized`: Missing or invalid authentication token
- `500 Internal Server Error`: Server error

## Create Order

**Purpose**: Create a new order for the authenticated user.

### POST /api/orders/create

Requires authentication.

#### Request Body

| Field         | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| products      | array  | Array of product objects     |
| transactionId | string | Transaction ID for the order |
| amount        | number | Total amount for the order   |

#### Example Request

```json
{
  "products": [
    {
      "_id": "product_id_1",
      "name": "Product 1",
      "description": "Description of Product 1",
      "stock": 2
    },
    {
      "_id": "product_id_2",
      "name": "Product 2",
      "description": "Description of Product 2",
      "stock": 1
    }
  ],
  "transactionId": "txn_123456",
  "amount": 150.0
}
```

#### Success Response (201 Created)

```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "order_id",
    "products": ["product_id_1", "product_id_2"],
    "user": "user_id",
    "transaction_id": "txn_123456",
    "amount": 150.0,
    "status": "Not processed",
    "createdAt": "2023-12-25T10:00:00.000Z",
    "updatedAt": "2023-12-25T10:00:00.000Z"
  },
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "history": [
      {
        "_id": "product_id_1",
        "name": "Product 1",
        "description": "Description of Product 1",
        "stock": 2,
        "transactionId": "txn_123456",
        "amount": 150.0
      },
      {
        "_id": "product_id_2",
        "name": "Product 2",
        "description": "Description of Product 2",
        "stock": 1,
        "transactionId": "txn_123456",
        "amount": 150.0
      }
    ],

    "createdAt": "2023-12-25T10:00:00.000Z",
    "updatedAt": "2023-12-25T10:00:00.000Z"
  },
  "productUpdates": {
    "n": 2,
    "nModified": 2,
    "ok": 1
  }
}
```

#### Error Responses

**401 Unauthorized**

```json
{
  "message": "Unauthorized! Token missing."
}
```

**500 Internal Server Error**

```json
{
  "message": "Error in createOrder: error_message"
}
```

## Get All Orders

**Purpose**: Retrieve a list of all orders. Admin access required.

### GET /api/orders/all-order-list

Requires authentication and admin privileges.

#### Success Response (200 OK)

```json
{
  "message": "All order list read",
  "list": [
    {
      "_id": "order_id_1",
      "products": [
        {
          "_id": "product_id_1",
          "name": "Product 1",
          "price": 50.0,
          "quantity": 2
        },
        {
          "_id": "product_id_2",
          "name": "Product 2",
          "price": 50.0,
          "quantity": 1
        }
      ],
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "address": "123 Main St"
      },
      "transaction_id": "txn_123456",
      "amount": 150.0,
      "status": "Not processed",
      "createdAt": "2023-12-25T10:00:00.000Z",
      "updatedAt": "2023-12-25T10:00:00.000Z"
    }
    // ... more orders
  ]
}
```

#### Error Responses

**401 Unauthorized**

```json
{
  "message": "Unauthorized! Token missing."
}
```

**403 Forbidden**

```json
{
  "message": "Forbidden! Admin access required."
}
```

**500 Internal Server Error**

```json
{
  "message": "Error in allOrderList: error_message"
}
```

# Braintree Payment API Documentation

## Generate Client Token

**Purpose**: Generate a client token for initializing the Braintree SDK on the frontend.

### GET /api/braintree/generate_token

#### Authentication

- Requires valid JWT token
- Uses `authMiddleware`

#### Success Response (200 OK)

```json
{
  "clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJ7....",
  "success": true
}
```

#### Error Response (401 Unauthorized)

```json
{
  "message": "Unauthorized! Token missing."
}
```

## Process Payment

**Purpose**: Process a payment transaction using Braintree payment gateway.

### POST /api/braintree/payment

#### Authentication

- Requires valid JWT token
- Uses

authMiddleware

#### Request Body

| Field              | Type   | Description                                |
| ------------------ | ------ | ------------------------------------------ |
| paymentMethodNonce | string | Payment method nonce from Braintree client |
| amount             | number | Transaction amount                         |

#### Example Request

```json
{
  "paymentMethodNonce": "fake-valid-nonce",
  "amount": "99.99"
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "transactionId": "q2x4v8z9",
  "amount": "99.99",
  "message": "Payment processed successfully!"
}
```

#### Error Responses

**401 Unauthorized**

```json
{
  "message": "Unauthorized! Token missing."
}
```

**500 Internal Server Error**

```json
{
  "success": false,
  "message": "Payment processing failed."
}
```

#### Notes

- All amounts should be provided as strings or numbers with up to 2 decimal places
- Payment method nonce is generated on the client side using Braintree SDK
- Transactions are automatically submitted for settlement
- Uses Braintree Sandbox environment for testing

```

```
