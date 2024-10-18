import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id); // Set the product to edit
    setFormValues({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product._id === id ? updatedProduct : product
          )
        );
        setEditingProduct(null); // Clear editing state
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    // <div className="container mx-auto p-4">
    //   <h2 className="text-2xl font-semibold mb-4">Product List</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     {products.map((product) => (
    //       <div key={product._id} className="card bg-base-100 w-96 shadow-xl">
    //         <figure>
    //           <img
    //             src={
    //               product.image ||
    //               "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    //             }
    //             alt={product.name}
    //             className="w-full h-48 object-cover" // Adjusted height to fix image view
    //           />
    //         </figure>
    //         <div className="card-body">
    //           {editingProduct === product._id ? (
    //             <div>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 value={formValues.name}
    //                 onChange={handleInputChange}
    //                 placeholder="Product Name"
    //                 className="w-full p-2 mb-2 border border-gray-700 rounded bg-gray-900"
    //               />
    //               <input
    //                 type="number"
    //                 name="price"
    //                 value={formValues.price}
    //                 onChange={handleInputChange}
    //                 placeholder="Price"
    //                 className="w-full p-2 mb-2 border border-gray-700 rounded bg-gray-900"
    //               />
    //               <input
    //                 type="text"
    //                 name="image"
    //                 value={formValues.image}
    //                 onChange={handleInputChange}
    //                 placeholder="Image URL"
    //                 className="w-full p-2 mb-2 border object-cover border-gray-700 rounded bg-gray-900"
    //               />
    //               <button
    //                 onClick={() => updateProduct(product._id)}
    //                 className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
    //               >
    //                 Update Product
    //               </button>
    //               <button
    //                 onClick={() => setEditingProduct(null)}
    //                 className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded ml-2"
    //               >
    //                 Cancel
    //               </button>
    //             </div>
    //           ) : (
    //             <>
    //               <h2 className="card-title">
    //                 {product.name}
    //                 <div className="badge badge-secondary ml-2">NEW</div>
    //               </h2>
    //               <p className="text-lg mb-4">${product.price}</p>
    //               <div className="card-actions justify-end mb-4">
    //                 <div className="badge badge-outline">
    //                   <button
    //                     onClick={() => deleteProduct(product._id)}
    //                     // className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded ml-2"
    //                   >
    //                     Delete
    //                   </button>
    //                 </div>
    //                 <div className="badge badge-outline">
    //                   <button
    //                     onClick={() => handleEditClick(product)}
    //                     // className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
    //                   >
    //                     Edit
    //                   </button>
    //                 </div>
    //               </div>
    //               <div className="flex justify-between"></div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="container mx-auto p-4">
  <h2 className="text-2xl font-semibold mb-4">Product List</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <div key={product._id} className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={
              product.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.name}
            className="w-full h-48 object-cover" // Ensure the image is responsive
          />
        </figure>
        <div className="card-body">
          {editingProduct === product._id ? (
            <div>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="w-full p-2 mb-2 border border-gray-700 rounded bg-gray-900"
              />
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full p-2 mb-2 border border-gray-700 rounded bg-gray-900"
              />
              <input
                type="text"
                name="image"
                value={formValues.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full p-2 mb-2 border border-gray-700 rounded bg-gray-900"
              />
              <button
                onClick={() => updateProduct(product._id)}
                className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
              >
                Update Product
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h2 className="card-title">
                {product.name}
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-lg mb-4">${product.price}</p>
              <div className="card-actions justify-end mb-4">
                <div className="badge badge-outline">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
                <div className="badge badge-outline">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ProductList;
