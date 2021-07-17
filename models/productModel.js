let products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const utils = require("../utils");

module.exports.findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

module.exports.findOne = async (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

module.exports.create = async (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    utils.writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
};

module.exports.update = async (id, product) => {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    utils.writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
};

module.exports.remove = async (id) => {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    utils.writeDataToFile("./data/products.json", products);
    resolve();
  });
};
