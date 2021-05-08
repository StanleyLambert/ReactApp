import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  sellerId: String,
  cart: Boolean,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
