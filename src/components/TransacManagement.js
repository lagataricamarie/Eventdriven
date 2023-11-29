import React, { useState } from 'react';

const TransactionManagement = ({ products = [], setProducts }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartId, setCartId] = useState(1);
  const [PaymentOptions, setPaymentOptions] = useState(false);
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [CashOnDeliverySelected, setCashOnDeliverySelected] = useState(false);
  const [cashOnDeliveryDetails, setCashOnDeliveryDetails] = useState({
    fullName: '',
    CompleteAddress: '',
    contactNumber: ''
  });

  const availableProducts = products.filter(product => product.stock > 0);
  
  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd && productToAdd.stock > 0) {
      const updatedCart = [
        ...cart,
        {
          ...productToAdd,
          cartId: cartId // auto-increment ID
        }
      ];
      setCart(updatedCart);
      setCartId(cartId + 1); // Increment ID for the next product
      updateTotal(updatedCart);
      updateProductQuantity(productId, -1); // Decrease product quantity by 1 after adding to cart
    } else {
      alert('This product is out of stock.');
    }
  };

  
  const removeFromCart = (cartIdToRemove) => {
    const updatedCart = cart.filter(product => product.cartId !== cartIdToRemove);
    setCart(updatedCart);
    const removedProduct = cart.find(product => product.cartId === cartIdToRemove); // Retrieve the product that was removed from the cart
    if (removedProduct) {
      updateProductQuantity(removedProduct.id, 1); // Increase the stock of the removed product 
    }
    updateTotal(updatedCart);
  };


  const updateTotal = (updatedCart) => {
    const totalPrice = updatedCart.reduce((acc, product) => acc + parseFloat(product.price), 0);
    setTotal(totalPrice);
  };

  const updateProductQuantity = (productId, quantityChange) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, stock: product.stock + quantityChange } : product
    );
    setProducts(updatedProducts);
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Please add products to the cart before checking out!');
    } else {
      setPaymentOptions(true); // Display payment options after checkout
    }
  };


  const handlePaymentSelection = (paymentType) => {
    setPaymentOptions(true); 
    setPaymentMethod(paymentType); 
    setCashOnDeliverySelected(paymentType === 'Cash on Delivery');

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
    const paymentDetails = `Payment Method: ${PaymentMethod}`;
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
    const paymentDetails = 'Online Payment';
    const additionalMessage = 'To confirm your payment, please send us your proof of payment via email at @gizmogliztfinance@gmail.com. Thank you for your purchased.'; 
    const printContent = document.getElementById('printContent');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(
        `<div>${printContent.innerHTML}</div><div>${paymentDetails}</div><div>${additionalMessage}</div>`
      );
      printWindow.document.close();
      printWindow.print();
    }
  };


  const handlePaymentCompleted = () => {
    if (!PaymentMethod || PaymentMethod === '') {
      alert('Please select a payment method before completing the payment.');
      return;
    }
    if (CashOnDeliverySelected && !cashOnDeliveryDetails.fullName.trim()) {
      alert('Please provide your full name for Cash on Delivery.');
      return;
    }
    if (CashOnDeliverySelected && !cashOnDeliveryDetails.shippingAddress.trim()) {
      alert('Please provide your shipping address for Cash on Delivery.');
      return;
    }
    if (CashOnDeliverySelected && !cashOnDeliveryDetails.contactNumber.trim()) {
      alert('Please provide your contact number for Cash on Delivery.');
      return;
    }
    // Reset the state variables to their initial values
    setCart([]);
    setTotal(0);
    setPaymentOptions(false);
    setPaymentMethod('');
    setCashOnDeliverySelected(false);
    setCashOnDeliveryDetails({
      fullName: '',
      shippingAddress: '',
      contactNumber: '',
    });
  };

  

  return (
    <div>
    <h4>Product Transaction (Point of Sale)</h4>
    <div>
      <h5>Cart</h5>
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
              <button onClick={() => removeFromCart(product.cartId)}>Remove</button>
              <button onClick={handleCheckout}>Checkout</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        {PaymentOptions && (
          <div>
            <h3>Payment Options</h3>
            <p>Total: ${total}</p>

            <div>
              <h4>Choose Payment Method</h4>
              <button onClick={() => handlePaymentSelection('Cash on Delivery')}>Cash on Delivery</button>
              <button onClick={() => handlePaymentSelection('Pay Online')}>Pay Online</button>
              <button onClick={handlePaymentCompleted}>Complete Payment</button>
            </div>
            
          </div>
        )}
      </div>

      {CashOnDeliverySelected && (
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
              placeholder="Complete Address"
              value={cashOnDeliveryDetails.CompleteAddress}
              onChange={(e) =>
                setCashOnDeliveryDetails({
                  ...cashOnDeliveryDetails,
                  shippingAddress: e.target.value
                })
              }
            />
            <input
              type="number"
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

     <div id="printContent" style={{ display: 'none' }}>
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
                <td>₱{product.price}</td>
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
                <td>₱{product.price}</td>
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