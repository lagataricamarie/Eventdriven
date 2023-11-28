import React, { useState } from 'react';

const TransactionManagement = ({ products = [], setProducts }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isCashOnDeliverySelected, setIsCashOnDeliverySelected] = useState(false);
  const [cashOnDeliveryDetails, setCashOnDeliveryDetails] = useState({
    fullName: '',
    shippingAddress: '',
    contactNumber: ''
  });

  const availableProducts = products.filter(product => product.stock > 0);
  
  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      const updatedCart = [...cart, productToAdd];
      setCart(updatedCart);
      updateTotal(updatedCart);
      updateProductQuantity(productId, -1); // Decrease product quantity by 1 after adding to cart
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    updateTotal(updatedCart);
    updateProductQuantity(productId, 1); // Increase product quantity by 1 after removing from cart
  };

  const updateTotal = (updatedCart) => {
    const totalPrice = updatedCart.reduce((acc, product) => acc + parseFloat(product.price), 0);
    setTotal(totalPrice);
  };

  const updateProductQuantity = (productId, quantityChange) => {
    // Update the product quantity in your products state
    // This function should ideally update the quantity of the selected product in the main products list
    // For simplicity, this example assumes a product has a "quantity" field
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, stock: product.stock + quantityChange } : product
    );
    // Set the updated products list (this will update your ProductManagement component's products)
    // setProducts(updatedProducts); // You'd have this function in your ProductManagement component
  };

  

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Please add products to the cart before checking out!');
    } else {
      // Calculate total price, update cart and other operations...

      // Update stock for purchased products
      if (Array.isArray(products) && products.length > 0) {
        const updatedProducts = products.map(product => {
          const cartProduct = cart.find(cartItem => cartItem.id === product.id);
          if (cartProduct) {
            const remainingStock = product.stock - 1; // Reduce by 1 for each purchased item
            return { ...product, stock: remainingStock >= 0 ? remainingStock : 0 };
          }
          return product;
        });

        // Update the products list with reduced stock
        setProducts(updatedProducts);
        setCart([]); // Clear the cart after checkout
        setShowPaymentOptions(true); // Display payment options after checkout
      } else {
        console.error('Products array is not properly initialized or empty.');
      }
    }
  };


  const handlePaymentSelection = (paymentType) => {
    setShowPaymentOptions(true); 
    setSelectedPaymentMethod(paymentType); 
  
    
    setIsCashOnDeliverySelected(paymentType === 'Cash on Delivery');

    if (paymentType == 'Pay Online') {
      printPurchaseDetailsOnline();
    }
  };
  
  const handleCashOnDeliverySubmit = (e) => {
    e.preventDefault();

    if (
      cashOnDeliveryDetails.fullName.trim() === '' ||
      cashOnDeliveryDetails.shippingAddress.trim() === '' ||
      cashOnDeliveryDetails.contactNumber.trim() === ''
    ) {
      alert('Please fill in all the required fields for Cash on Delivery.');
    } else {
      console.log('Cash on Delivery Details:', cashOnDeliveryDetails);
      printPurchaseDetails();
    }
  };

  const printPurchaseDetails = () => {
    const paymentDetails = `Payment Method: ${selectedPaymentMethod}`;
    const additionalMessage = 'fsfhbsdbbfegeabchay this is a message';

    const printContent = document.getElementById('print-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(
        `<div>${printContent.innerHTML}</div><div>${paymentDetails}</div><div>${cashOnDeliveryDetails.fullName}</div><div>${cashOnDeliveryDetails.shippingAddress}</div><div>${cashOnDeliveryDetails.contactNumber}</div><div>${additionalMessage}</div>`
      );
      printWindow.document.close();
      printWindow.print();
    }
  };

 
  const printPurchaseDetailsOnline = () => {
    const paymentDetails = `Online Payment`;
    const additionalMessage = 'To send and confirm your payment, please send us your proof of payment via email at @gizmogliztfinance@gmail.com. Thank you for your purchased.'; 
  
    const printContent = document.getElementById('print-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(
        `<div>${printContent.innerHTML}</div><div>${paymentDetails}</div><div>${additionalMessage}</div>`
      );
      printWindow.document.close();
      printWindow.print();
    }
  };
  

  return (
    <div>
    <h2>Point of Sale (POS)</h2>
    <div>
      <h3>Cart</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
              <button onClick={handleCheckout}>Checkout</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPaymentOptions && (
          <div>
            <h3>Payment Options</h3>
            <p>Total: ${total}</p>

            <div>
              <h4>Choose Payment Method</h4>
              <button onClick={() => handlePaymentSelection('Cash on Delivery')}>Cash on Delivery</button>
              <button onClick={() => handlePaymentSelection('Pay Online')}>Pay Online</button>
            </div>
          </div>
        )}
      </div>

      {isCashOnDeliverySelected && (
        <div>
          <h3>Provide Details for Cash on Delivery</h3>
          <form onSubmit={handleCashOnDeliverySubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={cashOnDeliveryDetails.fullName}
              onChange={(e) =>
                setCashOnDeliveryDetails({ ...cashOnDeliveryDetails, fullName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Shipping Address"
              value={cashOnDeliveryDetails.shippingAddress}
              onChange={(e) =>
                setCashOnDeliveryDetails({
                  ...cashOnDeliveryDetails,
                  shippingAddress: e.target.value
                })
              }
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={cashOnDeliveryDetails.contactNumber}
              onChange={(e) =>
                setCashOnDeliveryDetails({
                  ...cashOnDeliveryDetails,
                  contactNumber: e.target.value
                })
              }
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

     <div id="print-content" style={{ display: 'none' }}>
        <h2>Purchase Receipt</h2>
        <p>Total: ${total}</p>
        <h3>Products Purchased:</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionManagement;
