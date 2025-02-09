import express from "express";
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    if (!global.food_items ) {
      return res.status(404).send("Food data not found");
    }

    // console.log(global.food_items);
    res.status(200).send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

export default router;
