import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/items.js";
import Item from "./models/Item.js";

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.p5b7y.mongodb.net/ShoppingMart?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log("Server running port: " + PORT));
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/items", itemRoutes);
// app.use("/", router);
// router.route("/getItems").get(function (req, res) {
//   Item.find({}, function (error, result) {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(result);
//     }
//   });
// });
