import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useState } from "react";

const Cards = (props) => {
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  let price = options ? Object.keys(options) : [];
  const foodItems = props.foodItems;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddCart = async () => {
    let food = data.find(item => item.id === foodItems._id); // Find item in cart

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItems._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: foodItems._id,
          name: foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: foodItems._id,
        name: foodItems.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }

    console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);


  return (
    <div className="grid  max-w-sm h-[fit] max-h-[fit] m-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to="">
        <img
          className="rounded-t-lg w-full h-52 object-cover"
          src={foodItems.img}
          alt={foodItems.foodname}
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {foodItems.foodname}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {foodItems.description}
        </p>
        <div className="container w-full">
          <select
            className="m-2 h-full bg-green-700 rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {/* array 6 option tag create kar raha hai .  Array.from ek naya array create karta hai aur ye 2 parameter leta hai  .The first argument is the array-like or iterable object (in this case, Array(6)).The second argument is a mapping function that is applied to each element of the array */}

            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}

            {/* {Array(6)
              .fill()
              .map((_, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })} */}
          </select>
          <select
            className="m-2 h-full bg-green-700 rounded"
            onChange={(e) => setSize(e.target.value)}
            ref={priceRef}
          >
            {price.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="inline text-[20px]">${finalPrice}/-</div>
        </div>
      </div>
      <hr className="mx-4" />
      {/* <div className="flex justify-end">
        <div className="bg-green-600 px-2 py-2 mr-4 my-2 cursor-pointer rounded-lg">
          Add To Cart
        </div>
      </div> */}
      <div
        onClick={handleAddCart}
        className="bg-green-600 px-2 py-2 w-fit ml-auto my-2 mr-4 cursor-pointer rounded-lg"
      >
        Add To Cart
      </div>
    </div>
  );
};

export default Cards;
