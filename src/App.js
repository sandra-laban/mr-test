import React, { useState } from 'react'
import ProductDetails from './ProductDetails'
import MiniCart from './MiniCart'

function App() {
  const [cartItems, setCartItems] = useState([])

  // Function to add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product])
  }

  return (
    <div className="app">
      <header>
        <h1 class="text-center">Clothing Site</h1>
      </header>
      <main>
        <div className="container">
          <div class="row">
            <MiniCart cartItems={cartItems} />
          </div>
          <ProductDetails addToCart={addToCart} />
        </div>
      </main>
    </div>
  )
}

export default App
