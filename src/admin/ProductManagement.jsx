import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManagement.css";
import AdNavbar from "./AdNavbar";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "", description: "" });
  
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/AllProducts");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  
  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3000/AllProducts", form);
      setProducts((prev) => [...prev, res.data]);
      setForm({ name: "", price: "", category: "", image: "", description: "" });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setForm(product);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/AllProducts/${editingProduct}`, form);
      setProducts((prev) => prev.map((p) => (p.id === editingProduct ? form : p)));
      setEditingProduct(null);
      setForm({ name: "", price: "", category: "", image: "", description: "" });
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };


  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;
    try {
      await axios.delete(`http://localhost:3000/AllProducts/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{display:"flex", width:'100%'}}>
      <AdNavbar/>
      <div className="productManage">
      <h2 className="headside">Product Management</h2>
      <div className="product-form">
        <input className="boxstyle"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input className="boxstyle"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input className="boxstyle"
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input className="boxstyle"
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        required
        />
        <input className="boxstyle"
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        {editingProduct ? (
          <button onClick={handleUpdate}>Update Product</button>
        ) : (
          <button onClick={handleAdd}>Add Product</button>
        )}
      </div>
      
      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} className="product-img" />
            <div className="product-info">
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p>{p.category}</p>
              <div className="product-actions">
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ProductManagement;
