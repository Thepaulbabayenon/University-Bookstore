'use client';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './CartPage.css'; // Import CSS file for styling
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from '../types';

interface CartProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};
const CartPage = () => {
    const router = useRouter();
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    { id: 3, name: 'Product 3', price: 20, quantity: 3 },
  ]);

  // Function to calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to remove an item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">Price: ${item.price}</span>
              <span className="item-quantity">Quantity: {item.quantity}</span>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${getTotalPrice()}</h2>
        <button className="checkout-button" onClick={() => router.push('/payment')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
