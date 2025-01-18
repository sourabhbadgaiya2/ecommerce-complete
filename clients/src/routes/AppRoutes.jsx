import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Protected from "../components/Protected";
import NotFound from "../pages/NotFound";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddCategory from "../pages/Admin/AddCategory";
import AddProduct from "../pages/Admin/AddProduct";
import Shop from "../pages/Shop";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* //! Public routes */}

        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        {/* //!Protected Routes */}
        <Route
          path='/user-dashboard'
          element={
            <Protected>
              <UserDashboard />
            </Protected>
          }
        />
        <Route
          path='/'
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path='/shop'
          element={
            <Protected>
              <Shop />
            </Protected>
          }
        />

        {/* //! Admin Routes */}
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
        {/* //!not found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
