import { useState, useEffect } from 'react';
import Header from "./components/Header"
import UserInput from "./components/UserInput"
import ResultTable from "./components/ResultTable"

import { materials } from './util/materials';




function App() {
  const [errorMessage, setErrorMessage] = useState('');

  const [cart, setCart] = useState({});

  function handleInput(id, name, price, quantity) {
    // If quantity is less than or equal to 0, remove from cart
    if (quantity <= 0) {
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        delete updatedCart[id];
        return updatedCart;
      });
      return;
    }

    // Update the cart with the new quantity
    setCart((prevCart) => ({
      ...prevCart,
      [id]: {
        name,
        price,
        quantity,
      },
    }));
  }

  // Log the cart whenever it changes
  useEffect(() => {
    console.log(cart);
  }, [cart]); // Runs whenever 'cart' state changes

  return (
    <>
      <Header />

      <div id="user-input">
        {/* Split the materials into groups of two */}
        {materials.reduce((acc, [id, name, price, img], index) => {
          // Calculate the group index
          const groupIndex = Math.floor(index / 4);

          // Initialize the group if it doesn't exist
          if (!acc[groupIndex]) {
            acc[groupIndex] = [];
          }

          // Add the current material to the current group
          acc[groupIndex].push([id, name, price, img]);

          return acc;
        }, []).map((group, groupIndex) => (
          <div className="input-group" key={groupIndex}>
            {group.map(([id, name, price, img]) => (
              <UserInput
                key={id}           // Ensure each component has a unique key
                id={id}           // Pass the id as a prop
                name={name}       // Pass the name as a prop
                price={price}     // Pass the price as a prop
                img={img}         // Pass the image file name as a prop
                handleChange={handleInput}
              />
            ))}
          </div>
        ))}
      </div>

      <ResultTable cart={cart} />
    </>
  );

}

export default App
