import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";
import axios from "axios";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  /* 
  Empty arr as second argument means this will only happen on the first render
  of this component.
  */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (prodToDel) => {
    axios
      .delete("http://localhost:8000/api/products/" + prodToDel._id)
      .then((res) => {
        const filteredProducts = products.filter((prod) => {
          return prod !== prodToDel;
        });

        // Update state to remove the item so the component re-renders.
        setProducts(filteredProducts);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {products.map((prod) => {
        return (
          <div key={prod._id} style={{ width: "50%", margin: "0 auto" }}>
            <h3>{prod.title}</h3>
            <h5>
              Description: {prod.description}
            </h5>
            <p>$ {prod.price}</p>
            <img src={prod.imgUrl} alt={prod.title} width="100%" />
            <div>
              <Link to={`/products/${prod._id}/edit`}>Edit</Link>{" "}
              <Link to={`/products/${prod._id}`}>View</Link>{" "}
              <button
                onClick={(event) => {
                  handleDelete(prod);
                }}
              >
                Delete
              </button>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Products;