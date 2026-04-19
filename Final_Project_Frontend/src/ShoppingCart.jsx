import React from "react";
import "./styles/ShoppingCart.css";
import CartCard from './CartCard.jsx';

function ShoppingCart(props) {
    return (
        <div>
            <aside className="cart">
                <h2>Cart</h2>

                {props.cart.length === 0 ? (
                <p>Cart is empty!</p>
                ) : (
                <div className="cart-list">
                    {props.cart.map((item) => (
                    <CartCard
                        key={item.cartId}
                        cartId={item.cartId}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        quantity={item.quantity}
                        onUpdateQuantity={props.onUpdateCartQuantity}
                        onRemoveFromCart={props.onRemoveFromCart}
                    />
                    ))}
                </div>
                )}

                {props.cart.length > 0 && (
                <div className="cart-footer">
                    <button onClick={props.onClearCart}>Clear Cart</button>
                </div>
                )}
            </aside>
        </div>
    );
};

export default ShoppingCart;