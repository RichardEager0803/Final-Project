import './styles/CartCard.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function CartCard(props) {

  const removeItem = () => {
    props.onRemoveFromCart(props.cartId);
  };

  const increase = () => {
    props.onUpdateQuantity(props.cartId, props.quantity + 1);
  };

  const decrease = () => {
    if (props.quantity <= 1) return; // prevent 0 or negative
    props.onUpdateQuantity(props.cartId, props.quantity - 1);
  };

  return (
    <div className="cart-card">
      <h2>{props.name}</h2>
      <p>{props.description}</p>

      <div className="button-row">
        {(props.quantity === 1) ? (
          <button
            onClick={removeItem}
            className="btn btn-danger btn-sm"
            title="Remove item"
          >
            <i className="bi bi-trash"></i>
          </button>
        ) : (
          <button
            onClick={decrease}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-dash"></i>
          </button>
        )}
        <span>{props.quantity}</span>
        <button
          onClick={increase}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>

      <h2>${Number(props.price * props.quantity).toFixed(2)}</h2>

      {/* <button onClick={removeItem}>
        Remove Item
      </button>       */}
    </div>
  );
}

export default CartCard;