import express from "express";
import Order from "../Models/Order.js";

const router = express.Router();

router.post("/orderdata", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date });

  let eId = await Order.findOne({ "email": req.body.email });
  console.log(eId);

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("server Error", error.message);
    }
  }
});

router.post("/myorderdata", async (req, res) => {
  try {
    let mydata = await Order.findOne({ "email": req.body.email });
    res.json({ orderData: mydata });
  } catch (error) {
    res.send("server Error", error.message);
  }
});

export default router;
