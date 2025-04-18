import React, { useState, useEffect } from "react";
import { FaCircleUser, FaCartArrowDown, FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SetUser } from "../store/features/userSlice";
import useSignout from "../hooks/auth/useSignout";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signout } = useSignout();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = (e) => {
      if (e.key === "cart") updateCartCount();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCartCount, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signout();
    dispatch(SetUser(null));
    navigate("/");
  };

  const activeClass = ({ isActive }) =>
    isActive ? "text-green-500 font-semibold" : "text-black";

  return (
    <nav className='flex justify-between items-center border-b border-zinc-400 p-4 relative'>
      <Link to={"/"}>
        <h1 className='font-bold text-xl'>Exclusive</h1>
      </Link>

      {/* ✅ Desktop Navigation Links */}
      <div className='hidden md:flex gap-10'>
        <NavLink to='/' className={activeClass}>
          Home
        </NavLink>
        {user && (
          <NavLink to='/dashboard' className={activeClass}>
            Dashboard
          </NavLink>
        )}
        <NavLink to='/contact' className={activeClass}>
          Contact
        </NavLink>
        <NavLink to='/about' className={activeClass}>
          About
        </NavLink>
      </div>

      {/* ✅ Desktop Icons */}
      <div className='hidden md:flex items-center gap-4'>
        <NavLink to='/cart' className='relative'>
          <FaCartArrowDown className='text-2xl' />
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 rounded-full'>
              {cartCount}
            </span>
          )}
        </NavLink>

        {user ? (
          <div className='flex items-center gap-2'>
            <FaCircleUser className='text-2xl text-green-500' />
            <span className='font-semibold'>{user.name}</span>
            <IoLogOutOutline
              className='text-2xl cursor-pointer text-red-500 hover:text-red-700 transition-all'
              onClick={handleLogout}
            />
          </div>
        ) : (
          <NavLink to='/signin' className='text-green-500 font-semibold'>
            Sign In
          </NavLink>
        )}
      </div>

      {/* ✅ Mobile Menu Button */}
      <button
        className='md:hidden text-2xl cursor-pointer'
        onClick={() => setMenuOpen(true)}
      >
        <FaBars />
      </button>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className='fixed inset-0 backdrop-blur-[1px] bg-opacity-50 flex justify-end z-50'>
          <div className='w-3xs bg-white h-full p-5 shadow-lg text-left'>
            <button
              className='absolute cursor-pointer top-4 right-4 text-3xl'
              onClick={() => setMenuOpen(false)}
            >
              <IoMdClose />
            </button>

            <div className='flex flex-col items-center  gap-6 mt-10'>
              <NavLink
                to='/'
                onClick={() => setMenuOpen(false)}
                className={activeClass}
              >
                Home
              </NavLink>
              {user && (
                <NavLink
                  to='/dashboard'
                  onClick={() => setMenuOpen(false)}
                  className={activeClass}
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to='/contact'
                onClick={() => setMenuOpen(false)}
                className={activeClass}
              >
                Contact
              </NavLink>
              <NavLink
                to='/about'
                onClick={() => setMenuOpen(false)}
                className={activeClass}
              >
                About
              </NavLink>
            </div>

            {/* ✅ Mobile Cart Icon */}
            <div className='flex justify-center mt-6'>
              <NavLink
                to='/cart'
                className='relative'
                onClick={() => setMenuOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 rounded-full'>
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* ✅ Mobile User Info */}
            <div className='flex flex-col items-center mt-6'>
              {user ? (
                <div className='flex flex-col items-center gap-2'>
                  <FaCircleUser className='text-3xl text-green-500' />
                  <span className='text-lg font-semibold'>{user.name}</span>
                  <button
                    className='mt-3 text-red-500 font-semibold'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to='/signin'
                  className='text-blue-500 text-lg font-semibold'
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
