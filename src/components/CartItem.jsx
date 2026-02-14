import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total cart amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.card}>
              {/* Thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.details}>
                {/* Name */}
                <h3>{item.name}</h3>

                {/* Unit Price */}
                <p>Unit Price: ${item.price}</p>

                {/* Quantity Controls */}
                <div style={styles.quantityContainer}>
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    style={styles.qtyButton}
                  >
                    -
                  </button>

                  <span style={styles.quantity}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                    style={styles.qtyButton}
                  >
                    +
                  </button>
                </div>

                {/* Total Per Plant */}
                <p>
                  Total: ${item.price * item.quantity}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Total Cart Amount */}
          <h2 style={styles.total}>
            Cart Total: ${totalAmount}
          </h2>

          {/* Checkout Button */}
          <button
            onClick={() => alert("Checkout Coming Soon!")}
            style={styles.checkoutButton}
          >
            Checkout
          </button>

          {/* Continue Shopping */}
          <Link to="/plants">
            <button style={styles.continueButton}>
              Continue Shopping
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
  },
  card: {
    display: "flex",
    gap: "20px",
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  details: {
    flex: 1,
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  },
  qtyButton: {
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  quantity: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  total: {
    marginTop: "20px",
  },
  checkoutButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px 15px",
    marginRight: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  continueButton: {
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default CartItem;
