import React, { useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setMessage('Product added successfully');
        setProduct({ name: '', price: '', image: '' });
      } else {
        setMessage('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-900">
    //   <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md text-white">
    //     <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium mb-2">Product Name</label>
    //       <input
    //         type="text"
    //         name="name"
    //         value={product.name}
    //         onChange={handleChange}
    //         className="w-full p-2 border border-gray-700 rounded bg-gray-900"
    //         placeholder="Product Name"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium mb-2">Price</label>
    //       <input
    //         type="number"
    //         name="price"
    //         value={product.price}
    //         onChange={handleChange}
    //         className="w-full p-2 border border-gray-700 rounded bg-gray-900"
    //         placeholder="Price"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium mb-2">Image URL</label>
    //       <input
    //         type="text"
    //         name="image"
    //         value={product.image}
    //         onChange={handleChange}
    //         className="w-full p-2 border border-gray-700 rounded bg-gray-900 overflow-auto object-cover"
    //         placeholder="Image URL"
    //         required
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className={`w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
    //       disabled={loading}
    //     >
    //       {loading ? 'Adding...' : 'Add Product'}
    //     </button>
    //     {message && <p className="mt-4 text-center">{message}</p>}
    //   </form>
    // </div>

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
  <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-lg w-full">
    <h2 className="text-3xl font-bold text-center mb-6">Create New Product</h2>
    
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 focus:outline-none focus:border-indigo-500"
        placeholder="Enter product name"
        required
      />
    </div>

    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 focus:outline-none focus:border-indigo-500"
        placeholder="Enter price"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
      <input
        type="text"
        name="image"
        value={product.image}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 focus:outline-none focus:border-indigo-500"
        placeholder="Enter image URL"
        required
      />
    </div>

    <button
      type="submit"
      className={`w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition duration-200 ease-in-out text-white focus:outline-none ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={loading}
    >
      {loading ? 'Adding...' : 'Add Product'}
    </button>

    {message && <p className="mt-4 text-center text-green-500 font-medium">{message}</p>}
  </form>
</div>

  );
  
};

export default ProductForm;
