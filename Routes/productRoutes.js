import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Define routes and map them to controller methods
router.post("/products", createProduct);
router.get("/products", getProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
