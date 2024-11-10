import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/book.route.js";
import userRoute from './routes/user.route.js'
import cors from "cors";
const app = express();

config();

const port = process.env.PORT || 5000;
const uri = process.env.uri;

app.use(cors());
app.use(express.json())
app.use("/book", bookRoute);
app.use("/user",userRoute);

const dbConnect = async() => {
  try {
    const result = await mongoose.connect(uri);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

dbConnect()


app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
