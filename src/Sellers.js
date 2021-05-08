import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { addItem, editItem, getItems, deleteItem } from "./api";
import axios from "axios";
import { useHistory } from "react-router-dom";

class Sellers extends Component {
  state = {
    manageItem: "addItem",
    editItem: 0,
    deleteItem: 0,
    items: [],
    item_id: null,
    itemName: "",
    itemId: "",
    itemPrice: "",
    itemDescription: "",
    itemSellersId: "",
  };

  // constructor
  constructor() {
    super();
    this.getAllItems();
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  // dislay division
  render() {
    return (
      <div>
        {this.displayListItem()}
        {this.displayManageItem()}
      </div>
    );
  } // methodEnd: render

  // get all items
  getAllItems = () => {
    axios
      .get("http://localhost:5000/items")
      .then((res) => {
        console.log(res.data);
        this.setState({
          items: res.data,
        });
        console.log(this.state.items);
      })
      .catch((error) => {
        console.log("error: " + error.message);
      });
  };

  // method: return list item
  displayListItem = () => {
    return (
      <div
        className="mx-3 p-5"
        style={{
          float: "left",
          width: 750,
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 5,
        }}
      >
        <div>
          <h2 className="text-center">ITEM LIST </h2>
        </div>
        {this.state.items.map((item) => (
          <div
            className="card"
            style={{ marginTop: 5, border: "2px solid orange" }}
            key={item._id}
          >
            <div className="card-body">
              <div className="card-title">
                <h4>{item.name}</h4>
                <p className="card-text">{item.price}</p>
              </div>
              <p className="card-text">{item.description}</p>
              <p className="card-text">Seller ID: {item.sellerId}</p>
              {item._id === this.state.editItem ? (
                <button className="btn btn-danger" disabled={true}>
                  EDIT
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    this.editItemBTN(item);
                  }}
                >
                  EDIT
                </button>
              )}
              <button
                className="btn btn-danger mx-2"
                onClick={() => {
                  this.deleteItemBTN(item._id);
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // method: return cart item
  displayManageItem = () => {
    let manageItem;

    if (this.state.manageItem === "addItem") {
      manageItem = (
        <div>
          <div>
            <h1 className="text-center my-3">Add Item To List</h1>
          </div>
          <div
            className="my-3 mx-1"
            style={{ borderRadius: 4, border: "2px solid green" }}
          >
            <div>
              <div>
                <div className="form-group mx-3">
                  <label>Item Name:</label>
                  <input
                    placeholder="Item Name"
                    type="text"
                    className="form-control"
                    name="itemName"
                    value={this.state.itemName}
                    onChange={this.onChangeName}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Price:</label>
                  <input
                    placeholder="Item Price"
                    type="number"
                    className="form-control"
                    name="itemPrice"
                    value={this.state.itemPrice}
                    onChange={this.onChangePrice}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Description:</label>
                  <input
                    placeholder="Description"
                    type="text"
                    className="form-control"
                    name="itemDescription"
                    value={this.state.itemDescription}
                    onChange={this.onChangeDescription}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Seller's ID:</label>
                  <input
                    placeholder="Seller's ID"
                    type="text"
                    className="form-control"
                    name="itemSellersId"
                    value={this.state.itemSellersId}
                    onChange={this.onChangeSellersId}
                  ></input>
                </div>
                <button
                  onClick={this.addItemToList}
                  className="btn btn-primary mx-3 my-2"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.manageItem === "editItem") {
      manageItem = (
        <div>
          <div>
            <h1 className="text-center my-3">Edit Item</h1>
          </div>
          <div
            className="my-3 mx-1"
            style={{ borderRadius: 4, border: "2px solid green" }}
          >
            <div>
              <div>
                <div className="form-group mx-3">
                  <label>Item Name:</label>
                  <input
                    placeholder="Item Name"
                    type="text"
                    className="form-control"
                    name="itemName"
                    value={this.state.itemName}
                    onChange={this.onChangeName}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Item ID:</label>
                  <input
                    placeholder="Item ID"
                    type="text"
                    className="form-control"
                    name="itemId"
                    disabled={true}
                    value={this.state.itemId}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Price:</label>
                  <input
                    placeholder="Item Price"
                    type="number"
                    className="form-control"
                    name="itemPrice"
                    value={this.state.itemPrice}
                    onChange={this.onChangePrice}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Description:</label>
                  <input
                    placeholder="Description"
                    type="text"
                    className="form-control"
                    name="itemDescription"
                    value={this.state.itemDescription}
                    onChange={this.onChangeDescription}
                  ></input>
                </div>
                <div className="form-group mx-3">
                  <label>Seller's ID:</label>
                  <input
                    placeholder="Seller's ID"
                    type="text"
                    className="form-control"
                    name="itemSellersId"
                    value={this.state.itemSellersId}
                    onChange={this.onChangeSellersId}
                  ></input>
                </div>
                <button
                  onClick={this.updateItem}
                  className="btn btn-primary mx-3 my-2"
                >
                  Update Item
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div
            className="mx-3"
            style={{
              float: "right",
              width: 750,
              borderStyle: "solid",
              borderWidth: 2,
              borderRadius: 5,
            }}
          >
            {manageItem}
          </div>
        </div>
      </div>
    );
  }; // endMethod: displayCartItemm

  // method: update edited item db
  updateItem = async () => {
    let newItem = {
      name: this.state.itemName,
      price: this.state.itemPrice,
      description: this.state.itemDescription,
      sellerId: this.state.itemSellersId,
    };
    console.log("item._id" + this.state.item_id);
    await editItem(newItem, this.state.item_id);
    await this.getAllItems();

    // let listItems = this.state.items;
    // let itemIndex = this.state.items.findIndex(
    //   (itm) => itm.id === this.state.itemId
    // );
    // listItems[itemIndex] = newItem;

    this.setState({
      item_id: null,
      itemId: "",
      itemName: "",
      itemPrice: "",
      itemDescription: "",
      itemSellersId: "",
      editItem: 0,
      //items: listItems,
      manageItem: "addItem",
    });
  };

  // method: click edit item on listItems
  editItemBTN = (item) => {
    this.setState({
      manageItem: "editItem",
      item_id: item._id,
      editItem: item._id,
      itemId: item._id,
      itemName: item.name,
      itemPrice: item.price,
      itemDescription: item.description,
      itemSellersId: item.sellerId,
    });
  };

  // Method: delete item from cart list
  deleteItemBTN = async (id) => {
    await deleteItem(id);
    await this.getAllItems();
  }; // methodEnd: deleteItem

  // db add
  addItemToList = async () => {
    let listItem = {
      name: this.state.itemName,
      price: this.state.itemPrice,
      description: this.state.itemDescription,
      sellerId: this.state.itemSellersId,
      cart: false,
    };
    await addItem(listItem);
    await this.getAllItems();
    this.setState({
      itemId: "",
      itemName: "",
      itemPrice: "",
      itemDescription: "",
      itemSellersId: "",
      //items: this.state.items.concat(listItem),
    });

    this.setState({});
  };

  onChangeName = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangeId = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangePrice = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangeSellersId = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // method: calculate total amount ot be paid
  calculateTotalAmount = () => {
    let totalAmount = 0;
    this.state.cart.map((item) => {
      totalAmount = totalAmount + item.totalPrice;
    });

    this.setState({});
  }; // methodEnd: calculatetottalAmount

  // method: add item to the list of cart
  addItemToCart = (item) => {
    let listItem = item;
    listItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      count: 1,
      totalPrice: item.price,
    };
    this.setState({
      cart: this.state.cart.concat(listItem),
      totalAmount: this.state.totalAmount + item.price,
    });
    this.setState({});

    let itemList = this.state.items;
    let itemIndex = itemList.findIndex((itm) => itm.id === item.id);
    itemList[itemIndex].cart = true;
    this.setState({});

    console.log(this.state.cart);
  }; // methodEnd: addItemToCart
}

export default Sellers;
