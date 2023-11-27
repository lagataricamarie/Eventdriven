import React, { useState } from 'react';

const Stock_Form = ({ products, onUpdateStock }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newStock, setNewStock] = useState('');

  const change_product = (e) => {
    setSelectedProduct(e.target.value);
  };

  const change_stock = (e) => {
    setNewStock(e.target.value);
  };

  const form_submit = (e) => {
    e.preventDefault();

    const product = products.find((p) => p.id === selectedProduct);

    if (product) {
      onUpdateStock(product.id, parseInt(newStock, 10));
    }

    setSelectedProduct('');
    setNewStock('');
  };

  return (
    <form onSubmit={form_submit}>
      <label>Product:</label>
      <select value={selectedProduct} onChange={change_product}>
        <option value="" disabled>Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <label>New Stock:</label>
      <input
        type="number"
        name="newStock"
        value={newStock}
        onChange={change_stock}
      />

      <button type="submit">Update Stock</button>
    </form>
  );
};
export default Stock_Form;

