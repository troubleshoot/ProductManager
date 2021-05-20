const Product = require("../models/product.model");

// Export an object that is full of methods.
module.exports = {
  // long-form - key: value format
  create: function (req, res) {
    console.log("create method executed.");

    Product.create(req.body)
      .then((product) => {
        // Newly created product from DB that includes DB id.
        res.json(product);
      })
      .catch((err) => {
        // This makes axios on the front-end react side trigger the .catch.
        res.status(400).json(err);
      });
  },

  getAll(req, res) {
    console.log("getAll method executed.");

    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getOne(req, res) {
    console.log("getOne method executed", "url params:", req.params);

    Product.findById(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  delete(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Product.findByIdAndDelete(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  update(req, res) {
    console.log("update method executed", "url params:", req.params);

    Product.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true, // to return update doc instead of old one.
      })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};