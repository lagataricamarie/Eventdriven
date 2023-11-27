import React, { useState } from 'react';

const Product_List = ({ products, categories, onUpdate, onDelete }) => {
  const [editProduct, setEditProduct] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('');

   const edit_product = (product) => {
    setEditProduct(product);
  };

  const update_product = () => {
    onUpdate(editProduct);
    setEditProduct({
      id: '',
      name: '',
      price: '',
      stock: '',
      category: '',
    });
  };

  const category_counts = () => {
    const counts = {};
    products.forEach((product) => {
      if (counts[product.category]) {
        counts[product.category]++;
      } else {
        counts[product.category] = 1;
      }
    });
    return counts;
  };

  const categoryCounts = category_counts();

  const filtered_products = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {categories.map((category) => (
          <div key={category} style={{ flex: '1', marginRight: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <h3>{category}</h3>
              <p>{categoryCounts[category] || 0}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Product List</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered_products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₱&nbsp;{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => edit_product(product)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct.id && (
        <div>
          <h3>Edit Product</h3>
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              required
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              required
            />

            <label>Category:</label>
            <select
              name="category"
              value={editProduct.category}
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button type="button" onClick={update_product}>
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Product_List;


