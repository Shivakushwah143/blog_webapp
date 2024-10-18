import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
      <p className="text-xl text-gray-400 mb-4">${product.price}</p>
      <p className="text-gray-300">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
