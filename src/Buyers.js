import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { getItems } from "./api";

class Buyers extends Component {
  state = {
    items: [],
    cart: [],
    totalAmount: 0,
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
        {this.displayCartItem()}
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
          <div className="card" style={{ marginTop: 5 }} key={item.id}>
            <div className="card-body">
              <div className="card-title">
                <h4>{item.name}</h4>
                <p className="card-text">{item.price}</p>
                <p className="card-text">{item._id}</p>
              </div>
              <p className="card-text">{item.description}</p>

              {item.cart === true ? (
                <button className="btn btn-danger" disabled={true}>
                  BUY
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.addItemToCart(item);
                  }}
                >
                  BUY
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // method: return cart item
  displayCartItem = () => {
    return (
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
          <div>
            <h1 className="text-center my-3">Cart</h1>
          </div>
          <div>
            {this.state.cart.length !== 0 ? (
              <div>
                {this.state.cart.map((item) => (
                  <div
                    className="card mx-2"
                    style={{ marginTop: 5 }}
                    key={item._id}
                  >
                    <div className="card-body">
                      <h4 className="card-title">{item.name}</h4>
                      <p className="card-text">_id: {item._id}</p>
                      <p className="card-text">amount: {item.count}</p>
                      <p className="card-text">price: {item.price}</p>
                      <p className="card-text">totalPrice: {item.totalPrice}</p>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          item.count = item.count + 1;
                          item.totalPrice = item.count * item.price;
                          this.state.totalAmount += item.price;
                          this.setState({});
                        }}
                      >
                        Add Quantity
                      </button>
                      {item.count > 1 ? (
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            item.count = item.count - 1;
                            item.totalPrice = item.count * item.price;
                            this.state.totalAmount -= item.price;
                            this.setState({});
                          }}
                        >
                          Deduct Quantity
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning mx-2"
                          disabled={true}
                        >
                          Deduct Quantity
                        </button>
                      )}

                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          this.deleteItem(item);
                        }}
                      >
                        Delete Item
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mx-2 my-2">
                  Amount to be paid: {this.state.totalAmount}
                </div>
              </div>
            ) : (
              <h2 className="text-center text-warning text-bold">
                No item selected
              </h2>
            )}
          </div>
        </div>
      </div>
    );
  }; // endMethod: displayCartItemm

  // method: calculate total amount ot be paid
  calculateTotalAmount = () => {
    let totalAmount = 0;
    this.state.cart.map((item) => {
      totalAmount = totalAmount + item.totalPrice;
    });

    this.setState({});
  }; // methodEnd: calculatetottalAmount

  // Method: delete item from cart list
  deleteItem = (item) => {
    // remove: an object from cart list
    const cartItem = item;
    let cartItems = this.state.cart;
    cartItems = cartItems.filter((itm) => itm._id !== cartItem._id);
    this.setState({
      cart: cartItems,
      totalAmount: this.state.totalAmount - item.totalPrice,
    });

    // alter: count to zero in item list
    let listItems = this.state.items;
    let listItemIndex = this.state.items.findIndex(
      (itm) => itm._id === item._id
    );

    console.log("item._id: " + item._id);
    console.log("listItemIndex: " + listItemIndex);
    listItems[listItemIndex].cart = false;
    this.setState({
      items: listItems,
    });
  }; // methodEnd: deleteItem

  // method: add item to the list of cart
  addItemToCart = (item) => {
    let listItem = item;
    listItem = {
      _id: item._id,
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
    let itemIndex = itemList.findIndex((itm) => itm._id === item._id);
    itemList[itemIndex].cart = true;
    this.setState({});

    console.log(this.state.cart);
  }; // methodEnd: addItemToCart
}

export default Buyers;
