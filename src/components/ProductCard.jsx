import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/slices/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItem = cartItems.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleIncrease = () => {
        dispatch(increaseQuantity(product.id));
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(decreaseQuantity(product.id));
        } else {
            dispatch(removeFromCart(product.id));
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.thumbnail} alt={product.title} className="product-image" loading="lazy" />
            </div>
            <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title" title={product.title}>{product.title}</h3>
                <div className="product-rating">
                    ★ {product.rating}
                </div>
                <div className="product-bottom">
                    <span className="product-price">${product.price}</span>
                    {quantity > 0 ? (
                        <div className="qty-controls">
                            <button onClick={handleDecrease} className="btn-qty">-</button>
                            <span className="qty-value">{quantity}</span>
                            <button onClick={handleIncrease} className="btn-qty">+</button>
                        </div>
                    ) : (
                        <button onClick={handleAddToCart} className="btn-add">
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
