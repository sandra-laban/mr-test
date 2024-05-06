import React, { useState, useEffect } from 'react'

function ProductDetails({ addToCart }) {
  const [productData, setProductData] = useState([])
  const [selectedSize, setSelectedSize] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Fetch product information from API
    fetch(
      'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data]
        setProductData(dataArray)
      })
      .catch((error) => {
        console.error(
          'There was a problem fetching the product information:',
          error
        )
        setErrorMessage('Error fetching product information: ' + error.message)
      })
  }, [])

  const handleAddToCart = () => {
    if (selectedSize === '') {
      setErrorMessage('Please select a size')
      return
    }

    const selectedProduct = productData.find((product) =>
      product.sizeOptions.some((option) => option.label === selectedSize)
    )
    if (!selectedProduct) {
      setErrorMessage('Product not found')
      return
    }

    addToCart(selectedProduct) // Pass the selected product to addToCart function
    setErrorMessage('')
  }

  return (
    <div className="product-details">
      {errorMessage && <p style={{ color: '#C90000' }}>{errorMessage}</p>}
      {productData.map((product) => (
        <div className="product" key={product.id}>
          <div class="row">
            <div class="col">
              <img
                class="img-fluid"
                src={product.imageURL}
                alt={product.title}
              />
            </div>
            <div class="col">
              <h2>{product.title}</h2>
              <p class="price">Price: ${product.price}</p>
              <p class="description">{product.description}</p>
              <span className="mr-2 size">
                Size<em class="required">*</em>
              </span>
              <ul className="list-inline">
                {product.sizeOptions.map((sizeOption) => (
                  <li
                    key={sizeOption.id}
                    onClick={() => setSelectedSize(sizeOption.label)}
                    className={`list-inline-item ${
                      selectedSize === sizeOption.label
                        ? 'font-weight-bold border border-dark p-2'
                        : 'border border-light p-2'
                    }`}
                    style={{
                      width: '40px',
                      textAlign: 'center',
                      fontSize: 'smaller',
                      color: '#888888',
                    }}
                  >
                    {sizeOption.label}
                  </li>
                ))}
              </ul>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductDetails
