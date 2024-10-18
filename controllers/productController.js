
import mongoose from "mongoose";
import Product from '../models/Product.js'; // Correct relative path

// Create a new product
// import Product from '../models/Product.js'; // Ensure the path is correct

export const createProduct = async (req, res) => {
  console.log(req.body); // Log the request body
  const productData = req.body;

  // Validate required fields
  if (!productData.name || !productData.price || !productData.image) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json({ success: true, message: "New product created successfully", data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Get all products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     console.log("Products fetched from DB:", products); // Check the fetched data
//     res.status(200).json({ success: true, data: products }); // Sending products array inside 'data'
//   } catch (error) {
//     console.error("Error in fetching products:", error.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error while updating product:", error.message);
    res.status(500).json({ success: false, message: "Couldn't update product" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
