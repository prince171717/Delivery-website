import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config(); 
const mongoURI = process.env.MONGO_URI
const mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected successfully");

    const fetchData = mongoose.connection.db.collection("food_items");
    const data = await fetchData.find({}).toArray();
    // console.log(data);
    global.food_items = data;
    // console.log(global.food_items);

    const food_Category = mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await food_Category.find({}).toArray();
    global.foodCategory = foodCategoryData;
    // console.log(global.foodCategory);
  } catch (error) {
    console.error("mongodb connection error", error);
  }
};

export { mongoDb };
