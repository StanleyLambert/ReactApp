import express from "express";
import {
  addItem,
  getItem,
  editItem,
  createItem,
  deleteItem,
} from "../controller/posts.js";

const router = express.Router();

// http://localhost:5000/items (get all items from db)
router.get("/", getItem);

// http://localhost:5000/items (post add new item to db)
router.post("/", addItem);

// http://localhost:5000/items:id (patch udate selected item in the db)
router.patch("/:id", editItem);

// http://localhost:5000/items/deleteItem/:id (delete the selected item from the db)
router.delete("/deleteItem/:id", deleteItem);

export default router;
