import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './styles/App.css'
import NavBar from './NavBar.jsx'
import Product from './Product.jsx'
import ProductDetail from './ProductDetail.jsx'
import ShoppingCart from './ShoppingCart.jsx'
import ScrollToTop from './ScrollToTop.jsx'

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [toggleCart, setToggleCart] = useState(true);

  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Fetch cart from backend
  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const handleAddToCart = (item) => {
    fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(updatedCart => setCart(updatedCart));
  };

  const updateCartQuantity = (cartId, newQuantity) => {
  fetch(`http://localhost:3001/cart/${cartId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantity: newQuantity })
  })
    .then(res => res.json())
    .then(updatedCart => setCart(updatedCart));
  };

  const handleRemoveFromCart = (cartId) => {
    fetch(`http://localhost:3001/cart/${cartId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(updatedCart => setCart(updatedCart));
  };

  const clearCart = () => {
    fetch('http://localhost:3001/cart', {
      method: 'DELETE'
    }).then(() => setCart([]));
  };

  const handleSearch = (searchText) => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (results.length === 0) {
      alert(`${searchText} not found in our system!`);
      return;
    }

    setFilteredProducts(results);

    navigate("/");
  }

  const handleHomeMenuClick = () => {
    setFilteredProducts(products);
    navigate("/");
  }

  const handleToggleCart = () => {
    setToggleCart(prev => !prev);
  }

  return (
    <div className="app">
      <ScrollToTop />

      {/* NAVIGATION BAR */}
      <NavBar 
        toggleCart={toggleCart}
        onHandleHomeMenuClick={handleHomeMenuClick}
        onHandleSearch={handleSearch} 
        onSetToggleCart={handleToggleCart}
      />

      <div className={`layout ${toggleCart ? "with-cart" : "no-cart"}`}>
        
        <Routes>
          {/* MAIN MENU */}
          <Route path="/" element={
            <main className="main">
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </main>
          } />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
        </Routes>

        {/* SHOPPING CART */}
        {toggleCart && (
          <ShoppingCart
            cart={cart}
            onUpdateCartQuantity={updateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={clearCart}
          />
        )}

      </div>
    </div>
  );
}

export default App
