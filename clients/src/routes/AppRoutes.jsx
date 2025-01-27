import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Protected from "../components/Protected";
import NotFound from "../pages/NotFound";
import UserDashboard from "../pages/UserDashboard";
import Shop from "../pages/Shop";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddCategory from "../pages/Admin/AddCategory";
import AddProduct from "../pages/Admin/AddProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../components/Cart";
import AllOrder from "../pages/Admin/AllOrder";
import UserProfile from "../pages/UserProfile";
import ForgotPass from "../pages/ForgotPass";
import EmailPassLink from "../pages/EmailPassLink";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-password' element={<ForgotPass />} />
        <Route path='/api/auth/forget-link/:id' element={<EmailPassLink />} />

        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path='/cart'
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path='/products/:productId'
          element={
            <Protected>
              <ProductDetails />
            </Protected>
          }
        />
        <Route
          path='/user-dashboard'
          element={
            <Protected>
              <UserDashboard />
            </Protected>
          }
        />
        <Route
          path='/profile/:userId'
          element={
            <Protected>
              <UserProfile />
            </Protected>
          }
        />

        {/* Admin Routes */}
        <Route
          path='/admin-dashboard'
          element={
            <Protected requiredRole='admin'>
              <AdminDashboard />
            </Protected>
          }
        />
        <Route
          path='/admin/create-category'
          element={
            <Protected requiredRole='admin'>
              <AddCategory />
            </Protected>
          }
        />
        <Route
          path='/admin/create-product'
          element={
            <Protected requiredRole='admin'>
              <AddProduct />
            </Protected>
          }
        />
        <Route
          path='/admin/orders'
          element={
            <Protected requiredRole='admin'>
              <AllOrder />
            </Protected>
          }
        />

        {/* Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
