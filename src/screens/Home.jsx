import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Carousel from "../components/Carousel";
import { Link } from "react-router";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("https://your-backend.vercel.app/api/foodData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resjson = await res.json();
        // console.log(resjson[0], resjson[1]);
        setFoodItems(resjson[0]);
        setFoodCategory(resjson[1]);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    };
    loadData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Replace these paths with your actual image paths!
  const images = [
    "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://static.vecteezy.com/system/resources/previews/000/964/198/non_2x/fast-food-meal-set-vector.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lpKNQu2qN9rN9pTb27-U_DfvUijBjcIde9yBFe-xCRUkDAhAnBoVOqqcpRQsq5QMkPQ&usqp=CAU",
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div>
        <div className="w-full overflow-hidden h-full relative">
          {/* Full-width container */}
          <div className="relative w-full h-[500px]">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={src}
                  className="w-screen h-full object-cover brightness-30"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={showPrev}
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black dark:bg-gray-800/80 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-white-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/80 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-white-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>

          <form className=" absolute bottom-8 w-full  sm:px-28 [@media(max-width:400px)]:px-5 max-sm:px-10 ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Your favourite food"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="sm:px-20 max-sm:px-10">
        {foodCategory != [] ? (
          foodCategory.map((data) => {
            return (
              <div>
                <div key={data._id} className="py-8 text-4xl">
                  {data.CategoryName}
                </div>
                <hr />
                <div className="grid lg:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                  {foodItems != [] ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filtereddata) => {
                        return (
                          <div
                            key={filtereddata._id}
                            className="flex justify-center"
                          >
                            <Cards
                            foodItems={filtereddata}
                              // foodname={filtereddata.name}
                              // img={filtereddata.img}
                              // desc={filtereddata.description}
                              // half={filtereddata.options[0].half}
                              // full={filtereddata.options[0].full}
                              options={filtereddata.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No data found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>Hello</div>
        )}
      </div>
    </div>
  );
};

export default Home;
