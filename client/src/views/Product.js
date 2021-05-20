import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, navigate } from "@reach/router";

const Product = (props) => {
  const [prod, setMsg] = useState({});

  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/api/products/" + props.id)
      .then((res) => {
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* 
  Get the current data from DB to display.
  */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/" + props.id)
      .then((res) => {
        console.log(res);
        setMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3>{prod.title}</h3>
      <h5>
        Description: {prod.description}
      </h5>
      <p>$ {prod.price}</p>
      <img src={prod.imgUrl} alt={prod.title} width="100%" />
      <div>
        <Link to={`/products/${prod._id}/edit`}>Edit</Link>
        <button
          onClick={(event) => {
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Product;