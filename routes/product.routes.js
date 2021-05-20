const productController = require("../controllers/product.controller");

// LEADING SLASHES ON URLS REQUIRED!

// Django urls.py: path("api/products", views.products)

// Export a function to be called in server.js
module.exports = (app) => {
  app.post("/api/products", productController.create);
  app.get("/api/products", productController.getAll);
  /* 
  This route has to come above the other get because :id will think the
  word "random" is the :id if the :id route is above it.
  */
  // app.get("/api/products/random", productController.random);
  app.get("/api/products/:id", productController.getOne);
  app.delete("/api/products/:id", productController.delete);
  app.put("/api/products/:id", productController.update);
};