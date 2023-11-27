import React, { useState, useEffect } from 'react';

const Product_Form = ({ onSubmit, categories }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  useEffect(() => {
  }, []);

  const input_change = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const form_submit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ id: '', name: '', price: '', stock: '', category: '' });
  };

  return (
    <form onSubmit={form_submit}>
      <h3>Add Product</h3>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={input_change}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={input_change}
        required
      />

      <label>Stock:</label>
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={input_change}
        required
      />

      <label>Category:</label>
      <select
        name="category"
        value={product.category}
        onChange={input_change}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button type="submit">Add</button>
    </form>
  );
};

export default Product_Form;