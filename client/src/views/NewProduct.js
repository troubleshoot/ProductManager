import React, { useState } from "react";

import axios from "axios";
import { navigate } from "@reach/router";

const NewProducts = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      title: title,
      price: price,
      description: description,
    };

    axios
      .post("http://localhost:8000/api/products", newProduct)
      .then((res) => {
        navigate("/products");
        console.log(res);
      })
      .catch((err) => {
        /* 
        For validation errors to be caught here, you need
        res.status(400).json(err) in the controller.
        To get validation errors for the edit form, you can do the same as this
        including the conditional rendering below.
        */
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label>Title: </label>
          {errors?.title && (
            <span style={{ color: "red" }}>{errors?.title?.product}</span>
          )}
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
          />
        </div>

        <div>
          <label>Price: </label>
          {errors?.price && (
            <span style={{ color: "red" }}>{errors?.price?.product}</span>
          )}
          <input
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            type="text"
          />
        </div>

        <div>
          <label>Description: </label>
          {errors?.description && (
            <span style={{ color: "red" }}>
              {errors?.description?.product}
            </span>
          )}
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
          />
        </div>
        
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewProducts;