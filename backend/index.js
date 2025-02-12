import express from "express";
import router from "./Routes/CreateUser.js";
import loginrouter from "./Routes/LoginUser.js";
import displayDataRouter from "./Routes/DisplayData.js";
import orderRouter from "./Routes/OrderData.js";
import cors from "cors";
import dotenv from 'dotenv'
import { mongoDb } from "./db.js";

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;

mongoDb();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",  // For local testing
  process.env.CORS_ORIGIN  // Update with your frontend Vercel URL
];

// app.use(cors({ origin: "https://delivery-website-sepia.vercel.app/", credentials: true }));
app.use(
  cors({
    origin: allowedOrigins, // Allow frontend URLs
    credentials: true, // Allow cookies and headers
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5176"); // Or "*" for all origins in development
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Important for POST
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   if (req.method === "OPTIONS") {
//     // Handle OPTIONS requests and stop further processing
//     return res.sendStatus(200); // Respond successfully to preflight requests
//   } else {
//     next();
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", router);
app.use("/api", loginrouter);
app.use("/api", displayDataRouter);
app.use("/api", orderRouter);



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
