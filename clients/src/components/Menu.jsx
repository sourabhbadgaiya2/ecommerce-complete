import useSignout from "../hooks/auth/useSignout";
import { SetUser } from "../store/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";

const isActive = (pathname, path) =>
  pathname === path ? "text-[#ff9900]" : "text-white"; // Orange for active, White for others

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { signout } = useSignout();
  const { itemTotal } = useCart();
  const { user } = useSelector((state) => state.users);

  const signoutHandler = () => {
    signout();
    dispatch(SetUser(null));
    navigate("/signin");
  };

  return (
    <div>
      <ul className='flex space-x-6 bg-blue-600 p-3 font-bold'>
        {!user && (
          <>
            <li className='flex items-center'>
              <Link
                to='/signin'
                className={`hover:text-orange-400 ${isActive(
                  location.pathname,
                  "/signin"
                )}`}
              >
                Signin
              </Link>
            </li>
            <li className='flex items-center'>
              <Link
                to='/signup'
                className={`hover:text-orange-400 ${isActive(
                  location.pathname,
                  "/signup"
                )}`}
              >
                Signup
              </Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li className='flex items-center'>
              <Link
                to='/'
                className={`hover:text-orange-400 ${isActive(
                  location.pathname,
                  "/"
                )}`}
              >
                Home
              </Link>
            </li>
            <li className='flex items-center'>
              <Link
                to={`/${user?.role}-dashboard`} // Dynamically set the path
                className={`hover:text-orange-400 ${isActive(
                  location.pathname,
                  `/${user?.role}-dashboard`
                )}`}
              >
                Dashboard
              </Link>
            </li>
            <li className='flex items-center'>
              <Link
                to='/cart'
                className={`hover:text-orange-400 ${isActive(
                  location.pathname,
                  "/cart"
                )}`}
              >
                Cart
                <sup className=' bg-black rounded-full py-1 px-2 ml-1'>
                  <small className='cart-badge'>{itemTotal()}</small>
                </sup>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link
                to='/'
                onClick={signoutHandler}
                className={`hover:text-orange-400 ${isActive(
                  location.pathname,
                  "/signout"
                )}`}
              >
                Signout
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
