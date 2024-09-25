import React, { useState } from 'react';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Result = ({ cart }) => {
  const [additionalPrice, setAdditionalPrice] = useState(0);

  const totalPrice = Object.values(cart).reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalWithAdditional = totalPrice + additionalPrice * Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  const isEmpty = Object.keys(cart).length === 0;

  return (
    <div id="result">
      <h2>Cart Summary</h2>
      {isEmpty ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cart).map(([id, { name, price, quantity }]) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{formatter.format(price)}</td>
                  <td>{quantity}</td>
                  <td>{formatter.format((price * quantity))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total</td>
                <td>{formatter.format(totalPrice)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="additional-price">
            <label htmlFor="additionalPrice">Additional Price Per Quantity:</label>
            <input
              type="number"
              id="additionalPrice"
              value={additionalPrice}
              onChange={(e) => setAdditionalPrice(Number(e.target.value))}
            />
            <p className="total-price">Total with Additional Price: {formatter.format(totalWithAdditional)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
