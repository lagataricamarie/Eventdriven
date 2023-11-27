import React from 'react';

const Stock_List = ({ products }) => {
  return (
    <div>
      <h2>Stock List</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock_List;