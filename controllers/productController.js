const Product = require("../models/productModel");
const utils = require("../utils");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProductById = async (req, res, id) => {
  try {
    const product = await Product.findOne(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const data = await utils.getPostData(req);
    const { title, description, price } = JSON.parse(data);
    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "Application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findOne(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "Application/json" });
      return res.end(JSON.stringify({ message: "Product not Found" }));
    } else {
      const data = await utils.getPostData(req);
      const { title, description, price } = JSON.parse(data);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updatedProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "Application/json" });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findOne(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "Application/json" });
      return res.end(JSON.stringify({ message: "Product not Found" }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "Application/json" });
      return res.end(
        JSON.stringify({ message: "Product deleted successfully" })
      );
    }
  } catch (error) {
    console.log(error);
  }
};
