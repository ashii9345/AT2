import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart() {
  let user = localStorage.getItem("user");
  let conv = JSON.parse(user);
  let userId = conv.id;
  console.log(userId)

  let [cart, setCart] = useState([]);
  let [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}`).then((res) => {
      setCart(res.data.cart);
    });
    axios.get("http://localhost:3000/AllProducts").then((res) => {
      setProducts(res.data);
    });
  }, [userId]);

  if (!cart || !products) {
    return <p className="text-center mt-5">Loading...</p>;
  }
  let cartMap = {};
  cart.forEach((id) => {
    if (!cartMap[id]) cartMap[id] = 1;
    else cartMap[id]++;
  });

  let cartItems = Object.entries(cartMap)
    .map(([id, qty]) => {
      let prod = products.find((p) => p.id === id);
      return prod ? { ...prod, quantity: qty } : null;
    })
    .filter(Boolean);
  const updateCartInDB = (newCart) => {
    setCart(newCart);
    axios.patch(`http://localhost:3000/user/${userId}`, { cart: newCart });
    conv.cart=[...newCart]
    localStorage.setItem("user",JSON.stringify(conv))
  };

  const increaseQty = (id) => {
    updateCartInDB([...cart, id]);``
  };

  const decreaseQty = (id) => {
    let index = cart.indexOf(id);
    if (index !== -1) {
      let newCart = [...cart];
      newCart.splice(index, 1);
      updateCartInDB(newCart);
    }
  };

  const removeItem = (id) => {
    let newCart = cart.filter((cid) => cid !== id);
    updateCartInDB(newCart);
  
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
let btn={
    padding: "10px 20px",
  background:" #a17c4d",
  border:" none",
  color:"#fff",
  borderRadius:"6px",
  cursor: "pointer"
}

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (<>
        <p style={{textAlign:"center"}}>Your cart is empty</p>

        <p style={{textAlign:"center"}} onClick={()=>{navigate('/shop')}}><button style={btn}>Get It Now</button></p>
        </>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item my-5">
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-details">
                <h2>{item.name}</h2>
                <h3>{item.category}</h3>
                <p>{item.description}</p>
                <div className="cart-price">₹{item.price}</div>

                <div className="qty-control">
                  <button onClick={() => increaseQty(item.id)}>+</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"end"}}>
            <div className="cart-total d-flex justify-content-end align-items-center">
            <h3>Total: ₹{totalPrice}</h3>
          </div>
          <button style={{marginRight:"20px"}}
            className="place-order-btn"
            onClick={() => navigate("/checkout")}
          >
            Place Order
          </button>

          </div>
          
        </>
      )}
    </div>
  );
}

export default Cart;
