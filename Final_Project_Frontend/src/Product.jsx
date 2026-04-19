import { useNavigate } from 'react-router-dom';
import './styles/Product.css';

function Product(props) {
  const addToCart = () => {
    props.onAddToCart({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      quantity: 1
    });
  };

  const navigate = useNavigate();

  return (
    <div 
      className="product-container"
      onClick={() => navigate(`/product/${props.id}`)}
    >

      <img 
        src={`http://localhost:3001${props.image}`} 
        alt={props.name} 
      />

      <h3>{props.name}</h3>
      {/* <p>{props.description}</p> */}

      <div className="product-bottom">
        <h2>${Number(props.price).toFixed(2)}</h2>
        {/* Add to cart */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevents navigation
            addToCart();
            alert(`Added ${props.name} to the cart. Check your cart!`);
          }}
          className="add-to-cart"
        >
          Add to Cart
        </button>        
      </div>
    </div>
  );
}

export default Product;