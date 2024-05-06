import React, { useState } from 'react'

function MiniCart({ cartItems }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleCart = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mini-cart">
      <p onClick={toggleCart}>My Cart ({cartItems.length})</p>
      {isExpanded && (
        <div className="cart-dropdown">
          {cartItems.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>Size: {item.selectedSize}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MiniCart
