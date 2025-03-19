import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AuthForm from "../pages/AuthFrom";
import Cart from "../pages/Cart";
import CreateProduct from "../pages/admin/CreateProduct ";
import Checkout from "../pages/Checkout";

import ManageProducts from "../pages/admin/ManageProducts";
import Protected from "../components/Protected";
import Homes from "../pages/Homes";
import { useSelector } from "react-redux";
import AboutUs from "../pages/AboutUs";
import ContactForm from "../pages/ContactForm";
import ProductDetails from "../pages/ProductDetails";
import UserDashboard from "../pages/UserDashboard";
import ManageCategories from "../pages/admin/ManageCategories";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllOrders from "../pages/admin/AllOrders";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            // <Protected>
            <Home />
            // </Protected>
          }
        />

        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route
          path='/product-details/:productId'
          element={<ProductDetails />}
        />
        <Route path='/signup' element={<AuthForm isSignup={true} />} />
        <Route path='/signin' element={<AuthForm isSignup={false} />} />
        <Route path='/admin/create-product' element={<CreateProduct />} />

        {/* Protected Routes - Only Logged-in Users */}
        {user?.role === "admin" ? (
          <Route
            path='/dashboard'
            element={
              <Protected requiredRole='admin'>
                <AdminDashboard />
              </Protected>
            }
          />
        ) : (
          <Route
            path='/dashboard'
            element={
              <Protected>
                <UserDashboard />
              </Protected>
            }
          />
        )}
        <Route
          path='/admin/manage-products'
          element={
            <Protected requiredRole='admin'>
              <ManageProducts />
            </Protected>
          }
        />
        <Route
          path='/admin/manage-category'
          element={
            <Protected requiredRole='admin'>
              <ManageCategories />
            </Protected>
          }
        />
        <Route
          path='/admin/all-orders'
          element={
            <Protected requiredRole='admin'>
              <AllOrders />
            </Protected>
          }
        />

        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
