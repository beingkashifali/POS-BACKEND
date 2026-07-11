require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");
connectDB();

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const saleRouter = require("./routes/sale");

const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "https://pos-frontend-seven-pi.vercel.app",
      "http://localhost:5173",
    ],
  }),
);
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/sales", saleRouter);

app.listen(port, () =>
  console.log(`Application is up and runnign on port ${port}.`),
);
