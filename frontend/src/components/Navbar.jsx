import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const [showmenu, setshowmenu] = useState(false);
  const [cartview, setcartview] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  let isAuthenticated = localStorage.getItem("authtoken");
  const Navigate = useNavigate();
  const data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("User-email");

    localStorage.removeItem("authtoken");
    Navigate("/login");
  };

  const handleclick = () => {
    setshowmenu((prev) => !prev);
    // setshowmenu(!showmenu)
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setshowmenu(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !burgerRef.current.contains(e.target)
      ) {
        setshowmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-green-600 font-bold flex w-full md:px-4 items-center max-md:justify-between">
      <span className="px-3 py-2 text-4xl italic font-medium text-white inline-block">
        GoFood
      </span>
      <div
        ref={menuRef}
        // onBlur={()=>setshowmenu(showmenu)}
        // onMouseLeave={()=>setshowmenu(false)}
        className={`${
          showmenu ? "mobile" : "web"
        } flex md:justify-between flex-1 max-md:gap-2 items-center`}
      >
        <div className="flex max-md:flex-col md-sm:gap-5  items-center">
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-lg font-medium text-white hover:bg-gray-700 hover:text-white "
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/myorders"
              className="rounded-md px-3 py-2 text-sm  max-md:text-lg font-medium md:bg-white md:text-green-600"
            >
              My Order
            </Link>
          )}
        </div>

        <div className="flex items-center max-md:justify-center gap-2 pr-2">
          {!isAuthenticated ? (
            <ul className="mobile-burger flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-sm max-md:text-lg  font-medium md:bg-white md:text-green-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-md px-3 py-2 text-sm max-md:text-lg font-medium md:bg-white md:text-green-600"
              >
                SignUp
              </Link>
            </ul>
          ) : (
            <div className="flex items-center gap-2 pr-2 " id="cart-out">
              <button
                onClick={() => setcartview(true)}
                className="cursor-pointer rounded-md px-3 py-2 text-sm max-md:text-lg font-medium md:bg-white md:text-green-600"
              >
                My Cart{" "}
                {data.length > 0 && (
                  <span className="bg-blue-100 text-white text-sm font-medium me-2 px-2 py-0.5 rounded-full dark:bg-red-500 text-center">
                    {data.length}
                  </span>
                )}
              </button>
              {cartview ? (
                <Modal
                  onClose={() => {
                    setcartview(false);
                  }}
                >
                  <Cart />
                </Modal>
              ) : null}
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium max-md:text-lg md:bg-red-600 text-white-600 max-md:text-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        ref={burgerRef}
        className="text-4xl cursor-pointer"
        id="hamburger"
        onClick={handleclick}
      >
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
