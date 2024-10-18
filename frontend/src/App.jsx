import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold ">Aligent Era</h1>
        <div>
          <Link to="/" className="mr-4 hover:text-blue-500">
            Home
          </Link>
          <Link to="/add-product" className="hover:text-blue-500">
            Add Product
          </Link>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
