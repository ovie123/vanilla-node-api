const http = require("http");
const productController = require("./controllers/productController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    productController.getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    productController.getProductById(req, res, id);
  } else if (req.url === "/api/product" && req.method === "POST") {
    productController.createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    productController.updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    productController.deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
