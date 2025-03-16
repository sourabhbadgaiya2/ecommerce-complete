import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className='overflow-x-hidden'>
      {loading && <Loader />}
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
