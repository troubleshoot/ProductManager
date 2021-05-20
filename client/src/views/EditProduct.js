import React, { useEffect, useState } from "react";

import { navigate } from "@reach/router";

import axios from "axios";

const EditProduct = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  /* 
  Empty arr as second argument means this will only happen on the first render
  of this component.
  Get the current data from DB to pre-fill input boxes.
  */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/" + props.id)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      title: title,
      price: price,
      description: description,

    };

    axios
      .put("http://localhost:8000/api/products/" + props.id, newProduct)
      .then((res) => {
        navigate("/products/" + props.id);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
            value={title}
          />
        </div>

        <div>
          <label>Price: </label>
          <input
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            type="text"
            value={price}
          />
        </div>

        <div>
          <label>Description: </label>
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
            value={description}
          />
        </div>

        <button>Update</button>
      </form>
    </div>
  );
};

export default EditProduct;