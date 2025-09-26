import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CheckOut.css";
import { ToastContainer,toast } from "react-toastify";
function Checkout() {
  let user = localStorage.getItem("user");
  let conv = JSON.parse(user);
  let userId = conv.id;
  const [allOrders,setAllOreders]=useState([])  
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber:"",
    payment: "cod",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}`).then((res) => {
      setCart(res.data.cart || []);
    });
    axios.get("http://localhost:3000/AllProducts").then((res) => {
      setProducts(res.data);
    });
      axios.get('http://localhost:3000/allOrders').then((res)=>{
      setAllOreders(res.data)
    })
  }, [userId]);
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

  let totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.address || !form.phoneNumber) {
      alert("Please fill in all details!");
      return;
    }

    let order = {
      userId,
      names:form.name,
      items: cartItems,
      total: totalPrice,
      payment: form.payment,
      address: form.address,
      phoneNumber:form.phoneNumber,
      date: new Date().toLocaleString(),
    };
    await axios.patch(`http://localhost:3000/user/${userId}`, { cart: [] });
    await axios.post('http://localhost:3000/allOrders',{order})
    let user=localStorage.getItem('user')
    let conv=JSON.parse(user)
    conv.order=[...conv.order,order]
    await axios.patch(`http://localhost:3000/user/${userId}`, {order:conv.order})
    conv.cart=[];
    
    localStorage.setItem("user",JSON.stringify(conv))

  
    setOrderPlaced(true);
  };

  if (orderPlaced) {
   toast.success("order placed sucessfully")
    return (
      <div className="checkout-conv">
        <h2> Order Placed Successfully!🎉</h2>
        <p>Thank you for shopping with us, {form.name}.</p>
        <p>Your order will be delivered soon..📦</p>
      </div>
    );
  }
  return (
<div className="checkout-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <h3>Total: ₹{totalPrice}</h3>
          </>
        )}
      </div>
      <div className="checkout-form">
        <h3>Shipping Details</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
        type="number"
        name="phoneNumber"
        placeholder="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}    
          onChange={handleChange}
        />

        <select name="payment" value={form.payment} onChange={handleChange}>
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Checkout;
