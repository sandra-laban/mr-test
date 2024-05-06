import React, { useState } from 'react'

function MiniCart({ cartItems }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleCart = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mini-cart">
      <p onClick={toggleCart}>My Cart ( {cartItems.length} )</p>
      {isExpanded && (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.imageURL} alt={item.name} />
              <span>
                {item.name} - Size: {item.size}
              </span>
              <span>Price: ${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MiniCart
