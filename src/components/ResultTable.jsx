import React, { useState } from 'react';


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Result = ({ cart }) => {
  // State for the additional price input
  const [additionalPrice, setAdditionalPrice] = useState(0);

  // Calculate total price including additional price
  const totalPrice = Object.values(cart).reduce((total, item) => {
    return total + item.price * item.quantity; // Multiply price by quantity for each item
  }, 0);

  const totalWithAdditional = totalPrice + additionalPrice * Object.values(cart).reduce((total, item) => total + item.quantity, 0);

  // Check if the cart is empty
  const isEmpty = Object.keys(cart).length === 0;

  return (
    <div>
      <h2>Cart Summary</h2>
      {isEmpty ? (
        <p>Your cart is empty.</p> // Message when the cart is empty
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', padding: '0 20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cart).map(([id, { name, price, quantity }]) => (
                <tr key={id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatter.format(price)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{quantity}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatter.format((price * quantity))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Total</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatter.format(totalPrice)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Additional price input section */}
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="additionalPrice">Additional Price Per Quantity:</label>
            <input
              type="number"
              id="additionalPrice"
              value={additionalPrice}
              onChange={(e) => setAdditionalPrice(Number(e.target.value))}
              style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
            />
            <p>Total with Additional Price: {formatter.format(totalWithAdditional)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
