import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const plants = {
    "Indoor Plants": [
      { id: 1, name: "Snake Plant", price: 20, image: "https://via.placeholder.com/150" },
      { id: 2, name: "Peace Lily", price: 25, image: "https://via.placeholder.com/150" },
      { id: 3, name: "Spider Plant", price: 18, image: "https://via.placeholder.com/150" },
      { id: 4, name: "ZZ Plant", price: 30, image: "https://via.placeholder.com/150" },
      { id: 5, name: "Areca Palm", price: 35, image: "https://via.placeholder.com/150" },
      { id: 6, name: "Rubber Plant", price: 28, image: "https://via.placeholder.com/150" },
    ],
    "Outdoor Plants": [
      { id: 7, name: "Rose", price: 15, image: "https://via.placeholder.com/150" },
      { id: 8, name: "Hibiscus", price: 22, image: "https://via.placeholder.com/150" },
      { id: 9, name: "Lavender", price: 19, image: "https://via.placeholder.com/150" },
      { id: 10, name: "Bougainvillea", price: 26, image: "https://via.placeholder.com/150" },
      { id: 11, name: "Jasmine", price: 21, image: "https://via.placeholder.com/150" },
      { id: 12, name: "Aloe Vera", price: 17, image: "https://via.placeholder.com/150" },
    ],
    "Succulents": [
      { id: 13, name: "Echeveria", price: 12, image: "https://via.placeholder.com/150" },
      { id: 14, name: "Haworthia", price: 14, image: "https://via.placeholder.com/150" },
      { id: 15, name: "Jade Plant", price: 16, image: "https://via.placeholder.com/150" },
      { id: 16, name: "Sedum", price: 13, image: "https://via.placeholder.com/150" },
      { id: 17, name: "Crassula", price: 15, image: "https://via.placeholder.com/150" },
      { id: 18, name: "Kalanchoe", price: 18, image: "https://via.placeholder.com/150" },
    ],
  };

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2>Paradise Nursery</h2>
        <div>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/plants" style={styles.link}>Plants</Link>
          <Link to="/cart" style={styles.link}>
            Cart 🛒 ({totalQuantity})
          </Link>
        </div>
      </nav>

      {/* Product Categories */}
      {Object.entries(plants).map(([category, items]) => (
        <div key={category}>
          <h2 style={styles.categoryTitle}>{category}</h2>

          <div style={styles.grid}>
            {items.map((plant) => (
              <div key={plant.id} style={styles.card}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={styles.image}
                />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.id)}
                  style={{
                    ...styles.button,
                    backgroundColor: isInCart(plant.id)
                      ? "gray"
                      : "green",
                  }}
                >
                  {isInCart(plant.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#2e7d32",
    color: "white",
  },
  link: {
    marginLeft: "15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  categoryTitle: {
    marginLeft: "20px",
    marginTop: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default ProductList;
