import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 w-full text-center text-4xl">The Cart is Empty !</div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("User-email");
    const response = await fetch("https://your-backend.vercel.app/api/orderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  return (
    <div className="relative overflow-x-auto m-auto w-[90%] mt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-green-700 text-md uppercase bg-gray-50 dark:bg-gray-700 dark:text-green-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Options
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{food.name}</td>
              <td className="px-6 py-4">{food.qty}</td>
              <td className="px-6 py-4">{food.size}</td>
              <td className="px-6 py-4">{food.price}</td>
              <td className="px-6 py-4">
                {" "}
                <button className="cursor-pointer">
                  <MdDelete
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  />
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1>Total Price {totalPrice}</h1>
      </div>
      <button
        onClick={handleCheckout}
        className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium max-md:text-lg md:bg-green-600 text-white-600 max-md:text-red-700"
      >
        checkout
      </button>
    </div>
  );
};

export default Cart;
