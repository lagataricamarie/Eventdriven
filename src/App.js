import React, { useEffect, useState } from 'react';
import Product_Form from './components/Product_Form';
import Product_List from './components/Product_List';
import Category_Form from './components/Category_Form';
import Stock_Form from './components/Stock_Form';
import Stock_List from './components/Stock_List';
import TransactionManagement from './components/TransacManagement';
import Category_List from './components/Category_List';

const App = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [categories, setCategories] = useState(['Smartphones', 'Laptops', 'Computers', 'Wearables']);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const add_product = (product) => {
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 'GZMGTZ-1000';
    const lastProductIdNumber = parseInt(lastProductId.match(/\d+/)[0]);
    const newProductId = `GZMGTZ-${lastProductIdNumber + 1}`;

    setProducts([...products, { ...product, id: newProductId }]);
  };

  const edit_product = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const delete_product = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const add_category = (category) => {
    setCategories([...categories, category]);
  };

  const delete_category = (category) => {
    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);
  };

  const update_category = (oldCategory, newCategory) => {
    const updatedCategories = categories.map((category) =>
      category === oldCategory ? newCategory : category
    );
    setCategories(updatedCategories);
  };

  const update_stock = (productId, newStock) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCart([...cart, productToAdd]);

  const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, stock: product.stock - 1 } : product
      );
      setProducts(updatedProducts);
    }
  };

  const [activeTab, setActiveTab] = useState('products');

  return (
    <div>
      <header>
        <div className="container">
          <h1>GizmoGlitz</h1>
          <nav>
            <button onClick={() => setActiveTab('products')}>Products</button>
            <button onClick={() => setActiveTab('stocks')}>Stocks</button>
            <button onClick={() => setActiveTab('transaction')}>Transaction</button>
            <button onClick={() => setActiveTab('reports')}>Reports</button>
          </nav>
        </div>
      </header>

      <div className="container">
        {activeTab === 'products' && (
          <div>
            <h2>Product Management</h2>
            <Category_Form onSubmit={add_category} />
            <Category_List
              categories={categories}
              onDelete={delete_category}
              onUpdate={update_category}
            />
          </div>
        )}
        {activeTab === 'products' && (
          <div>
           <Product_Form onSubmit={add_product} categories={categories} />
            <Product_List
              products={products}
              categories={categories}
              onUpdate={edit_product}
              onDelete={delete_product}
            />
          </div>
        )}

        {activeTab === 'stocks' && (
          <div>
            <h2>Stocks Management</h2>
            <Stock_Form products={products} onUpdateStock={update_stock} />
            <Stock_List products={products} />
          </div>
        )}
         {activeTab === 'transaction' && (
          <div>
            <h2>Transaction Management</h2>
            <TransactionManagement products={products}  setProducts={setProducts} handleAddToCart={handleAddToCart}  />
      

          </div>
        )}
      </div>
    </div>
  );
};

export default App;