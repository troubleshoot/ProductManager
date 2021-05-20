import { Link, Redirect, Router } from "@reach/router";

import "./App.css";

import Products from "./views/Products";
import Product from "./views/Product";
import NewProduct from "./views/NewProduct";
import EditProduct from "./views/EditProduct";

function App() {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <nav style={{ textAlign: "center" }}>
        <Link to="/products">Products</Link>{" "}
        <Link to="/products/new">New Product</Link>
        <hr />
      </nav>

      <Router>
        <Redirect from="/" to="/products" noThrow="true" />
        <Products path="/products" />
        <Product path="/products/:id" />
        <NewProduct path="/products/new" />
        <EditProduct path="/products/:id/edit" />
      </Router>
    </div>
  );
}

export default App;