import Item from "../models/Item.js";
import mongoose from "mongoose";

export const getItem = async (req, res) => {
  try {
    const items = await Item.find({}, (err, doc) => {
      console.log(doc);
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);

  try {
    await newItem.save();
    console.log("server function add item worked");
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ "server error: ": error.message });
  }
};

export const editItem = async (req, res) => {
  const { id } = req.params;
  const editedId = mongoose.Types.ObjectId.createFromHexString(id);
  const { name, price, description, cart } = req.body;
  console.log("inside update");
  if (!mongoose.Types.ObjectId.isValid(editedId)) {
    console.log("object id failed: " + editedId);
  }

  const updatedItem = { name, price, description, cart, _id: editedId };

  await Item.findByIdAndUpdate(editedId, updatedItem, { new: true })
    .then((res) => {
      console.log("server: updated successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
  //console.log("server update success");
  res.json(updatedItem);
};

export const createItem = async (req, res) => {
  const { name, price, description, cart } = req.body;

  const newItem = new Item({ name, price, description, cart });

  try {
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Item.findByIdAndRemove(id)
    .then((req, res) => {
      console.log("server: item deleted");
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.json({ message: "Post deleted successfully." });
};
