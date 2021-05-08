import axios from "axios";

export const getItems = () =>
  fetch("http://localhost:5000/items").then((res) => res.json());

export const addItem = (item) =>
  fetch("http://localhost:5000/items", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      console.log("client: added" + res.da);
    })
    .catch((err) => {
      console.log(err.message);
    });

export const editItem = (item, id) =>
  fetch("http://localhost:5000/items/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => {
    console.log("updated successfully");
  });

export const deleteItem = (id) =>
  fetch("http://localhost:5000/items/deleteItem/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(item),
  })
    .then((req, res) => {
      console.log("server: deleted");
    })
    .catch((err) => {
      console.log(err.message);
    });
