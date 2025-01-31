# 🛍️ E-Commerce Frontend

This is the **frontend** for an **eCommerce** web application built with **React.js**, **Redux**, **Axios**, and **Tailwind CSS**. It connects to a backend running on `http://localhost:3000`.

---

## 🚀 Features

### **🔐 Authentication**

- User login & registration
- Protected routes using `react-router-dom`
- Client-side validation for secure authentication
- **Forgot Password:** Users can request a password reset link via email

### **🛒 Product Pages**

- Homepage with product listing
- Product details page
- Search & filter functionality

### **🛍️ Cart & Checkout**

- Shopping cart system using Redux
- Payment processing via **Braintree**

### **🛠️ Admin Dashboard**

- **Category Management**  
  ✅ Add New Categories  
  ✅ Update Existing Categories  
  ✅ Delete Categories  
  ✅ View Category List

- **Product Management**  
  ✅ Add New Products  
  ✅ Update Existing Products  
  ✅ Delete Products  
  ✅ View Product List

- **Order Management**  
  ✅ View All Orders  
  ✅ Update Order Status

### **👤 User Dashboard**

- ✅ **Profile Management:** Users can update their name, email, and password
- ✅ **Purchase History:** Users can see their past orders and order details
- ✅ **Order Tracking:** Track current orders with status updates

### **🔑 Forgot Password**

- ✅ **Request Reset Link:** Users can request a password reset link via email
- ✅ **Reset Password:** Users can change their password using the link sent to their email

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, Axios, Tailwind CSS
- **State Management:** Redux Toolkit
- **API Calls:** Axios
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Token)
- **Password Reset:** Email-based reset via backend
- **Payment Gateway:** Braintree

---

## 📂 Folder Structure

```
📦 clients
 ┣ 📂 public
 ┃ ┗ 📜 logoo.jpeg
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┣ 📂 config
 ┃ ┣ 📂 helpers
 ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📂 admin
 ┃ ┃ ┃ ┣ 📜 useAddCategory.js
 ┃ ┃ ┃ ┣ 📜 useUpdateCategory.js
 ┃ ┃ ┃ ┣ 📜 useDeleteCategory.js
 ┃ ┃ ┃ ┣ 📜 useAddProduct.js
 ┃ ┃ ┃ ┣ 📜 useUpdateProduct.js
 ┃ ┃ ┃ ┣ 📜 useDeleteProduct.js
 ┃ ┃ ┃ ┣ 📜 useAllOrderList.js
 ┃ ┃ ┣ 📂 user
 ┃ ┃ ┃ ┣ 📜 useProfileUpdate.js
 ┃ ┃ ┃ ┣ 📜 usePurchaseHistory.js
 ┃ ┃ ┃ ┗ 📜 useOrderTracking.js
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┣ 📜 useSignup.js
 ┃ ┃ ┃ ┣ 📜 useSignin.js
 ┃ ┃ ┃ ┣ 📜 useForgetPassword.js
 ┃ ┃ ┃ ┗ 📜 useResetPassword.js
 ┃ ┃ ┣ 📂 braintree
 ┃ ┃ ┣ 📂 order
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 Admin
 ┃ ┃ ┃ ┣ 📜 AddCategory.jsx
 ┃ ┃ ┃ ┣ 📜 UpdateCategory.jsx
 ┃ ┃ ┃ ┣ 📜 ManageCategory.jsx
 ┃ ┃ ┃ ┣ 📜 AddProduct.jsx
 ┃ ┃ ┃ ┣ 📜 UpdateProduct.jsx
 ┃ ┃ ┃ ┣ 📜 DeleteProduct.jsx
 ┃ ┃ ┃ ┣ 📜 AdminDashboard.jsx
 ┃ ┃ ┃ ┣ 📜 AllOrder.jsx
 ┃ ┃ ┃ ┗ 📜 OrderDetails.jsx
 ┃ ┃ ┣ 📂 User
 ┃ ┃ ┃ ┣ 📜 UserDashboard.jsx
 ┃ ┃ ┃ ┣ 📜 ProfileUpdate.jsx
 ┃ ┃ ┃ ┣ 📜 PurchaseHistory.jsx
 ┃ ┃ ┃ ┗ 📜 OrderTracking.jsx
 ┃ ┃ ┣ 📂 Auth
 ┃ ┃ ┃ ┣ 📜 Signin.jsx
 ┃ ┃ ┃ ┣ 📜 Signup.jsx
 ┃ ┃ ┃ ┣ 📜 ForgotPassword.jsx
 ┃ ┃ ┃ ┗ 📜 ResetPassword.jsx
 ┃ ┃ ┣ 📜 Home.jsx
 ┃ ┃ ┣ 📜 Shop.jsx
 ┃ ┃ ┣ 📜 ProductDetails.jsx
 ┃ ┃ ┗ 📜 NotFound.jsx
 ┗ 📜 .env
```

---

## 🎯 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root and add:

```
VITE_API_URL=http://localhost:3000
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173/** (or any other Vite default port).

---

## 🔗 API Integration

- **Axios Configuration (`src/config/axios.js`)**

```js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
```

---

## 📦 Dependencies

| Dependency                | Version   | Description           |
| ------------------------- | --------- | --------------------- |
| **React.js**              | `^18.3.1` | Frontend UI framework |
| **React Router DOM**      | `^7.1.1`  | Client-side routing   |
| **Redux Toolkit**         | `^2.5.0`  | State management      |
| **Axios**                 | `^1.7.9`  | API requests          |
| **Tailwind CSS**          | `^3.4.17` | Styling               |
| **Braintree Web Drop-in** | `^1.44.0` | Payment gateway       |
| **React Hot Toast**       | `^2.5.1`  | Notifications         |
| **Vite**                  | `^6.0.5`  | Build tool            |

### 🛠️ Dev Dependencies

| Dev Dependency          | Version    | Description                |
| ----------------------- | ---------- | -------------------------- |
| **ESLint**              | `^9.17.0`  | Linting                    |
| **ESLint React Plugin** | `^7.37.2`  | React linting              |
| **Tailwind CSS**        | `^3.4.17`  | Styling                    |
| **PostCSS**             | `^8.5.1`   | CSS processing             |
| **Autoprefixer**        | `^10.4.20` | CSS vendor prefixes        |
| **Vite Plugin React**   | `^4.3.4`   | React integration for Vite |

---

## 🚀 Build & Deployment

To build the project for production, run:

```bash
npm run build
```

### 🔄 Deployment Options:

- **Vercel:** `vercel deploy`
- **Netlify:** `netlify deploy`
- **Firebase Hosting**
- **AWS S3 + CloudFront**

---

## 🤝 Contribution

Feel free to contribute!

1. Fork the repo
2. Create a new branch (`feature-branch`)
3. Commit changes (`git commit -m "Added feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---
