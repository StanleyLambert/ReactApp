import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import Sellers from "./Sellers";
import Buyers from "./Buyers";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./actions/items";
import * as api from "./api";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    axios
      .get("http://localhost:5000/items")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error: " + error.message);
      });

    //axios.post("http://localhost:5000/items");
  }

  state = {
    mode: "Seller",
  };

  render() {
    return (
      <div>
        <div></div>
        <this.displayNavigationBar />
        <this.displayContent />
      </div>
    );
  }

  displayNavigationBar = () => {
    return (
      <div className="container p-3 my-3 bg-dark text-white text-center">
        {this.state.mode === "Seller" ? (
          <button
            style={{ width: 250 }}
            className="btn btn-warning"
            onClick={() => {
              this.setState({
                mode: "Buyer",
              });
            }}
          >
            Shop
          </button>
        ) : (
          <button className="btn but-warning" disabled={true}>
            Shop
          </button>
        )}
        {this.state.mode === "Buyer" ? (
          <button
            style={{ width: 250 }}
            className="btn btn-success"
            onClick={() => {
              this.setState({
                mode: "Seller",
              });
            }}
          >
            Sell
          </button>
        ) : (
          <button className="btn" disabled={true}>
            Sell
          </button>
        )}

        <div>
          {this.state.mode === "Seller" ? (
            <h1>Mangae Items Site</h1>
          ) : (
            <h1>Shopping Site</h1>
          )}
        </div>
      </div>
    );
  };

  displayContent = () => {
    return <div>{this.state.mode === "Seller" ? <Sellers /> : <Buyers />}</div>;
  };
}

export default App;
