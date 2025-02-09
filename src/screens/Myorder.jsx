import React, { useEffect, useState } from "react";

const Myorder = () => {
  const [orderData, setorderData] = useState("");

  // if (orderData.length === 0) {
  //   return (
  //     <div className="p-5 w-full text-center text-4xl">No order till date </div>
  //   );
  // }

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:3000/api/myorderdata", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("User-email"),
      }),
    }).then(async (res) => {
      let response = await res.json();
       setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div className="row">
        {orderData != {}
          ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <div>
                            {arrayData.order_date ? (
                              <div>
                                {(data = arrayData.order_date)}
                                <hr />
                              </div>
                            ) : (
                              <div>
                                <div>
                                  <div>
                                    <h5>{arrayData.name}</h5>
                                    <div>
                                      <span>{arrayData.qty}</span>
                                      <span>{arrayData.size}</span>
                                      <span>{data}</span>
                                      <div>{arrayData.price}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })
                : "";
            })
          : ""}
      </div>
    </div>
  );
};

export default Myorder;
