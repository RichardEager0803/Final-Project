import { useParams } from 'react-router-dom';
import './styles/ProductDetail.css';

function ProductDetail(props) {
  const { id } = useParams();

  const product = props.products.find(p => p.id === Number(id));

  if (!product) return <h2 className="not-found">Product not found</h2>;

  return (
    <div className="product-detail">

      <div className="product-detail-image">
        <img
          src={`http://localhost:3001${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-detail-info">

        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <h2 className="price">${product.price}</h2>

        <button
          className="add-btn"
          onClick={() => {
            props.onAddToCart({ ...product, quantity: 1 });
            alert(`Added ${product.name} to the cart`);
          }}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetail;