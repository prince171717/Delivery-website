import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Applayout from "./components/Applayout";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReducer";
import Myorder from "./screens/Myorder";
// import Cart from "./screens/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/myorders",
          element: <Myorder />,
        },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
